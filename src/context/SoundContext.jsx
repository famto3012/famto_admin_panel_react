// src/context/SoundContext.js
import React, { createContext, useContext } from "react";
import useSound from "use-sound";

const SoundContext = createContext();

export const useSoundContext = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  const newOrderSoundUrl = "https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2Fde324d69-40f8-45bc-ba4a-199cad051e9f-Order_created_rejected_admin_merchant_notification.mp3?alt=media&token=3612b14d-c6ec-4e8e-abe3-1382d47dc784";
  const [playNewOrder] = useSound(newOrderSoundUrl);
  const newNotificationSoundUrl = "https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2F46ffbafd-37e2-403e-92ed-b56edd5df42e-Notification_sound.mp3?alt=media&token=965c379e-3321-4bdf-a37f-e6e1a61e7b48";
  const [playNewNotification] = useSound(newNotificationSoundUrl);

  const playNewOrderNotificationSound = () => {
    playNewOrder(); 
  };
  const playNewNotificationSound = () => {
    playNewNotification(); 
  };

  return (
    <SoundContext.Provider value={{ playNewOrderNotificationSound, playNewNotificationSound }}>
      {children}
    </SoundContext.Provider>
  );
};


