<?php

class Order {
    private $db;
    private $table = "ordenes";

    public function __construct($db) {
        $this->db = $db;
    }

    // Obtener todas las órdenes (para el admin)
    public function getAll() {
        $query = "SELECT o.id, o.total, o.estado, o.created_at,
                         u.nombre AS cliente, u.email
                  FROM " . $this->table . " o
                  JOIN usuarios u ON o.usuario_id = u.id
                  ORDER BY o.created_at DESC";

        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Obtener órdenes de un usuario específico
    public function getByUsuario($usuario_id) {
        $query = "SELECT id, total, estado, created_at
                  FROM " . $this->table . "
                  WHERE usuario_id = :usuario_id
                  ORDER BY created_at DESC";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':usuario_id', $usuario_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Obtener detalle de una orden
    public function getDetalle($orden_id) {
        $query = "SELECT do.cantidad, do.precio_unitario, do.subtotal,
                         p.nombre AS producto, p.imagen_principal
                  FROM detalle_ordenes do
                  JOIN productos p ON do.producto_id = p.id
                  WHERE do.orden_id = :orden_id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':orden_id', $orden_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Obtener estadísticas para el dashboard admin
    public function getEstadisticas() {
        // Total de ventas e ingresos
        $query = "SELECT 
                    COUNT(*) AS total_ordenes,
                    SUM(total) AS ingresos_totales,
                    SUM(CASE WHEN estado = 'pendiente' THEN 1 ELSE 0 END) AS pendientes,
                    SUM(CASE WHEN estado = 'entregado' THEN 1 ELSE 0 END) AS entregadas
                  FROM " . $this->table;

        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Actualizar estado de una orden
    public function updateEstado($id, $estado) {
        $query = "UPDATE " . $this->table . "
                  SET estado = :estado
                  WHERE id = :id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':estado', $estado);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}