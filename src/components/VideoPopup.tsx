import React, { useState, useRef, useEffect } from 'react';
import './VideoPopup.css';

interface VideoPopupProps {
  videoUrl: string;
  isOpen: boolean;
  onClose: () => void;
  autoPlay?: boolean;
}

const VideoPopup: React.FC<VideoPopupProps> = ({ 
  videoUrl, 
  isOpen, 
  onClose, 
  autoPlay = true 
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
      // Auto-play video after animation starts
      setTimeout(() => {
        if (videoRef.current && autoPlay) {
          videoRef.current.play();
        }
      }, 200);
    } else if (shouldRender) {
      // Start closing animation
      setIsClosing(true);
      // Remove from DOM after animation completes
      setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 300);
    }
  }, [isOpen, autoPlay, shouldRender]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
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
          aria-label="Close video"
        >
          ×
        </button>
        <div className="video-wrapper">
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            autoPlay={autoPlay}
            muted // Required for autoplay in most browsers
            className="popup-video"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoPopup;
