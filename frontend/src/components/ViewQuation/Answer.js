import React, { useEffect, useState } from "react";
import Upvote from "../../IMG/arrow-up.png";
import downvote from "../../IMG/down.png";
import axios from "axios";
import "./view.css";
import axiosInstance from "../../utils/AxiosInstance";
const Answer = ({ prop, toggle }) => {
  //console.log(prop);
  const Count = 0;

  const [AnswerDetails, setAnswerDetails] = useState({
    answer: "",
    posted_by: "",
  });
  useEffect(() => {
    const getanswers = async () => {
      try {
        const response = await axiosInstance.get(`answers/${prop}`);
        console.log(response.data.data.answer);
        setAnswerDetails({
          answer: response.data.data.answer,
          posted_by: response.data.data.posted_by,
        });
      } catch (e) {
        console.log(e);
      }
    };
    getanswers();
  }, []);
  return (
    <div className="singleAns">
      <div className="votes">
        <img className="vote upvote" src={Upvote} alt="" />
        <span>{Count}</span>
        <img className="vote downvote" src={downvote} alt="" />
      </div>
      <div className="anserdec">
        <div dangerouslySetInnerHTML={{ __html: AnswerDetails?.answer }} />
        <p className="Answeruser">
          <span>Posted By: </span> {AnswerDetails.posted_by}
        </p>
      </div>
    </div>
  );
};

export default Answer;
