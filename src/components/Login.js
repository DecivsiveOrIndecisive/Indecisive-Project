import {
  Heading,
  Box,
  Link,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Logo } from "../Logo";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link as ReactLink } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Login = () => {
  const userContext = useContext(UserContext);
  let history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
    show: false,
  });
  const handleClick = () => setState({ ...state, show: !state.show });

  const handleChange = e => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  return (
    <>
      <ArrowBackIcon colorScheme="red" w={8} h={8} onClick={history.goBack} />
      <Flex align="center" justify="center">
        <Flex
          direction={["column", "column", "column", "column"]}
          align="center"
          justify={["flex-end", "flex-end", "flex-start", "flex-start"]}
          m={4}
          mr={[4, 4, 10, 10]}
        >
          <Logo height={["150px", "250px", "250px", "275px"]} />

          <Box
            //   borderWidth={1}
            p={5}
            width={["300px", "400px", "400px", "500px"]}
            maxWidth="500px"
            borderRadius={4}
            //   boxShadow="dark-lg"
          >
            {/* <ColorModeSwitcher /> */}
            <Box>
              <Box textAlign="center">
                <Heading>Log In</Heading>
              </Box>
              <Box>
                <form>
                  <FormControl my={5}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      focusBorderColor="red.400"
                      borderRadius="100px"
                      textAlign="center"
                      value={state.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl my={5}>
                    <InputGroup>
                      <Input
                        textAlign="center"
                        type={state.show ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        focusBorderColor="red.400"
                        borderRadius="100px"
                        value={state.password}
                        onChange={handleChange}
                      />
                      <InputRightElement>
                        <Button
                          h="1.75rem"
                          size="sm"
                          mr={4}
                          colorScheme="red"
                          variant="ghost"
                          onClick={handleClick}
                        >
                          {state.show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Box textAlign="center" m={2}>
                    <Link as={ReactLink} to={"/register"}>
                      Don't have an account? Sign up
                    </Link>
                  </Box>
                  <Button
                    width="full"
                    mt={4}
                    colorScheme="red"
                    onClick={() =>
                      userContext.login(state.email, state.password)
                    }
                  >
                    Log In
                  </Button>
                </form>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
