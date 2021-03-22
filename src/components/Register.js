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
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Logo } from "../Logo";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link as ReactLink } from "react-router-dom";

const Register = () => {
  let history = useHistory();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
                <Heading>Register</Heading>
              </Box>
              <Box>
                <form>
                  <FormControl my={5}>
                    <Input
                      textAlign="center"
                      type="name"
                      name="name"
                      placeholder="Name"
                      focusBorderColor="red.400"
                      borderRadius="100px"
                      value={state.name}
                      onChange={handleChange}
                    />
                  </FormControl>
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
                        errorBorderColor="crimson"
                        isInvalid={
                          state.password === state.confirmPassword
                            ? false
                            : true
                        }
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
                  <FormControl my={5}>
                    <Input
                      textAlign="center"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      focusBorderColor="red.400"
                      borderRadius="100px"
                      value={state.confirmPassword}
                      onChange={handleChange}
                      errorBorderColor="crimson"
                      isInvalid={
                        state.password === state.confirmPassword ? false : true
                      }
                    />
                  </FormControl>

                  <Box textAlign="center" m={2}>
                    <Link as={ReactLink} to={"/login"}>
                      Already have an account? Sign in
                    </Link>
                  </Box>
                  <Button width="full" mt={4} colorScheme="red">
                    Register
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

export default Register;
