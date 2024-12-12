import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NetworkFiltersProps {
  onFilterChange: (filter: string) => void;
  onLocationSearch: (location: string) => void;
}

export const NetworkFilters = ({ onFilterChange, onLocationSearch }: NetworkFiltersProps) => {
  const [activeFilter, setActiveFilter] = useState("location");
  const [searchLocation, setSearchLocation] = useState("");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onLocationSearch(searchLocation);
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeFilter === "location" ? "default" : "outline"}
          onClick={() => handleFilterClick("location")}
          className="hover:text-white"
        >
          Actual Location
        </Button>
        <Button
          variant={activeFilter === "online" ? "default" : "outline"}
          onClick={() => handleFilterClick("online")}
          className="hover:text-white"
        >
          Online Now
        </Button>
        <Button
          variant={activeFilter === "creators" ? "default" : "outline"}
          onClick={() => handleFilterClick("creators")}
          className="hover:text-white"
        >
          Content Creators
        </Button>
        <Button
          variant={activeFilter === "producers" ? "default" : "outline"}
          onClick={() => handleFilterClick("producers")}
          className="hover:text-white"
        >
          Indie Producers
        </Button>
        <Button
          variant={activeFilter === "studios" ? "default" : "outline"}
          onClick={() => handleFilterClick("studios")}
          className="hover:text-white"
        >
          Studio Executives
        </Button>
      </div>
      
      <form onSubmit={handleLocationSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search by location (e.g., Paris, London, New York)"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="bg-modelboard-gray border-modelboard-gray text-white pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        <Button type="submit" className="bg-modelboard-red hover:bg-red-600 text-white">
          Search
        </Button>
      </form>
    </div>
  );
};