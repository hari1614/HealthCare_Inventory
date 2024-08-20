// utils/dateUtils.js

import { format, parseISO } from 'date-fns';

// Convert ISO date to 'yyyy-MM-dd' format
export const formatDateToYYYYMMDD = (isoDate) => {
  const date = parseISO(isoDate);
  return format(date, 'yyyy-MM-dd');
};

// Convert 'yyyy-MM-dd' format to ISO format
export const parseDateToISO = (dateString) => {
  const [year, month, day] = dateString.split('-');
  return new Date(year, month - 1, day).toISOString();
};


// Utility function to format date to YYYY-MM-DD
export const formatDateToInputValue = (isoDate) => {
    if (!isoDate) return ''; // Handle empty or invalid date
    const dateObj = new Date(isoDate);
    return isNaN(dateObj.getTime()) ? '' : dateObj.toISOString().split('T')[0];
  };
  