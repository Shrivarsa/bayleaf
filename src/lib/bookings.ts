import { translations } from '../context/translations';

export const BOOKINGS_REOPEN_DATE = new Date('2026-06-22');

export function isBookingsClosed(): boolean {
  return new Date() < BOOKINGS_REOPEN_DATE;
}

export function getBookingsClosedMessage(language: 'en' | 'de'): string {
  return translations.bookings.closed[language];
}
