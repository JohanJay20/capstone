import React from "react";
import UserInfo from "../components/userInfo";
import { useOutletContext } from "react-router-dom";
import MyProfile from "../components/myProfile";

const Profile = () => {
  const { user } = useOutletContext();
  return (
    <>
      <div className="container-fluid">
        <div className="form-head mb-sm-5 mb-1 d-flex flex-wrap align-items-center">
          <h2 className="font-w600 title mb-1 mr-auto ">Profile</h2>
        </div>
						<div className="row">
        <MyProfile user={user} />
        <UserInfo user={user} />
        </div>
        </div>
      
    </>
  );
};

export default Profile;