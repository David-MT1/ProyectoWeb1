-- Script de creación de Base de Datos para Champions Wear

CREATE DATABASE IF NOT EXISTS mi_base;
USE mi_base;

-- 1. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('cliente', 'admin') DEFAULT 'cliente',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Productos (Migración de productos.json)
-- Se guardan URLs de imágenes externas por ahora
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    descripcion TEXT,
    imagen_url VARCHAR(500), -- Opción A: URL externa
    genero ENUM('Hombre', 'Mujer', 'Niño', 'Unisex') DEFAULT 'Unisex',
    categoria ENUM('Ropa', 'Calzado', 'Accesorios', 'Otros'),
    deporte VARCHAR(50),
    marca VARCHAR(50),
    stock INT DEFAULT 100
);

-- 3. Tabla de Carrito (Persistencia)
CREATE TABLE IF NOT EXISTS carrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT DEFAULT 1,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- Usuario Admin por defecto (Password provisional: 'admin123')
-- Nota: En producción las contraseñas deben hashearse. Esto es solo para iniciar.
-- INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES ('Administrador', 'admin@champions.com', 'admin123', 'admin');
