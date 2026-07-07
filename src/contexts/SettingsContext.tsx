import React, { createContext, useContext, useState, useEffect } from 'react';

type BackgroundType = 'image' | 'video' | 'gradient' | 'pattern' | 'none';

interface SettingsContextType {
  bgType: BackgroundType;
  bgValue: string;
  opacity: number;
  sidebarOpacity: number;
  cardOpacity: number;
  contentOpacity: number;
  setBgType: (type: BackgroundType) => void;
  setBgValue: (value: string) => void;
  setOpacity: (opacity: number) => void;
  setSidebarOpacity: (opacity: number) => void;
  setCardOpacity: (opacity: number) => void;
  setContentOpacity: (opacity: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [bgType, setBgType] = useState<BackgroundType>('image');
  const [bgValue, setBgValue] = useState('https://i.ibb.co/G47jTb1g/minimalist-white-background-3840x2160-bright-space-clean-aesthetic-27644.jpg');
  const [opacity, setOpacity] = useState(0.95);
  const [sidebarOpacity, setSidebarOpacity] = useState(1);
  const [cardOpacity, setCardOpacity] = useState(1);
  const [contentOpacity, setContentOpacity] = useState(1);

  useEffect(() => {
    const savedSettings = localStorage.getItem('appBackgroundSettings');
    if (savedSettings) {
      try {
        const { type, value, opacity: savedOpacity, sidebarOpacity: savedSidebarOpacity, cardOpacity: savedCardOpacity, contentOpacity: savedContentOpacity } = JSON.parse(savedSettings);
        if (type) setBgType(type as BackgroundType);
        if (value) setBgValue(value);
        if (savedOpacity !== undefined) setOpacity(savedOpacity);
        if (savedSidebarOpacity !== undefined) setSidebarOpacity(savedSidebarOpacity);
        if (savedCardOpacity !== undefined) setCardOpacity(savedCardOpacity);
        if (savedContentOpacity !== undefined) setContentOpacity(savedContentOpacity);
      } catch (e) {
        console.error('Failed to parse background settings', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appBackgroundSettings', JSON.stringify({
      type: bgType,
      value: bgValue,
      opacity: opacity,
      sidebarOpacity: sidebarOpacity,
      cardOpacity: cardOpacity,
      contentOpacity: contentOpacity
    }));

    // Update CSS variables on document root
    document.documentElement.style.setProperty('--sidebar-opacity', sidebarOpacity.toString());
    document.documentElement.style.setProperty('--card-opacity', cardOpacity.toString());
    document.documentElement.style.setProperty('--content-opacity', contentOpacity.toString());
    document.documentElement.style.setProperty('--main-opacity', opacity.toString());
  }, [bgType, bgValue, opacity, sidebarOpacity, cardOpacity, contentOpacity]);

  return (
    <SettingsContext.Provider value={{ bgType, bgValue, opacity, sidebarOpacity, cardOpacity, contentOpacity, setBgType, setBgValue, setOpacity, setSidebarOpacity, setCardOpacity, setContentOpacity }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
