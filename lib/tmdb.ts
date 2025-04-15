const API_URL = "https://api.themoviedb.org/3";

export async function fetchTrendingMovies() {
  const res = await fetch(
    `${API_URL}/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch trending movies");

  return res.json();
}
