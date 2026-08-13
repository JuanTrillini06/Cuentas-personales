# Gestor Personal de Gastos

Aplicación web integral para la autogestión de ingresos y egresos de dinero, permitiendo a los usuarios administrar y visualizar en detalle sus movimientos y cuentas bancarias.

## 🚀 Despliegue en Producción

El proyecto está preparado para funcionar en un entorno Fullstack distribuido de forma eficiente:

- **Frontend (Vercel):** [¡Inserta aquí el link de despliegue de Vercel!]
- **Backend (Render):** Desplegado como API REST.
- **Base de Datos (Atlas):** Cluster en la nube de MongoDB.

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5 & CSS3:** Estructura semántica y diseño *Responsive* (adaptable a móviles y escritorio). Utiliza variables CSS nativas para proveer un cambio dinámico de tema (Claro/Oscuro) y un diseño minimalista basado en tonos pastel.
- **JavaScript (Vanilla):** Manejo completo de la lógica del cliente (sin frameworks). Manipulación del DOM, sistema de modales interactivos y peticiones asíncronas (`fetch`) seguras a la API con envío de cabeceras de autorización.
- **Chart.js:** Herramienta de visualización de datos utilizada para renderizar el gráfico interactivo del dashboard estadístico.

### Backend (API REST)
- **Node.js + Express:** Entorno de ejecución y framework para construir una API RESTful eficiente y escalable.
- **MongoDB + Mongoose:** Base de datos NoSQL documental. Mongoose se encarga del modelado de datos, validación estricta de esquemas y las relaciones entre Usuarios, Cuentas, Etiquetas y Movimientos.
- **JSON Web Tokens (JWT):** Sistema de autenticación de rutas. Genera y verifica tokens seguros para proteger los endpoints privados.
- **Bcrypt.js:** Algoritmo de hasheo para encriptar contraseñas.
- **Dotenv & CORS:** Gestión de variables de entorno para mantener las credenciales ocultas del repositorio de código, y habilitación de peticiones de origen cruzado para enlazar el dominio de Vercel con el de Render.

## ✨ Funcionalidades Principales

- **Seguridad (Auth):** Registro e inicio de sesión encriptado mediante JWT. Las cuentas y datos están fuertemente aislados por usuario.
- **UI Adaptativa (Dark Mode):** Interfaz amigable, moderna, con bordes suaves y selector dinámico de tema claro/oscuro.
- **Administración de Cuentas Bancarias:** Permite al usuario dar de alta diferentes cuentas o billeteras virtuales (ABM/CRUD). Soporta la especificación de un saldo inicial y define un tipo de moneda (Ej: ARS, USD).
- **Control de Movimientos:** Operaciones precisas de Entradas y Salidas. Cada movimiento impacta automáticamente en el saldo general de la cuenta seleccionada.
- **Etiquetas Dinámicas (Categorías):** Flexibilidad para que el usuario invente sus propias etiquetas (Ej. "Alquiler", "Suscripciones", "Comida") personalizando colores específicos para clasificar sus operaciones.
- **Dashboard y Estadísticas:** 
  - Panel principal con visualización de los balances consolidados, diferenciados de forma automática por tipo de moneda.
  - Gráfico de torta que clasifica e ilustra cuánto dinero de los egresos totales (salidas) fue destinado a cada etiqueta/categoría.

## 💻 Instalación y Pruebas Locales

1. Asegúrate de tener **Node.js** y **MongoDB** instalados y ejecutándose localmente.
2. Clona el repositorio y ve a la carpeta `/backend`.
3. Ejecuta `npm install` para instalar todas las dependencias.
4. Crea un archivo `.env` en esa misma ruta definiendo tus variables (`MONGO_URI`, `JWT_SECRET`, etc.).
5. Levanta la API usando el comando `npm start` (o `node server.js`).
6. En otra terminal, levanta el frontend usando Live Server, o simplemente abre el archivo `/frontend/index.html` en tu navegador de preferencia.
