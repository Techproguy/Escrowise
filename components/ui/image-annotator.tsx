import React from 'react';

interface ImageAnnotatorProps {
  imageUrl: string;
  onSave: (dataUrl: string) => void;
}

export default function ImageAnnotator({ imageUrl, onSave }: ImageAnnotatorProps) {
  const handleSave = () => {
    onSave(imageUrl);
  };

  return (
    <div className="relative">
      <img src={imageUrl} alt="Item" className="w-full max-w-lg rounded-lg" />
      <button
        onClick={handleSave}
        className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
}
