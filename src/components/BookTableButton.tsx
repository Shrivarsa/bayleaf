import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { useLanguage } from '../context/LanguageContext';
import { getBookingsClosedMessage, isBookingsClosed } from '../lib/bookings';

interface BookTableButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  scrollTo?: string;
  offset?: number;
  duration?: number;
  onAfterClick?: () => void;
  /** On mobile, anchor tooltip to the left (for left-aligned buttons like hero). */
  mobileTooltipAlign?: 'start' | 'end';
}

const BookTableButton: React.FC<BookTableButtonProps> = ({
  children,
  className = '',
  style,
  scrollTo = 'contact-us',
  offset = -80,
  duration = 500,
  onAfterClick,
  mobileTooltipAlign = 'end',
}) => {
  const { language } = useLanguage();
  const [showClosedNotice, setShowClosedNotice] = useState(false);

  const showClosedMessage = () => {
    setShowClosedNotice(true);
    window.setTimeout(() => setShowClosedNotice(false), 5000);
    onAfterClick?.();
  };

  if (isBookingsClosed()) {
    return (
      <div className="relative inline-block w-full sm:w-auto">
        <button
          type="button"
          className={`${className} opacity-60 cursor-not-allowed`}
          style={style}
          onClick={showClosedMessage}
          aria-disabled="true"
        >
          {children}
        </button>
        {showClosedNotice && (
          <p
            role="status"
            className={`book-closed-tooltip absolute top-full z-50 mt-2 w-max max-w-[min(280px,calc(100vw-2rem))] rounded-md bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900 border border-amber-200 shadow-sm text-left ${
              mobileTooltipAlign === 'start'
                ? 'right-0 max-sm:left-0 max-sm:right-auto'
                : 'right-0'
            }`}
          >
            {getBookingsClosedMessage(language)}
          </p>
        )}
      </div>
    );
  }

  return (
    <Link
      to={scrollTo}
      spy={true}
      smooth={true}
      offset={offset}
      duration={duration}
      className={className}
      style={style}
      onClick={onAfterClick}
    >
      {children}
    </Link>
  );
};

export default BookTableButton;
