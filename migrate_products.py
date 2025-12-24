import json
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

def migrate_products():
    print("🚀 Iniciando migración de productos...")
    
    # 1. Leer archivo JSON
    try:
        with open('productos.json', 'r', encoding='utf-8') as f:
            products = json.load(f)
            print(f"📖 Leídos {len(products)} productos del JSON.")
    except FileNotFoundError:
        print("❌ Error: No se encontró 'productos.json'")
        return

    # 2. Conectar a Base de Datos
    conn = None
    try:
        conn = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME'),
            port=int(os.getenv('DB_PORT', 3306))
        )
        cursor = conn.cursor()
        
        # 0. Asegurar compatibilidad (Cambiar ENUM a VARCHAR para evitar errores de "Data truncated")
        print("🔧 Ajustando esquema de base de datos para máxima compatibilidad...")
        try:
            cursor.execute("ALTER TABLE productos MODIFY COLUMN genero VARCHAR(50)")
            cursor.execute("ALTER TABLE productos MODIFY COLUMN categoria VARCHAR(50)")
            conn.commit()
            print("   ✅ Esquema actualizado (ENUM -> VARCHAR)")
        except mysql.connector.Error as e:
            print(f"   ⚠️ No se pudo ajustar el esquema (quizás ya es VARCHAR): {e}")

        # 3. Insertar productos
        sql = """INSERT INTO productos (nombre, precio, descripcion, imagen_url, genero, categoria, deporte, marca) 
                 VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"""
        
        count = 0
        for p in products:
            # Verificar si ya existe (opcional, por nombre)
            cursor.execute("SELECT id FROM productos WHERE nombre = %s", (p['nombre'],))
            if cursor.fetchone():
                print(f"⚠️ Saltando '{p['nombre']}' (ya existe)")
                continue

            val = (
                p['nombre'], 
                p['precio'], 
                p.get('descripcion', ''), 
                p['imagen'], 
                p.get('genero', 'Unisex'), 
                p.get('categoria', 'Otros'), 
                p.get('deporte', ''), 
                p.get('marca', '')
            )
            cursor.execute(sql, val)
            count += 1
            
        conn.commit()
        print(f"✅ ¡Éxito! Se migraron {count} productos nuevos a la base de datos.")
        
    except mysql.connector.Error as err:
        print(f"❌ Error de base de datos: {err}")
    finally:
        if conn:
            conn.close()
            print("🔌 Conexión cerrada.")

if __name__ == "__main__":
    migrate_products()
