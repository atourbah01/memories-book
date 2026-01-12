import RibbonLock from "./ribbonlock.jsx";
import React, { useEffect, useState, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { MantineProvider, Modal, TextInput, Button, Container, ActionIcon, Text, Group, Center, Box } from '@mantine/core';
import { IconChevronLeft, IconChevronRight, IconHeartFilled } from '@tabler/icons-react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Page from './memories.jsx';
import { memories } from './memories.js';
import { useMediaQuery } from "@mantine/hooks";


export default function MemoryBook() {
  const book = useRef();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [darkMode, setDarkMode] = useState(false);
  const [conversationOpen, setConversationOpen] = useState(false);
  const [conversationLocked, setConversationLocked] = useState(false);
  const [activeConversationMoment, setActiveConversationMoment] = useState(null);
  const [isBookLocked, setIsBookLocked] = useState(true);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [keepsakeReady, setKeepsakeReady] = useState(false);
  const [readerName, setReaderName] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [signatureDone, setSignatureDone] = useState(false);
  const scale = getNameScale(readerName, 250);
  const letters = generateSignatureLetters(readerName, 250);
  const [onLastPage, setOnLastPage] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [pageInteractionLocked, setPageInteractionLocked] = useState(true);


  useEffect(() => {
    if (!conversationOpen) return;
  
    const timer = setTimeout(() => {
      setConversationOpen(false);
    }, 3000);
  
    return () => clearTimeout(timer);
  }, [conversationOpen]);
  

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

      <Center h="100dvh">
      <Box style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <Container>
        {darkMode && (
          <Box
            style={{
              position: "absolute",
              inset: -12, // tighter to the book
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            {/* 🔌 LED CABLES */}
            <Box
              style={{
                position: "absolute",
                inset: 0,
              }}
            >
              {/* Top */}
              <Box
                style={{
                  position: "absolute",
                  top: 8,
                  left: "4.5%",
                  right: "32%",
                  height: 2,
                  background:
                    "linear-gradient(90deg, rgba(255,180,90,0.25), rgba(120,80,40,0.4), rgba(255,180,90,0.25))",
                  borderRadius: 2,
                }}
              />

              {/* Bottom */}
              <Box
                style={{
                  position: "absolute",
                  bottom: 84,
                  left: "4.5%",
                  right: "33%",
                  height: 2,
                  background:
                    "linear-gradient(90deg, rgba(255,180,90,0.25), rgba(120,80,40,0.4), rgba(255,180,90,0.25))",
                  borderRadius: 2,
                }}
              />

              {/* Left */}
              <Box
                style={{
                  position: "absolute",
                  top: "2%",
                  bottom: "13%",
                  left: 23,
                  width: 2,
                  background:
                    "linear-gradient(180deg, rgba(255,180,90,0.25), rgba(120,80,40,0.4), rgba(255,180,90,0.25))",
                  borderRadius: 2,
                }}
              />

              {/* Right */}
              <Box
                style={{
                  position: "absolute",
                  top: "2%",
                  bottom: "13%",
                  right: 205,
                  width: 2,
                  background:
                    "linear-gradient(180deg, rgba(255,180,90,0.25), rgba(120,80,40,0.4), rgba(255,180,90,0.25))",
                  borderRadius: 2,
                }}
              />
            </Box>
            {/* ⚡ CURRENT FLOW */}
            <motion.div
              animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: 0,
                maskImage:
                  "linear-gradient(#000 0 0)",

                background:
                  `
                  linear-gradient(
                    90deg,
                    transparent 0%,
                    rgba(255,210,120,0.35) 50%,
                    transparent 100%
                  )
                  `,
                backgroundSize: "200% 2px",
                backgroundRepeat: "no-repeat",
                top: 8,
                left: "6%",
                right: "76%",
                height: 2,
              }}
            />

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
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    boxShadow: `
                      0 0 6px rgba(255,220,160,0.8),
                      0 0 14px rgba(255,210,130,0.55)
                    `,
                    ...stylePosition,
                  }}
                >
                  {/* 💡 LED core */}
                  <Box
                    style={{
                      position: "absolute",
                      inset: 3,
                      borderRadius: "50%",
                      background: "rgb(255, 183, 92)",
                      boxShadow: `
                      0 0 6px rgba(255,183,92,1),
                      0 0 14px rgba(255,160,60,0.9),
                      0 0 24px rgba(255,140,40,0.6)
                      `,
                    }}
                  />
                  {/* 🧊 Glass bulb */}
                  <Box
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.04) 60%)",
                      border: "0.6px solid rgba(255,220,180,0.35)",
                      boxShadow: "inset 0 0 2px rgba(255,255,255,0.4)",
                      pointerEvents: "none",
                    }}
                  />
                  </motion.div>
              );
            })}
          </Box>
        )}

          {darkMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1 }}
              style={{
                position: "absolute",
                top: "55%",
                left: "35%",
                transform: "translate(-50%, -65%)",
                width: 500,
                height: 600,
                background:
                  "radial-gradient(ellipse at center, rgba(255,230,180,0.55), rgba(255,230,180,0.2), transparent)",
                filter: "blur(50px)",
                zIndex: 6,
                pointerEvents: "none",
              }}
            />
          )}
          <Box style={{ position: "relative", overflow: "hidden" }}>
  {/* 🔒 Ribbon overlay */}

  <RibbonLock
  isLocked={isBookLocked}
  onUnlockRequest={() => setShowNamePrompt(true)}
  onUnwrapComplete={() => {
    setKeepsakeReady(true);
    setPageInteractionLocked(false);
  }}
/>


          <HTMLFlipBook  
            width={isMobile ? 300 : 400}
            height={isMobile ? 460 : 550}
            size="fixed"
            minWidth={isMobile ? 280 :315}
            maxWidth={900}
            minHeight={isMobile ? 420 :420}
            maxHeight={1200}
            maxShadowOpacity={0.3}
            showCover={true}
            mobileScrollSupport={true}
            swipeDistance={20} 
            disableFlipByClick={ onUnwrapComplete? false : true}
            clickEventForward={false}
            drawShadow={true}
            flippingTime={900}  
            usePortrait={true}
            startZIndex={0}
            showPageCorners={false}
            ref={book}
            onFlip={(e) => {
              const current = e.data;
              const lastIndex = memories.length + 1;
              const isLast = current === lastIndex;
              setOnLastPage(isLast);
              if (!isLast) {
                setShowSignature(false);
                setIsSigning(false);
              } else {
                setShowSignature(true);
              }
            }}
          >
            {/* Cover Page */}
            <Page memory={{ color: '#FFF0F3' }} isCover={true} />
            
            {/* Content Pages */}
            {memories.map((m) => (
              <Page
                key={m.id}
                memory={m}
                isCover={false}
              onViewMore={(moment) => {
                if (conversationLocked) return;

                setActiveConversationMoment(moment);
                setConversationOpen(true);
                setConversationLocked(true);

                setTimeout(() => {
                  setConversationLocked(false);
                }, 3000);
              }}
              />
            ))}

            {/* End Page */}
            <Page
  memory={{
    title: "To be continued...",
    story: "Every day is a new page with you.",
    color: "#F3F0FF",
    isEndPage: true,
  }}
  onSign={() => {
    if (signatureDone) return;
    setIsSigning(true);
  }}
/>
          
          </HTMLFlipBook>
          </Box>
          <Modal
  opened={showNamePrompt}
  onClose={() => {}}
  centered
  withCloseButton={false}
  overlayProps={{
    opacity: 0.55,
    blur: 6,
  }}
>
  <Text ta="center" mb="sm">
    Before opening this book…
  </Text>

  <TextInput
    placeholder="Your First Name"
    styles={{
      input: {
        fontSize: 16,
      },
    }}
    value={readerName}
    onChange={(e) => setReaderName(e.target.value)}
  />

  <Button
    fullWidth
    mt="md"
    radius="xl"
    disabled={!readerName.trim()}
    onClick={() => {
      setIsBookLocked(false);
      setShowNamePrompt(false);
    }}
  >
    Enter ✨
  </Button>
</Modal>

          {conversationOpen && (
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                position: "fixed",
                left: 40,
                top: "50%",
                transform: "translateY(-50%)",
                width: 260,
                padding: 18,
                borderRadius: 24,
                background: `
                  linear-gradient(
                    135deg,
                    rgba(190,160,255,0.38) 0%,
                    rgba(215,185,255,0.42) 45%,
                    rgba(255,244,214,0.35) 100%
                  )
                `,
                backdropFilter: "blur(14px)",
                boxShadow: "0 20px 60px rgba(140,90,255,0.45)",
                color: "#3a235f",
                zIndex: 9999,
                pointerEvents: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box
                style={{
                  position: "absolute",
                  inset: -30,
                  borderRadius: "50%",
                  background: `
                    radial-gradient(
                      circle at 70% 30%,
                      rgba(255,244,214,0.45),
                      transparent 60%
                    )
                  `,
                  filter: "blur(30px)",
                  opacity: 0.6,
                  pointerEvents: "none",
                  zIndex: -1,
                }}
              />
              {activeConversationMoment?.conversation && (
              <Box
              style={{
                position: "relative",
                padding: "14px 18px",
                borderRadius: 10,
                background: `
                  linear-gradient(
                    180deg,
                    rgba(255,255,255,0.12),
                    rgba(255,246,220,0.08)
                  )
                `,
                backdropFilter: "blur(6px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              }}
              >
                {/* ✦ FLOATING STAR */}
                <motion.div
                  animate={{ y: [0, -6, 0], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    fontSize: 10,
                    color: "rgba(255,244,214,0.9)",
                    pointerEvents: "none",
                  }}
                >
                  ✦
                </motion.div>

                {/* SPARKLE OVERLAY */}
              <Box
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background: `
                  radial-gradient(circle at 20% 30%, rgba(255,255,255,0.45), transparent 40%),
                  radial-gradient(circle at 80% 60%, rgba(255,244,214,0.35), transparent 45%),
                  radial-gradient(circle at 50% 80%, rgba(210,180,255,0.35), transparent 50%)
                `,
                opacity: 0.18,                
                  borderRadius: 10,
                }}
              />
                <Text size="sm" fw={500} c="#FFF6ED" mb={4} style={{fontStyle: "italic", textShadow: "0 0 6px rgba(230,217,255,0.6)",}} >
                “{activeConversationMoment.conversation.question}
                </Text>
                <br />
                <Text size="sm" fw={500} c="#2B2436" mb={4} style={{fontStyle: "italic", textShadow: "0 2px 6px rgba(0,0,0,0.35)",}} >
                {activeConversationMoment.conversation.answer}”
              </Text>
            </Box>
          )}
            </motion.div>
          )}


          {/* Navigation Controls */}
          <Group justify="center" mt="xl">
            <ActionIcon 
              variant="subtle" 
              color="pink" 
              size="xl" 
              radius="xl"
              onClick={() => {
                if (isBookLocked || !keepsakeReady || pageInteractionLocked) return;
                setShowSignature(false);
                setIsSigning(false);
                book.current?.pageFlip()?.flipPrev()}}
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
                color={darkMode ? "#ffffff" : "#F06595"}
                style={{
                  filter: darkMode
                    ? "drop-shadow(0 0 6px rgba(255,255,255,0.8))"
                    : "none",
                }}
              />
            </motion.div>


            <ActionIcon 
              variant="subtle" 
              color="pink" 
              size="xl" 
              radius="xl"
              onClick={() => {
                if (isBookLocked || !keepsakeReady || pageInteractionLocked) return;
                book.current.pageFlip().flipNext()}}
            >
              <IconChevronRight size={30} />
            </ActionIcon>
          </Group>
        </Container>
        {/* 🧸 Teddy Pencil */}
      <Box
        style={{
          marginLeft: isMobile ? 0 : 60,
          pointerEvents: "none",
          transform: isMobile ? "scale(0.8)" : "none",
          transformOrigin: "center bottom",
        }}
      >
        <TeddyPencil
  isSigning={isSigning}
  signatureDone={signatureDone}
  name={readerName}
  scale={scale}
  letters={letters}
  onLastPage={onLastPage}
  showSignature={showSignature}
  isMobile= {isMobile}
  onComplete={() => {
    setIsSigning(false);
    setSignatureDone(true);
  }}
/>

      </Box>
        </Box>
      </Center>
    </Box>
);
}

function TeddyPencil({ isSigning, name, onComplete, scale, signatureDone, letters, onLastPage, showSignature, isMobile }) {
  console.log("✏️ TeddyPencil render", { isSigning, name });
  const pencilCtrl = useAnimation();
  const textCtrl = useAnimation();
  const SVG_WIDTH = 250;
  const nameWidth = getNameWidth(name) * scale;

  // where the signature ACTUALLY starts/ends in the svg
  const sigStart = (SVG_WIDTH - nameWidth) / 2;
  const sigEnd = sigStart + nameWidth;

  // map svg-space → world-space (your -460 anchor)
  const WORLD_BASE_X = -500;
  const WORLD_START_X = WORLD_BASE_X + sigStart;
  const WORLD_END_X = WORLD_BASE_X + sigEnd;


  useEffect(() => {
    console.log("🖊 useEffect fired, isSigning =", isSigning);
    if (!isSigning || signatureDone) return;
    console.log("🚀 STARTING SIGN ANIMATION");

    (async () => {

      // Reset signature
      textCtrl.set({ pathLength: 0 }); 

      // Move pencil into writing position
      await pencilCtrl.start({
        x: WORLD_START_X * scale - 5,
        y: -160,
        rotate: -12,
        scale: 0.8,
        transition: { type: "spring", stiffness: 95, damping: 16, },
      });

      // Write name
      await Promise.all([
        textCtrl.start({
          pathLength: 1,
          transition: { duration: 0.54 * letters.length, ease: "linear" },
        }),
      
        pencilCtrl.start({
          x: [ WORLD_START_X * scale - 5, WORLD_END_X * scale - 5 ],
          y: [-160, -155, -160],
          transition: { 
            x: { duration: 0.54 * letters.length, ease: "linear" },
            y: { duration: 0.35, repeat: 1.15 * letters.length, ease: "easeInOut" },
          },
        }),
      ]);
      

      // Optional special message
      if (name.trim().toLowerCase().includes("shourouk")) {
        await new Promise((r) => setTimeout(r, 100));
      }

      // Move pencil back
      await pencilCtrl.start({
        x: 0,
        y: 0,
        rotate: 0,
        transition: { type: "spring", stiffness: 80, damping: 20 },
      });

      onComplete?.();
    })();
  }, [isSigning]);

  return (
    <>
    <Box
  style={{
    position: "absolute",
    bottom: 270,
    left: "35%",
    transform: "translateX(-50%)",
    width: 250,
    pointerEvents: "none",
    //overflow: "visible",
  }}
>
      {/* ✨ SIGNATURE */}
      {onLastPage && showSignature && (isSigning || signatureDone) && (
      <motion.svg
        width={250}
        height={100}
        viewBox={`0 0 250 100`}
        style={{
          opacity: 1,
          overflow: "visible",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {generateSignatureLetters(name, 250).map(({ path, index }) =>
  isSigning ? (
    // ✍️ FIRST-TIME WRITE ANIMATION
    <motion.path
      key={index}
      d={path}
      fill="none"
      stroke="url(#sparkle)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: {
          duration: 0.6,
          ease: "easeInOut",
          delay: 0.35 + index * 0.54,
        },
        opacity: {
          duration: 0.2,
          ease: "easeInOut",
          delay: 0.35 + index * 0.54,
        },
      }}
      style={{
        filter:
          "drop-shadow(0 0 6px rgba(255,220,255,0.3)) drop-shadow(0 0 16px rgba(200,150,255,0.2))",
      }}
    />
  ) : (
    // 🖋️ STATIC SIGNATURE (NO ANIMATION)
    <path
      key={index}
      d={path}
      fill="none"
      stroke="url(#sparkle)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0.6 }}
      animate={{ 
        opacity: [0.6, 1, 0.6],
        filter: [
          "drop-shadow(0 0 4px rgba(255,220,255,0.25)) drop-shadow(0 0 10px rgba(200,150,255,0.2))",
          "drop-shadow(0 0 8px rgba(255,220,255,0.45)) drop-shadow(0 0 18px rgba(200,150,255,0.4))",
          "drop-shadow(0 0 4px rgba(255,220,255,0.25)) drop-shadow(0 0 10px rgba(200,150,255,0.2))",
        ],
       }}
      transition={{
        duration: 2.5,
        ease: "easeOut",
        repeat: Infinity,
      }}
      style={{
        filter:
          "drop-shadow(0 0 6px rgba(255,220,255,0.3)) drop-shadow(0 0 16px rgba(200,150,255,0.2))",
      }}
    />
  )
)}

        <defs>
          <linearGradient id="sparkle" >
            <stop offset="0%" stopColor="#f2d3e1" />
            <stop offset="50%" stopColor="#e5a5ff" />
            <stop offset="100%" stopColor="#c9a6ff" />
          </linearGradient>
        </defs>
      </motion.svg>
      )}
      </Box>

      {/* 💖 EXTRA MESSAGE */}
      {name.trim().toLowerCase().includes("shourouk")  && onLastPage  && showSignature && signatureDone && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{
            position: "absolute",
            bottom: 200,
            left: "40%",
            transform: "translateX(-50%)",
            fontFamily: "'Dancing Script', cursive",
            fontSize: 22,
            color: "#ffd1ec",
            textShadow: "0 0 12px rgba(255,190,240,0.4)",
          }}
        >
          he likes you :)
        </motion.div>
      )}

    <motion.div 
      animate={pencilCtrl}
      transition={{ duration: 4, repeat: isMobile ? 0 : Infinity, ease: "easeInOut" }}
      style={{ width: 120, transform: "scale(0.75)", transformOrigin: "top center", }}
    >
      <Box style={{ position: "relative", width: 120, margin: "0 auto" }}>
        {/* 🧸 BEAR WRAPPER (scaled down) */}
        <Box
          style={{
            transform: "scale(0.6)",
            transformOrigin: "top center",
            position: "relative",
            marginTop: 30,
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
            height: 320,
            transform: "scale(1.1)",
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
    </>
  );
}
const LETTER_STROKES = {
  // ---------- ROUND CORE ----------
  a: (x) => `
   M ${x+20} 50
   C ${x+5} 45, ${x+5} 78, ${x+20} 78 
   C ${x+35} 78, ${x+35} 45, ${x+20} 45 
   C ${x+35} 45, ${x+35} 78, ${x+35} 82
  `,

  o: (x) => `
    M ${x+20} 45
    C ${x+5} 45, ${x+5} 75, ${x+20} 75
    C ${x+35} 75, ${x+35} 45, ${x+20} 45
  `,

  c: (x) => `
    M ${x+35} 50
    C ${x+15} 40, ${x+5} 55, ${x+5} 60
    C ${x+5} 70, ${x+15} 80, ${x+35} 70
  `,

  e: (x) => `
    M ${x+35} 60
    C ${x+15} 40, ${x+5} 55, ${x+5} 60
    C ${x+5} 75, ${x+20} 80, ${x+35} 65
    M ${x+12} 60 L ${x+32} 60
  `,

  s: (x) => `
    M ${x+35} 50
    C ${x+15} 40, ${x+10} 55, ${x+25} 60
    C ${x+40} 65, ${x+30} 80, ${x+10} 75
  `,

  // ---------- TALL / ASCENDERS ----------
  b: (x) => `
    M ${x+15} 30
    L ${x+15} 75
    M ${x+15} 60
    C ${x+35} 45, ${x+35} 75, ${x+15} 75
  `,

  d: (x) => `
    M ${x+30} 30
    L ${x+30} 75
    M ${x+30} 60
    C ${x+5} 45, ${x+5} 75, ${x+30} 75
  `,

  f: (x) => `
    M ${x + 48} 42
    C ${x + 40} 28, ${x + 20} 32, ${x + 26} 46
    L ${x + 26} 90
    M ${x + 44} 58
    Q ${x + 28} 54, ${x + 14} 58
  `,

  h: (x) => `
    M ${x+10} 30
    L ${x+10} 90
    M ${x+10} 60
    C ${x+22} 52, ${x+30} 58, ${x+30} 74
    L ${x+30} 85
  `,

  k: (x) => `
    M ${x+15} 30
    L ${x+15} 90
    M ${x+15} 60
    C ${x+35} 45, ${x+25} 55, ${x+40} 45
    M ${x+15} 60
    C ${x+35} 75, ${x+25} 65, ${x+40} 75
  `,

  l: (x) => `
    M ${x+20} 30
    C ${x+18} 55, ${x+18} 75, ${x+20} 90
  `,

  t: (x) => `
    M ${x+25} 30
    L ${x+25} 90
    M ${x+10} 50 L ${x+40} 50
  `,

  // ---------- SHORT CONNECTED ----------
  i: (x) => `
    M ${x+20} 45
    L ${x+20} 75
    M ${x+20} 35
    C ${x+18} 33, ${x+22} 33, ${x+20} 35
  `,

  j: (x) => `
    M ${x+20} 45
    L ${x+20} 85
    C ${x+20} 100, ${x+5} 95, ${x+10} 85
    M ${x+20} 35
    C ${x+18} 33, ${x+22} 33, ${x+20} 35
  `,

  r: (x) => `
    M ${x+15} 45
    L ${x+15} 75
    M ${x+15} 55
    C ${x+30} 45, ${x+35} 55, ${x+25} 60
  `,

  m: (x) => `
    M ${x+10} 45
    L ${x+10} 75
    M ${x+10} 55
    C ${x+22} 45, ${x+32} 55, ${x+32} 75
    M ${x+32} 55
    C ${x+44} 45, ${x+54} 55, ${x+54} 75
  `,

  n: (x) => `
    M ${x+15} 45
    L ${x+15} 75
    M ${x+15} 55
    C ${x+28} 45, ${x+40} 55, ${x+40} 75
  `,

  u: (x) => `
    M ${x+10} 45
    C ${x+10} 70, ${x+22} 75, ${x+28} 65
    L ${x+28} 45
  `,

  // ---------- DESCENDERS ----------
  g: (x) => `
    M ${x+22} 60
    C ${x+8} 48, ${x+8} 78, ${x+22} 78
    C ${x+36} 78, ${x+36} 48, ${x+22} 48
    C ${x+36} 48, ${x+40} 90, ${x+24} 98
    C ${x+8} 106, ${x+10} 84, ${x+28} 86
  `,

  p: (x) => `
    M ${x+15} 55
    L ${x+15} 105
    M ${x+15} 60
    C ${x+35} 45, ${x+35} 75, ${x+15} 75
  `,

  q: (x) => `
    M ${x+35} 55
    L ${x+35} 105
    M ${x+35} 60
    C ${x+15} 45, ${x+15} 75, ${x+35} 75
  `,

  y: (x) => `
  M ${x+10} 45
  C ${x+20} 65, ${x+25} 65, ${x+30} 45
  C ${x+30} 65, ${x+30} 90, ${x+10} 105
`,

  // ---------- ANGULAR ----------
  v: (x) => `
    M ${x+10} 45
    L ${x+25} 75
    L ${x+40} 45
  `,

  w: (x) => `
    M ${x+10} 45
    L ${x+20} 75
    L ${x+30} 45
    L ${x+40} 75
    L ${x+50} 45
  `,

  x: (x) => `
    M ${x+10} 45 L ${x+40} 75
    M ${x+40} 45 L ${x+10} 75
  `,

  z: (x) => `
    M ${x+10} 45
    L ${x+40} 45
    L ${x+10} 75
    L ${x+40} 75
  `,

  // ---------- DASH ----------
  "-": (x) => `
    M ${x + 6} 62
    C ${x + 18} 60, ${x + 24} 60, ${x + 28} 60
  `,

  // ---------- SPACE ----------
  " ": (x) => `
  M ${x} 60
  L ${x+20} 60
`,

  // ---------- DEFAULT ----------
  default: (x) => `
    M ${x} 60
    L ${x+20} 60
  `,

};

const LETTER_WIDTHS = {
  i: 23,
  l: 17,
  j: 25,
  r: 30,
  t: 35,

  a: 35,
  b: 31,
  c: 32,
  d: 31,
  e: 30,
  f: 40,
  g: 35,
  h: 30,
  k: 35,
  m: 55,
  n: 40,
  o: 28,
  p: 29,
  q: 29,
  s: 32,
  u: 25,
  v: 36,
  w: 44,
  x: 34,
  y: 32,
  z: 34,
  "-": 25,
  " ": 25,

  default: 25,
};

function getNameWidth(name) {
  let width = 0;

  for (const char of name) {
    const lower = char.toLowerCase();
    const isUpper = char !== lower;

    const letterWidth =
      LETTER_WIDTHS[lower] || LETTER_WIDTHS.default;

    width += isUpper ? letterWidth * 1.15 : letterWidth;
  }

  return width;
}

function getNameScale(name, svgWidth = 250) {
  const nameWidth = getNameWidth(name);
  if (nameWidth <= svgWidth) return 1;
  const scale = svgWidth / nameWidth;
  return Math.max(0.75, scale);
}

function generateSignatureLetters(name, svgWidth) {
  const rawWidth = getNameWidth(name);
  const scale = getNameScale(name, svgWidth-20);
  const scaledWidth = rawWidth * scale;

  let x = (svgWidth-20 - scaledWidth) / 2;
  const letters = [];

  name.split("").forEach((char, index) => {
    const lower = char.toLowerCase();

    if (lower === " ") {
      x += LETTER_WIDTHS[" "] * scale;
      return;
    }

    const stroke = LETTER_STROKES[lower] || LETTER_STROKES.default;
    const path = stroke(x);

    const width =
      (LETTER_WIDTHS[lower] || LETTER_WIDTHS.default) * scale;

    letters.push({ path, index });
    x += width;
  });

  return letters;
}



