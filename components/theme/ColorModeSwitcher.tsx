import { useColorMode, useColorModeValue, IconButtonProps } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { MotionBox } from '../shared/animations/motion';

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = () => {
  const { toggleColorMode } = useColorMode();
  const mode = useColorModeValue('dark', 'light');

  const handleClick = () => {
    toggleColorMode();
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <MotionBox
        onClick={handleClick}
        key={mode === 'dark' ? 'dark-icon': 'light-icon'}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
        cursor="pointer"
        fontSize={['2xl', '3xl', '3xl']}
      >
        <img width={20} src={mode === 'dark' ? "/assets/images/light.png": "/assets/images/dark.png"}></img>
      </MotionBox>
    </AnimatePresence>
  );
};
