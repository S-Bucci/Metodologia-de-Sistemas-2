import { useState, useEffect } from 'react';

const STORAGE_KEY = 'package_prices';

export const usePriceChanges = (packages) => {
  const [priceChanges, setPriceChanges] = useState([]);

  useEffect(() => {
    if (!packages || packages.length === 0) return;

    // Obtener precios guardados
    const savedPrices = localStorage.getItem(STORAGE_KEY);
    const previousPrices = savedPrices ? JSON.parse(savedPrices) : {};

    // Detectar cambios
    const changes = [];
    const currentPrices = {};

    packages.forEach(pkg => {
      currentPrices[pkg.id] = {
        price: parseFloat(pkg.price),
        title: pkg.title
      };

      const previousPrice = previousPrices[pkg.id]?.price;
      const currentPrice = parseFloat(pkg.price);

      if (previousPrice && previousPrice !== currentPrice) {
        changes.push({
          id: pkg.id,
          title: pkg.title,
          oldPrice: previousPrice,
          newPrice: currentPrice
        });
      }
    });

    // Guardar precios actuales
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPrices));

    // Mostrar cambios si existen
    if (changes.length > 0) {
      setPriceChanges(changes);
    }
  }, [packages]);

  const dismissChanges = () => {
    setPriceChanges([]);
  };

  return { priceChanges, dismissChanges };
};