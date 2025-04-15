"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroBanner() {
  const [movies, setMovies] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const data = await res.json();
      setMovies(data.results || []);
    };

    fetchFeatured();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, 15000);

    return () => clearInterval(interval);
  }, [movies]);

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + movies.length) % movies.length);
      setFade(true);
    }, 200);
  };

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % movies.length);
      setFade(true);
    }, 200);
  };

  const movie = movies[index];
  if (!movie?.backdrop_path) return null;

  return (
    <div className="relative h-[75vh] w-full overflow-hidden text-white">
      <div
        key={movie.id}
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex items-end px-8 pb-12 max-w-3xl transition-opacity duration-500">
        <div>
          <h1 className="text-5xl font-bold mb-4">
            {movie.title || movie.name}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
            <span className="bg-white text-black px-2 py-0.5 text-xs font-bold rounded">
              HD
            </span>
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span>{movie.release_date?.slice(0, 4)}</span>
          </div>

          <p className="text-sm text-gray-200 line-clamp-4 mb-4">
            {movie.overview}
          </p>

          <div className="mt-4 flex gap-4">
            <button className="bg-white text-black px-5 py-2 rounded hover:bg-gray-200 text-sm font-semibold">
              ▶ Assistir
            </button>
            <button className="bg-zinc-700/80 px-5 py-2 rounded hover:bg-zinc-600 text-sm font-semibold">
              ℹ️ Mais informações
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
