import Projects from "./Projects.jsx";
import AdminPage from "./AdminPage.jsx";
import { useEffect, useState } from "react";
import useAuth from "../useAuth.jsx";
import { createContext } from "react";
import EmployeePage from "./EmlpoyeePage.jsx";

export const UserContext = createContext(null);

const Home = () => {
  const token = useAuth();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://localhost:7292/api/accounts/data",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const result = await response.json();
        setUserData(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [token]);

  if (!userData) {
    return <p>Ładowanie...</p>;
  }

  return (
    <>
      <UserContext.Provider value={{ userData }}>
        {userData.role === 0 && <AdminPage />}
        {userData.role === 1 && <EmployeePage />}
        {(userData.role === 2 || userData.role === 3) && <Projects />}
      </UserContext.Provider>
    </>
  );
};

export default Home;
