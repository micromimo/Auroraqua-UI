import { useState, useEffect, useCallback } from 'react';
import tinycolor from 'tinycolor2';

const WCAG_THRESHOLD = 4.5;
const LIGHT_TEXT = '#ffffff';
const DARK_TEXT = '#334155';
const TRANSITION_DURATION = 200;

export function useContrastColor(targetRef) {
  const [textColor, setTextColor] = useState(DARK_TEXT);
  const [isLightText, setIsLightText] = useState(false);

  const calculateContrastColor = useCallback((bgColor) => {
    const color = tinycolor(bgColor);
    
    if (!color.isValid()) {
      return DARK_TEXT;
    }

    const brightness = color.getBrightness();
    const lightContrast = tinycolor.readability(color, LIGHT_TEXT);
    const darkContrast = tinycolor.readability(color, DARK_TEXT);

    if (lightContrast >= WCAG_THRESHOLD && darkContrast >= WCAG_THRESHOLD) {
      return brightness < 128 ? LIGHT_TEXT : DARK_TEXT;
    }

    return lightContrast >= WCAG_THRESHOLD ? LIGHT_TEXT : DARK_TEXT;
  }, []);

  const extractBackgroundColor = useCallback((element) => {
    if (!element) return null;

    const computedStyle = window.getComputedStyle(element);
    const bgColor = computedStyle.backgroundColor;

    if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
      const parent = element.parentElement;
      if (parent) {
        return extractBackgroundColor(parent);
      }
      return null;
    }

    return bgColor;
  }, []);

  useEffect(() => {
    if (!targetRef || !targetRef.current) return;

    const updateColor = () => {
      const bgColor = extractBackgroundColor(targetRef.current);
      
      if (bgColor) {
        const newColor = calculateContrastColor(bgColor);
        const newIsLight = newColor === LIGHT_TEXT;
        
        if (newColor !== textColor) {
          setTextColor(newColor);
          setIsLightText(newIsLight);
        }
      }
    };

    updateColor();

    const observer = new MutationObserver(updateColor);
    observer.observe(targetRef.current, {
      attributes: true,
      attributeFilter: ['style', 'class'],
      subtree: false,
    });

    return () => {
      observer.disconnect();
    };
  }, [targetRef, calculateContrastColor, extractBackgroundColor, textColor]);

  return {
    textColor,
    isLightText,
    style: {
      color: textColor,
      transition: `color ${TRANSITION_DURATION}ms ease-in-out`,
    },
  };
}

export function getContrastColor(bgColor) {
  const color = tinycolor(bgColor);
  
  if (!color.isValid()) {
    return DARK_TEXT;
  }

  const lightContrast = tinycolor.readability(color, LIGHT_TEXT);
  const darkContrast = tinycolor.readability(color, DARK_TEXT);

  if (lightContrast >= WCAG_THRESHOLD && darkContrast >= WCAG_THRESHOLD) {
    return color.getBrightness() < 128 ? LIGHT_TEXT : DARK_TEXT;
  }

  return lightContrast >= WCAG_THRESHOLD ? LIGHT_TEXT : DARK_TEXT;
}