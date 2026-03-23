<?php

class Database {
    private $host = "localhost";
    private $db_name = "vivero_paraiso";
    private $username = "root";
    private $password = "";
    private $conn = null;

    public function getConnection() {
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4",
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->conn;
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
            return null;
        }
    }
}