import { useState, useEffect } from 'react';
import { getGames, searchGames } from '../api/games';
import GameCard from '../components/GameCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Función para cargar juegos
  const loadGames = async (isNewSearch = false, pageNumber = 1) => {
    try {
      if (isNewSearch) {
        setLoading(true);
        setGames([]);
        setCurrentPage(1);
      } else if (pageNumber > 1) {
        setLoadingMore(true);
      }

      setError(null);

      let data;
      const params = {
        ...filters,
        page: pageNumber,
        page_size: 20,
      };

      if (searchQuery.trim()) {
        data = await searchGames(searchQuery, params);
      } else {
        data = await getGames(params);
      }

      const newGames = data.results || [];
      
      if (isNewSearch || pageNumber === 1) {
        setGames(newGames);
      } else {
        setGames(prevGames => [...prevGames, ...newGames]);
      }

      setHasNextPage(!!data.next);
      setCurrentPage(pageNumber);

    } catch (err) {
      console.error('Error loading games:', err);
      setError('Error al cargar los videojuegos. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Cargar juegos iniciales
  useEffect(() => {
    loadGames(true);
  }, []);

  // Recargar cuando cambian los filtros
  useEffect(() => {
    if (!loading) {
      loadGames(true);
    }
  }, [filters]);

  // Manejar búsqueda
  const handleSearch = (query) => {
    setSearchQuery(query);
    loadGames(true);
  };

  // Manejar cambio de filtros
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Cargar más juegos
  const loadMoreGames = () => {
    if (hasNextPage && !loadingMore) {
      loadGames(false, currentPage + 1);
    }
  };

  // Función para limpiar búsqueda
  const clearSearch = () => {
    setSearchQuery('');
    setFilters({});
    loadGames(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner size="xl" text="Cargando videojuegos..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Descubre Videojuegos Increíbles
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explora una amplia colección de videojuegos, desde los más populares hasta las últimas novedades.
            Busca, filtra y descubre tu próximo juego favorito.
          </p>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Buscar videojuegos por nombre..."
          />
        </div>

        {/* Filtros */}
        <Filters 
          onFilterChange={handleFilterChange}
          currentFilters={filters}
        />

        {/* Resultados */}
        {error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center mb-8">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              ¡Oops! Algo salió mal
            </h3>
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={() => loadGames(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Intentar de nuevo
            </button>
          </div>
        ) : (
          <>
            {/* Info de resultados */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {searchQuery ? `Resultados para "${searchQuery}"` : 'Juegos Populares'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {games.length} juegos encontrados
                </p>
              </div>
              
              {(searchQuery || Object.keys(filters).length > 0) && (
                <button
                  onClick={clearSearch}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            {/* Grid de juegos */}
            {games.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {games.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>

                {/* Botón cargar más */}
                {hasNextPage && (
                  <div className="text-center">
                    <button
                      onClick={loadMoreGames}
                      disabled={loadingMore}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed"
                    >
                      {loadingMore ? (
                        <span className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          <span>Cargando...</span>
                        </span>
                      ) : (
                        'Cargar más juegos'
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No se encontraron juegos
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Intenta ajustar tus filtros o términos de búsqueda
                </p>
                <button
                  onClick={clearSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Ver todos los juegos
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
