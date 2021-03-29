import { createContext, useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router";
import axios from "axios";

export const UserContext = createContext();
export const UserProvider = withRouter(props => {
  const [user, setUser] = useState(null);
  const history = useHistory();

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

  const savePlace = async result => {
    await axios
      .post("/api/posts/save", { result, user })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  const blacklistPlace = async result => {
    await axios
      .post("/api/posts/blacklist", { result, user })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  const getFavorite = async () => {
    await axios
      .get("/api/posts/getSaved", { params: { user_id: user.id } })
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  };

  const getBlacklist = async () => {
    await axios
      .get("/api/posts/getBlacklist", { params: { user_id: user.id } })
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        register,
        login,
        logout,
        savePlace,
        blacklistPlace,
        getFavorite,
        getBlacklist,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
});
