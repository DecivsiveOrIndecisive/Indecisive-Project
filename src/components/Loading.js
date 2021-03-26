import Logo from '../logo.svg'
import {Image} from '@chakra-ui/react'
import {
    ImageProps,
    keyframes,
    usePrefersReducedMotion,
  } from "@chakra-ui/react"

const Loading = () => {
    const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`
    const prefersReducedMotion = usePrefersReducedMotion()
      
    const animation = prefersReducedMotion
        ? undefined
        : `${spin} infinite 5s linear`
    
    return <Image animation={animation} src={Logo} />
}
export default Loading