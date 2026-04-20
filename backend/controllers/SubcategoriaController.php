<?php

class SubcategoriaController {
    private $db;
    private $table = "subcategorias";

    public function __construct($db) {
        $this->db = $db;
    }

    public function handle($method, $id) {
        switch ($method) {
            case 'GET':
                // Si viene categoria_id como query param, filtrar
                $categoria_id = isset($_GET['categoria_id']) ? $_GET['categoria_id'] : null;
                if ($categoria_id) {
                    $this->obtenerPorCategoria($categoria_id);
                } else {
                    $this->obtenerTodas();
                }
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
        $query = "SELECT s.*, c.nombre AS categoria
                  FROM " . $this->table . " s
                  JOIN categorias c ON s.categoria_id = c.id
                  ORDER BY c.nombre, s.nombre ASC";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $subcategorias = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($subcategorias);
    }

    private function obtenerPorCategoria($categoria_id) {
        $query = "SELECT * FROM " . $this->table . "
                  WHERE categoria_id = :categoria_id
                  ORDER BY nombre ASC";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':categoria_id', $categoria_id);
        $stmt->execute();
        $subcategorias = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($subcategorias);
    }

    private function crear($data) {
        if (empty($data['nombre']) || empty($data['categoria_id'])) {
            http_response_code(400);
            echo json_encode(["error" => "Nombre y categoría son obligatorios"]);
            return;
        }
        $query = "INSERT INTO " . $this->table . " (categoria_id, nombre, descripcion)
                  VALUES (:categoria_id, :nombre, :descripcion)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':categoria_id', $data['categoria_id']);
        $stmt->bindParam(':nombre', $data['nombre']);
        $stmt->bindParam(':descripcion', $data['descripcion']);
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["mensaje" => "Subcategoría creada", "id" => $this->db->lastInsertId()]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear la subcategoría"]);
        }
    }

    private function eliminar($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["mensaje" => "Subcategoría eliminada"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar"]);
        }
    }
}
