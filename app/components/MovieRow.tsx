"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MovieRowProps {
  title: string;
  endpoint: string;
}

export default function MovieRow({ title, endpoint }: MovieRowProps) {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3${endpoint}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []));
  }, [endpoint]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -clientWidth : clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group">
      <h2 className="text-2xl font-semibold mb-2 px-2">{title}</h2>

      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full hidden group-hover:block"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-scroll no-scrollbar space-x-4 px-2"
      >
        {movies.map((movie: any) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg w-40 hover:scale-105 transition"
          />
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full hidden group-hover:block"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
