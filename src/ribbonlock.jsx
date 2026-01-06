import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Box } from "@mantine/core";

export default function RibbonLock({ isLocked, onUnlockRequest, onUnwrapComplete, }) {
  /* ============================
     🎛 Animation Controllers
  ============================ */
  const verticalTopCtrl = useAnimation();
  const verticalBottomCtrl = useAnimation();
  const horizontalLeftCtrl = useAnimation();
  const horizontalRightCtrl = useAnimation();
  const bowCtrl = useAnimation();
  const [bowGone, setBowGone] = useState(false);


  /* ============================
     🎬 Cinematic Unlock Sequence
  ============================ */
  useEffect(() => {
    if (!isLocked) {
      (async () => {
        /* 1️⃣ Bow absorbs tension */
        await bowCtrl.start({
          scale: 0.94,
          rotate: -4,
          transition: {
            type: "spring",
            stiffness: 160,
            damping: 14,
          },
        });

        /* 2️⃣ Bow loosens, sinks, and dissolves */
        await bowCtrl.start({
          scale: 0.6,
          rotate: -10,
          y: 36,
          opacity: 0,
          filter: "blur(6px)",
          transition: {
            duration: 0.6,
            ease: "easeInOut",
          },
        });

        /* 2️⃣½ Remove bow completely */
        setBowGone(true);
        await Promise.all([
              /* 3️⃣ Ribbons slide outward with weight */
              verticalTopCtrl.start({
                y: "-120%",
                transition: {
                  type: "spring",
                  stiffness: 90,
                  damping: 22,
                  mass: 1.2,
                },
              }),

              verticalBottomCtrl.start({
                y: "120%",
                transition: {
                  type: "spring",
                  stiffness: 90,
                  damping: 22,
                  mass: 1.2,
                },
              }),

              horizontalLeftCtrl.start({
                x: "-120%",
                transition: {
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                  mass: 1.3,
                },
              }),

              horizontalRightCtrl.start({
                x: "120%",
                transition: {
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                  mass: 1.3,
                },
              }),
            ]);
      /* 4️⃣ Ceremony complete — notify parent */
onUnwrapComplete?.();
      })();
    }
  }, [isLocked]);

  /* ============================
     🧱 Overlay Container
  ============================ */
  return (
    <Box
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 6,
        pointerEvents: isLocked ? "auto" : "none",
      }}
    >
      {/* ============================
          🎀 RIBBONS
      ============================ */}

      {/* Vertical Ribbon – TOP */}
      <motion.div
        animate={verticalTopCtrl}
        initial={{ y: 0 }}
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          height: "50%",
          width: 46,
          transform: "translateX(-50%)",
          background:
            "linear-gradient(to right, #f6a5c6, #ffd1e6, #f6a5c6)",
          zIndex: 6,
        }}
      />

      {/* Vertical Ribbon – BOTTOM */}
      <motion.div
        animate={verticalBottomCtrl}
        initial={{ y: 0 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          height: "50%",
          width: 46,
          transform: "translateX(-50%)",
          background:
            "linear-gradient(to right, #f6a5c6, #ffd1e6, #f6a5c6)",
          zIndex: 6,
        }}
      />

      {/* Horizontal Ribbon – LEFT */}
      <motion.div
        animate={horizontalLeftCtrl}
        initial={{ x: 0 }}
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          width: "50%",
          height: 42,
          transform: "translateY(-50%)",
          background:
            "linear-gradient(to bottom, #f6a5c6, #ffd1e6, #f6a5c6)",
          zIndex: 6,
        }}
      />

      {/* Horizontal Ribbon – RIGHT */}
      <motion.div
        animate={horizontalRightCtrl}
        initial={{ x: 0 }}
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          width: "50%",
          height: 42,
          transform: "translateY(-50%)",
          background:
            "linear-gradient(to bottom, #f6a5c6, #ffd1e6, #f6a5c6)",
          zIndex: 6,
        }}
      />

      {/* ============================
          🎀 BOW
      ============================ */}
      {!bowGone &&(
      <motion.div
        animate={bowCtrl}
        initial={{ scale: 1, rotate: 0, y: 0, opacity: 1, }}
        onClick={onUnlockRequest}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          position: "absolute",
          top: "44%",
          left: "40%",
          transform: "translate(-50%, -50%)",
          width: 140,
          height: 110,
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        {/* Left loop */}
        <Box
          style={{
            position: "absolute",
            left: 0,
            top: 24,
            width: 72,
            height: 62,
            borderRadius: "50% 55% 45% 50%",
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), #f3a2c2 70%)",
            transform: "rotate(-18deg)",
          }}
        />

        {/* Right loop */}
        <Box
          style={{
            position: "absolute",
            right: 0,
            top: 24,
            width: 72,
            height: 62,
            borderRadius: "55% 50% 50% 45%",
            background:
              "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.9), #f3a2c2 70%)",
            transform: "rotate(18deg)",
          }}
        />

        {/* Knot */}
        <Box
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 30,
            height: 30,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, #fff, #e88bb6)",
          }}
        />
      </motion.div>
      )}

      {/* ============================
          ✨ Soft Glow
      ============================ */}
      <Box
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(255,200,230,0.25), transparent 60%)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}
