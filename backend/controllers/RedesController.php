<?php

class RedesController {
    private $db;
    private $table = "redes_sociales";

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
        $query = "SELECT * FROM " . $this->table . " ORDER BY orden ASC";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $redes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($redes);
    }

    private function crear($data) {
        if (empty($data['nombre']) || empty($data['url'])) {
            http_response_code(400);
            echo json_encode(["error" => "Nombre y URL son obligatorios"]);
            return;
        }
        $query = "INSERT INTO " . $this->table . " (nombre, url, icono, orden)
                  VALUES (:nombre, :url, :icono, :orden)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':nombre', $data['nombre']);
        $stmt->bindParam(':url', $data['url']);
        $stmt->bindParam(':icono', $data['icono']);
        $stmt->bindParam(':orden', $data['orden']);
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["mensaje" => "Red social agregada", "id" => $this->db->lastInsertId()]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al agregar"]);
        }
    }

    private function eliminar($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["mensaje" => "Red social eliminada"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar"]);
        }
    }
}
