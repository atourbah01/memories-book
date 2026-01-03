import React, { forwardRef } from "react";
import { Paper, Text, Image, Box, Title, Stack } from "@mantine/core";
import { motion } from "framer-motion";

const Page = forwardRef((props, ref) => {
  const { memory, isCover } = props;

  return (
    <div className="page" ref={ref} style={{ height: "100%" }}>
      <Paper
        shadow="xl"
        p="xl"
        radius={0}
        style={{
          height: "100%",
          backgroundColor: isCover ? "transparent" : memory.color || "#FFFFF8",
          backgroundImage: isCover ? "url('../cover2.png')" : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderLeft: "1px solid rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
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
                right: 100,
                fontFamily: "'Playfair Display', cursive",
                fontSize: 13,
                color: "rgba(255, 248, 235, 1.95)",
                letterSpacing: "0.5px",
                transform: "rotate(-6deg)",
                textShadow: ` 0 0 6px rgba(255, 220, 180, 0.35), 0 0 12px rgba(255, 200, 200, 0.25)`,
              }}
            >
              always remembered ♡
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
                  style={{ maxWidth: 240, color: "rgba(255, 255, 255, 0.8)", }}
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
                  style={{ marginTop: 14 }}
                >
                  💖
                </motion.div>
              </Box>
            ) : (
              <>
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                  {memory.date}
                </Text>

                <Image
                  src={memory.image}
                  radius="md"
                  h={250}
                  w="100%"
                  fit="cover"
                />

                <Title order={3} ta="center" style={{ fontFamily: "serif" }}>
                  {memory.title}
                </Title>

                <Text size="sm" ta="center" lh={1.6}>
                  {memory.story}
                </Text>
              </>
            )}
          </Stack>
        </motion.div>
      </Paper>
    </div>
  );
});

export default Page;
