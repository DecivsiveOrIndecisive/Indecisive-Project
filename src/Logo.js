import React from 'react';
import { Image, keyframes, usePrefersReducedMotion } from '@chakra-ui/react';
import light from './lightLogo.svg';
import dark from './darkLogo.svg';
import { useColorMode } from '@chakra-ui/react';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Logo = props => {
  const { colorMode } = useColorMode();
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 20s linear`;

  return (
    <Image
      // animation={animation}
      src={colorMode === 'dark' ? light : dark}
      {...props}
    />
  );
};
