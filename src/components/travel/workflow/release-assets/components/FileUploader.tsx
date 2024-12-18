import { Upload } from "lucide-react";

interface FileUploaderProps {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept: string;
  disabled?: boolean;
  label: string;
}

export const FileUploader = ({ onFileSelect, accept, disabled, label }: FileUploaderProps) => {
  return (
    <div className="flex items-center justify-center w-full">
      <label className="w-full">
        <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-modelboard-red/20 border-dashed rounded-lg cursor-pointer bg-modelboard-dark/50 hover:bg-modelboard-red/5 transition-colors">
          <Upload className="w-8 h-8 text-modelboard-red mb-2" />
          <p className="text-sm text-gray-400">Click to {label}</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept={accept}
          onChange={onFileSelect}
          disabled={disabled}
        />
      </label>
    </div>
  );
};