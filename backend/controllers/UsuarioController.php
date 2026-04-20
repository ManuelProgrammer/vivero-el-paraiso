<?php

class UsuarioController {
    private $db;
    private $table = "usuarios";

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
        $query = "SELECT id, nombre, email, telefono, rol, estado, created_at
                  FROM " . $this->table . "
                  ORDER BY created_at DESC";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($usuarios);
    }

    private function obtenerUno($id) {
        $query = "SELECT id, nombre, email, telefono, fecha_nacimiento,
                         foto_perfil, rol, estado, direccion, ciudad,
                         departamento, codigo_postal, pais, created_at
                  FROM " . $this->table . "
                  WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Usuario no encontrado"]);
            return;
        }
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($usuario);
    }

    private function actualizar($id, $data) {
        $query = "UPDATE " . $this->table . "
                  SET estado = :estado, rol = :rol
                  WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':estado', $data['estado']);
        $stmt->bindParam(':rol', $data['rol']);
        $stmt->bindParam(':id', $id);
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["mensaje" => "Usuario actualizado exitosamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar el usuario"]);
        }
    }

    private function eliminar($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["mensaje" => "Usuario eliminado exitosamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar el usuario"]);
        }
    }
}
