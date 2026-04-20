<?php

class SoporteController {
    private $db;
    private $table = "soporte";

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
                $this->actualizarEstado($id, $data);
                break;
            default:
                http_response_code(405);
                echo json_encode(["error" => "Método no permitido"]);
                break;
        }
    }

    private function obtenerTodos() {
        $query = "SELECT * FROM " . $this->table . " ORDER BY created_at DESC";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $mensajes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($mensajes);
    }

    private function crear($data) {
        if (empty($data['nombre']) || empty($data['email']) || empty($data['mensaje'])) {
            http_response_code(400);
            echo json_encode(["error" => "Nombre, email y mensaje son obligatorios"]);
            return;
        }
        $query = "INSERT INTO " . $this->table . " (nombre, email, asunto, mensaje)
                  VALUES (:nombre, :email, :asunto, :mensaje)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':nombre', $data['nombre']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':asunto', $data['asunto']);
        $stmt->bindParam(':mensaje', $data['mensaje']);
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["mensaje" => "Mensaje enviado exitosamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al enviar el mensaje"]);
        }
    }

    private function actualizarEstado($id, $data) {
        $query = "UPDATE " . $this->table . "
                  SET estado = :estado WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':estado', $data['estado']);
        $stmt->bindParam(':id', $id);
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["mensaje" => "Estado actualizado"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar"]);
        }
    }
}
