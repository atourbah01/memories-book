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
          backgroundColor: memory.color || "#FFFFF8",
          borderLeft: "1px solid rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
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
                  c="dimmed"
                  fs="italic"
                  mt="sm"
                  mx="auto"
                  ta="center"
                  style={{ maxWidth: 240 }}
                >
                  Tracing how something small grew into something lasting.
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
