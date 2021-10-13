import React, { useContext, useEffect, useRef, useState } from "react";
import MainPage from "../pages/MainPage";
import Post from "../pages/Post";
import ListOfPosts from "../pages/ListOfPosts";
import WritePost from "../pages/WritePost";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { Route, NavLink } from "react-router-dom";
import { Context } from "../context/Context";
import UserInfo from "../pages/UserInfo";
import images from "../images/images";
import MarkdownGuide from "./MarkdownGuide";
import { axiosInstance } from "../config";
import Inko from "inko";
let inko = new Inko();

function RightPage({ chapters }) {
  const { user, dispatch } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filteredIndex, setFilteredIndex] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.alert("Logout successful.");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/posts");
      setPosts(res.data.slice().reverse());
      setFilteredPosts(res.data.slice().reverse());
    };
    fetchPosts();
  }, []);

  return (
    <div
      className="right-page"
      onClick={(e) => {
        if (e.target.className === "searchBar") {
          e.preventDefault();
          setDropdown(true);
        } else {
          setDropdown(false);
          setFilteredPosts(posts);
          setFilteredIndex(0);
        }
      }}
    >
      <Route path={["/write", "/post"]}>
        <MarkdownGuide />
      </Route>
      <div className="right-upper">
        <div className="right-upper-inner">
          {user ? (
            <div className="right-upper-left">
              <NavLink to="/" className="right-upper-write userIcon">
                <span>
                  <img
                    src={
                      user.profilePic !== ""
                        ? useRef.profilePic
                        : images.morales
                    }
                    alt="alt"
                  ></img>
                </span>
                <p id="username">{user.username}</p>
              </NavLink>
            </div>
          ) : (
            <div className="right-upper-left">
              <NavLink to="/login" className="right-upper-write userIcon">
                <span>
                  <img src={images.alien} alt="alt"></img>
                </span>
                <p id="username">Visitor</p>
              </NavLink>
            </div>
          )}
          <div className="searchBar-out">
            <button type="submit" className="searchButton">
              <span className="material-icons">search</span>
            </button>
            <input
              className="searchBar"
              placeholder="Search..."
              type="text"
              onChange={(e) => {
                e.preventDefault();
                setKeyword(e.target.value);
                setFilteredPosts(
                  posts.filter((post) =>
                    inko
                      .ko2en(post.title.toLowerCase())
                      .includes(inko.ko2en(keyword.toLowerCase()))
                  )
                );
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  window.location.replace(
                    "/post/" + filteredPosts[filteredIndex]._id
                  );
                }
              }}
              onKeyDown={(e) => {
                const dropdownSelector =
                  document.querySelector(".search-dropdown");
                if (e.code === "ArrowDown") {
                  if (filteredIndex < filteredPosts.length - 1) {
                    setFilteredIndex(filteredIndex + 1);
                    dropdownSelector.scroll(0, filteredIndex * 64.25);
                  } else {
                    setFilteredIndex(0);
                    dropdownSelector.scroll(0, 0);
                  }
                } else if (e.code === "ArrowUp") {
                  if (filteredIndex > 0) {
                    setFilteredIndex(filteredIndex - 1);
                    dropdownSelector.scroll(0, 64.25 * (filteredIndex - 1));
                  } else {
                    setFilteredIndex(filteredPosts.length - 1);
                    dropdownSelector.scroll(0, 10000);
                  }
                }
              }}
            />
            {dropdown && (
              <div className="search-dropdown">
                {filteredPosts.map((post) => (
                  <NavLink
                    to={`/post/${post._id}`}
                    key={post._id}
                    id={post._id}
                    className="dropdown-item"
                  >
                    <h4>
                      {post.title}
                      {filteredPosts[filteredIndex]?._id === post._id && (
                        <span className="material-icons selectIcon">
                          arrow_back_ios
                        </span>
                      )}
                    </h4>

                    <p>{new Date(post.createdAt).toLocaleString()}</p>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
          {!user ? (
            <div className="right-upper-right">
              <NavLink to="/register" className="right-upper-write i1">
                <span className="material-icons">how_to_reg</span>
                <p>Register</p>
              </NavLink>
              <NavLink to="/login" className="right-upper-write i2">
                <span className="material-icons">login</span>
                <p>Login</p>
              </NavLink>
            </div>
          ) : (
            <div className="right-upper-right">
              <NavLink to="/write" className="right-upper-write i1">
                <span className="material-icons">edit</span>
                <p>Post</p>
              </NavLink>
              <NavLink
                to="/"
                className="right-upper-write i2"
                onClick={handleLogout}
              >
                <span className="material-icons">logout</span>
                <p>LogOut</p>
              </NavLink>
            </div>
          )}
        </div>
      </div>
      <div className="right-bottom">
        <div className="right-bottom-inner">
          <Route path="/userinfo">
            <UserInfo />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/write">
            <WritePost chapters={chapters} />
          </Route>
          <Route path="/post">
            <Post
              chapters={chapters}
              updateMode={updateMode}
              setUpdateMode={setUpdateMode}
            />
          </Route>
          {Object.keys(chapters).map((key) => (
            <Route path={"/" + key}>
              <ListOfPosts subject={key} posts={posts} chapters={chapters} />
            </Route>
          ))}
          <Route exact path="/">
            <MainPage posts={posts} chapters={chapters} />
          </Route>
        </div>
      </div>
    </div>
  );
}

export default RightPage;
