import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { MantineProvider, Container, ActionIcon, Group, Center, Box } from '@mantine/core';
import { IconChevronLeft, IconChevronRight, IconHeartFilled } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import Page from './memories.jsx';
import { memories } from './memories.js';
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";


export default function MemoryBook() {
  const book = useRef();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [darkMode, setDarkMode] = useState(false);
 
  return (
    <Box style={{
      background: "rgba(255, 240, 245, 0.15)",
      backdropFilter: "blur(6px)",
      borderRadius: 16,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      padding: 40,
      width: "100%",
      position: "relative",
    }}>
      <AnimatePresence>
        {darkMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              position: "fixed",
              inset: 0,
              background:
                "radial-gradient(circle at center, rgba(0,0,0,0.4), rgba(0,0,0,0.95))",
              zIndex: 5,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating Heart Background */}
      <div style={{ position: 'absolute', top: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <motion.div
            animate={{ y: [0, -1000], opacity: [0, 1, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ position: 'absolute', left: '10%', bottom: 0 }}
          >
            <IconHeartFilled size={40} color="#FFD1DC" />
          </motion.div>
      </div>

      <Center h="100vh">
      <Box style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <Container>
        {darkMode && (
  <Box
    style={{
      position: "absolute",
      inset: -12, // tighter to the book
      pointerEvents: "none",
      zIndex: 6,
    }}
  >
    {[...Array(24)].map((_, i) => {
      const lampsPerEdge = 6;
      const edge = Math.floor(i / lampsPerEdge); // 0 top, 1 right, 2 bottom, 3 left
      const indexOnEdge = i % lampsPerEdge;

      const groupIndex = Math.floor(indexOnEdge / 3);
      const lampIndex = indexOnEdge % 3;

      let stylePosition = {};

      // 🔝 Top edge
      if (edge === 0) {
        stylePosition = {
          top: 4,
          left: `${8 + indexOnEdge * 11}%`,
        };
      }

      // 👉 Right edge
      if (edge === 1) {
        stylePosition = {
          right: 200,
          top: `${10 + indexOnEdge * 13}%`,
        };
      }

      // 🔻 Bottom edge
      if (edge === 2) {
        stylePosition = {
          bottom: 80,
          left: `${8 + indexOnEdge * 11}%`,
        };
      }

      // 👈 Left edge
      if (edge === 3) {
        stylePosition = {
          left: 20,
          top: `${10 + indexOnEdge * 13}%`,
        };
      }

      return (
        <motion.div
          key={i}
          animate={{
            opacity: [0.15, 0.9, 0.15],
            scale: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: lampIndex + groupIndex * 0.2,
          }}
          style={{
            position: "absolute",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "rgb(255, 220, 160)",
            boxShadow: `
              0 0 6px rgba(255,220,160,0.8),
              0 0 14px rgba(255,210,130,0.55)
            `,
            ...stylePosition,
          }}
        />
      );
    })}
  </Box>
)}


          {darkMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{
                position: "absolute",
                top: "50%",
                left: "40%",
                transform: "translate(-50%, -65%)",
                width: 500,
                height: 500,
                background:
                  "radial-gradient(ellipse at center, rgba(255,230,180,0.55), rgba(255,230,180,0.2), transparent)",
                filter: "blur(12px)",
                zIndex: 6,
                pointerEvents: "none",
              }}
            />
          )}
          <HTMLFlipBook
            width={isMobile ? 300 : 400}
            height={isMobile ? 460 : 550}
            size="fixed"
            minWidth={315}
            maxWidth={900}
            minHeight={420}
            maxHeight={1200}
            maxShadowOpacity={0.35}
            showCover={true}
            mobileScrollSupport={true}
            disableFlipByClick={isMobile}
            drawShadow={true}
            flippingTime={900}        // smoother flip
            usePortrait={true}
            startZIndex={0}
            ref={book}
          >
            {/* Cover Page */}
            <Page memory={{ color: '#FFF0F3' }} isCover={true} />
            
            {/* Content Pages */}
            {memories.map((m) => (
              <Page key={m.id} memory={m} />
            ))}

            {/* End Page */}
            <Page memory={{ title: "To be continued...", story: "Every day is a new page with you.", color: '#F3F0FF' }} />
          </HTMLFlipBook>

          {/* Navigation Controls */}
          <Group justify="center" mt="xl">
            <ActionIcon 
              variant="subtle" 
              color="pink" 
              size="xl" 
              radius="xl"
              onClick={() => book.current?.pageFlip()?.flipPrev()}
            >
              <IconChevronLeft size={30} />
            </ActionIcon>

            <motion.div
  whileHover={{ scale: 1.2 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => setDarkMode((prev) => !prev)}
  style={{ cursor: "pointer" }}
>
  <IconHeartFilled
    size={40}
    color={darkMode ? "#000000" : "#F06595"}
  />
</motion.div>


            <ActionIcon 
              variant="subtle" 
              color="pink" 
              size="xl" 
              radius="xl"
              onClick={() => book.current.pageFlip().flipNext()}
            >
              <IconChevronRight size={30} />
            </ActionIcon>
          </Group>
        </Container>
        {/* 🧸 Teddy Pencil */}
    {!isMobile && (
      <Box
        style={{
          marginLeft: 60,
          pointerEvents: "none",
        }}
      >
        <TeddyPencil />
      </Box>
    )}
        </Box>
      </Center>
    </Box>
);
}
function TeddyPencil() {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: 120, transform: "scale(0.75)", transformOrigin: "top center", }}
    >
      <Box style={{ position: "relative", width: 120, margin: "0 auto" }}>
        {/* 🧸 BEAR WRAPPER (scaled down) */}
        <Box
          style={{
            transform: "scale(0.6)",
            transformOrigin: "top center",
            position: "relative",
            marginTop: 20,
            marginBottom: -80,
            zIndex: 2,
          }}
        >
        {/* 🧸 HEAD (slightly smaller) */}
        <Box
          style={{
            width: 62,
            height: 65,
            background: "#c49a6c",
            borderRadius: "50%",
            margin: "0 auto",
            position: "relative",
            zIndex: 5,
            boxShadow: "0 6px 14px rgba(0,0,0,0.18), inset 0 2px 3px rgba(255,255,255,0.25)",
          }}
        >

          {/* Fur texture overlay */}
          <Box
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), transparent 40%)," +
                "radial-gradient(circle at 70% 60%, rgba(0,0,0,0.06), transparent 45%)",
              pointerEvents: "none",
              filter: "blur(0.4px)",
            }}
          />

          {/* 🪡 face stitching */}
          <Box
            style={{
              position: "absolute",
              inset: 1,
              borderRadius: "50%",
              border: "1.5px dashed rgba(90,60,35,0.35)",
              pointerEvents: "none",
              opacity: 0.7,
            }}
          />

          {/* Ears */}
          {["left", "right"].map((side) => (
            <Box
              key={side}
              style={{
                position: "absolute",
                top: -6,
                [side]: -6,
                width: 22,
                height: 22,
                background: "#c49a6c",
                borderRadius: "50%",
                zIndex: -1,
              }}
            />
          ))}
          {/* 🪡 Left ear stitching */}
          <Box
            style={{
              position: "absolute",
              top: -3,
              left: -4,
              width: 14,
              height: 18,
              borderRadius: "50%",
              borderLeft: "1.5px dashed rgba(90,60,35,0.45)",
              transform: "rotate(-20deg)",
              filter: "blur(0.2px)",
            }}
          />
          {/* 🪡 Right ear stitching */}
          <Box
            style={{
              position: "absolute",
              top: -3,
              right: -4,
              width: 14,
              height: 18,
              borderRadius: "50%",
              borderRight: "1.5px dashed rgba(90,60,35,0.45)",
              transform: "rotate(20deg)",
              filter: "blur(0.2px)",
            }}
          />

          {/* 🧵 muzzle seam */}
          <Box
            style={{
              position: "absolute",
              top: 36,
              left: "50%",
              transform: "translateX(-50%)",
              width: 16,
              height: 10,
              borderBottom: "1.5px dashed rgba(90,60,35,0.45)",
              borderRadius: "0 0 10px 10px",
              pointerEvents: "none",
            }}
          />

          {/* Face */}
          <Box style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}>
            <Box style={{ display: "flex", gap: 8 }}>
              <Box style={{ width: 6, height: 6, background: "#3b2a22", borderRadius: "50%" }} />
              <Box style={{ width: 6, height: 6, background: "#3b2a22", borderRadius: "50%" }} />
            </Box>
            <Box style={{
              width: 14,
              height: 8,
              background: "#3b2a22",
              borderRadius: "0 0 8px 8px",
            }} />
          </Box>
        </Box>

        {/* 🎀 BOW TIE */}
        <Box
          style={{
            position: "relative",
            width: 34,
            height: 14,
            margin: "-6px auto 0",
            zIndex: 4,
          }}
        >
          {/* 🎗️ Ribbon tails (behind bow) */}
          <Box
            style={{
              position: "absolute",
              top: 8,
              left: "50%",
              transform: "translateX(-50%)",
              width: 23,
              height: 16,
              zIndex: -1,
            }}
          >
            {/* Left tail */}
            <Box
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 8,
                height: 14,
                background: "#e64980",
                transform: "rotate(-10 deg)",
                borderRadius: "0 0 6px 6px",
              }}
            />

            {/* Right tail */}
            <Box
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: 8,
                height: 14,
                background: "#e64980",
                transform: "rotate(10 deg)", 
                borderRadius: "0 0 6px 6px",
              }}
            />
          </Box>
          {/* Left loop */}
          <Box
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 14,
              height: 16,
              background: "#f06595",
              borderRadius: "8px",
              transform: "rotate(-12deg)",
            }}
          >
            {/* shine */}
            <Box
              style={{
                position: "absolute",
                top: 3,
                left: 3,
                width: 4,
                height: 4,
                background: "rgba(255,255,255,0.5)",
                borderRadius: "50%",
              }}
            />
          </Box>

          {/* Right loop */}
          <Box
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: 14,
              height: 16,
              background: "#f06595",
              borderRadius: "8px",
              transform: "rotate(12deg)",
            }}
          >
            {/* shine */}
            <Box
              style={{
                position: "absolute",
                top: 3,
                left: 3,
                width: 4,
                height: 4,
                background: "rgba(255,255,255,0.5)",
                borderRadius: "50%",
              }}
            />
          </Box>


          {/* Center knot */}
          <Box
            style={{
              position: "absolute",
              left: "50%",
              top: 3,
              transform: "translateX(-50%)",
              width: 6,
              height: 10,
              background: "#e64980",
              borderRadius: "3px",
              zIndex: 3,
            }}
          />
        </Box>

        {/* 🧸 BODY */}
        <Box
          style={{
            width: 82,
            height: 88,
            background: "#c49a6c",
            borderRadius: "50%",
            margin: "-10px auto 0",
            position: "relative",
            boxShadow: "0 6px 16px rgba(0,0,0,0.18), inset 0 -3px 6px rgba(0,0,0,0.12)",

          }}
        >
          

          {/* Fur texture overlay */}
          <Box
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 25%, rgba(255,255,255,0.16), transparent 45%)," +
                "radial-gradient(circle at 60% 75%, rgba(0,0,0,0.08), transparent 50%)",
              pointerEvents: "none",
              filter: "blur(0.4px)",
            }}
          />

          {/* Belly */}
          <Box
            style={{
              width: 34,
              height: 38,
              background: "radial-gradient(circle at top, #f6e3c6, #e2c19b)",
              borderRadius: "50%",
              position: "absolute",
              top: 32,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
          {/* 🧵 Belly stitches */}
          <Box
            style={{
              position: "absolute",
              top: -3,
              left: "50%",
              transform: "translateX(-50%)",
              width: 38,
              height: 42,
              borderRadius: "50%",
              border: "1.5px dashed rgba(120,80,40,0.45)",
              pointerEvents: "none",
            }}
          />
          </Box>

          {/* 💗 HEART */}
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
            style={{
              position: "absolute",
              top: 26,
              left: "37%",
              transform: "translateX(-50%)", // ← stays straight
              width: 22,
              height: 20,
              zIndex: 6,
            }}
          >
            {/* rotated heart shape */}
            <div
              style={{
                width: 18,
                height: 18,
                background: "#f06595",
                transform: "rotate(-45deg)",
                position: "relative",
                margin: "0 auto",
                boxShadow: "0 0 12px rgba(240,101,149,0.5)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 18,
                  height: 18,
                  background: "#f06595",
                  borderRadius: "50%",
                  top: -9,
                  left: 0,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 18,
                  height: 18,
                  background: "#f06595",
                  borderRadius: "50%",
                  left: 9,
                  top: 0,
                }}
              />
            </div>
          </motion.div>

          {/* 🪡 Left body seam */}
          <Box
            style={{
              position: "absolute",
              top: 14,
              left: 10,
              width: 2,
              height: 56,
              borderRadius: "2px",
              background:
                "repeating-linear-gradient(180deg, rgba(90,60,35,0.35) 0px, rgba(90,60,35,0.35) 2px, transparent 4px, transparent 6px)",
              opacity: 0.6,
            }}
          />

          {/* 🪡 Right body seam */}
          <Box
            style={{
              position: "absolute",
              top: 14,
              right: 10,
              width: 2,
              height: 56,
              borderRadius: "2px",
              background:
                "repeating-linear-gradient(180deg, rgba(90,60,35,0.35) 0px, rgba(90,60,35,0.35) 2px, transparent 4px, transparent 6px)",
              opacity: 0.6,
            }}
          />
          
          {/* 🐾 LEFT ARM (in front of heart) */}
          <Box
            style={{
              position: "absolute",
              top: 28,
              left: 4,
              width: 28,
              height: 26,
              background: "#c49a6c",
              borderRadius: "50%",
              zIndex: 6,
              boxShadow: "0 2px 6px rgba(0,0,0,0.18), inset 0 2px 4px rgba(255,255,255,0.2)",
            }}
          >
              {/* 🪡 paw seam */}
              <Box
                style={{
                  position: "absolute",
                  inset: 3,
                  borderRadius: "50%",
                  border: "1.5px dashed rgba(90,60,35,0.45)",
                  pointerEvents: "none",
                }}
              />
            </Box>

          {/* 🐾 RIGHT ARM (in front of heart) */}
          <Box
            style={{
              position: "absolute",
              top: 28,
              right: 4,
              width: 28,
              height: 26,
              background: "#c49a6c",
              borderRadius: "50%",
              zIndex: 6,
              boxShadow: "0 2px 6px rgba(0,0,0,0.18), inset 0 2px 4px rgba(255,255,255,0.2)",

            }}
          >
              {/* 🪡 paw seam */}
              <Box
                style={{
                  position: "absolute",
                  inset: 3,
                  borderRadius: "50%",
                  border: "1.5px dashed rgba(90,60,35,0.45)",
                  pointerEvents: "none",
                }}
              />
            </Box>

          {/* 🐾 LEFT LEG */}
          <Box
            style={{
              position: "absolute",
              bottom: -14,
              left: -5,
              width: 30,
              height: 40,
              transform: "rotate(-65deg)",
              background: "#c49a6c",
              borderRadius: "50% 50% 45% 45%",
              zIndex: 3,
              boxShadow:
                "0 4px 6px rgba(0,0,0,0.2), inset 0 2px 3px rgba(255,255,255,0.2)",
            }}
          >
            {/* 🪡 paw seam */}
            <Box
              style={{
                position: "absolute",
                inset: 3,
                borderRadius: "50%",
                border: "1px dashed rgba(90,60,35,0.35)",
              }}
            />
          </Box>

          {/* 🐾 RIGHT LEG */}
          <Box
            style={{
              position: "absolute",
              bottom: -14,
              right: -5,
              width: 30,
              height: 40,
              transform: "rotate(65deg)",
              background: "#c49a6c",
              borderRadius: "50% 50% 45% 45%",
              zIndex: 3,
              boxShadow:
                "0 4px 6px rgba(0,0,0,0.2), inset 0 2px 3px rgba(255,255,255,0.2)",
            }}
          >
            {/* 🪡 paw seam */}
            <Box
              style={{
                position: "absolute",
                inset: 3,
                borderRadius: "50%",
                border: "1px dashed rgba(90,60,35,0.35)",
              }}
            />
          </Box>

        </Box>
        </Box>

        {/* ✏️ PENCIL */}
        <Box
          style={{
            width: 14,
            height: 220,
            background: "linear-gradient(180deg, #f9d2df 0%, #f6c1d1 50%, #eaa6bb 100%)",
            margin: "-6px auto 0",
            borderRadius: "7px",
            position: "relative",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          {/* Pencil shine */}
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 2,
              width: 2,
              height: "100%",
              background: "rgba(255,255,255,0.35)",
              borderRadius: "2px",
            }}
          />

          {/* Wood */}
          <Box style={{
            position: "absolute",
            bottom: -14,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderTop: "18px solid #e2c6a8",
          }} />

          {/* Tip */}
          <Box style={{
            position: "absolute",
            bottom: -15,
            left: "50%",
            transform: "translateX(-50%)",
            width: 4,
            height: 6,
            background: "#2f2622",
            borderRadius: "2px",
          }} />
          {/* Pencil grain */}
          <Box
            style={{
              position: "absolute",
              inset: 0,
              background:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 2px, transparent 4px)",
              borderRadius: "7px",
              pointerEvents: "none",
            }}
          />
        </Box>
      </Box>
    </motion.div>
  );
}