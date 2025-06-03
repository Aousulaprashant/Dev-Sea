import React, { useEffect, useState, useRef, useContext } from "react";
import Logo from "../../IMG/dev-logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Slice/UserSlice";
import { MdSearch } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import defaultAvtor from "../../IMG/profile-avetar.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./hearder.css";
import { SearchContext, useSearch } from "../SearchContex";
import axiosInstance from "../../utils/AxiosInstance";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceTimeout = useRef(null);

  const { setSearchResults, setIsSearching } = useSearch();
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetchSearchResults(query);
    }, 300); // 300ms debounce
  }, [query]);

  const fetchSearchResults = async (searchTerm) => {
    try {
      const { data } = await axiosInstance.get(
        `/posts/search?q=${encodeURIComponent(searchTerm)}`
      );
      setSearchResults(data);
      console.log(data);
      setIsSearching(true);
    } catch (error) {
      console.error("Search API error:", error);
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  // When user clicks on a search result
  const onSelectResult = (id) => {
    setShowDropdown(false);
    setQuery("");
    navigate(`/questions/${id}`); // assuming question details route
  };

  return (
    <div className="main-header">
      <div className="logo" onClick={handleHome}>
        <img className="logo-img" src={Logo} alt="logo" />
        <h3 className="logo-text">
          Dev<span>Sea</span>
        </h3>
      </div>

      <div className="search" style={{ position: "relative" }}>
        <div className="search-logo">
          <MdSearch className="search-icon" size={30} />
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // delay for click
        />
      </div>

      <div className="end">
        <img className="avtar" src={defaultAvtor} alt="avatar" />
        <IoIosLogOut className="logout-bnt" onClick={handleLogout} size={40} />
      </div>
    </div>
  );
};

export default Header;
