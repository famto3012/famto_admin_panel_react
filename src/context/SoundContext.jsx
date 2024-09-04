// src/context/SoundContext.js
import React, { createContext, useContext, useState } from "react";
import useSound from "use-sound";

const SoundContext = createContext();

export const useSoundContext = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
 
  // const [playNewOrder] = newOrderSoundUrl;
 

  const playNewOrderNotificationSound = () => {
    const newOrderSoundUrl = new Audio("https://res.cloudinary.com/dajlabmrb/video/upload/v1724931153/orderCreateAndRejectAudio_dg1rle.mp3");
    newOrderSoundUrl.play(); 
  };
  const playNewNotificationSound = () => {
    const playNewNotification = new Audio("https://res.cloudinary.com/dajlabmrb/video/upload/v1724931165/46ffbafd-37e2-403e-92ed-b56edd5df42e-Notification_sound_gyz5ux.mp3");
   playNewNotification.play(); 
  };
  const [showBadge, setShowBadge] = useState(false);

  return (
    <SoundContext.Provider value={{ playNewOrderNotificationSound, playNewNotificationSound , setShowBadge, showBadge}}>
      {children}
    </SoundContext.Provider>
  );
};


