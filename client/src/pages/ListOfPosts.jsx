import React from "react";
import { Link } from "react-router-dom";
import images from "../images/images";

function ListOfPosts({ subject, posts, chapters }) {
  const foundChapter = Object.entries(chapters).find(
    (chapter) => chapter[0] === subject
  );
  return (
    <div className="list-of-posts right-bottom-content">
      <h1>
        <img src={images[foundChapter[0]]} />
        &nbsp;
        {foundChapter[1]}
      </h1>
      {posts
        .filter((post) => post.categories.includes(subject))
        .map((post) => (
          <Link key={post._id} to={`/post/${post._id}`}>
            <div className="singlePost">
              <h3 className="singlePost__title">{post.title}</h3>
              <div className="singlePost__date">
                {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default ListOfPosts;
