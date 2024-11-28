import { useState } from "react";
import fallbackImage from "../assets/images/fallback.webp";
import LoadingSpinner from "./LoadingSpinner";
import { DocumentType } from "../lib/constants";

type Props = DocumentType & {
  thumbnail: string;
};

function DocumentCard({ thumbnail, title }: Props) {
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoading(false);
    (e.target as HTMLImageElement).src = fallbackImage;
  };

  return (
    <div className="col-span-1 bg-white border rounded-lg shadow-lg overflow-hidden w-[200px]">
      <div className="relative">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <LoadingSpinner />
          </div>
        )}
        <img
          src={thumbnail}
          alt={title}
          className="h-40 w-full object-cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
    </div>
  );
}

export default DocumentCard;
