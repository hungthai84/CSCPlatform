import React, { createContext, useContext, useState, useEffect } from 'react';

type BackgroundType = 'image' | 'video' | 'gradient' | 'pattern' | 'none';

interface SettingsContextType {
  bgType: BackgroundType;
  bgValue: string;
  opacity: number;
  setBgType: (type: BackgroundType) => void;
  setBgValue: (value: string) => void;
  setOpacity: (opacity: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [bgType, setBgType] = useState<BackgroundType>('image');
  const [bgValue, setBgValue] = useState('https://i.ibb.co/G47jTb1g/minimalist-white-background-3840x2160-bright-space-clean-aesthetic-27644.jpg');
  const [opacity, setOpacity] = useState(0.95);

  useEffect(() => {
    const savedSettings = localStorage.getItem('appBackgroundSettings');
    if (savedSettings) {
      try {
        const { type, value, opacity: savedOpacity } = JSON.parse(savedSettings);
        if (type) setBgType(type as BackgroundType);
        if (value) setBgValue(value);
        if (savedOpacity !== undefined) setOpacity(savedOpacity);
      } catch (e) {
        console.error('Failed to parse background settings', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appBackgroundSettings', JSON.stringify({
      type: bgType,
      value: bgValue,
      opacity: opacity
    }));
  }, [bgType, bgValue, opacity]);

  return (
    <SettingsContext.Provider value={{ bgType, bgValue, opacity, setBgType, setBgValue, setOpacity }}>
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
