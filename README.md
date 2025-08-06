# Prueba_soft_secret

# 📄 Sistema de Gestión de Actas - Softsecret

![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

Sistema web Full Stack para **gestionar actas, compromisos y gestiones** en organizaciones.  
Desarrollado con **Django Rest Framework** (Backend) y **React + Vite** (Frontend).

---

## ✨ Características principales

| Módulo           | Funcionalidades                                                                 |
|------------------|---------------------------------------------------------------------------------|
| **Autenticación** | JWT Tokens, Control de roles (Admin/Usuario), Protección de rutas               |
| **Actas**        | Creación, Listado, Detalle con archivos adjuntos (PDF/JPG)                      |
| **Compromisos**  | Seguimiento de tareas asociadas a actas                                         |
| **Gestiones**    | Registro de acciones realizadas para cumplir compromisos                        |
| **Búsquedas**    | Filtros por estado, título, fecha y usuario responsable                         |

---

## 🚀 Tecnologías

### Backend (Django)
- Python 3.11+
- Django 5 & DRF
- JWT Authentication
- PostgreSQL / SQLite
- django-cors-headers

### Frontend (React)
- React 18 + Vite
- React Router DOM
- Axios para API calls
- Context API para estado global
- Tailwind CSS (opcional)

---
### Estructura 
actas-proyecto/
├── Backend_Django/
│ ├── documentos/ # App de actas y gestiones
│ ├── usuarios/ # Autenticación y usuarios
│ ├── backend/ # Configuración principal
│ ├── requirements.txt # Dependencias Python
│ └── manage.py
│
├── Frontend_React/
│ ├── src/
│ │ ├── api/ # Configuración Axios
│ │ ├── components/ # UI reutilizables
│ │ ├── context/ # Estado global
│ │ ├── pages/ # Vistas principales
│ │ ├── App.jsx # Router principal
│ │ └── main.jsx # Punto de entrada
│ └── package.json
└── README.md

## ⚡ Instalación rápida

### Requisitos previos
- Python 3.11+ y Node.js 18+
- PostgreSQL (opcional para producción)

```bash
# 1. Clonar repositorio
https://github.com/Skull-B/Prueba_soft_secret.git
cd actas-proyecto

# 2. Configurar backend
cd Backend_Django
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 4. Migrar base de datos
python manage.py migrate
python manage.py createsuperuser

# 5. Iniciar backend
python manage.py runserver

# 6. Configurar frontend (en otra terminal)
cd ../Frontend_React
npm install
npm run dev



