# Dashboard de Videojuegos - GameDash

Un dashboard moderno y responsivo para explorar videojuegos usando la API de RAWG.io, construido con React, Vite y Tailwind CSS.

## 🚀 Características

- **Exploración de Juegos**: Lista paginada de videojuegos populares
- **Búsqueda Avanzada**: Busca juegos por nombre con resultados en tiempo real
- **Filtros Inteligentes**: Filtra por género, plataforma y ordenamiento
- **Detalles Completos**: Página de detalles con información completa del juego
- **Dashboard Estadístico**: Gráficas interactivas con estadísticas de juegos
- **Modo Oscuro**: Soporte completo para tema claro y oscuro
- **Diseño Responsivo**: Optimizado para móvil, tablet y desktop
- **Performance**: Carga lazy de imágenes y paginación optimizada

## 🛠️ Tecnologías Utilizadas

- **React 18** - Librería de interfaz de usuario
- **Vite** - Build tool y desarrollo rápido
- **React Router Dom** - Navegación entre páginas
- **Tailwind CSS** - Framework de estilos utilitarios
- **Axios** - Cliente HTTP para API calls
- **Recharts** - Librería de gráficas para React
- **RAWG API** - API pública de videojuegos

## 📋 Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- API Key de RAWG.io (gratuita)

## ⚙️ Instalación

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Configurar API Key (después del despliegue)**
   - El proyecto debe estar desplegado en Vercel para obtener la API key
   - Obtén tu API key gratuita en [RAWG.io API](https://rawg.io/apidocs)
   - En Vercel, ve a tu proyecto → Settings → Environment Variables
   - Agrega: `VITE_RAWG_API_KEY` con tu API key

3. **Desarrollo local (temporal sin API)**
   ```bash
   npm run dev
   ```

4. **Construir para producción**
   ```bash
   npm run build
   ```

## 🚀 Despliegue en Vercel

### Opción 1: Deploy directo desde GitHub
1. Haz push de tu código a GitHub
2. Conecta tu repositorio en [vercel.com](https://vercel.com)
3. Vercel detectará automáticamente que es un proyecto Vite
4. El despliegue será automático

### Opción 2: Deploy desde CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Seguir las instrucciones en pantalla
```

### Configurar Variables de Entorno en Vercel:
1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega:
   - **Name**: `VITE_RAWG_API_KEY`
   - **Value**: Tu API key de RAWG
   - **Environment**: Production, Preview, Development

## 📁 Estructura del Proyecto

```
src/
├── api/              # Funciones para consultar la API
│   ├── client.js     # Cliente Axios configurado
│   └── games.js      # Endpoints específicos de juegos
├── components/       # Componentes reutilizables
│   ├── Dashboard.jsx # Gráficas y estadísticas
│   ├── Filters.jsx   # Filtros de búsqueda
│   ├── GameCard.jsx  # Tarjeta de juego
│   ├── LoadingSpinner.jsx # Indicador de carga
│   ├── Navbar.jsx    # Barra de navegación
│   └── SearchBar.jsx # Barra de búsqueda
├── pages/            # Páginas principales
│   ├── DashboardPage.jsx # Página del dashboard
│   ├── GameDetail.jsx    # Detalles del juego
│   └── Home.jsx          # Página principal
├── App.jsx          # Configuración de rutas
├── main.jsx         # Punto de entrada
└── index.css        # Estilos base con Tailwind
```

## 🎯 Funcionalidades Implementadas

### Página Principal (Home)
- ✅ Lista de juegos populares con paginación
- ✅ Buscador por nombre en tiempo real
- ✅ Filtros por género, plataforma y ordenamiento
- ✅ Cards con información esencial de cada juego
- ✅ Navegación a detalles del juego

### Página de Detalles
- ✅ Información completa del juego
- ✅ Galería de screenshots
- ✅ Datos de desarrollador, publisher, clasificación
- ✅ Enlaces externos (sitio oficial, Reddit, Metacritic)
- ✅ Descripción completa
- ✅ Estadísticas de usuario

### Dashboard Estadístico
- ✅ Gráfica de barras: Juegos por género
- ✅ Gráfica de pastel: Distribución por plataformas
- ✅ Gráfica de líneas: Distribución de calificaciones
- ✅ Tarjetas con estadísticas generales

### Características Generales
- ✅ Modo oscuro/claro con persistencia
- ✅ Diseño totalmente responsivo
- ✅ Manejo de errores y estados de carga
- ✅ Navegación fluida con React Router
- ✅ Optimización de performance

**¡Disfruta explorando el mundo de los videojuegos! 🎮**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
