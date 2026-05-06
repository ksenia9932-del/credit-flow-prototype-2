import { useEffect, useRef } from 'react';
import './BottomSheet.css';

function BottomSheet({ isOpen, onClose, title, children }) {
  const sheetRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;
    if (diff > 0 && sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${diff}px)`;
    }
  };

  const handleTouchEnd = () => {
    const diff = currentY.current - startY.current;
    if (diff > 100) {
      onClose();
    }
    if (sheetRef.current) {
      sheetRef.current.style.transform = '';
    }
    startY.current = 0;
    currentY.current = 0;
  };

  if (!isOpen) return null;

  return (
    <div className="bottom-sheet-overlay" onClick={onClose}>
      <div
        className="bottom-sheet"
        ref={sheetRef}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="bottom-sheet__handle-area">
          <div className="bottom-sheet__handle" />
        </div>
        {title && <h2 className="bottom-sheet__title">{title}</h2>}
        <div className="bottom-sheet__content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default BottomSheet;
