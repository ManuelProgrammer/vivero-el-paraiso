<?php

// Obtener la URL de la petición
$request_uri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Limpiar la URL
$uri = parse_url($request_uri, PHP_URL_PATH);
$uri = explode('/', $uri);

// Identificar el recurso solicitado
// Ejemplo: /api/productos → $recurso = "productos"
$recurso = isset($uri[2]) ? $uri[2] : '';
$id = isset($uri[3]) ? $uri[3] : null;

// Cargar controladores
require_once '../config/database.php';
require_once '../controllers/AuthController.php';
require_once '../controllers/ProductController.php';
require_once '../controllers/OrderController.php';
require_once '../controllers/BlogController.php';

// Instanciar base de datos
$database = new Database();
$db = $database->getConnection();

// Enrutar la petición al controlador correcto
switch ($recurso) {

    case 'auth':
        $controller = new AuthController($db);
        $controller->handle($method, $id);
        break;

    case 'productos':
        $controller = new ProductController($db);
        $controller->handle($method, $id);
        break;

    case 'ordenes':
        $controller = new OrderController($db);
        $controller->handle($method, $id);
        break;

    case 'blog':
        $controller = new BlogController($db);
        $controller->handle($method, $id);
        break;

    default:
        http_response_code(404);
        echo json_encode(["error" => "Ruta no encontrada"]);
        break;
}