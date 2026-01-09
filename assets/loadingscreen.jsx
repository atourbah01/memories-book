import { Center, Stack, Text } from "@mantine/core";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <Center h="100vh">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Stack align="center">
          <Text size="xl" fw={600}>Our Memories</Text>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            💖
          </motion.div>
        </Stack>
      </motion.div>
    </Center>
  );
}