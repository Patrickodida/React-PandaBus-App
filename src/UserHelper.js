import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const storeUser = (data) => {
  if (!data || !data.user || !data.user.userName) {
    console.error("Missing user data in storeUser");
    return;
  }
  localStorage.setItem(
    "user",
    JSON.stringify({
      userName: data.user.userName,
      mobileNumber: data.user.mobileNumber,
      email: data.user.email,
      token: data.token,
    })
  );
};

export const userData = () => {
  const stringifiedUser = localStorage.getItem("user") || "{}";
  return JSON.parse(stringifiedUser);
};

export const Protector = ({ Component }) => {
  const navigate = useNavigate();
  const { token } = userData();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  return Component;
};