<?php

class ImagenController {
    private $uploadDir;
    private $baseUrl;

    public function __construct() {
        $this->uploadDir = __DIR__ . '/../../uploads/';
        $this->baseUrl = 'http://localhost/vivero-el-paraiso/uploads/';

        // Crear carpeta uploads si no existe
        if (!file_exists($this->uploadDir)) {
            mkdir($this->uploadDir, 0755, true);
        }
    }

    public function handle($method, $id) {
        switch ($method) {
            case 'POST':
                $this->subir();
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

    private function subir() {
        if (!isset($_FILES['imagen'])) {
            http_response_code(400);
            echo json_encode(["error" => "No se recibió ninguna imagen"]);
            return;
        }

        $archivo = $_FILES['imagen'];

        // Validar que sea una imagen
        $tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!in_array($archivo['type'], $tiposPermitidos)) {
            http_response_code(400);
            echo json_encode(["error" => "Solo se permiten imágenes JPG, PNG, WEBP o GIF"]);
            return;
        }

        // Validar tamaño (máximo 5MB)
        $maxSize = 5 * 1024 * 1024;
        if ($archivo['size'] > $maxSize) {
            http_response_code(400);
            echo json_encode(["error" => "La imagen no puede pesar más de 5MB"]);
            return;
        }

        // Generar nombre único
        $extension = pathinfo($archivo['name'], PATHINFO_EXTENSION);
        $nombreUnico = uniqid('img_') . '_' . time() . '.' . $extension;
        $rutaDestino = $this->uploadDir . $nombreUnico;

        // Mover el archivo
        if (move_uploaded_file($archivo['tmp_name'], $rutaDestino)) {
            http_response_code(201);
            echo json_encode([
                "mensaje" => "Imagen subida exitosamente",
                "url" => $this->baseUrl . $nombreUnico,
                "nombre" => $nombreUnico
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al subir la imagen"]);
        }
    }

    private function eliminar($nombre) {
        $ruta = $this->uploadDir . $nombre;
        if (file_exists($ruta)) {
            unlink($ruta);
            http_response_code(200);
            echo json_encode(["mensaje" => "Imagen eliminada"]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Imagen no encontrada"]);
        }
    }
}
