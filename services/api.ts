export const TMDB_Config = () => {
  return {
    baseUrl: "https://api.themoviedb.org/3",
    apiKey: process.env.EXPO_PUBLIC_TMDB_API_KEY,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_BEARER}`,
    },
  };
};


export const fetchMovies = async ({ query }: { query?: string }) => {
  const { baseUrl, apiKey } = TMDB_Config();

  const url = query
    ? `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
    : `${baseUrl}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;

  const res = await fetch(url); // ← بدون headers
  const json = await res.json();

  const { results } = json;
  if (!results) throw new Error("No results found");

  return results;
};
export const fetchMovieDetails = async (id: string | number) => {
  const { baseUrl, apiKey } = TMDB_Config();

  if (!id) throw new Error("Movie ID is required");

  const url = `${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`;

  const res = await fetch(url); 
  const data = await res.json();

  if (res.status !== 200) {
    console.error("Failed to fetch movie details:", data);
    throw new Error(data.status_message || "Something went wrong");
  }

  return data;
};
