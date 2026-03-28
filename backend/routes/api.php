<?php

$request_uri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

$uri = parse_url($request_uri, PHP_URL_PATH);
$uri = explode('/', $uri);

// Buscar el índice de 'api' en la URL
$apiIndex = array_search('api', $uri);

// El recurso es el elemento después de 'api'
$recurso = isset($uri[$apiIndex + 1]) ? $uri[$apiIndex + 1] : '';
$id = isset($uri[$apiIndex + 2]) ? $uri[$apiIndex + 2] : null;

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../controllers/AuthController.php';
require_once __DIR__ . '/../controllers/ProductController.php';
require_once __DIR__ . '/../controllers/OrderController.php';
require_once __DIR__ . '/../controllers/BlogController.php';

$database = new Database();
$db = $database->getConnection();

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

