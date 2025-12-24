import mysql.connector
import os
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash

load_dotenv()

def reset_password(email, new_password):
    print(f"Connecting to database...")
    try:
        connection = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME'),
            port=int(os.getenv('DB_PORT'))
        )
        
        cursor = connection.cursor()
        
        # 1. Check if user exists
        cursor.execute("SELECT id, nombre, rol FROM usuarios WHERE email = %s", (email,))
        user = cursor.fetchone()
        
        if not user:
            print(f"❌ Error: No se encontró ningún usuario con el correo '{email}'")
            return

        print(f"✅ Usuario encontrado: {user[1]} (Rol: {user[2]})")
        
        # 2. Update password
        hashed_pw = generate_password_hash(new_password)
        cursor.execute("UPDATE usuarios SET password_hash = %s WHERE email = %s", (hashed_pw, email))
        connection.commit()
        
        print(f"✅ ¡Contraseña actualizada correctamente!")
        print(f"👉 Ahora puedes entrar con:")
        print(f"   Correo: {email}")
        print(f"   Contraseña: {new_password}")
        
    except mysql.connector.Error as err:
        print(f"❌ Error de base de datos: {err}")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
    finally:
        if 'cursor' in locals(): cursor.close()
        if 'connection' in locals(): connection.close()

if __name__ == "__main__":
    email = input("Ingresa el correo del administrador (ej: admin@gmail.com): ")
    new_pass = input("Ingresa la nueva contraseña (ej: admin123): ")
    reset_password(email, new_pass)
