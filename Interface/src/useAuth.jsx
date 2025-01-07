import { useState, useEffect } from "react";

const useAuth = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return token;
};

export default useAuth;
