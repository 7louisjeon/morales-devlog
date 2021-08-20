import React, { useState } from "react";
import Markdown from "markdown-to-jsx";
import markdownSample from "../utils/Sample";

function MarkdownGuide() {
  const [guide, setGuide] = useState(false);
  return (
    <div>
      <button
        className="markdown-guide"
        onClick={(e) => {
          e.preventDefault();
          setGuide(!guide);
        }}
      >
        {guide ? (
          <h2>
            Close
            <br />
            guide
            <br />
            for
            <br />
            writing
            <br />
            markdown
            <br />
            text
          </h2>
        ) : (
          <h2>
            Guide
            <br />
            for
            <br />
            writing
            <br />
            markdown
            <br />
            text
          </h2>
        )}
      </button>
      {guide && (
        <section class="markdown-guide-content">
          <div className="guide-left">
            <h1 className="guide-top">RESULT</h1>
            <Markdown>{markdownSample}</Markdown>
          </div>
          <div className="guide-right">
            <h1 className="guide-top">Markdown Text</h1>
            <pre>{markdownSample}</pre>
          </div>
        </section>
      )}
    </div>
  );
}

export default MarkdownGuide;
