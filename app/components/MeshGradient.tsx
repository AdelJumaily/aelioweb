'use client';

interface MeshGradientProps {
  colors?: string[];
  intensity?: number;
  opacity?: number;
}

export default function MeshGradient({
  colors = [
    '#0a0a0a',  // Dark base
    '#1d4ed8',  // blue
    '#1e3a8f',  // deep blue
    '#0f172a',  // Dark blue
    '#000000',  // Black
  ],
  intensity = 1,
  opacity = 1,
}: MeshGradientProps) {
  return (
    <div 
      className="mesh-gradient-container"
      style={{ 
        opacity,
        '--intensity': intensity.toString(),
      } as React.CSSProperties}
    >
      {/* Base color layer */}
      <div className="mesh-gradient-base" />
      
      {/* Layer 1 */}
      <div
        className="mesh-gradient-layer mesh-layer-1"
        style={{
          background: `
            radial-gradient(circle at 15% 20%, ${colors[1]} 0%, transparent 45%),
            radial-gradient(circle at 80% 70%, ${colors[2]} 0%, transparent 45%)
          `,
        }}
      />
      
      {/* Layer 2 */}
      <div
        className="mesh-gradient-layer mesh-layer-2"
        style={{
          background: `
            radial-gradient(circle at 10% 80%, ${colors[3]} 0%, transparent 40%),
            radial-gradient(circle at 90% 10%, ${colors[1]} 0%, transparent 45%)
          `,
        }}
      />
      
      {/* Layer 3 */}
      <div
        className="mesh-gradient-layer mesh-layer-3"
        style={{
          background: `
            radial-gradient(circle at 50% 0%, ${colors[2]} 0%, transparent 40%),
            radial-gradient(circle at 50% 100%, ${colors[4]} 0%, transparent 40%)
          `,
        }}
      />
    </div>
  );
}
