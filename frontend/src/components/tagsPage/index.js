import React, { useEffect, useState } from "react";
import SideBar from "../sideBar";
import Header from "../Header";
import "./tags.css";
import axios from "axios";
import axiosInstance from "../../utils/AxiosInstance";
const Tages = () => {
  const [tags, Setages] = useState([]);

  useEffect(() => {
    const Func = async () => {
      try {
        const response = await axiosInstance.get("tags/");

        console.log(response, "from here");
        if (response.status === 200) {
          Setages(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    Func();
  }, []);
  return (
    <div>
      <Header />
      <div className="downDiv">
        <div className="homeTags">
          <div className="upperTags">
            <h1>Tags</h1>
            <p className="para">
              A tag is a keyword or label that categorizes your question with
              other, similar questions. Using the right tags makes it easier for
              others to find and answer your question.
            </p>
          </div>
          <hr />
          {/* <div className="tagsList">
            {tags.map((tag) => {
              return tag.name;
            })}
          </div> */}
          <div className="tagsList">
            {tags.map((tag) => (
              <div key={tag._id} className="tagBox">
                #{tag.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tages;
