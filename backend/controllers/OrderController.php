<?php

class OrderController {
    private $db;
    private $table = "ordenes";

    public function __construct($db) {
        $this->db = $db;
    }

    public function handle($method, $id) {
        switch ($method) {
            case 'GET':
                if ($id) {
                    $this->obtenerUna($id);
                } else {
                    $this->obtenerTodas();
                }
                break;

            case 'POST':
                $data = json_decode(file_get_contents("php://input"), true);
                $this->crear($data);
                break;

            case 'PUT':
                $data = json_decode(file_get_contents("php://input"), true);
                $this->actualizarEstado($id, $data);
                break;

            default:
                http_response_code(405);
                echo json_encode(["error" => "Método no permitido"]);
                break;
        }
    }

    private function obtenerTodas() {
        $query = "SELECT o.id, o.total, o.estado, o.created_at,
                         u.nombre AS cliente, u.email
                  FROM " . $this->table . " o
                  JOIN usuarios u ON o.usuario_id = u.id
                  ORDER BY o.created_at DESC";

        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $ordenes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        echo json_encode($ordenes);
    }

    private function obtenerUna($id) {
        // Obtener la orden
        $query = "SELECT o.*, u.nombre AS cliente, u.email
                  FROM " . $this->table . " o
                  JOIN usuarios u ON o.usuario_id = u.id
                  WHERE o.id = :id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Orden no encontrada"]);
            return;
        }

        $orden = $stmt->fetch(PDO::FETCH_ASSOC);

        // Obtener el detalle de la orden
        $query = "SELECT do.cantidad, do.precio_unitario, do.subtotal,
                         p.nombre AS producto, p.imagen_principal
                  FROM detalle_ordenes do
                  JOIN productos p ON do.producto_id = p.id
                  WHERE do.orden_id = :orden_id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':orden_id', $id);
        $stmt->execute();
        $orden['productos'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        echo json_encode($orden);
    }

    private function crear($data) {
        if (empty($data['usuario_id']) || empty($data['productos'])) {
            http_response_code(400);
            echo json_encode(["error" => "Usuario y productos son obligatorios"]);
            return;
        }

        // Calcular el total
        $total = 0;
        foreach ($data['productos'] as $item) {
            $total += $item['precio_unitario'] * $item['cantidad'];
        }

        // Crear la orden
        $query = "INSERT INTO " . $this->table . "
                  (usuario_id, total, direccion_envio, ciudad_envio)
                  VALUES (:usuario_id, :total, :direccion_envio, :ciudad_envio)";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':usuario_id', $data['usuario_id']);
        $stmt->bindParam(':total', $total);
        $stmt->bindParam(':direccion_envio', $data['direccion_envio']);
        $stmt->bindParam(':ciudad_envio', $data['ciudad_envio']);

        if (!$stmt->execute()) {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear la orden"]);
            return;
        }

        $orden_id = $this->db->lastInsertId();

        // Guardar el detalle de la orden
        foreach ($data['productos'] as $item) {
            $subtotal = $item['precio_unitario'] * $item['cantidad'];

            $query = "INSERT INTO detalle_ordenes
                      (orden_id, producto_id, cantidad, precio_unitario, subtotal)
                      VALUES (:orden_id, :producto_id, :cantidad, :precio_unitario, :subtotal)";

            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':orden_id', $orden_id);
            $stmt->bindParam(':producto_id', $item['producto_id']);
            $stmt->bindParam(':cantidad', $item['cantidad']);
            $stmt->bindParam(':precio_unitario', $item['precio_unitario']);
            $stmt->bindParam(':subtotal', $subtotal);
            $stmt->execute();

            // Descontar el stock del producto
            $query = "UPDATE productos 
                      SET stock = stock - :cantidad 
                      WHERE id = :producto_id";

            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':cantidad', $item['cantidad']);
            $stmt->bindParam(':producto_id', $item['producto_id']);
            $stmt->execute();
        }

        http_response_code(201);
        echo json_encode([
            "mensaje" => "Orden creada exitosamente",
            "orden_id" => $orden_id,
            "total" => $total
        ]);
    }

    private function actualizarEstado($id, $data) {
        $query = "UPDATE " . $this->table . "
                  SET estado = :estado
                  WHERE id = :id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':estado', $data['estado']);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["mensaje" => "Estado de la orden actualizado"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar el estado"]);
        }
    }
}