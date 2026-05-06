import React, { useState, useCallback } from 'react';
import './TapIndicator.css';

let tapId = 0;

export default function TapIndicator({ children }) {
  const [taps, setTaps] = useState([]);

  const handlePointerDown = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = ++tapId;

    setTaps((prev) => [...prev, { id, x, y }]);

    setTimeout(() => {
      setTaps((prev) => prev.filter((t) => t.id !== id));
    }, 500);
  }, []);

  return (
    <div className="tap-indicator-container" onPointerDown={handlePointerDown}>
      {children}
      {taps.map((tap) => (
        <span
          key={tap.id}
          className="tap-indicator-circle"
          style={{ left: tap.x, top: tap.y }}
        />
      ))}
    </div>
  );
}
