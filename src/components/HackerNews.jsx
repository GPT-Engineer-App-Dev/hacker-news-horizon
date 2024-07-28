import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const fetchStories = async () => {
  const response = await fetch(
    "https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=100"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const HackerNews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["hackerNewsStories"],
    queryFn: fetchStories,
  });

  const filteredStories = data?.hits.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <Input
        type="text"
        placeholder="Search stories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-4">
          {filteredStories?.map((story) => (
            <li key={story.objectID} className="border-b pb-4">
              <h2 className="text-xl font-semibold">{story.title}</h2>
              <p className="text-sm text-gray-500">
                {story.points} points | by {story.author}
              </p>
              <Button
                variant="link"
                className="p-0 h-auto"
                asChild
              >
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  Read More
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HackerNews;
