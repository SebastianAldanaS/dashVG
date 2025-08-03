# 🚀 Guía de Despliegue en Vercel

## Preparación del Proyecto

Tu proyecto GameDash está completamente preparado para Vercel. Sigue estos pasos:

### 1. 📤 Subir a GitHub

```bash
# Inicializar git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "feat: GameDash - Dashboard de videojuegos completo"

# Agregar remote de tu repositorio en GitHub
git remote add origin https://github.com/tu-usuario/tu-repositorio.git

# Push al repositorio
git push -u origin main
```

### 2. 🌐 Desplegar en Vercel

#### Opción A: Desde la Web (Recomendado)
1. Ve a [vercel.com](https://vercel.com)
2. Haz login con GitHub
3. Click en "New Project"
4. Selecciona tu repositorio `dashVG`
5. Vercel detectará automáticamente que es un proyecto Vite
6. Click "Deploy"

#### Opción B: Desde CLI
```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Hacer deploy
vercel

# Seguir las instrucciones
```

### 3. 🔑 Configurar API Key

Una vez desplegado:

1. **En Vercel Dashboard:**
   - Ve a tu proyecto
   - Settings → Environment Variables
   - Add New:
     - **Name**: `VITE_RAWG_API_KEY`
     - **Value**: [Tu API key de RAWG]
     - **Environments**: Production, Preview, Development

2. **Obtener API Key:**
   - Registrarte en [rawg.io/apidocs](https://rawg.io/apidocs)
   - Es gratis y te da 20,000 requests/mes

3. **Redeploy:**
   - Después de agregar la variable, redeploy el proyecto
   - Vercel → Project → Deployments → tres puntos → Redeploy

### 4. ✅ Verificar Funcionamiento

- Tu app estará disponible en `https://tu-proyecto.vercel.app`
- Si no configuraste la API key, verás una pantalla de instrucciones
- Una vez configurada, podrás explorar más de 500,000 videojuegos

## 🎯 URLs de Ejemplo

- **Demo**: `https://gamedash-demo.vercel.app`
- **Repo**: `https://github.com/tu-usuario/dashVG`

## 📋 Checklist Final

- [ ] Código subido a GitHub
- [ ] Proyecto desplegado en Vercel  
- [ ] API key configurada en variables de entorno
- [ ] Redeploy realizado
- [ ] App funcionando correctamente

¡Tu dashboard profesional de videojuegos estará listo para mostrar en tu portafolio! 🎮
