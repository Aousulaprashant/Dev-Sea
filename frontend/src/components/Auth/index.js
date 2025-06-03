/*import React, { useState } from "react";
import Logo from "../../IMG/dev-logo.png";
import Google from "../../IMG/Google_search.png";
import gitHub from "../../IMG/github.png";
import faceBook from "../../IMG/facebook.png";
import {
  Authh,
  Google_AuthProvider,
  Github_AuthProvider,
  Facebook_AuthProvider,
} from "../../utils/fireBaseConfig";
import FirebaseAuth from "../../utils/FirebaseAuth";
import { setUser } from "../../redux/Slice/UserSlice";
import { useDispatch } from "react-redux";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import axiosInstance from "../../utils/AxiosInstance";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginpage, setLoginpage] = useState(true);
  const [userinfo, setuserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleGoogleAuth = async () => {
    try {
      const data = await FirebaseAuth(Google_AuthProvider);

      dispatch(setUser({ user: data.user, accessToken: data.AccessToken }));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/Auth/login", {
        name: userinfo.name,
        email: userinfo.email,
        password: userinfo.password,
      });
      console.log(response.data);
      dispatch(
        setUser({
          user: response.data.user,
          accessToken: response.data.accessToken,
        })
      );
      navigate("/");
    } catch (e) {
      console.log(e.response.data.message);
      alert(e.response.data.message);
    }
  };

  const handleRegister = async () => {
    try {
      console.log(userinfo);
      const response = await axiosInstance.post("/Auth/register", {
        name: userinfo.username,
        email: userinfo.email,
        password: userinfo.password,
        tags: userinfo.tags, // if your user has tags; optional
      });
      console.log(response.data);
      alert(response.data.message);
      // Optional: redirect to login page after registration
      setLoginpage(true); // assuming setLoginpage toggles the form
    } catch (e) {
      console.log(e.response.data.message);
      alert(e.response.data.message);
    }
  };

  // const handleRegister =async()=>{
  //       try {
  //     const response = await axiosInstance.post("/Auth/login", {
  //       name: userinfo.name,
  //       email: userinfo.email,
  //       password: userinfo.password,
  //     });
  //     console.log(response.data);
  //     dispatch(
  //       setUser({
  //         user: response.data.user,
  //         accessToken: response.data.accessToken,
  //       })
  //     );
  //     navigate("/");
  //   } catch (e) {
  //     console.log(e.response.data.message);
  //     alert(e.response.data.message);
  //   }
  // }

  // const handleSubmit = async () => {
  //   try {
  //     const response = await axiosInstance.post("/Auth/login", {
  //       name: userinfo.name,
  //       email: userinfo.email,
  //       password: userinfo.password,
  //     });
  //     console.log(response.data);
  //     dispatch(
  //       setUser({
  //         user: response.data.user,
  //         accessToken: response.data.accessToken,
  //       })
  //     );
  //     navigate("/");
  //   } catch (e) {
  //     console.log(e.response.data.message);
  //     alert(e.response.data.message);
  //   }
  // };
  return (
    <>
      <Header />
      <div className="main">
        <div className="container">
          <div className="Logo">
            <img src={Logo} alt="" className="logo" />
          </div>
          <div className="FirebaseAuth">
            <div className="google authbnt" onClick={handleGoogleAuth}>
              <img src={Google} alt="" />
              <p className="label">Log in with Google</p>
            </div>
            <div className="gitHub authbnt">
              <img src={gitHub} alt="" />
              <p className="label">Log in with GitHub</p>
            </div>
            <div className="FaceBook authbnt">
              <img src={faceBook} alt="" />
              <p className="label">Log in with FaceBook</p>
            </div>
          </div>
          <div className="auth-email">
            {loginpage ? (
              <>
                <div className="email">
                  <p className="label">Email</p>
                  <input
                    value={userinfo.email}
                    type="text"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="password">
                  <div className="inner">
                    <p className="label">Password</p>
                    <a href="#" className="forgot">
                      Forgot password?
                    </a>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={userinfo.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" onClick={handleSubmit}>
                  Log in
                </button>
                <p>
                  Dont have Accont ?{" "}
                  <span
                    onClick={() => {
                      setLoginpage((prev) => !prev);
                    }}
                  >
                    Register
                  </span>{" "}
                </p>
              </>
            ) : (
              <>
                REGISTER
                <div className="email">
                  <p className="label">Email</p>
                  <input
                    value={userinfo.email}
                    type="text"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="username">
                  <p className="label">Username</p>
                  <input
                    value={userinfo.username}
                    type="text"
                    name="username"
                    onChange={handleChange}
                  />
                </div>
                <div className="password">
                  <p className="label">Password</p>
                  <input
                    type="password"
                    name="password"
                    value={userinfo.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" onClick={handleRegister}>
                  Register
                </button>
                <p>
                  Already have an account?{" "}
                  <span
                    onClick={() => {
                      setLoginpage((prev) => !prev);
                    }}
                  >
                    Log in
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
*/

import React, { useState } from "react";
import Logo from "../../IMG/dev-logo.png";
import Google from "../../IMG/Google_search.png";
import GitHub from "../../IMG/github.png";
import Facebook from "../../IMG/facebook.png";
import {
  Google_AuthProvider,
  Github_AuthProvider,
  Facebook_AuthProvider,
} from "../../utils/fireBaseConfig";
import FirebaseAuth from "../../utils/FirebaseAuth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/Slice/UserSlice";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import axiosInstance from "../../utils/AxiosInstance";
import "./auth.css";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginpage, setLoginpage] = useState(true);
  const [userinfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleGoogleAuth = async () => {
    try {
      const data = await FirebaseAuth(Google_AuthProvider);
      dispatch(setUser({ user: data.user, accessToken: data.AccessToken }));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.post("/Auth/login", {
        email: userinfo.email,
        password: userinfo.password,
      });
      dispatch(
        setUser({ user: res.data.user, accessToken: res.data.accessToken })
      );
      navigate("/");
    } catch (e) {
      alert(e.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axiosInstance.post("/Auth/register", {
        username: userinfo.username,
        email: userinfo.email,
        password: userinfo.password,
      });
      alert(res.data.message);
      setLoginpage(true);
    } catch (e) {
      alert(e.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <Header />
      <div className="auth-split-container">
        <div className="auth-left">
          <h1 className="auth-left-heading">
            <span>
              Dev
              <br />
              <strong>Sea</strong>
            </span>
            <p>A community built for developers, by developers.</p>
          </h1>
          <h2>Continue with</h2>
          <div className="auth-btn google" onClick={handleGoogleAuth}>
            <img src={Google} alt="Google" />
            <span>Google</span>
          </div>
          <div className="auth-btn github">
            <img src={GitHub} alt="GitHub" />
            <span>GitHub</span>
          </div>
          <div className="auth-btn facebook">
            <img src={Facebook} alt="Facebook" />
            <span>Facebook</span>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-container">
            <h2>{loginpage ? "Log In" : "Register"}</h2>
            {!loginpage && (
              <div className="auth-input-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={userinfo.username}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="auth-input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userinfo.email}
                onChange={handleChange}
              />
            </div>
            <div className="auth-input-group">
              <div className="auth-label-row">
                <label>Password</label>
                {loginpage && <a href="#">Forgot password?</a>}
              </div>
              <input
                type="password"
                name="password"
                value={userinfo.password}
                onChange={handleChange}
              />
            </div>
            <button
              className="auth-submit-btn"
              onClick={loginpage ? handleSubmit : handleRegister}
            >
              {loginpage ? "Log in" : "Register"}
            </button>

            <p className="auth-toggle-text">
              {loginpage
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <span onClick={() => setLoginpage((prev) => !prev)}>
                {loginpage ? "Register" : "Log in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
