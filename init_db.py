import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

def init_db():
    try:
        connection = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME'),
            port=int(os.getenv('DB_PORT'))
        )
        
        cursor = connection.cursor()
        
        # Leer el archivo SQL
        with open('db_schema.sql', 'r') as f:
            schema_sql = f.read()

        # Ejecutar comandos (separados por ;)
        commands = schema_sql.split(';')
        for command in commands:
            if command.strip():
                try:
                    cursor.execute(command)
                    print(f"Comando ejecutado: {command[:50]}...")
                except mysql.connector.Error as err:
                    print(f"Error en comando: {err}")

        connection.commit()
        print("¡Base de datos inicializada correctamente en Railway!")
        
        cursor.close()
        connection.close()
        
    except Exception as e:
        print(f"Error fatal: {e}")

if __name__ == '__main__':
    init_db()
