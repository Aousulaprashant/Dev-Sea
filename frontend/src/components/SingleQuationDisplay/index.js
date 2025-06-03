import React from "react";
import "./singleQuation.css";
import { FaUserTie } from "react-icons/fa6";
const SingleQuation = ({ quation, onClick }) => {
  const quationDetails = quation;

  const TrimTxt = (string) => {
    const newString = string.substring(0, 250);
    return newString + "....ReadMore";
  };
  return (
    <div className="Single-quation" onClick={() => onClick(quation)}>
      <div className="Singlequation-detail">
        <div className="title">{quationDetails.title}</div>
        <div className="quationDec">{TrimTxt(quationDetails.quation)}</div>
        <div className="Singlequation-end">
          <div className="tags">
            {quationDetails.tags.map((tag, index) => {
              return (
                <div key={index} className="tag">
                  <p>{tag}</p>
                </div>
              );
            })}
          </div>
          <div className="userDetails">
            <FaUserTie />
            <p className="username">{quationDetails.posted_by}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleQuation;
