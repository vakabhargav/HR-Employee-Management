// Currency conversion utilities
const USD_TO_INR_RATE = 83.5; // Approximate exchange rate

// Format currency in INR
export const formatINR = (amount) => {
  // Convert USD to INR if needed
  const inrAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  const convertedAmount = inrAmount * USD_TO_INR_RATE;
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(convertedAmount);
};

// Format currency in USD (for reference)
export const formatUSD = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Convert USD amount to INR
export const convertToINR = (usdAmount) => {
  return usdAmount * USD_TO_INR_RATE;
};

// Format number in Indian numbering system (lakhs, crores)
export const formatIndianNumber = (number) => {
  const absNumber = Math.abs(number);
  
  if (absNumber >= 10000000) { // 1 Crore
    return (number / 10000000).toFixed(2) + ' Cr';
  } else if (absNumber >= 100000) { // 1 Lakh
    return (number / 100000).toFixed(2) + ' L';
  } else if (absNumber >= 1000) { // 1 Thousand
    return (number / 1000).toFixed(2) + ' K';
  }
  
  return number.toString();
};

export default {
  formatINR,
  formatUSD,
  convertToINR,
  formatIndianNumber
};