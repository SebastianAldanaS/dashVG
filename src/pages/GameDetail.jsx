import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGameDetails, getGameScreenshots } from '../api/games';
import LoadingSpinner from '../components/LoadingSpinner';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [gameData, screenshotsData] = await Promise.all([
          getGameDetails(id),
          getGameScreenshots(id)
        ]);

        setGame(gameData);
        setScreenshots(screenshotsData.results || []);
      } catch (err) {
        console.error('Error fetching game details:', err);
        setError('Error al cargar los detalles del juego.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGameData();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-500';
    if (rating >= 4.0) return 'text-blue-500';
    if (rating >= 3.5) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getMetacriticColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    if (score >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner size="xl" text="Cargando detalles del juego..." />
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Error al cargar el juego
            </h3>
            <p className="text-red-600 dark:text-red-400 mb-4">
              {error || 'No se pudo encontrar el juego solicitado.'}
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const allImages = [
    game.background_image,
    ...screenshots.map(screenshot => screenshot.image)
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
          >
            ← Volver a la lista de juegos
          </Link>
        </nav>

        {/* Header del juego */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            
            {/* Imagen principal */}
            <div className="md:w-1/2">
              {allImages.length > 0 && (
                <div>
                  <img
                    src={allImages[selectedImageIndex]}
                    alt={game.name}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                  
                  {/* Thumbnails de imágenes */}
                  {allImages.length > 1 && (
                    <div className="p-4">
                      <div className="flex space-x-2 overflow-x-auto">
                        {allImages.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all duration-200 ${
                              selectedImageIndex === index
                                ? 'border-blue-500 scale-105'
                                : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${game.name} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Información del juego */}
            <div className="md:w-1/2 p-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {game.name}
              </h1>

              {/* Rating y Metacritic */}
              <div className="flex items-center space-x-4 mb-6">
                {game.rating && (
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl">⭐</span>
                    <span className={`text-2xl font-bold ${getRatingColor(game.rating)}`}>
                      {game.rating.toFixed(1)}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      ({game.ratings_count} calificaciones)
                    </span>
                  </div>
                )}
                
                {game.metacritic && (
                  <div className={`px-3 py-1 rounded text-white font-bold ${getMetacriticColor(game.metacritic)}`}>
                    Metacritic: {game.metacritic}
                  </div>
                )}
              </div>

              {/* Información básica */}
              <div className="space-y-3 mb-6">
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Fecha de lanzamiento:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {formatDate(game.released)}
                  </span>
                </div>

                {game.developers && game.developers.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">Desarrollador:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {game.developers.map(dev => dev.name).join(', ')}
                    </span>
                  </div>
                )}

                {game.publishers && game.publishers.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">Editor:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {game.publishers.map(pub => pub.name).join(', ')}
                    </span>
                  </div>
                )}

                {game.esrb_rating && (
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">Clasificación ESRB:</span>
                    <span className="ml-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm">
                      {game.esrb_rating.name}
                    </span>
                  </div>
                )}
              </div>

              {/* Géneros */}
              {game.genres && game.genres.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Géneros:</h3>
                  <div className="flex flex-wrap gap-2">
                    {game.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Plataformas */}
              {game.platforms && game.platforms.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Plataformas:</h3>
                  <div className="flex flex-wrap gap-2">
                    {game.platforms.map((platform) => (
                      <span
                        key={platform.platform.id}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
                      >
                        {platform.platform.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Enlaces */}
              {(game.website || game.reddit_url || game.metacritic_url) && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Enlaces:</h3>
                  <div className="flex flex-wrap gap-2">
                    {game.website && (
                      <a
                        href={game.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-sm hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                      >
                        🌐 Sitio oficial
                      </a>
                    )}
                    {game.reddit_url && (
                      <a
                        href={game.reddit_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded text-sm hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
                      >
                        📱 Reddit
                      </a>
                    )}
                    {game.metacritic_url && (
                      <a
                        href={game.metacritic_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-sm hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
                      >
                        📊 Metacritic
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Descripción */}
        {game.description_raw && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Descripción
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {game.description_raw}
              </p>
            </div>
          </div>
        )}

        {/* Estadísticas adicionales */}
        {(game.added || game.playtime || game.achievements_count) && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Estadísticas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {game.added && (
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {game.added.toLocaleString()}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Usuarios que lo tienen
                  </div>
                </div>
              )}
              
              {game.playtime && (
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {game.playtime}h
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Tiempo de juego promedio
                  </div>
                </div>
              )}
              
              {game.achievements_count && (
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {game.achievements_count}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Logros disponibles
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetail;
