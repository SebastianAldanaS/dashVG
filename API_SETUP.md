# 🔑 Configuración de API Key - RAWG.io

Para que la aplicación funcione correctamente, necesitas configurar tu API key de RAWG.io.

## Pasos para obtener tu API key:

1. **Visita RAWG.io**
   - Ve a: https://rawg.io/apidocs
   - Haz clic en "Get API Key"

2. **Crear cuenta**
   - Regístrate con tu email
   - Confirma tu cuenta por email

3. **Obtener API Key**
   - Inicia sesión en RAWG.io
   - Ve a tu perfil → API
   - Copia tu API Key

## Configurar en el proyecto:

1. **Editar archivo .env**
   ```bash
   # Abre el archivo .env en la raíz del proyecto
   # Reemplaza "your_api_key_here" con tu API key real
   VITE_RAWG_API_KEY=tu_api_key_aqui
   ```

2. **Reiniciar servidor**
   ```bash
   # Detén el servidor (Ctrl+C) y vuelve a ejecutar:
   npm run dev
   ```

## ⚠️ Importante:

- ✅ La API key es **GRATUITA**
- ✅ Límite: 20,000 requests por mes
- ✅ El archivo `.env` está en `.gitignore` (no se sube a GitHub)
- ❌ **NUNCA** subas tu API key a repositorios públicos

## 🧪 Verificar que funciona:

1. Ejecuta `npm run dev`
2. Abre http://localhost:5174
3. Deberías ver juegos cargándose en la página principal
4. Si ves "Error al cargar videojuegos", revisa tu API key

## 🔧 Troubleshooting:

- **Error de API**: Verifica que la API key esté correcta
- **Sin juegos**: Verifica tu conexión a internet
- **CORS Error**: La API de RAWG permite todos los orígenes, no debería haber problemas

---

¡Una vez configurada la API key, ya puedes explorar más de 500,000 videojuegos! 🎮
