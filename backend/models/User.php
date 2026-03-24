<?php

class User {
    private $db;
    private $table = "usuarios";

    public function __construct($db) {
        $this->db = $db;
    }

    // Buscar usuario por email
    public function findByEmail($email) {
        $query = "SELECT * FROM " . $this->table . " 
                  WHERE email = :email";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Buscar usuario por ID
    public function findById($id) {
        $query = "SELECT id, nombre, email, telefono, 
                         fecha_nacimiento, foto_perfil, rol, 
                         estado, direccion, ciudad, 
                         departamento, codigo_postal, pais
                  FROM " . $this->table . " 
                  WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Actualizar perfil
    public function updateProfile($id, $data) {
        $query = "UPDATE " . $this->table . "
                  SET nombre = :nombre,
                      telefono = :telefono,
                      fecha_nacimiento = :fecha_nacimiento,
                      foto_perfil = :foto_perfil,
                      direccion = :direccion,
                      ciudad = :ciudad,
                      departamento = :departamento,
                      codigo_postal = :codigo_postal,
                      pais = :pais
                  WHERE id = :id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':nombre', $data['nombre']);
        $stmt->bindParam(':telefono', $data['telefono']);
        $stmt->bindParam(':fecha_nacimiento', $data['fecha_nacimiento']);
        $stmt->bindParam(':foto_perfil', $data['foto_perfil']);
        $stmt->bindParam(':direccion', $data['direccion']);
        $stmt->bindParam(':ciudad', $data['ciudad']);
        $stmt->bindParam(':departamento', $data['departamento']);
        $stmt->bindParam(':codigo_postal', $data['codigo_postal']);
        $stmt->bindParam(':pais', $data['pais']);
        $stmt->bindParam(':id', $id);

        return $stmt->execute();
    }

    // Cambiar estado (bloquear/activar)
    public function changeStatus($id, $estado) {
        $query = "UPDATE " . $this->table . "
                  SET estado = :estado
                  WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':estado', $estado);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    // Obtener todos los usuarios (para el admin)
    public function getAll() {
        $query = "SELECT id, nombre, email, rol, estado, created_at
                  FROM " . $this->table . "
                  ORDER BY created_at DESC";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}