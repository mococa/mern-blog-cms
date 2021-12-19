import React, { useEffect, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import styled from "styled-components";
import { AuthAPI } from "../api/auth";
import { PostsAPI } from "../api/posts";
import { clearAllCookies } from "../helper";
const TAGS = [
  "Node",
  "JavaScript",
  "React",
  "HTML",
  "CSS",
  "Mongo",
  "SQL",
  "Bash",
  "Python",
  "DevOps",
  "GIT",
];
const suggestions = TAGS.map((tag) => {
  return {
    id: tag,
    text: tag,
  };
});
const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

function AuthAndGo({ markdown, clearMarkdown }) {
  const [tags, setTags] = useState([]);
  const [user, setUser] = useState();
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };
  useEffect(() => {
    AuthAPI.byJWT().then(({ data }) => setUser(data));
  }, []);
  const handleAddition = (tag) => {
    if (!TAGS.includes(tag?.text)) return;
    setTags([...tags, tag]);
  };
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const getProp = (prop) => e.target?.[prop]?.value;
    if (!user) {
      const username = getProp("username");
      const password = getProp("password");
      AuthAPI.login({ username, password })
        .then(({ data }) => {
          setUser(data?.user);
        })
        .catch((err) => {
          console.error(err);
          alert(err.response?.data?.message || "An unexpected error occured");
        });
    } else {
      const title = getProp("title");
      PostsAPI.create({
        content: markdown,
        tags: tags.map((tag) => tag.id),
        subject: tags[0]?.id,
        title,
      })
        .then(({ data }) => {
          alert("Post succesfully created");
          e.target["title"].value = "";
          setTags([]);
          clearMarkdown();
        })
        .catch((err) => {
          console.error(err);
          alert(err.response?.data?.message || "An unexpected error occured");
        });
    }
  };
  return (
    <StyledForm onSubmit={onSubmit}>
      {!user && (
        <>
          <label>
            Username: <input required type="text" name="username" />
          </label>
          <label>
            Password: <input required type="password" name="password" />
          </label>
        </>
      )}
      {user && (
        <>
          <label>
            Title: <input required type="text" name="title" />
          </label>
          <label>Tags:</label>
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            autocomplete
          />
          <label>Subject: {tags[0]?.text}</label>
        </>
      )}
      {user && (
        <label>
          Logged in as {user.username}
          {" -  "}
          <label
            style={{ color: "tomato", cursor: "pointer" }}
            onClick={() => {
              clearAllCookies();
              setUser(null);
            }}
          >
            Logout
          </label>
        </label>
      )}
      <button>{user ? "Post" : "Login"}</button>
    </StyledForm>
  );
}
const StyledForm = styled.form`
  margin: 8px;
  display: flex;
  flex-flow: column;
  gap: 8px;
  max-width: 500px;
`;
export default AuthAndGo;
