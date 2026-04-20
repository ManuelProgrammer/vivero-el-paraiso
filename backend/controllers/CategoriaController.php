<?php

class CategoriaController {
    private $db;
    private $table = "categorias";

    public function __construct($db) {
        $this->db = $db;
    }

    public function handle($method, $id) {
        switch ($method) {
            case 'GET':
                $this->obtenerTodas();
                break;
            case 'POST':
                $data = json_decode(file_get_contents("php://input"), true);
                $this->crear($data);
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

    private function obtenerTodas() {
        $query = "SELECT * FROM " . $this->table . " ORDER BY nombre ASC";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($categorias);
    }

    private function crear($data) {
        if (empty($data['nombre'])) {
            http_response_code(400);
            echo json_encode(["error" => "El nombre es obligatorio"]);
            return;
        }
        $query = "INSERT INTO " . $this->table . " (nombre, descripcion, imagen)
                  VALUES (:nombre, :descripcion, :imagen)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':nombre', $data['nombre']);
        $stmt->bindParam(':descripcion', $data['descripcion']);
        $stmt->bindParam(':imagen', $data['imagen']);
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["mensaje" => "Categoría creada", "id" => $this->db->lastInsertId()]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear la categoría"]);
        }
    }

    private function eliminar($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["mensaje" => "Categoría eliminada"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar"]);
        }
    }
}
