import { useEffect } from 'react';
import { useBackground } from '../context/BackgroundContext';

export default function DynamicStyles() {
  const { getCssVariables } = useBackground();
  const cssVariables = getCssVariables();

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(cssVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    return () => {
      Object.keys(cssVariables).forEach(key => {
        root.style.removeProperty(key);
      });
    };
  }, [cssVariables]);

  return null;
}