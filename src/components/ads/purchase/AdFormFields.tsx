import { AdTypeSelect } from "@/components/ads/AdTypeSelect";
import { LocationSelect } from "@/components/ads/LocationSelect";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdType } from "@/pages/Ads";

interface AdFormFieldsProps {
  adType: AdType | "all";
  setAdType: (value: AdType | "all") => void;
  title: string;
  setTitle: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  selectedFile: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AdFormFields = ({
  adType,
  setAdType,
  title,
  setTitle,
  location,
  setLocation,
  description,
  setDescription,
  selectedFile,
  onFileChange,
}: AdFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <AdTypeSelect value={adType} onChange={setAdType} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-modelboard-gray border-modelboard-gray"
          placeholder="Enter your ad title"
        />
      </div>

      <div className="space-y-2">
        <LocationSelect
          value={location}
          onChange={setLocation}
          defaultLocation=""
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-modelboard-gray border-modelboard-gray"
          rows={3}
          placeholder="Describe what you're looking for"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Ad Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="bg-modelboard-gray border-modelboard-gray file:bg-modelboard-red file:text-white file:border-0 file:rounded-md hover:file:bg-red-600 transition-colors cursor-pointer"
        />
        {selectedFile && (
          <p className="text-sm text-gray-400 mt-1">
            Selected: {selectedFile.name}
          </p>
        )}
      </div>
    </div>
  );
};