import { createContext, useEffect, useState } from "react";
import { useHistory, useLocation, withRouter } from "react-router";
import axios from "axios";
import { useColorMode } from "@chakra-ui/react";

export const UserContext = createContext();
export const UserProvider = withRouter(props => {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const { path } = useLocation();
  const { colorMode } = useColorMode();
  const [mode, setMode] = useState(colorMode);

  useEffect(() => {
    if (!user) {
      axios
        .get("/api/auth/user")
        .then(res => {
          setUser(res.data);
        })
        .catch(err => console.log(err));
    }
  }, []);

  if (colorMode === "dark") setMode("dark");
  else if (colorMode === "light") setMode("light");

  const register = async (name, email, password) => {
    try {
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      setUser(response.data);
      history.push("/");
      console.log("Successfully created account");
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Invalid email");
      } else if (err.response.status === 400) {
        console.log("Email already in use");
      } else if (err.response.status === 502) {
        console.log("Please enter a name");
      }
    }
  };
  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      setUser(response.data);
      history.push("/");
    } catch {
      console.log("Incorrect login information");
    }
  };
  const logout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
    history.push("/login");
  };

  return (
    <UserContext.Provider
      value={{ user, mode, setUser, register, login, logout }}
    >
      {props.children}
    </UserContext.Provider>
  );
});
