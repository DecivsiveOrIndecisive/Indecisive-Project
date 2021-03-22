import React from 'react';
import { Image } from '@chakra-ui/react';
import light from './lightLogo.svg';
import dark from './darkLogo.svg';
import { useColorMode } from '@chakra-ui/react';

// const spin = keyframes`
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// `;

export const Logo = props => {
  const { colorMode } = useColorMode();

  return (
    <Image
      // animation={animation}
      src={colorMode === 'dark' ? light : dark}
      {...props}
    />
  );
};
