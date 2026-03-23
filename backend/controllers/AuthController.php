<?php

class AuthController {
    private $db;
    private $table = "usuarios";

    public function __construct($db) {
        $this->db = $db;
    }

    public function handle($method, $id) {
        switch ($method) {
            case 'POST':
                $data = json_decode(file_get_contents("php://input"), true);
                $action = isset($data['action']) ? $data['action'] : '';

                if ($action === 'registro') {
                    $this->registro($data);
                } elseif ($action === 'login') {
                    $this->login($data);
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Acción no válida"]);
                }
                break;

            default:
                http_response_code(405);
                echo json_encode(["error" => "Método no permitido"]);
                break;
        }
    }

    private function registro($data) {
        // Validar campos requeridos
        if (empty($data['nombre']) || empty($data['email']) || empty($data['contrasena'])) {
            http_response_code(400);
            echo json_encode(["error" => "Nombre, email y contraseña son obligatorios"]);
            return;
        }

        // Verificar si el email ya existe
        $query = "SELECT id FROM " . $this->table . " WHERE email = :email";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':email', $data['email']);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            http_response_code(400);
            echo json_encode(["error" => "El email ya está registrado"]);
            return;
        }

        // Cifrar la contraseña
        $contrasena_cifrada = password_hash($data['contrasena'], PASSWORD_BCRYPT);

        // Insertar el nuevo usuario
        $query = "INSERT INTO " . $this->table . " 
                  (nombre, email, contrasena, telefono, fecha_nacimiento) 
                  VALUES (:nombre, :email, :contrasena, :telefono, :fecha_nacimiento)";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':nombre', $data['nombre']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':contrasena', $contrasena_cifrada);
        $stmt->bindParam(':telefono', $data['telefono']);
        $stmt->bindParam(':fecha_nacimiento', $data['fecha_nacimiento']);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["mensaje" => "Usuario registrado exitosamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al registrar el usuario"]);
        }
    }

    private function login($data) {
        // Validar campos requeridos
        if (empty($data['email']) || empty($data['contrasena'])) {
            http_response_code(400);
            echo json_encode(["error" => "Email y contraseña son obligatorios"]);
            return;
        }

        // Buscar el usuario por email
        $query = "SELECT id, nombre, email, contrasena, rol, estado 
                  FROM " . $this->table . " WHERE email = :email";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':email', $data['email']);
        $stmt->execute();

        if ($stmt->rowCount() === 0) {
            http_response_code(401);
            echo json_encode(["error" => "Credenciales incorrectas"]);
            return;
        }

        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verificar si la cuenta está bloqueada
        if ($usuario['estado'] === 'bloqueado') {
            http_response_code(403);
            echo json_encode(["error" => "Tu cuenta ha sido bloqueada. Contacta al soporte."]);
            return;
        }

        // Verificar la contraseña
        if (!password_verify($data['contrasena'], $usuario['contrasena'])) {
            http_response_code(401);
            echo json_encode(["error" => "Credenciales incorrectas"]);
            return;
        }

        // Responder con los datos del usuario
        http_response_code(200);
        echo json_encode([
            "mensaje" => "Login exitoso",
            "usuario" => [
                "id" => $usuario['id'],
                "nombre" => $usuario['nombre'],
                "email" => $usuario['email'],
                "rol" => $usuario['rol']
            ]
        ]);
    }
}