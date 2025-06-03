import React, { useEffect, useRef, useState } from "react";
import Header from "../Header";
import SideBar from "../sideBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AnswerDetail from "./Answer";
import Upvote from "../../IMG/arrow-up.png";
import downvote from "../../IMG/down.png";
import axios from "axios";
import "./view.css";
import { FaBookmark } from "react-icons/fa6";
import TurndownService from "turndown";
import TiptapEditor from "../EditorText";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import axiosInstance from "../../utils/AxiosInstance";

const ViewQuation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const quation = location.state?.quation;

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const editorRef = useRef(null);

  const [count, setCount] = useState(quation?.upvote || 0);
  const [toggle, setToggle] = useState(false);
  const [AnswerDetails, setAnswerDetails] = useState({});
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/Auth");
    }
  }, [user]);

  useEffect(() => {
    if (quation?._id) {
      fetchAnswers();
    }
  }, [quation]);

  const fetchAnswers = async () => {
    try {
      console.log(quation);
      const res = await axiosInstance.get(`answers/${quation._id}`);
      setAnswers(res.data);
      console.log("from here", res.data);
    } catch (err) {
      console.error("Failed to fetch answers:", err);
    }
  };

  const handleEditorChange = (html) => {
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(html);
    const plainText = html.replace(/<[^>]+>/g, "");

    setAnswerDetails({
      Answer: html,
      markdown,
      plainText,
    });
  };

  const handleSave = async () => {
    try {
      const res = await axiosInstance.post(
        `Auth/savedQuestion/${quation?._id}`,
        {
          user_id: user._id,
        }
      );

      console.log(res);
      if (res.status === 201) {
        alert("Question Saved");
      }
    } catch (e) {
      console.error("Error submitting answer:", e);
    }
  };
  const handleSubmit = async () => {
    if (!AnswerDetails.Answer?.trim()) return alert("Answer cannot be empty.");

    try {
      const response = await axiosInstance.post("answers/", {
        answer: AnswerDetails.Answer,
        quationId: quation._id,
        posted_by: user.email,
      });

      if (response.status === 201) {
        alert("Answer posted successfully.");
        console.log(response.data.answer);
        editorRef.current?.clear();
        setAnswerDetails({});
        quation.answers.push(response.data);
        setToggle((prev) => !prev);
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  const handleVote = async (type) => {
    try {
      const res = await axiosInstance.put(`posts/questions/${quation._id}`, {
        data: {
          VoteType: type,
          Voteduser: user.email,
        },
      });

      if (res.status === 200) {
        setCount(res.data.upvotes);
      } else if (res.status === 203) {
        alert("You already voted.");
      }
    } catch (err) {
      console.error("Voting error:", err);
    }
  };

  const handleDelte = async () => {
    try {
      console.log("clicked");
      const res = await axiosInstance.delete(`posts/questions/${quation._id}`);

      if (res.status === 200) {
        alert("Question deleted successfully");
        navigate("/");
      }
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  return (
    <div className="Home-main">
      <Header />
      <div className="outer-main">
        {/* <div className="sidebar-main"></div> */}
        <div className="Quation-main">
          <div className="top">
            <h1>{quation?.title}</h1>
            <Link className="ask-question-button" to="/AskQuestion">
              Ask Question
            </Link>
          </div>

          <div className="filters">
            <p className="no_Quations">24,228,722 questions</p>
            filters
          </div>
          <hr />

          <div className="view-questionDec">
            <div className="votes">
              <img
                className="vote upvote"
                src={Upvote}
                alt="Upvote"
                onClick={() => handleVote("upvote")}
              />
              <span>{count}</span>
              <img
                className="vote downvote"
                src={downvote}
                alt="Downvote"
                onClick={() => handleVote("downvote")}
              />
            </div>

            <div className="questionDec">
              <div dangerouslySetInnerHTML={{ __html: quation?.quation }}></div>
              <div className="Viewtags">
                <div className="vmtags">
                  {quation?.tags?.map((tag, idx) => (
                    <p className="vtag" key={idx}>
                      {tag}
                    </p>
                  ))}
                </div>

                <div className="opn">
                  {user.email === quation?.posted_by ? (
                    <MdDelete
                      size={20}
                      className="DeleteBnt opn1"
                      onClick={() => handleDelte()}
                    />
                  ) : (
                    <></>
                  )}
                  <FaBookmark
                    onClick={() => handleSave()}
                    className="SaveBnt opn2"
                  />
                </div>
              </div>
              <div className="user-details">
                <p className="quaionUser">{quation?.posted_by}</p>
              </div>
            </div>
          </div>

          <div className="toolbar">
            <p>Your Answer</p>
            <TiptapEditor ref={editorRef} onChange={handleEditorChange} />
            <button
              onClick={handleSubmit}
              type="button"
              className="ask-question-button"
            >
              Post
            </button>
          </div>

          <hr />

          <div className="answer-top">{quation?.answers?.length} Answers</div>
          <div className="answers">
            {quation?.answers &&
              quation?.answers.map((Answer) => {
                return <AnswerDetail prop={Answer} toogle={toggle} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuation;
