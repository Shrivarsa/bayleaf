import React, { useState, useEffect } from 'react';
import './VideoPopup.css'; // You can reuse the same CSS for popup styling

interface ImagePopupProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
  alt?: string;
}

const ImagePopup: React.FC<ImagePopupProps> = ({
  imageUrl,
  isOpen,
  onClose,
  alt = ''
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 300);
    }
  }, [isOpen, shouldRender]);

  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`video-popup-overlay ${isClosing ? 'closing' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className={`video-popup-container ${isClosing ? 'closing' : ''}`}>
        <button
          className="video-popup-close"
          onClick={handleClose}
          aria-label="Close image"
        >
          ×
        </button>
        <div className="video-wrapper">
          <img
            src={imageUrl}
            alt={alt}
            className="popup-video"
            style={{ maxWidth: '100%', maxHeight: '80vh', display: 'block', margin: '0 auto' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;