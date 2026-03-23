<?php

class BlogController {
    private $db;
    private $table = "blog";

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
        $query = "SELECT b.id, b.titulo, b.imagen_portada, 
                         b.estado, b.created_at,
                         u.nombre AS autor
                  FROM " . $this->table . " b
                  JOIN usuarios u ON b.autor_id = u.id
                  WHERE b.estado = 'publicado'
                  ORDER BY b.created_at DESC";

        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $articulos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        echo json_encode($articulos);
    }

    private function obtenerUno($id) {
        $query = "SELECT b.*, u.nombre AS autor
                  FROM " . $this->table . " b
                  JOIN usuarios u ON b.autor_id = u.id
                  WHERE b.id = :id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Artículo no encontrado"]);
            return;
        }

        $articulo = $stmt->fetch(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($articulo);
    }

    private function crear($data) {
        if (empty($data['titulo']) || empty($data['contenido']) || empty($data['autor_id'])) {
            http_response_code(400);
            echo json_encode(["error" => "Título, contenido y autor son obligatorios"]);
            return;
        }

        $query = "INSERT INTO " . $this->table . "
                  (titulo, contenido, imagen_portada, autor_id, estado)
                  VALUES (:titulo, :contenido, :imagen_portada, :autor_id, :estado)";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':titulo', $data['titulo']);
        $stmt->bindParam(':contenido', $data['contenido']);
        $stmt->bindParam(':imagen_portada', $data['imagen_portada']);
        $stmt->bindParam(':autor_id', $data['autor_id']);
        $stmt->bindParam(':estado', $data['estado']);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode([
                "mensaje" => "Artículo creado exitosamente",
                "id" => $this->db->lastInsertId()
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear el artículo"]);
        }
    }

    private function actualizar($id, $data) {
        $query = "UPDATE " . $this->table . "
                  SET titulo = :titulo,
                      contenido = :contenido,
                      imagen_portada = :imagen_portada,
                      estado = :estado
                  WHERE id = :id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':titulo', $data['titulo']);
        $stmt->bindParam(':contenido', $data['contenido']);
        $stmt->bindParam(':imagen_portada', $data['imagen_portada']);
        $stmt->bindParam(':estado', $data['estado']);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["mensaje" => "Artículo actualizado exitosamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar el artículo"]);
        }
    }

    private function eliminar($id) {
        $query = "UPDATE " . $this->table . "
                  SET estado = 'borrador'
                  WHERE id = :id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["mensaje" => "Artículo eliminado exitosamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar el artículo"]);
        }
    }
}