import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { MantineProvider, Container, ActionIcon, Group, Center, Box } from '@mantine/core';
import { IconChevronLeft, IconChevronRight, IconHeartFilled } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import Page from './memories.jsx';
import { memories } from './memories.js';
import { useMediaQuery } from "@mantine/hooks";


export default function MemoryBook() {
  const book = useRef();
  const isMobile = useMediaQuery("(max-width: 768px)");
 
  return (
    <Box style={{ 
      background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)', 
      minHeight: '100vh',
      overflow: 'hidden' 
    }}>
      
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

            <motion.div whileHover={{ scale: 1.2 }}>
              <IconHeartFilled color="#F06595" size={40} />
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

        {/* 🧸 HEAD (slightly smaller) */}
        <Box
          style={{
            width: 62,
            height: 65,
            background: "#efe7df",
            borderRadius: "50%",
            margin: "0 auto",
            position: "relative",
            zIndex: 5,
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >
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
                background: "#efe7df",
                borderRadius: "50%",
              }}
            />
          ))}

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
              <Box style={{ width: 6, height: 6, background: "#5a4742", borderRadius: "50%" }} />
              <Box style={{ width: 6, height: 6, background: "#5a4742", borderRadius: "50%" }} />
            </Box>
            <Box style={{
              width: 14,
              height: 8,
              background: "#5a4742",
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
            background: "#f4ede6",
            borderRadius: "50%",
            margin: "-10px auto 0",
            position: "relative",
            boxShadow: "inset 0 -1px 1px rgba(0,0,0,0.05)",
          }}
        >
          {/* Belly */}
          <Box
            style={{
              width: 34,
              height: 38,
              background: "radial-gradient(circle at top, #ffffff, #fff1e6)",
              borderRadius: "50%",
              position: "absolute",
              top: 32,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />

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

          {/* 🐾 LEFT ARM (in front of heart) */}
          <Box
            style={{
              position: "absolute",
              top: 28,
              left: 4,
              width: 28,
              height: 26,
              background: "#efe7df",
              borderRadius: "50%",
              zIndex: 6,
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
            }}
          />

          {/* 🐾 RIGHT ARM (in front of heart) */}
          <Box
            style={{
              position: "absolute",
              top: 28,
              right: 4,
              width: 28,
              height: 26,
              background: "#efe7df",
              borderRadius: "50%",
              zIndex: 6,
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
            }}
          />
        </Box>

        {/* ✏️ PENCIL */}
        <Box
          style={{
            width: 14,
            height: 220,
            background: "linear-gradient(#f8f2ec, #e4d6c8)",
            margin: "-6px auto 0",
            borderRadius: "7px",
            position: "relative",
          }}
        >
          {/* Wood */}
          <Box style={{
            position: "absolute",
            bottom: -16,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderTop: "18px solid #d2c1b2",
          }} />

          {/* Tip */}
          <Box style={{
            position: "absolute",
            bottom: -17,
            left: "50%",
            transform: "translateX(-50%)",
            width: 4,
            height: 6,
            background: "#2f2622",
            borderRadius: "2px",
          }} />
        </Box>
      </Box>
    </motion.div>
  );
}