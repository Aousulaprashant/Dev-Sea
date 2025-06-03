import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SideBar from "../sideBar";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { BiSolidTag } from "react-icons/bi";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import "./Home.css";
import SingleQuation from "../SingleQuationDisplay";
import { useSearch } from "../SearchContex";
import axiosInstance from "../../utils/AxiosInstance";

const Index = () => {
  const navigate = useNavigate();
  const [QuationsList, setQuations] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [sortType, setSortType] = useState("newest");
  const [showUnanswered, setShowUnanswered] = useState(false);
  const { searchResults, isSearching, resetSearch } = useSearch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/Auth");
    }
  }, [user, navigate]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axiosInstance.get("posts/");
        const questions = response?.data?.quations || [];
        if (response.status === 200) {
          setQuations(questions);
          setFilteredList(questions);
        }
      } catch (error) {
        console.error("Failed to fetch questions:", error?.message || error);
      }
    };

    const getTags = async () => {
      try {
        const response = await axiosInstance.get("tags/");
        if (response.status === 200 && response.data) {
          const uniqueTags = [...new Set(response.data.map((tag) => tag.name))];
          setTags(uniqueTags);
        }
      } catch (error) {
        console.error("Failed to fetch tags:", error?.message || error);
      }
    };

    getQuestions();
    getTags();
    resetSearch(); // Reset search only once on mount
  }, []); // <-- empty dependency array here fixes infinite loop

  useEffect(() => {
    let updated = [...QuationsList];

    if (selectedTag) {
      updated = updated.filter((q) => q.tags.includes(selectedTag));
    }

    if (showUnanswered) {
      updated = updated.filter((q) => !q.answers || q.answers.length === 0);
    }

    if (sortType === "newest") {
      updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortType === "oldest") {
      updated.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortType === "upvotes") {
      updated.sort((a, b) => b.upvote - a.upvote);
    }

    setFilteredList(updated);
  }, [selectedTag, sortType, showUnanswered, QuationsList]);

  const handleClick = (quation) => {
    navigate("/viewQuestion", { state: { quation } });
  };

  // Use searchResults if searching, otherwise filtered list
  const displayList = isSearching ? searchResults : filteredList;

  return (
    <div className="Home-main">
      <Header />
      <div className="outer-main">
        <div className="Quation-main">
          <div className="top">
            <h1>Newest Questions</h1>
            <Link to="/AskQuestion" className="ask-question-button">
              Ask Quation
            </Link>
          </div>

          <div className="mini-header">
            <p className="no_Quations">
              <FaFilter style={{ marginRight: "5px" }} />
              {filteredList.length} questions
            </p>
            <div className="filter-controls">
              <label
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <BiSolidTag /> Tag:
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                >
                  <option value="">All</option>
                  {tags.map((tag, index) => (
                    <option key={index} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </label>

              <label
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                {sortType === "newest" ? (
                  <FaSortAmountDown />
                ) : (
                  <FaSortAmountUp />
                )}{" "}
                Sort:
                <select
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="upvotes">Most Upvoted</option>
                </select>
              </label>

              <label
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <MdOutlineQuestionAnswer />
                <input
                  type="checkbox"
                  checked={showUnanswered}
                  onChange={() => setShowUnanswered((prev) => !prev)}
                />
                Unanswered Only
              </label>
            </div>
          </div>

          <hr />

          <div className="quations">
            {displayList.map((Quation, index) => (
              <React.Fragment key={index}>
                <SingleQuation onClick={handleClick} quation={Quation} />
                <hr />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
