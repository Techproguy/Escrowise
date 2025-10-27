import React from "react";

export interface AnnotationCanvasProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

/**
 * Placeholder AnnotationCanvas component. Replace with your actual implementation.
 */
export const AnnotationCanvas: React.FC<AnnotationCanvasProps> = ({ width = 400, height = 300, style }) => {
  return (
    <div
      style={{
        border: "1px dashed #ccc",
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fafafa",
        ...style,
      }}
      data-placeholder="annotation-canvas"
    >
      <span style={{ color: "#aaa" }}>Annotation Canvas Placeholder</span>
    </div>
  );
};
