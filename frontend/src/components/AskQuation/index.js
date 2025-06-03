import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../Header";
import SideBar from "../sideBar";
import TurndownService from "turndown";
import axios from "axios";
import TiptapEditor from "../EditorText/";
import "./AskQuation.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";

const AskQuation = () => {
  const user = useSelector((state) => state.user);
  // console.log(user);

  const navigate = useNavigate();
  const [QuationDetails, setQuationDetails] = useState({
    title: "",
    quation: "", // or rename to content
    tags: [],
    Useremail: user.user?.email,
  });
  const [tagInput, setTagInput] = useState(""); // temporary tag inp

  const setValue = (e) => {
    const { name, value } = e.target;
    setQuationDetails((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log(QuationDetails);

    if (
      !QuationDetails.title ||
      !QuationDetails.quation ||
      !QuationDetails.tags.length > 0 ||
      !QuationDetails.Useremail
    ) {
      alert("all Filds are Required");
      return;
    }

    try {
      const response = await axiosInstance.post("posts/questions", {
        title: QuationDetails.title,
        quation: QuationDetails.quation,
        tags: QuationDetails.tags,
        Useremail: QuationDetails.Useremail,
      });
      //console.log(response);

      if (response.status === 200) {
        alert("Posted SucessFully");
        navigate("/");
        setQuationDetails(
          (QuationDetails.title = ""),
          (QuationDetails.quation = ""),
          (QuationDetails.tags = []),
          (QuationDetails.Useremail = "")
        );
      } else {
        alert("error:", response.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleEditorChange = (html) => {
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(html);
    const plainText = html.replace(/<[^>]+>/g, ""); // crude plain text

    setQuationDetails((prev) => ({
      ...prev,
      quation: html, // HTML content
      markdown: markdown, // Markdown version
      plainText: plainText, // Plain text version
    }));
  };

  return (
    <div className="AskQuation-main">
      <div className="outerQuation-div">
        <div className="AskQuation-start">
          <div className="header">Ask a question in Staging Ground</div>
          <form onSubmit={handleSubmit}>
            <div className="title-div">
              <h1 className="title">Title</h1>
              <p className="titleDec">
                Be specific and imagine you’re asking a question to another
                person.
              </p>
              <input
                type="text"
                name="title"
                className="title-input"
                value={QuationDetails.title}
                onChange={setValue}
              />
            </div>

            <div className="quation-div">
              <h1 className="quation">What are the details of your problem?</h1>
              <p className="quationDec">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </p>
              <TiptapEditor className="star" onChange={handleEditorChange} />
            </div>
            <div className="AskQuationTags">
              <h1 className="tags-title">Tags</h1>
              <p className="tags-description">
                Add up to 5 tags to describe what your question is about.
              </p>
              <div className="tags-input-container">
                {QuationDetails?.tags?.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                    <button
                      type="button"
                      className="remove-tag"
                      onClick={() => {
                        setQuationDetails((prev) => ({
                          ...prev,
                          tags: prev?.tags.filter((_, i) => i !== index),
                        }));
                      }}
                    >
                      &times;
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  className="tag-input"
                  placeholder="Type and press enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (
                      (e.key === "Enter" || e.key === ",") &&
                      tagInput.trim()
                    ) {
                      e.preventDefault();
                      const newTag = tagInput.trim();
                      if (
                        !QuationDetails.tags.includes(newTag) &&
                        QuationDetails.tags.length < 5
                      ) {
                        setQuationDetails((prev) => ({
                          ...prev,
                          tags: [...prev.tags, newTag],
                        }));
                      }
                      setTagInput("");
                    }
                  }}
                />
              </div>
            </div>
            <button className="ask-question-button" type="submit">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuation;
