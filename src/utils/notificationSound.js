import { useCallback } from "react";
import useSound from "use-sound";

const useNewOrderPlayer = () => {
  const sound =
    "https://res.cloudinary.com/dajlabmrb/video/upload/v1724139152/jsjyjv3dh1hfjtrhmd4z.mp3";
  const [play] = useSound(sound);

  return play();
};

const useNewNotificationPlayer = () => {
  const [play, { stop }] = useSound(
    "https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2F46ffbafd-37e2-403e-92ed-b56edd5df42e-Notification_sound.mp3?alt=media&token=965c379e-3321-4bdf-a37f-e6e1a61e7b48"
  );

  const playSound = useCallback(() => {
    play();
  }, [play]);

  const stopSound = useCallback(() => {
    stop();
  }, [stop]);

  return { playSound, stopSound };
};

export { useNewOrderPlayer, useNewNotificationPlayer };
// import { useCallback } from "react";
// import useSound from "use-sound";

// const useNewOrderPlayer = () => {
//   const [play, { stop, loaded, playing, error }] = useSound(
//     "https://res.cloudinary.com/dajlabmrb/video/upload/v1724139152/jsjyjv3dh1hfjtrhmd4z.mp3",
//     { volume: 1 }
//   );

//   const playSound = useCallback(() => {
//     if (loaded && !playing) {
//       console.log("Playing new order sound");
//       play();
//     } else if (error) {
//       console.error("Error playing sound:", error);
//     } else {
//       console.log("Sound is either already playing or not loaded");
//     }
//   }, [play, loaded, playing, error]);

//   const stopSound = useCallback(() => {
//     stop();
//     console.log("Stopped new order sound");
//   }, [stop]);

//   return { playSound, stopSound };
// };

// // const useNewNotificationPlayer = () => {
// //   const [play, { stop, loaded, playing, error }] = useSound(
// //     "https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2F46ffbafd-37e2-403e-92ed-b56edd5df42e-Notification_sound.mp3?alt=media&token=965c379e-3321-4bdf-a37f-e6e1a61e7b48",
// //     { volume: 1 }
// //   );

// //   const playSound = useCallback(() => {
// //     if (loaded && !playing) {
// //       console.log("Playing new notification sound");
// //       play();
// //     } else if (error) {
// //       console.error("Error playing sound:", error);
// //     } else {
// //       console.log("Sound is either already playing or not loaded");
// //     }
// //   }, [play, loaded, playing, error]);

// //   const stopSound = useCallback(() => {
// //     stop();
// //     console.log("Stopped notification sound");
// //   }, [stop]);

// //   return { playSound, stopSound };
// // };

// export { useNewOrderPlayer,
//     //  useNewNotificationPlayer
//     };
