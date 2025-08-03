import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  // Función para formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Función para obtener el color del rating
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-500';
    if (rating >= 4.0) return 'text-blue-500';
    if (rating >= 3.5) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Imagen del juego */}
      <div className="relative">
        <img
          src={game.background_image || '/placeholder-game.jpg'}
          alt={game.name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        {game.rating && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded">
            <span className={`font-bold ${getRatingColor(game.rating)}`}>
              ⭐ {game.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {game.name}
        </h3>

        {/* Fecha de lanzamiento */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          📅 {formatDate(game.released)}
        </p>

        {/* Géneros */}
        {game.genres && game.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {game.genres.slice(0, 3).map((genre) => (
              <span
                key={genre.id}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        {/* Plataformas */}
        {game.platforms && game.platforms.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {game.platforms.slice(0, 4).map((platform) => (
              <span
                key={platform.platform.id}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
              >
                {platform.platform.name}
              </span>
            ))}
          </div>
        )}

        {/* Metacritic score */}
        {game.metacritic && (
          <div className="mb-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Metacritic: 
              <span className={`ml-1 font-bold ${
                game.metacritic >= 80 ? 'text-green-500' :
                game.metacritic >= 70 ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {game.metacritic}
              </span>
            </span>
          </div>
        )}

        {/* Botón para ver detalles */}
        <Link
          to={`/game/${game.id}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
