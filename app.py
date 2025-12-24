from flask import Flask, render_template, send_from_directory, jsonify, request, session
from flask_cors import CORS
import mysql.connector
import os
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__, static_url_path='', static_folder='.')
app.secret_key = os.getenv('SECRET_KEY', 'super_secret_default_key')
CORS(app)

# Configuración de Base de Datos
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            user=os.getenv('DB_USER', 'root'),
            password=os.getenv('DB_PASSWORD', ''),
            database=os.getenv('DB_NAME', 'mi_base'),
            port=int(os.getenv('DB_PORT', 3306))
        )
        return connection
    except mysql.connector.Error as err:
        print(f"Error de conexión: {err}")
        return None

# --- RUTAS FRONTEND ---

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# --- API AUTENTICACIÓN ---

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    nombre = data.get('nombre')
    email = data.get('email')
    password = data.get('password')
    
    # Validación simple
    if not nombre or not email or not password:
        return jsonify({"success": False, "message": "Faltan datos"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"success": False, "message": "Error de base de datos"}), 500

    cursor = conn.cursor()
    
    # Verificar si existe el correo
    cursor.execute("SELECT * FROM usuarios WHERE email = %s", (email,))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        return jsonify({"success": False, "message": "El correo ya está registrado"}), 400
    
    # Crear usuario
    hashed_pw = generate_password_hash(password)
    # Nota: No usamos el campo 'usuario' del form porque no está en la DB, usamos 'nombre'.
    try:
        cursor.execute("INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (%s, %s, %s, 'cliente')", (nombre, email, hashed_pw))
        conn.commit()
    except mysql.connector.Error as err:
        cursor.close()
        conn.close()
        return jsonify({"success": False, "message": str(err)}), 500

    cursor.close()
    conn.close()
    
    return jsonify({"success": True, "message": "Usuario registrado correctamente"})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    usuario_or_email = data.get('usuario') 
    password = data.get('password')

    conn = get_db_connection()
    if not conn:
        return jsonify({"success": False, "message": "Error conexión DB"}), 500
        
    cursor = conn.cursor(dictionary=True)
    
    # Buscamos por email
    cursor.execute("SELECT * FROM usuarios WHERE email = %s", (usuario_or_email,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user and check_password_hash(user['password_hash'], password):
        # Login exitoso
        session['user_id'] = user['id']
        session['nombre'] = user['nombre']
        session['rol'] = user['rol']
        
        destino = "adminAgregarProductos.html" if user['rol'] == 'admin' else "index.html"
        return jsonify({"success": True, "redirect": destino, "nombre": user['nombre']})
    
    return jsonify({"success": False, "message": "Correo o contraseña incorrectos"}), 401

@app.route('/api/logout')
def logout():
    session.clear()
    return jsonify({"success": True})

@app.route('/api/user_info')
def user_info():
    if 'user_id' in session:
        return jsonify({"logged_in": True, "nombre": session['nombre'], "rol": session['rol']})
    return jsonify({"logged_in": False})

@app.route('/api/health')
def health_check():
    return jsonify({"status": "ok", "backend": "Python/Flask"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
