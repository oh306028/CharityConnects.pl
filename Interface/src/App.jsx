import "./App.css";
import Register from "./components/Register.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Projects from "./components/Projects.jsx";
import AboutUs from "./components/AboutUs.jsx";
import OrganizationInfo from "./components/OrganizationInfo.jsx";
import RegisterAdmin from "./components/RegisterAdmin.jsx";
import CreateOrganization from "./components/CreateOrganization.jsx";
import EmployeePage from "./components/EmlpoyeePage.jsx";
import CreateProject from "./components/CreateProject.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/organizations" element={<OrganizationInfo />} />
        <Route path="register/admin" element={<RegisterAdmin />} />
        <Route path="/register/organization" element={<CreateOrganization />} />

        <Route element={<PrivateRoute />}>
          <Route path="Home" element={<Home />} />
          <Route path="/projects" element={<Projects />} />

          <Route path="/employee/manage" element={<EmployeePage />} />
          <Route path="employee/manage/create" element={<CreateProject />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
