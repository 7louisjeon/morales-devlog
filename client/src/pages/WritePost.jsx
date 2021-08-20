import React, { useContext, useState } from "react";
import images from "../images/images";
import { Context } from "../context/Context";
import markdownSample from "../utils/Sample";
import { axiosInstance } from "../config";

function WritePost({ chapters }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const [cat, setCat] = useState([]);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: cat,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axiosInstance.post("/posts", newPost);
      window.alert("Post has been successfully created.");
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  function displayCats(e) {
    e.preventDefault();
    const dropdown = document.querySelector(".dropdown-categories");
    if (dropdown.classList.contains("hidden")) {
      dropdown.classList.remove("hidden");
    } else {
      dropdown.classList.add("hidden");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="right-bottom-inner writePost">
      <h1 className="title">
        <input
          type="text"
          placeholder="Please set the title."
          onChange={(e) => setTitle(e.target.value)}
        />
      </h1>
      <div className="under-title">
        <div className="right-post-item" onClick={displayCats}>
          {!cat[0] ? (
            <div className="left-bar-item-inner">
              <h2>Please select the category.</h2>
              <span className="material-icons">arrow_drop_down</span>
            </div>
          ) : (
            <div className="left-bar-item-inner">
              <img src={images[cat[0]]} alt={cat[0]} />
              <h4>
                {
                  Object.entries(chapters).find(
                    (chapter) => chapter[0] === cat[0]
                  )[1]
                }
              </h4>
              <p>&nbsp; category &nbsp; </p>
              <span className="material-icons"> arrow_drop_down</span>
            </div>
          )}
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
        <input
          type="file"
          className="right-post-item-right publish"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="right-post-item-right publish">
          <h1>Publish</h1>
        </button>
      </div>
      <div className="right-bottom-inner-bottom">
        <div className="right-bottom-content">
          {file && (
            <img src={URL.createObjectURL(file)} className="writePostImg" />
          )}
          <textarea
            rows="1000"
            type="text"
            placeholder={markdownSample}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}

export default WritePost;
