<?php

class ProductController {
    private $db;
    private $table = "productos";

    public function __construct($db) {
        $this->db = $db;
    }

    public function handle($method, $id) {
        switch ($method) {
            case 'GET':
                if ($id) {
                    $this->obtenerUno($id);
                } else {
                    $this->obtenerTodos();
                }
                break;

            case 'POST':
                $data = json_decode(file_get_contents("php://input"), true);
                $this->crear($data);
                break;

            case 'PUT':
                $data = json_decode(file_get_contents("php://input"), true);
                $this->actualizar($id, $data);
                break;

            case 'DELETE':
                $this->eliminar($id);
                break;

            default:
                http_response_code(405);
                echo json_encode(["error" => "Método no permitido"]);
                break;
        }
    }

    private function obtenerTodos() {
        $query = "SELECT p.id, p.nombre, p.descripcion, p.precio, p.stock, 
                         p.imagen_principal, p.estado,
                         c.nombre AS categoria
                  FROM " . $this->table . " p
                  JOIN categorias c ON p.categoria_id = c.id
                  WHERE p.estado = 'activo'
                  ORDER BY p.created_at DESC";

        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        echo json_encode($productos);
    }

    private function obtenerUno($id) {
        $query = "SELECT p.*, c.nombre AS categoria,
                         cp.luz, cp.riego, cp.tamano, cp.clima,
                         cp.tipo, cp.ubicacion, cp.toxicidad,
                         cp.floracion, cp.nivel_cuidado
                  FROM " . $this->table . " p
                  JOIN categorias c ON p.categoria_id = c.id
                  LEFT JOIN caracteristicas_plantas cp ON p.id = cp.producto_id
                  WHERE p.id = :id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Producto no encontrado"]);
            return;
        }

        $producto = $stmt->fetch(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($producto);
    }

    private function crear($data) {
        if (empty($data['nombre']) || empty($data['precio']) || empty($data['categoria_id'])) {
            http_response_code(400);
            echo json_encode(["error" => "Nombre, precio y categoría son obligatorios"]);
            return;
        }

        $query = "INSERT INTO " . $this->table . "
                  (categoria_id, nombre, descripcion, precio, stock, imagen_principal)
                  VALUES (:categoria_id, :nombre, :descripcion, :precio, :stock, :imagen_principal)";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':categoria_id', $data['categoria_id']);
        $stmt->bindParam(':nombre', $data['nombre']);
        $stmt->bindParam(':descripcion', $data['descripcion']);
        $stmt->bindParam(':precio', $data['precio']);
        $stmt->bindParam(':stock', $data['stock']);
        $stmt->bindParam(':imagen_principal', $data['imagen_principal']);

        if ($stmt->execute()) {
            $producto_id = $this->db->lastInsertId();

            // Si tiene características de planta, guardarlas
            if (isset($data['caracteristicas'])) {
                $this->guardarCaracteristicas($producto_id, $data['caracteristicas']);
            }

            http_response_code(201);
            echo json_encode([
                "mensaje" => "Producto creado exitosamente",
                "id" => $producto_id
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear el producto"]);
        }
    }

    private function guardarCaracteristicas($producto_id, $car) {
        $query = "INSERT INTO caracteristicas_plantas
                  (producto_id, luz, riego, tamano, clima, tipo, ubicacion, toxicidad, floracion, nivel_cuidado)
                  VALUES (:producto_id, :luz, :riego, :tamano, :clima, :tipo, :ubicacion, :toxicidad, :floracion, :nivel_cuidado)";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':producto_id', $producto_id);
        $stmt->bindParam(':luz', $car['luz']);
        $stmt->bindParam(':riego', $car['riego']);
        $stmt->bindParam(':tamano', $car['tamano']);
        $stmt->bindParam(':clima', $car['clima']);
        $stmt->bindParam(':tipo', $car['tipo']);
        $stmt->bindParam(':ubicacion', $car['ubicacion']);
        $stmt->bindParam(':toxicidad', $car['toxicidad']);
        $stmt->bindParam(':floracion', $car['floracion']);
        $stmt->bindParam(':nivel_cuidado', $car['nivel_cuidado']);
        $stmt->execute();
    }

    private function actualizar($id, $data) {
        $query = "UPDATE " . $this->table . "
                  SET nombre = :nombre, descripcion = :descripcion,
                      precio = :precio, stock = :stock,
                      imagen_principal = :imagen_principal
                  WHERE id = :id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':nombre', $data['nombre']);
        $stmt->bindParam(':descripcion', $data['descripcion']);
        $stmt->bindParam(':precio', $data['precio']);
        $stmt->bindParam(':stock', $data['stock']);
        $stmt->bindParam(':imagen_principal', $data['imagen_principal']);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["mensaje" => "Producto actualizado exitosamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar el producto"]);
        }
    }

    private function eliminar($id) {
        $query = "UPDATE " . $this->table . " 
                  SET estado = 'inactivo' WHERE id = :id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["mensaje" => "Producto eliminado exitosamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar el producto"]);
        }
    }
}