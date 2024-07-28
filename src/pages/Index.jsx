import HackerNews from "../components/HackerNews";

const Index = () => {
  return (
    <div className="bg-orange-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-orange-700">Hacker News Top 100 Stories</h1>
        <HackerNews />
      </div>
    </div>
  );
};

export default Index;
