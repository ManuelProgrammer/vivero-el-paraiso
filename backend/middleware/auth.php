<?php

class AuthMiddleware {

    private static $secret = 'vivero_secret_key_2026';

    // Verificar si la petición tiene un Access Token válido
    public static function verificar() {
        $headers = getallheaders();

        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(["error" => "Token no proporcionado"]);
            exit();
        }

        $auth = $headers['Authorization'];
        $token = str_replace('Bearer ', '', $auth);
        $payload = self::decodificarToken($token);

        if (!$payload) {
            http_response_code(401);
            echo json_encode(["error" => "Token inválido o expirado"]);
            exit();
        }

        return $payload;
    }

    // Verificar que el usuario sea administrador
    public static function verificarAdmin() {
        $payload = self::verificar();

        if ($payload['rol'] !== 'admin') {
            http_response_code(403);
            echo json_encode(["error" => "Acceso denegado. Se requiere rol de administrador"]);
            exit();
        }

        return $payload;
    }

    // Generar Access Token — dura 15 minutos
    public static function generarAccessToken($usuario) {
        $payload = [
            "id"     => $usuario['id'],
            "nombre" => $usuario['nombre'],
            "email"  => $usuario['email'],
            "rol"    => $usuario['rol'],
            "tipo"   => "access",
            "exp"    => time() + (60 * 15)
        ];
        return self::construirToken($payload);
    }

    // Generar Refresh Token — dura 30 días
    public static function generarRefreshToken($usuario) {
        $payload = [
            "id"   => $usuario['id'],
            "tipo" => "refresh",
            "exp"  => time() + (60 * 60 * 24 * 30)
        ];
        return self::construirToken($payload);
    }

    // Construir el token JWT
    private static function construirToken($payload) {
        $header = base64_encode(json_encode([
            "alg" => "HS256",
            "typ" => "JWT"
        ]));

        $payload_encoded = base64_encode(json_encode($payload));

        $firma = hash_hmac(
            'sha256',
            $header . '.' . $payload_encoded,
            self::$secret
        );

        return $header . '.' . $payload_encoded . '.' . base64_encode($firma);
    }

    // Decodificar y verificar un token
    public static function decodificarToken($token) {
        $partes = explode('.', $token);

        if (count($partes) !== 3) {
            return null;
        }

        list($header, $payload, $firma) = $partes;

        $firma_esperada = base64_encode(hash_hmac(
            'sha256',
            $header . '.' . $payload,
            self::$secret
        ));

        if ($firma !== $firma_esperada) {
            return null;
        }

        $datos = json_decode(base64_decode($payload), true);

        if ($datos['exp'] < time()) {
            return null;
        }

        return $datos;
    }
}