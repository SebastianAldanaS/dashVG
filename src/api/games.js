import apiClient from './client';

// Obtener juegos populares con filtros opcionales
export const getGames = async (params = {}) => {
  try {
    const response = await apiClient.get('/games', {
      params: {
        page_size: 20,
        ordering: '-rating',
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching games: ' + error.message);
  }
};

// Buscar juegos por nombre
export const searchGames = async (query, params = {}) => {
  try {
    const response = await apiClient.get('/games', {
      params: {
        search: query,
        page_size: 20,
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error searching games: ' + error.message);
  }
};

// Obtener detalles de un juego específico
export const getGameDetails = async (id) => {
  try {
    const response = await apiClient.get(`/games/${id}`, {
      params: {
        // Aunque RAWG no tiene traducción automática, esto puede ayudar con algunos metadatos
        locale: 'es-ES',
        language: 'es'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching game details: ' + error.message);
  }
};

// Obtener screenshots de un juego
export const getGameScreenshots = async (id) => {
  try {
    const response = await apiClient.get(`/games/${id}/screenshots`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching game screenshots: ' + error.message);
  }
};

// Obtener géneros disponibles
export const getGenres = async () => {
  try {
    const response = await apiClient.get('/genres');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching genres: ' + error.message);
  }
};

// Obtener plataformas disponibles
export const getPlatforms = async () => {
  try {
    const response = await apiClient.get('/platforms');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching platforms: ' + error.message);
  }
};

// Obtener juegos por género para estadísticas
export const getGamesByGenre = async () => {
  try {
    const genres = await getGenres();
    const gamesByGenre = [];
    
    for (const genre of genres.results.slice(0, 10)) { // Solo los primeros 10 géneros
      const games = await getGames({ genres: genre.id, page_size: 5 });
      gamesByGenre.push({
        name: genre.name,
        count: games.count,
        games: games.results,
      });
    }
    
    return gamesByGenre;
  } catch (error) {
    throw new Error('Error fetching games by genre: ' + error.message);
  }
};

// Obtener una muestra más grande de juegos para análisis detallado
export const getGamesForAnalysis = async () => {
  try {
    const response = await apiClient.get('/games', {
      params: {
        page_size: 200, // Muestra más grande
        ordering: '-rating',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching games for analysis: ' + error.message);
  }
};
