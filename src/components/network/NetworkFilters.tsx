import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NetworkFiltersProps {
  onFilterChange: (filter: string) => void;
  onLocationSearch: (location: string) => void;
  onGenderFilter: (gender: string) => void;
  onNicheTagFilter: (tag: string) => void;
}

export const NetworkFilters = ({ 
  onFilterChange, 
  onLocationSearch,
  onGenderFilter,
  onNicheTagFilter 
}: NetworkFiltersProps) => {
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

  const commonNicheTags = [
    "Glamour", "Fetish", "Cosplay", "Alternative", "Artistic", "Fashion"
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <Button
          variant={activeFilter === "location" ? "default" : "outline"}
          onClick={() => handleFilterClick("location")}
          className="hover:text-white"
        >
          Browse by Location
        </Button>
        <Button
          variant={activeFilter === "online" ? "default" : "outline"}
          onClick={() => handleFilterClick("online")}
          className="hover:text-white"
        >
          Online Now
        </Button>
        <Button
          variant={activeFilter === "premium" ? "default" : "outline"}
          onClick={() => handleFilterClick("premium")}
          className="hover:text-white"
        >
          Premium Members
        </Button>

        <Select onValueChange={onGenderFilter}>
          <SelectTrigger className="w-[180px] bg-modelboard-gray border-modelboard-gray text-white">
            <SelectValue placeholder="Filter by Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="non-binary">Non-Binary</SelectItem>
            <SelectItem value="transgender">Transgender</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onNicheTagFilter}>
          <SelectTrigger className="w-[180px] bg-modelboard-gray border-modelboard-gray text-white">
            <SelectValue placeholder="Filter by Niche" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Niches</SelectItem>
            {commonNicheTags.map(tag => (
              <SelectItem key={tag} value={tag.toLowerCase()}>{tag}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <form onSubmit={handleLocationSearch} className="flex gap-2 flex-1 max-w-md">
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
    </div>
  );
};