import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading/Error/Loading";
import { toast } from "react-toastify";
import { updateUser } from "../Redux/Action/UserAction";
import Message from "./../Loading/Error/Error";

const ProfileTab = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //*****TOAST
  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 1000,
  };
  const toastId = React.useRef(null);

  //****  GET USER DETAILS
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  //******* UPDATATE USER DETAILS********
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: updateLoading, userInfo } = userUpdate;
  console.log(userUpdate);

  //****** UPDATE USER FUNCTION****
  const handleUpdate = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Password do not match", Toastobjects);
      }
    } else {
      dispatch(updateUser({ id: user._id, name, email, password }));
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Profile updated", Toastobjects);
      }
    }
  };

  return (
    <>
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form className="profiletab-main" onSubmit={(e) => handleUpdate(e)}>
        <div className="profile-input">
          <label htmlFor="name">USERNAME</label>
          <input
            type="text"
            id="name"
            className="input-profile"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="profile-input">
          <label htmlFor="email">E-MAIL ADDRESS</label>
          <input
            type="email"
            id="email"
            className="input-profile"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="profile-input">
          <label htmlFor="password">NEW PASSWORD</label>
          <input
            type="PASSWORD"
            id="password"
            className="input-profile"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="profile-input">
          <label htmlFor="confirm-p">CONFIRM PASSWORD</label>
          <input
            type="password"
            id="confirm-p"
            className="input-profile"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="update-btn">UPDATE PROFILE</button>
      </form>
    </>
  );
};

export default ProfileTab;
