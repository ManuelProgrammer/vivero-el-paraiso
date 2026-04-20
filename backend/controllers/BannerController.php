<?php

class BannerController {
    private $db;
    private $table = "banner";

    public function __construct($db) {
        $this->db = $db;
    }

    public function handle($method, $id) {
        switch ($method) {
            case 'GET':
                $this->obtenerTodos();
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
        $query = "SELECT * FROM " . $this->table . "
                  WHERE estado = 'activo'
                  ORDER BY orden ASC";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $banner = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($banner);
    }

    private function crear($data) {
        if (empty($data['url'])) {
            http_response_code(400);
            echo json_encode(["error" => "La URL es obligatoria"]);
            return;
        }
        $query = "INSERT INTO " . $this->table . " (url, descripcion, orden)
                  VALUES (:url, :descripcion, :orden)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':url', $data['url']);
        $stmt->bindParam(':descripcion', $data['descripcion']);
        $stmt->bindParam(':orden', $data['orden']);
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["mensaje" => "Imagen agregada al banner", "id" => $this->db->lastInsertId()]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al agregar imagen"]);
        }
    }

    private function actualizar($id, $data) {
        $query = "UPDATE " . $this->table . "
                  SET estado = :estado, orden = :orden
                  WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':estado', $data['estado']);
        $stmt->bindParam(':orden', $data['orden']);
        $stmt->bindParam(':id', $id);
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["mensaje" => "Banner actualizado"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar"]);
        }
    }

    private function eliminar($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["mensaje" => "Imagen eliminada del banner"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar"]);
        }
    }
}
