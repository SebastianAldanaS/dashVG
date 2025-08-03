const ApiKeyMissing = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">🔑</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          API Key Requerida
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Para usar GameDash necesitas configurar tu API key de RAWG.io en las variables de entorno.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Si estás en Vercel:
          </h3>
          <ol className="text-sm text-blue-700 dark:text-blue-300 text-left space-y-1">
            <li>1. Ve a Project → Settings → Environment Variables</li>
            <li>2. Agrega: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">VITE_RAWG_API_KEY</code></li>
            <li>3. Redeploy el proyecto</li>
          </ol>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Obtener API Key:
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            Regístrate gratis en{' '}
            <a 
              href="https://rawg.io/apidocs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-green-900 dark:hover:text-green-100"
            >
              rawg.io/apidocs
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyMissing;
