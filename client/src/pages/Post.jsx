import React, { useContext } from "react";
import { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import { useLocation } from "react-router";
import images from "../images/images";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import { axiosInstance } from "../config";
function Post({ chapters, updateMode, setUpdateMode }) {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({ title: "Loading...", categories: [""] });
  const [matchingChapter, setMatchingChapter] = useState([
    "devlog",
    "Loading...",
  ]);
  const [content, setContent] = useState();
  const PF = "https://morales-devlog.herokuapp.com/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState([]);
  const [file, setFile] = useState("");
  const [fileChanged, setFileChanged] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/posts/" + path);
      setPost(res.data);
      const foundChapter = Object.entries(chapters).find(
        (entry) => entry[0] === res.data.categories[0]
      );
      {
        foundChapter ? setMatchingChapter(foundChapter) : console.log("hi");
      }
      setContent(<Markdown>{res.data.desc}</Markdown>);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setCat(res.data.categories);
      setFile(res.data.photo ? res.data.photo : "");
    };
    getPost();
  }, [path]);

  function displayCats(e) {
    e.preventDefault();
    const dropdown = document.querySelector(".dropdown-categories");
    if (dropdown.classList.contains("hidden")) {
      dropdown.classList.remove("hidden");
    } else {
      dropdown.classList.add("hidden");
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const editedPost = {
        username: user.username,
        title,
        desc,
        categories: cat,
      };
      if (fileChanged) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        editedPost.photo = filename;
        try {
          await axiosInstance.post("/upload", data);
        } catch (err) {}
      }
      await axiosInstance.put(`/posts/${post._id}`, editedPost);
      setUpdateMode(false);
      window.location.replace("/post/" + post._id);
    } catch (err) {}
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("Do you want to delete this post?")) {
      try {
        await axiosInstance.delete("/posts/" + path, {
          data: { username: user.username },
        });
        alert("Post deleted.");
        window.location.replace("/");
      } catch (err) {
        alert("Error occured.");
      }
    }
  };

  return (
    <form onSubmit={handleUpdate} className="right-bottom-inner posting">
      <h1 className="title">
        {updateMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          post.title
        )}
      </h1>
      <div className="under-title">
        {updateMode ? (
          <div className="right-post-item" onClick={displayCats}>
            <div className="left-bar-item-inner">
              <img src={images[cat[0] ? cat[0] : "devlog"]} alt={cat[0]} />
              <h4>
                {cat[0]
                  ? Object.entries(chapters).find(
                      (chapter) => chapter[0] === cat[0]
                    )[1]
                  : ""}
              </h4>
              <p>&nbsp; category &nbsp; </p>
              <span className="material-icons"> arrow_drop_down</span>
            </div>

            <div className="dropdown-categories hidden">
              {Object.entries(chapters).map((entry) => (
                <div
                  key={entry[0]}
                  className="dropdown-category"
                  onClick={(e) => {
                    e.preventDefault();
                    setCat([entry[0]]);
                  }}
                >
                  <img src={images[entry[0]]} />
                  <p>{entry[1]}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="right-post-item">
            <Link to={"/" + matchingChapter[0]}>
              <div className="left-bar-item-inner">
                <img
                  src={images[matchingChapter[0]]}
                  alt={matchingChapter[1]}
                />
                <h2>{matchingChapter ? matchingChapter[1] : ""}</h2>
              </div>
            </Link>
          </div>
        )}
        {updateMode ? (
          <div className="right-post-item-container">
            <input
              type="file"
              className="right-post-item-right publish"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setFileChanged(true);
              }}
            />
            <button type="submit" className="right-post-item-right publish">
              <h1>Update Post</h1>
            </button>
          </div>
        ) : (
          <div className="right-post-item-right">
            <div className="circles-container">
              {post.username === user?.username ? (
                <div className="miniBtnContainer">
                  <h1>○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○</h1>
                  <button
                    className="miniBtn"
                    onClick={() => setUpdateMode(true)}
                  >
                    Edit Post
                  </button>
                  <button className="miniBtn" onClick={handleDelete}>
                    Delete Post
                  </button>
                </div>
              ) : (
                <h1>○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○</h1>
              )}
            </div>
            <p className="date-and-time">
              by {post.username} &nbsp; on &nbsp;
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
      <div className="right-bottom-inner-bottom">
        {updateMode ? (
          <div className="right-bottom-content">
            {file && <img src={PF + file} className="writePostImg" />}
            <textarea
              rows="1000"
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        ) : (
          <div className="right-bottom-content">
            {post.photo && <img src={PF + post.photo} className="postImg" />}
            {content}
          </div>
        )}
      </div>
    </form>
  );
}

export default Post;
