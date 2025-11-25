# Botica NovaSalud – Sistema Administrativo FullStack

Este proyecto es un **sistema administrativo profesional para una botica**, desarrollado con:

- **Backend:** Node.js + Express + MySQL
- **Frontend:** React + Vite + TailwindCSS
- **JWT**: Autenticación segura
- **Dashboard** con reportes, gráficos y estadísticas
- **Módulos completos:** Productos, Ventas, Inventario, Reportes, Usuarios

---

## Características principales

### Autenticación JWT

- Login seguro
- Protección de rutas
- Roles: administrador

### Gestión de Productos (CRUD completo)

- Crear / editar / eliminar productos
- Validaciones avanzadas
- Control de stock mínimo
- Semáforo de stock (Crítico / Bajo / Óptimo)

### Registro de Ventas

- Carrito dinámico
- Actualización automática de stock
- Registro de detalles por venta

### Reportes profesionales

- Ventas totales
- Ventas por fecha
- Top productos más vendidos
- Inventario general
- Dashboard con gráficos (Line, Bar, Doughnut)

### Perfil del usuario

- Ver datos
- Cambiar contraseña
- Avatar dinámico

---

## Estructura del proyecto

```
proyecto-botica/
│── backend/
│   ├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── package.json
│
│── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── layout/
│   ├── services/
│   ├── package.json
│
└── README.md
```

---

## Instalación y ejecución

### Backend

```
cd backend
npm install
npm run dev
```

Renombrar `.env.example` a `.env` y rellenar:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu-clave
DB_NAME=botica_db
JWT_SECRET=botica@2025
```

---

### Frontend

```
cd frontend
npm install
npm run dev
```

Archivo `.env`:

```
VITE_API_URL=http://localhost:4000/api
```

---

## Base de datos

Ejecutar este script para crear la base de datos:

```sql
CREATE DATABASE IF NOT EXISTS botica_db;

USE botica_db;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(255),
  rol VARCHAR(20)
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150),
  laboratorio VARCHAR(100),
  precio DECIMAL(10,2),
  stock INT,
  stock_minimo INT
);

CREATE TABLE ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2)
);

CREATE TABLE detalle_ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  venta_id INT,
  producto_id INT,
  cantidad INT
);
```

---

## Dashboard

Incluye:

- Gráfico de ventas por día
- Top productos
- Inventario (Doughnut)
- Tarjetas con estadísticas
- Animaciones premium + Loader profesional

---

## Despliegue

### Backend

Compatible con:

- Render
- Railway
- CleverCloud

### Frontend

Compatible con:

- Vercel (recomendado)
- Netlify

---

## Autor

**Onik Orosco**  
FullStack Developer & AI Builder

---

## Licencia

Uso académico / personal.

---
