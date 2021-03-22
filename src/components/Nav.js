import { Flex, Spacer, Box } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "../Logo";
import { useHistory } from "react-router-dom";

const Nav = () => {
  let history = useHistory();

    const handleClick = () => {
        history.push('/login')
    }

    const homeClick = () => {
        history.push('/')
    }
    
    return (
        <header>
            <Flex>
                <Logo m={2} height={'30px'} onClick={homeClick}/>
                <Spacer />
                <Box display="block" onClick={handleClick}>
                    <Icon m={5} viewBox="0 0 30 30" color="red.500">
                        <path fill="currentColor" d="M15,16.875A8.438,8.438,0,1,0,6.563,8.438,8.44,8.44,0,0,0,15,16.875Zm7.5,1.875H19.271a10.2,10.2,0,0,1-8.543,0H7.5A7.5,7.5,0,0,0,0,26.25v.938A2.813,2.813,0,0,0,2.813,30H27.188A2.813,2.813,0,0,0,30,27.188V26.25A7.5,7.5,0,0,0,22.5,18.75Z" />
                    </Icon>
                </Box>
                <ColorModeSwitcher m={2} />
            </Flex>
        </header>
    )
}
export default Nav
