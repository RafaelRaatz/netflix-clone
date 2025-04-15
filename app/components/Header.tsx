"use client";
import { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-500 ${
        scrolled ? "bg-black/90 backdrop-blur-md" : "bg-black/70"
      }`}
    >
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-bold text-red-600">Netflix</h1>

        <nav className="hidden md:flex gap-6 text-white text-sm font-medium">
          <a href="#">Início</a>
          <a href="#">Séries</a>
          <a href="#">Filmes</a>
          <a href="#">Bombando</a>
          <a href="#">Minha Lista</a>
        </nav>

        <div className="flex items-center gap-4 text-white">
          <Search className="w-5 h-5 cursor-pointer" />
          <Bell className="w-5 h-5 cursor-pointer" />
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
        </div>
      </div>
    </header>
  );
}
