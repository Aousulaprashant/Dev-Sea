import React from "react";
import axios from "axios";
import { Auth } from "./fireBaseConfig";
import { signInWithPopup } from "firebase/auth";
import axiosInstance from "./AxiosInstance";

const FirebaseAuth = async (Provider) => {
  try {
    const result = await signInWithPopup(Auth, Provider);
    const idToken = await result.user.getIdToken();

    console.log(idToken);
    // const res
    const res = await axiosInstance.post(
      "/Auth/Firebase",
      {
        idToken,
      },
      { withCredentials: true }
    );
    console.log(res);
    console.log(res.data);

    //AccessToken, RefreshToken
    localStorage.setItem("accessToken", res.data.AccessToken);
    //  localStorage.setItem("refreshToken", res.data.RefreshToken);

    console.log("Logging with Jwt");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default FirebaseAuth;
