// Desarrollador B - Lógica del proyecto
// Colaborador: Percy Molina 

console.log("¡Hola desde el módulo de lógica!");

// Función de saludo
function saludar(nombre) {
    return "¡Hola " + nombre + "! Bienvenido al proyecto.";
}

// Función calculadora básica
function calculadora(operacion, a, b) {
    switch(operacion) {
        case 'suma':
            return a + b;
        case 'resta':
            return a - b;
        default:
            return "Operación no válida";
    }
}

// Pruebas
console.log(saludar("Usuario"));
console.log("2 + 3 =", calculadora('suma', 2, 3));