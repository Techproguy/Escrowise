import React, { useRef, useState } from "react";

interface ImageAnnotatorProps {
  imageUrl: string;
  onSave: (dataUrl: string) => void;
}

const ImageAnnotator: React.FC<ImageAnnotatorProps> = ({ imageUrl, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<{x: number, y: number} | null>(null);

  const startDrawing = (e: React.MouseEvent) => {
    setDrawing(true);
    const rect = canvasRef.current!.getBoundingClientRect();
    setLastPoint({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const draw = (e: React.MouseEvent) => {
    if (!drawing || !lastPoint) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const ctx = canvasRef.current!.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#F97316";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    setLastPoint({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const stopDrawing = () => {
    setDrawing(false);
    setLastPoint(null);
  };

  const handleSave = () => {
    if (canvasRef.current) {
      onSave(canvasRef.current.toDataURL());
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <img
          src={imageUrl}
          alt="To annotate"
          className="rounded border mb-2"
          style={{ maxWidth: 350, maxHeight: 350 }}
          onLoad={e => {
            const img = e.currentTarget;
            const canvas = canvasRef.current;
            if (canvas) {
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext("2d");
              if (ctx) {
                ctx.drawImage(img, 0, 0, img.width, img.height);
              }
            }
          }}
        />
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "auto" }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
      <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded" onClick={handleSave}>
        Save Annotation
      </button>
    </div>
  );
};

export default ImageAnnotator;
