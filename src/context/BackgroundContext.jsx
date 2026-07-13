import { createContext, useContext, useState, useEffect } from 'react';
import { backgroundSchemes, defaultScheme, getSchemeById } from '../config/backgroundSchemes';

const BackgroundContext = createContext(null);

const COOKIE_NAME = 'auroraqua_background';
const COOKIE_EXPIRE_DAYS = 365;

const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};${expires};path=/;SameSite=Lax`;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    try {
      return JSON.parse(decodeURIComponent(parts.pop().split(';').shift()));
    } catch {
      return null;
    }
  }
  return null;
};

export function BackgroundProvider({ children }) {
  const [currentScheme, setCurrentScheme] = useState(() => {
    const saved = getCookie(COOKIE_NAME);
    if (saved && saved.schemeId && backgroundSchemes[saved.schemeId]) {
      return {
        scheme: getSchemeById(saved.schemeId),
        customCss: saved.customCss || '',
      };
    }
    return {
      scheme: getSchemeById(defaultScheme),
      customCss: '',
    };
  });

  useEffect(() => {
    const cookieValue = {
      schemeId: currentScheme.scheme.id,
      customCss: currentScheme.customCss,
    };
    setCookie(COOKIE_NAME, cookieValue, COOKIE_EXPIRE_DAYS);
  }, [currentScheme]);

  const changeScheme = (schemeId) => {
    if (backgroundSchemes[schemeId]) {
      setCurrentScheme(prev => ({
        scheme: getSchemeById(schemeId),
        customCss: prev.customCss,
      }));
    }
  };

  const setCustomCss = (customCss) => {
    setCurrentScheme(prev => ({
      ...prev,
      customCss,
    }));
  };

  const resetToDefault = () => {
    setCurrentScheme({
      scheme: getSchemeById(defaultScheme),
      customCss: '',
    });
  };

  const getBackgroundStyle = () => {
    if (currentScheme.customCss) {
      try {
        const style = {};
        const cssParts = currentScheme.customCss.split(';');
        cssParts.forEach(part => {
          const [key, value] = part.split(':').map(s => s.trim());
          if (key && value) {
            const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            style[camelKey] = value;
          }
        });
        return style;
      } catch {
        return { background: currentScheme.scheme.background };
      }
    }
    return { background: currentScheme.scheme.background };
  };

  const getCssVariables = () => {
    const scheme = currentScheme.scheme;
    const textColors = scheme.textColors || {};
    return {
      '--bg-primary': scheme.background,
      '--color-primary': scheme.primaryColor,
      '--color-secondary': scheme.secondaryColor,
      '--color-accent': scheme.accentColor,
      '--color-neutral-50': scheme.neutralColors?.[50] || '#faf5ff',
      '--color-neutral-100': scheme.neutralColors?.[100] || '#f3e8ff',
      '--color-neutral-200': scheme.neutralColors?.[200] || '#e9d5ff',
      '--color-neutral-300': scheme.neutralColors?.[300] || '#d8b4fe',
      '--color-neutral-400': scheme.neutralColors?.[400] || '#c084fc',
      '--color-neutral-500': scheme.neutralColors?.[500] || '#a855f7',
      '--color-neutral-600': scheme.neutralColors?.[600] || '#9333ea',
      '--color-neutral-700': scheme.neutralColors?.[700] || '#7e22ce',
      '--color-neutral-800': scheme.neutralColors?.[800] || '#6b21a8',
      '--color-neutral-900': scheme.neutralColors?.[900] || '#581c87',
      '--text-heading': textColors.heading || '#1e1b4b',
      '--text-body': textColors.body || '#312e81',
      '--text-secondary': textColors.secondary || '#6366f1',
      '--text-muted': textColors.muted || '#818cf8',
      '--text-glass-heading': textColors.glassHeading || '#1e1b4b',
      '--text-glass-body': textColors.glassBody || '#312e81',
      '--text-glass-muted': textColors.glassMuted || '#6366f1',
      '--is-dark': scheme.isDark ? 'true' : 'false',
    };
  };

  return (
    <BackgroundContext.Provider
      value={{
        currentScheme,
        changeScheme,
        setCustomCss,
        resetToDefault,
        getBackgroundStyle,
        getCssVariables,
        schemes: Object.values(backgroundSchemes),
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
}