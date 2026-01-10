import React, { forwardRef, useState } from "react";
import { Paper, Text, Image, Box, Title, Stack } from "@mantine/core";
import { motion } from "framer-motion";



const Page = forwardRef(({ memory, isCover, onViewMore, onSign }, ref) => {
  const isEndPage = memory?.isEndPage;
  const [activeMoment, setActiveMoment] = useState(null);
  const [showViewMore, setShowViewMore] = useState(false);
  const stopFlip = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  React.useEffect(() => {
    if (!activeMoment) {
      setShowViewMore(false);
      return;
    }
  
    const timer = setTimeout(() => {
      setShowViewMore(true);
    }, 1000);
  
    return () => clearTimeout(timer);
  }, [activeMoment]);
  


  return (
    <div className="page" ref={ref} style={{ height: "100%" }}>
      <Paper
        shadow="xl"
        p="xl"
        radius={0}
        style={{
          height: "100%",
          backgroundColor: isCover ? "transparent" : memory.color || "#FFFFF8",
          backgroundImage: isCover ? "url('../cover4.jpg')" : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderLeft: "1px solid rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          position: "relative",
          overflow: "visible",
        }}
      >
        {/* 🌸 MEMORY BACKGROUND DETAILS (cover only) */}
        {isCover && (
          <Box
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: 0.35,
              zIndex: 1,
            }}
          >
            {/* soft paper grain */}
            <Box
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 1px, transparent 2px)",
              }}
            />

            {/* handwritten memory note */}
            <Box
              style={{
                position: "absolute",
                bottom: 5,
                right: 10,
                fontFamily: "'Playfair Display', cursive",
                fontSize: 13,
                color: "rgba(255, 248, 235, 1.95)",
                letterSpacing: "0.5px",
                transform: "rotate(-6deg)",
                textShadow: ` 0 0 6px rgba(255, 220, 180, 0.35), 0 0 12px rgba(255, 200, 200, 0.25)`,
              }}
            >
              forever remembered ♡
            </Box>

            {/* tiny hearts */}
            <Box
              style={{
                position: "absolute",
                top: 40,
                left: 30,
                fontSize: 14,
              }}
            >
            </Box>
          </Box>
        )}

        {/* Animated Frame */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            height: "100%",
            border: "2px solid rgba(0,0,0,0.03)",
            padding: "20px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* 📖 PAGE FOOTER */}
<Box
  style={{
    position: "absolute",
    bottom: -25,
    left: -5,
    right: 0,
    pointerEvents: "none",
    zIndex: 3,
  }}
>
  {/* Center Footer Text */}
  <Text
    size="xs"
    ta="center"
    style={{
      fontFamily: "serif",
      letterSpacing: "0.12em",
      color: "rgba(120, 90, 140, 0.45)",
      textShadow: "0 0 6px rgba(200,160,255,0.25)",
    }}
  >
    The Story Of Us
  </Text>

  {/* Page Number */}
  {!isCover && (
    <Text
      size="xs"
      style={{
        position: "absolute",
        right: -5,
        bottom: 0,
        fontFamily: "serif",
        color: "rgba(90,70,110,0.55)",
        fontStyle: "italic",
        letterSpacing: "0.05em",
      }}
    >
      {memory.pageNumber}
    </Text>
  )}
</Box>


          <Stack align="center" gap={0}>
            {isCover ? (
              <Box ta="center" mt={90} style={{ position: "relative" }}>
                {/* ✨ Floating Sparkles */}
                <Box
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                  }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: [0, 0.6, 0], y: [-10, -40] }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.6,
                      }}
                      style={{
                        position: "absolute",
                        left: `${15 + i * 12}%`,
                        top: `${20 + (i % 2) * 20}%`,
                        fontSize: "0.8rem",
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </Box>

                {/* Title */}
                <Title
                  order={1}
                  style={{
                    fontSize: "1.35rem",
                    fontFamily: "serif",
                    lineHeight: 1.25,
                    textShadow: "0 0 12px rgba(240, 101, 149, 0.25)",
                  }}
                >
                  The Long Way from the First Day
                </Title>

                {/* Subtitle */}
                <Text
                  size="xs"
                  fs="italic"
                  mt="sm"
                  mx="auto"
                  ta="center"
                  style={{ maxWidth: 240, color: "rgba(255, 255, 255, 0.6)", }}
                >
                  Letting our story take shape, one moment at a time
                </Text>

                {/* 💖 Breathing Heart */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ marginTop: 1 }}
                >
                  💖
                </motion.div>
              </Box>
            ) : (
              <>
  {/* 📖 Chapter */}
  <Text size="xs" tt="uppercase" fw={700} c="dimmed">
    {memory.date}
  </Text>

  <Title order={3} ta="center" mt={6} style={{ fontFamily: "serif" }}>
    {memory.title}
  </Title>

  <Text size="sm" ta="center" lh={1.6} mt={8} style={{ maxWidth: 260 }}>
    {memory.story}
  </Text>

  {/* 🌙 MAIN CONTENT */}
  <Box
    mt="md"
    style={{
      display: "grid",
      gridTemplateColumns: "1.3fr 0.7fr",
      gap: 16,
      width: "100%",
      //height: "100%",
      alignItems: "center",
    }}
  >
    {/* LEFT: Bubble */}
    <Box style={{ 
      minHeight: 420,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      position: "relative",
      }}>
      {activeMoment && (
        <motion.div
          initial={{ opacity: 0, x: -20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            background: "rgba(255,255,255,0.85)",
            borderRadius: 18,
            padding: 14,
            boxShadow:
              "0 10px 30px rgba(255,180,150,0.35)",
          }}
        >
          <Box
            onPointerDown={stopFlip}
            onMouseDown={stopFlip}
            onTouchStart={stopFlip}
            onClick={(e) => {
              stopFlip(e);
              setActiveMoment(null);
            }}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            ✕
          </Box>

          <Image
            src={activeMoment.image}
            radius="md"
            h={200}
            fit="cover"
          />

          <Text
            size="xs"
            fs="italic"
            mt="sm"
            lh={1.6}
            style={{ color: "#5a4a42" }}
          >
            {activeMoment.bubbleStory}
          </Text>
          {showViewMore && (
          <Box
            onPointerDown={stopFlip}
            onMouseDown={stopFlip}
            onTouchStart={stopFlip}
            onClick={(e) => {
              stopFlip(e);
              onViewMore?.(activeMoment);
            }}
            style={{
              marginTop: 14,
            alignSelf: "center",
            padding: "8px 18px",

            borderRadius: 999, // perfect pill
            cursor: "pointer",

            /* BUTTON SURFACE */
            background: `
              linear-gradient(
                135deg,
                rgba(255,255,255,0.75),
                rgba(240,220,255,0.65)
              )
            `,
            backdropFilter: "blur(10px)",

            /* BORDER AURA */
            border: "1px solid rgba(255,255,255,0.65)",

            /* FLOATING DEPTH */
            boxShadow: `
              0 6px 14px rgba(160,120,200,0.25),
              inset 0 1px 2px rgba(255,255,255,0.8)
            `,

            /* TEXT */
            fontSize: 12,
            fontWeight: 500,
            color: "#3A2F4D",
            letterSpacing: "0.2px",

            /* SUBTLE MOTION */
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 10px 22px rgba(170,130,220,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 6px 14px rgba(160,120,200,0.25)";
          }}
          >
            view more ✨
          </Box>
        )}

        </motion.div>
      )}
      <Text
        size="sm"
        lh={1.7}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          color: "#6b5a52",
          fontStyle: "italic",
          padding: "0 6px",
          pointerEvents: "none",
        }}
      >
        {memory.pageNote}
      </Text>
    </Box>

    {/* RIGHT: Grid */}
    <Box
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 12,
        alignContent: "start",
        transform: "scale(0.8)",
        transformOrigin: "top center",
      }}
    >
      {memory?.moments?.map((moment) => (
        <Box
          key={moment.id}
          onPointerDown={stopFlip}
          onMouseDown={stopFlip}
          onTouchStart={stopFlip}
          onClick={(e) => {
            stopFlip(e);
            setActiveMoment(moment);
          }}
          style={{
            cursor: "pointer",
            textAlign: "center",
            padding: "8px 8px 8px",
            background: "#fffdf9",
            borderRadius: "12px 14px 10px 16px",
            transform: `rotate(${Math.random() * 2 - 1}deg)`,
            boxShadow:
              activeMoment?.id === moment.id
                ? "0 0 0 2px rgba(255,180,120,0.75)"
                : "0 8px 18px rgba(0,0,0,0.14)",
            clipPath: `
              polygon(
                0% 3%,
                2% 0%,
                98% 1%,
                100% 4%,
                99% 96%,
                97% 100%,
                3% 99%,
                0% 96%
              )
            `,
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.9),
                rgba(255,255,255,0.9)
              ),
              repeating-linear-gradient(
                -5deg,
                rgba(0,0,0,0.02) 0px,
                rgba(0,0,0,0.02) 1px,
                transparent 2px,
                transparent 4px
              )
            `,
          }}
        >
          {/* REALISTIC PAPER CLIP */}
          <Box
            style={{
              position: "absolute",
              top: -14,
              left: "50%",
              transform: `
                translateX(-50%)
                rotate(-7deg)
              `,
              width: 54,
              height: 28,

              borderRadius: "14px",
              border: "2px solid rgba(140,140,140,0.9)",

              background: `
                linear-gradient(
                  135deg,
                  rgba(235,235,235,0.98),
                  rgba(200,200,200,0.95),
                  rgba(225,225,225,0.98)
                )
              `,

              boxShadow: `
                0 2px 4px rgba(0,0,0,0.28),
                inset 0 1px 1px rgba(255,255,255,0.75),
                inset 0 -1px 1px rgba(0,0,0,0.18)
              `,

              zIndex: 6,
              pointerEvents: "none",
            }}
          />
          {/* CLIP INNER GAP */}
          <Box
            style={{
              position: "absolute",
              top: -8,
              left: "50%",
              transform: "translateX(-50%) rotate(-7deg)",
              width: 34,
              height: 14,

              background: "#fffdf9",
              borderRadius: "8px",

              boxShadow: `
                inset 0 1px 2px rgba(0,0,0,0.12)
              `,

              zIndex: 7,
              pointerEvents: "none",
            }}
          />
          {/* CONTACT SHADOW */}
          <Box
            style={{
              position: "absolute",
              top: 8,
              left: "50%",
              transform: "translateX(-50%) rotate(-7deg)",
              width: 42,
              height: 8,

              background: "rgba(0,0,0,0.28)",
              filter: "blur(7px)",

              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          {/* PAPER COMPRESSION HALO */}
          <Box
            style={{
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%) rotate(-7deg)",
              width: 52,
              height: 18,

              background: `
                radial-gradient(
                  ellipse at center,
                  rgba(210,210,210,0.22),
                  rgba(210,210,210,0.12),
                  transparent 70%
                )
              `,

              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          {/* SPECTACULAR SCRATCH HIGHLIGHT*/}
          <Box
            style={{
              position: "absolute",
              top: -6,
              left: "48%",
              width: 18,
              height: 1,
              background: "rgba(255,255,255,0.45)",
              transform: "rotate(-12deg)",
              zIndex: 8,
              pointerEvents: "none",
            }}
          />
          <Image
            src={moment.thumbnail}
            //radius="md"
            //h={90}
            fit="cover"
            style={{
              width: "100%",
              aspectRatio: "4 / 5",
              maxHeight: 90,
              borderRadius: 6,
              display: "block",
              boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
            }}
          />

          <Text size="xs" mt={3} fw={500}>
            {moment.title}
          </Text>
        </Box>
      ))}
    </Box>
  </Box>
</>

            )}
          </Stack>
        </motion.div>
        {/* ✒️ END PAGE SIGNATURE */}
{isEndPage && (
  <Box
    style={{
      position: "absolute",
      bottom: 60,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 120,
      zIndex: 5,
    }}
  >
    {/* subtle horizontal line */}
    <Box
      style={{
        width: 200,
        height: 1,
        background: "rgba(40,40,40,0.35)",
        borderRadius: 1,
      }}
    />

    {/* SIGN BUTTON */}
    <Box
      style={{
        padding: "8px 22px",
        borderRadius: 999,

        /* GLASSY DREAM SURFACE */
        background: "rgba(255,255,255,0.18)",
        backdropFilter: "blur(10px)",

        /* VERY SOFT BORDER */
        border: "1px solid rgba(255,255,255,0.35)",

        /* FLOAT */
        boxShadow: `
          0 6px 18px rgba(120,90,180,0.25),
          inset 0 1px 2px rgba(255,255,255,0.6)
        `,

        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "0.12em",
        color: "rgba(40,30,60,0.75)",

        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow =
          "0 10px 26px rgba(140,110,210,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 6px 18px rgba(120,90,180,0.25)";
      }}
      onClick={(e) => {
        e.stopPropagation();
        console.log("✍️ Sign button clicked");
  onSign?.();
      }}
    >
      Sign
    </Box>
  </Box>
)}
      </Paper>
    </div>
  );
});

export default Page;
