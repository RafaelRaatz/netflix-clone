import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import MovieRow from "./components/MovieRow";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-black text-white min-h-screen">
        <HeroBanner />

        <section className="space-y-10 p-4 md:p-8">
          <MovieRow title="Popular on Netflix" endpoint="/movie/popular" />
          <MovieRow title="Trending now" endpoint="/trending/all/week" />
          <MovieRow title="Best rated" endpoint="/movie/top_rated" />
        </section>
      </main>
    </>
  );
}
