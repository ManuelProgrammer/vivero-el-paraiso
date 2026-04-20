<?php

class ConfiguracionController {
    private $db;
    private $table = "configuracion";

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
                $this->guardar($data);
                break;
            case 'PUT':
                $data = json_decode(file_get_contents("php://input"), true);
                $this->actualizar($data);
                break;
            default:
                http_response_code(405);
                echo json_encode(["error" => "Método no permitido"]);
                break;
        }
    }

    private function obtenerTodas() {
        $query = "SELECT clave, valor, descripcion FROM " . $this->table;
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Convertir a objeto clave => valor para facilitar el uso en React
        $config = [];
        foreach ($rows as $row) {
            $config[$row['clave']] = [
                'valor' => $row['valor'],
                'descripcion' => $row['descripcion']
            ];
        }

        http_response_code(200);
        echo json_encode($config);
    }

    private function guardar($data) {
        if (empty($data['clave'])) {
            http_response_code(400);
            echo json_encode(["error" => "La clave es obligatoria"]);
            return;
        }

        // INSERT OR UPDATE (upsert)
        $query = "INSERT INTO " . $this->table . " (clave, valor, descripcion)
                  VALUES (:clave, :valor, :descripcion)
                  ON DUPLICATE KEY UPDATE
                  valor = :valor, descripcion = :descripcion";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':clave', $data['clave']);
        $stmt->bindParam(':valor', $data['valor']);
        $stmt->bindParam(':descripcion', $data['descripcion']);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["mensaje" => "Configuración guardada exitosamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al guardar la configuración"]);
        }
    }

    private function actualizar($data) {
        if (empty($data['clave'])) {
            http_response_code(400);
            echo json_encode(["error" => "La clave es obligatoria"]);
            return;
        }

        $query = "UPDATE " . $this->table . "
                  SET valor = :valor
                  WHERE clave = :clave";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':valor', $data['valor']);
        $stmt->bindParam(':clave', $data['clave']);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["mensaje" => "Configuración actualizada"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar"]);
        }
    }
}
