import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'AED' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (aedAmount: number) => string;
  rate: number; // USD to AED ~3.67
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'AED',
  setCurrency: () => {},
  formatPrice: (aed) => `AED ${aed.toLocaleString()}`,
  rate: 3.67,
});

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('AED');
  const rate = 3.6725; // Standard pegged AED rate to USD

  const formatPrice = (aedAmount: number): string => {
    if (currency === 'USD') {
      const usd = Math.round(aedAmount / rate);
      return `$${usd.toLocaleString()}`;
    }
    return `AED ${aedAmount.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, rate }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
