import React from "react";
import { Link } from "react-router-dom";
import images from "../images/images";

function MainPage({ posts, chapters }) {
  return (
    <div className="right-bottom-content main-page">
      <h1 className="right-bottom-title">
        <img
          src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/285/spider_1f577-fe0f.png"
          alt="e"
        />{" "}
        Welcome to my web dev blog.
      </h1>
      <p>
        This website has been designed and created by{" "}
        <a href="https://github.com/7louisjeon" target="_blank">
          @7louisjeon
        </a>{" "}
        for an academic purpose. Anyone can register, login and post markdown
        texts and image files.
      </p>
      <div className="right-bottom-content-bottom">
        {Object.entries(chapters).map((entry) => (
          <div key={entry[0]} className="card">
            <Link to={"/" + entry[0]}>
              <h2>
                <img
                  src={images[entry[0]]}
                  alt={entry[1]}
                  className="cardImg"
                />
                {entry[1]}
              </h2>
            </Link>
            {posts.length > 0 ? (
              posts
                .filter((post) => post.categories.includes(entry[0]))
                .slice(0, 3)
                .map((post) => (
                  <div key={post._id} className="mainPage-postBlock">
                    <p>
                      <Link to={`/post/${post._id}`}>{post.title}</Link>
                    </p>
                    <p>
                      <Link to={`/post/${post._id}`}>
                        {new Date(post.createdAt).toLocaleString()}
                      </Link>
                    </p>
                  </div>
                ))
            ) : (
              <h3 className="mainPage-postBlock">Loading data...</h3>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
