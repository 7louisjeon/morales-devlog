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
        MORALES의 개발 블로그에 오신 것을 환영합니다.
      </h1>
      <p>
        이 웹사이트는{" "}
        <a href="https://github.com/7louisjeon" target="_blank">
          @7louisjeon
        </a>
        에 의해 MERN스택으로 디자인되고 제작되었습니다. 누구나 가입, 로그인을
        하고 이미지와 마크다운 텍스트를 이용한 계시물을 작성할 수 있습니다.
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
