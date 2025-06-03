import React from "react";
import axios from "axios";
import { Auth } from "./fireBaseConfig";
import { signInWithPopup } from "firebase/auth";

const FirebaseAuth = async (Provider) => {
  try {
    const result = await signInWithPopup(Auth, Provider);
    const idToken = await result.user.getIdToken();

    // const res
    const res = await axios.post(
      "http://localhost:5000/api/Auth/Firebase",
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
