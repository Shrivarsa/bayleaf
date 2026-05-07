import React, { useState, useEffect } from 'react';
import './VideoPopup.css';

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

  // Check if the file is a video based on extension
  const isVideo = /\.(mp4|webm|ogg)$/i.test(imageUrl);

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
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    }
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
          aria-label={isVideo ? "Close video" : "Close image"}
        >
          ×
        </button>
        <div className="video-wrapper">
          {isVideo ? (
            <video
              src={imageUrl}
              className="popup-video"
              controls
              autoPlay
              loop
              muted
              style={{ maxWidth: '100%', maxHeight: '80vh', display: 'block', margin: '0 auto' }}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={imageUrl}
              alt={alt}
              className="popup-video"
              style={{ maxWidth: '100%', maxHeight: '80vh', display: 'block', margin: '0 auto' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;