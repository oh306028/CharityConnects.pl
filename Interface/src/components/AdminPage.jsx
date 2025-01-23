import { useContext, useState } from "react";
import { UserContext } from "./Home";
import CreateOrganization from "./CreateOrganization";

const AdminPage = () => {
  const { userData } = useContext(UserContext);
  const [isCreateOrgClicked, setIsCreateOrgClicked] = useState(false);

  const handleCreateOrgToggle = () => {
    setIsCreateOrgClicked(!isCreateOrgClicked);
  };

  return (
    <>
      <h1>Admin page</h1>
      <ul>
        <li>
          <p onClick={handleCreateOrgToggle}>Utwórz organizację</p>
          {isCreateOrgClicked && <CreateOrganization userId={userData.id} />}
        </li>
        <li>
          <a>Zarejestruj pracownika</a>
        </li>
      </ul>
    </>
  );
};

export default AdminPage;
