import React, { useState } from "react";
import Header from "../components/Header";
// import profile from '../images/profile.png'
import Order from "../components/Order";
import ProfileTab from "../components/ProfileTab";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import { listMyOrders } from "../Redux/Action/OrderActions";
import { getUserDetails } from "./../Redux/Action/UserAction";
const ProfileScreen = () => {
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    dispatch(getUserDetails("profile"));
  }, [dispatch]);

  const ordersList = useSelector((state) => state.ordersList);
  const { loading, error, orders } = ordersList;

  React.useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);
  return (
    <div className="profile-wrapper py-4">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12 col-md-4 col-sm-5">
            <div className="profile-avi">
              <div className="profile-img">
                <img src="/images/ava.png" className="avatar img-fluid" />
              </div>
              <div className="profile-name">
                <strong>{userInfo?.name}</strong>
                <p>Joined {moment(userInfo?.createdAt).format("LL")}</p>
              </div>
            </div>
            <button
              className={active === 1 ? "activee profile-btn" : "profile-btn"}
              onClick={() => setActive(1)}
            >
              PROFILE SETTINGS
            </button>
            <button
              className={active === 2 ? "activee orders-btn" : "orders-btn"}
              onClick={() => setActive(2)}
            >
              ORDERS LIST
              <span className="order-span">{orders ? orders.length : 0}</span>
            </button>
          </div>
          <div className="col-12 col-md-8 col-sm-7">
            {active === 2 ? (
              <div className="">
                <Order />
              </div>
            ) : active === 1 ? (
              <div className="">
                <ProfileTab />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
