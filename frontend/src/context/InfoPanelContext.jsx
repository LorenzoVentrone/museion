'use client'

import React, { createContext, useContext, useState, useCallback } from 'react';

const InfoPanelContext = createContext(null);

export function InfoPanelProvider({ children }) {
  const [panelInfo, setPanelInfo] = useState({
    isOpen: false,
    title: '',
    content: null,
    photos: [],
  });
  const [cameraShift, setCameraShift] = useState(0);

  const openPanel = useCallback((title, content, photos = []) => {
    setPanelInfo({
      isOpen: true,
      title,
      content,
      photos
    });
    setCameraShift(-2); // You can adjust this value
  }, []);

  const closePanel = useCallback(() => {
    setPanelInfo({
      isOpen: false,
      title: '',
      content: null,
    });
    setCameraShift(0);
  }, []);

  return (
    <InfoPanelContext.Provider value={{ panelInfo, openPanel, closePanel, cameraShift }}>
      {children}
    </InfoPanelContext.Provider>
  );
}

export const useInfoPanel = () => {
  const context = useContext(InfoPanelContext);
  if (!context) {
    throw new Error('useInfoPanel must be used within an InfoPanelProvider');
  }
  return context;
};
