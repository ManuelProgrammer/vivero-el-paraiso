<?php

class Product {
    private $db;
    private $table = "productos";

    public function __construct($db) {
        $this->db = $db;
    }

    // Obtener todos los productos activos
    public function getAll() {
        $query = "SELECT p.id, p.nombre, p.descripcion, p.precio, 
                         p.stock, p.imagen_principal, p.estado,
                         c.nombre AS categoria
                  FROM " . $this->table . " p
                  JOIN categorias c ON p.categoria_id = c.id
                  WHERE p.estado = 'activo'
                  ORDER BY p.created_at DESC";

        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Obtener un producto por ID con sus características
    public function getById($id) {
        $query = "SELECT p.*, c.nombre AS categoria,
                         cp.luz, cp.riego, cp.tamano, cp.clima,
                         cp.tipo, cp.ubicacion, cp.toxicidad,
                         cp.floracion, cp.nivel_cuidado
                  FROM " . $this->table . " p
                  JOIN categorias c ON p.categoria_id = c.id
                  LEFT JOIN caracteristicas_plantas cp ON p.id = cp.producto_id
                  WHERE p.id = :id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Obtener productos por categoría
    public function getByCategoria($categoria_id) {
        $query = "SELECT p.id, p.nombre, p.precio, 
                         p.stock, p.imagen_principal,
                         c.nombre AS categoria
                  FROM " . $this->table . " p
                  JOIN categorias c ON p.categoria_id = c.id
                  WHERE p.categoria_id = :categoria_id
                  AND p.estado = 'activo'
                  ORDER BY p.nombre ASC";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':categoria_id', $categoria_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Buscar productos por nombre
    public function search($termino) {
        $termino = "%" . $termino . "%";
        $query = "SELECT p.id, p.nombre, p.precio,
                         p.stock, p.imagen_principal,
                         c.nombre AS categoria
                  FROM " . $this->table . " p
                  JOIN categorias c ON p.categoria_id = c.id
                  WHERE p.nombre LIKE :termino
                  AND p.estado = 'activo'
                  ORDER BY p.nombre ASC";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':termino', $termino);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Verificar si hay stock disponible
    public function hasStock($id, $cantidad) {
        $query = "SELECT stock FROM " . $this->table . "
                  WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $producto = $stmt->fetch(PDO::FETCH_ASSOC);
        return $producto && $producto['stock'] >= $cantidad;
    }

    // Obtener productos con bajo stock (para el dashboard admin)
    public function getLowStock($limite = 5) {
        $query = "SELECT id, nombre, stock, imagen_principal
                  FROM " . $this->table . "
                  WHERE stock <= :limite
                  AND estado = 'activo'
                  ORDER BY stock ASC";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':limite', $limite);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}