// components/SavedQuestions.js

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import SingleQuation from "../SingleQuationDisplay";
import axiosInstance from "../../utils/AxiosInstance";
// Reuse Home styles

const SavedQuestions = () => {
  const [savedQuestions, setSavedQuestions] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/Auth");
      return;
    }

    const fetchSavedQuestions = async () => {
      try {
        const res = await axiosInstance.get(`Auth/savedQuestions/${user._id}`);
        if (res.status === 200 && res.data.questions) {
          setSavedQuestions(res.data.questions);
        }
      } catch (err) {
        console.error("Failed to fetch saved questions:", err);
      }
    };

    fetchSavedQuestions();
  }, [user, navigate]);

  const handleClick = (quation) => {
    navigate("/viewQuestion", { state: { quation } });
  };

  return (
    <div className="Home-main">
      <Header />
      <div className="outer-main">
        <div className="Quation-main">
          <div className="top">
            <h1>Saved Questions</h1>
          </div>
          <div className="filters">
            <p className="no_Quations">{savedQuestions.length} saved</p>
          </div>
          <hr />
          <div className="quations">
            {savedQuestions.map((quation, index) => (
              <div key={index}>
                <SingleQuation quation={quation} onClick={handleClick} />
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedQuestions;
