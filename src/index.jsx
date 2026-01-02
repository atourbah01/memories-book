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
      </Center>
    </Box>
);
}