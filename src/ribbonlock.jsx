import React from "react";
import { motion } from "framer-motion";
import { Box, Text } from "@mantine/core";

export default function RibbonLock({ isLocked, onUnlockRequest }) {
    const verticalRibbon = {
        locked: { x: "-50%", opacity: 1 },
        unlocked: {
          x: "-120%",
          opacity: 0,
          transition: { duration: 1.2, ease: "easeInOut" },
        },
      };
      
      const horizontalRibbon = {
        locked: { y: "-50%", opacity: 1 },
        unlocked: {
          y: "-120%",
          opacity: 0,
          transition: { duration: 1.2, ease: "easeInOut" },
        },
      };
      
      const bow = {
        locked: { scale: 1, opacity: 1 },
        unlocked: {
          scale: 0.3,
          opacity: 0,
          transition: { duration: 0.8 },
        },
      };
      
  return (
    <Box
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 999,
        pointerEvents: isLocked ? "auto" : "none",
      }}
    >
      {/* Vertical ribbon */}
      <motion.div
      variants={verticalRibbon}
      animate={isLocked ? "locked" : "unlocked"}
        layout
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: 46,
          transform: "translateX(-50%)",
          background: `
            linear-gradient(
              to right,
              #f6a5c6,
              #ffd1e6,
              #f6a5c6
            )
          `,
          boxShadow: `
            inset -2px 0 4px rgba(255,255,255,0.6),
            inset 2px 0 6px rgba(180,80,130,0.4)
          `,
        }}
      />

      {/* Horizontal ribbon */}
      <motion.div
      variants={horizontalRibbon}
      animate={isLocked ? "locked" : "unlocked"}
        layout
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: 42,
          transform: "translateY(-50%)",
          background: `
            linear-gradient(
              to bottom,
              #f6a5c6,
              #ffd1e6,
              #f6a5c6
            )
          `,
          boxShadow: `
            inset 0 -2px 4px rgba(255,255,255,0.6),
            inset 0 2px 6px rgba(180,80,130,0.4)
          `,
        }}
      />

      {/* 🎀 Realistic Bow */}
<motion.div
  variants={bow}
  animate={isLocked ? "locked" : "unlocked"}
  onClick={onUnlockRequest}
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.96 }}
  style={{
    position: "absolute",
    top: "44%",
    left: "40%",
    transform: "translate3d(-46%, -46%, 0)",
    width: 140,
    height: 110,
    cursor: "pointer",
    zIndex: 10,
  }}
>
  {/* LEFT PETAL */}
  <Box
    style={{
      position: "absolute",
      left: 0,
      top: 24,
      width: 72,
      height: 62,
      borderRadius: "50% 55% 45% 50%",
      background: `
        radial-gradient(
          circle at 30% 30%,
          rgba(255,255,255,0.85),
          rgba(255,210,230,0.95) 35%,
          #f3a2c2 70%
        )
      `,
      transform: "rotate(-18deg)",
      boxShadow: `
        0 6px 14px rgba(200,80,140,0.28),
        inset 4px 0 6px rgba(255,255,255,0.6),
        inset -4px 0 8px rgba(180,80,130,0.35)
      `,
    }}
  />

  {/* RIGHT PETAL */}
  <Box
    style={{
      position: "absolute",
      right: 0,
      top: 24,
      width: 72,
      height: 62,
      borderRadius: "55% 50% 50% 45%",
      background: `
        radial-gradient(
          circle at 70% 30%,
          rgba(255,255,255,0.85),
          rgba(255,210,230,0.95) 35%,
          #f3a2c2 70%
        )
      `,
      transform: "rotate(18deg)",
      boxShadow: `
        0 6px 14px rgba(200,80,140,0.28),
        inset -4px 0 6px rgba(255,255,255,0.6),
        inset 4px 0 8px rgba(180,80,130,0.35)
      `,
    }}
  />

  {/* INNER FOLD SHADOW (depth illusion) */}
  <Box
    style={{
      position: "absolute",
      top: 38,
      left: "50%",
      transform: "translateX(-50%)",
      width: 90,
      height: 20,
      background:
        "radial-gradient(ellipse at center, rgba(0,0,0,0.18), transparent 70%)",
      filter: "blur(6px)",
      opacity: 0.45,
    }}
  />

  {/* KNOT */}
  <Box
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      width: 30,
      height: 30,
      borderRadius: "50%",
      background: `
        radial-gradient(
          circle at 35% 35%,
          rgba(255,255,255,0.9),
          #ffbdd8 55%,
          #e88bb6
        )
      `,
      boxShadow: `
        0 4px 10px rgba(200,80,140,0.45),
        inset 0 2px 4px rgba(255,255,255,0.75),
        inset 0 -2px 4px rgba(160,60,110,0.35)
      `,
    }}
  />

  {/* MICRO HIGHLIGHT (silk reflection) */}
  <Box
    style={{
      position: "absolute",
      top: 44,
      left: "50%",
      transform: "translateX(-50%) rotate(-8deg)",
      width: 36,
      height: 2,
      background: "rgba(255,255,255,0.65)",
      filter: "blur(1px)",
      opacity: 0.7,
    }}
  />
</motion.div>

      {/* Soft glow */}
      <Box
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(255,200,230,0.25), transparent 60%)",
          pointerEvents: isLocked ? "auto" : "none",
        }}
      />
    </Box>
  );
}
