import React from "react";
import "../../assets/style/TopBar.css";
import CategoryMenu from "./CategoryMenu";
import UserDropdown from "./UserDropdown";

const TopNav = () => {
  
  return (
    <div
      className="d-flex justify-content-between bg-white align-items-center p-3"
      style={{
        marginBottom: '50px',
        paddingTop: '10px',
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        height: '50px'
      }}
    >

      <CategoryMenu />

      <UserDropdown />

    </div>
  );
};

export default TopNav;
