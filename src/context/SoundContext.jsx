// src/context/SoundContext.js
import React, { createContext, useContext } from "react";
import useSound from "use-sound";

const SoundContext = createContext();

export const useSoundContext = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  const newOrderSoundUrl = "https://res.cloudinary.com/dajlabmrb/video/upload/v1724931153/orderCreateAndRejectAudio_dg1rle.mp3";
  const [playNewOrder] = useSound(newOrderSoundUrl);
  const newNotificationSoundUrl = "https://res.cloudinary.com/dajlabmrb/video/upload/v1724931165/46ffbafd-37e2-403e-92ed-b56edd5df42e-Notification_sound_gyz5ux.mp3";
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


