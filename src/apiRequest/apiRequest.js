import axios from "axios";
import { BASE_URL } from "../constants/index";

export const signIn = async (body) => {
  const { data } = await axios.post(`${BASE_URL}/users/signin`, body);
  return data;
};
export const signUp = async (body) => {
  const { data } = await axios.post(`${BASE_URL}/users/signup`, body);
  return data;
};

export const getPosts = async (token) => {
  const { data } = await axios.get(`${BASE_URL}/posts`, {
    headers: { Authorization: token },
  });
  return data;
};
export const createPost = async (token, body) => {
  const { data } = await axios.post(`${BASE_URL}/posts`, body, {
    headers: { Authorization: token },
  });
  return data;
};
export const createComment = async (token, body, postId) => {
  const { data } = await axios.post(`${BASE_URL}/comments/${postId}`, body, {
    headers: { Authorization: token },
  });
  return data;
};
export const getCommentsByPostId = async (token, postId) => {
  const { data } = await axios.get(`${BASE_URL}/comments/${postId}`, {
    headers: { Authorization: token },
  });
  return data;
};

export const getPostById = async (token, id) => {
  const { data } = await axios.get(`${BASE_URL}/posts/${id}`, {
    headers: { Authorization: token },
  });
  return data;
};

export const likePost = async (token, postId, like) => {
  const body = {
    like: like,
  };
  const { data } = await axios.put(`${BASE_URL}/posts/${postId}/like`, body, {
    headers: { Authorization: token },
  });
  return data;
};

export const likeComment = async (token, commentId, like) => {
  const body = {
    like: like,
  };
  const { data } = await axios.put(
    `${BASE_URL}/comments/${commentId}/like`,
    body,
    {
      headers: { Authorization: token },
    }
  );
  return data;
};

export const deletePost = async (token, postId) => {
  const { data } = await axios.delete(`${BASE_URL}/posts/${postId}`, {
    headers: { Authorization: token }
  });
  return data;
};

export const deleteComment = async (token, commentId) => {
  const { data } = await axios.delete(`${BASE_URL}/comments/${commentId}`, {
    headers: { Authorization: token }
  });
  return data;
};

export const editPost = async (token, postId, newContent) => {
  const body = {content: newContent}
  const { data } = await axios.put(`${BASE_URL}/posts/${postId}`, body, {
    headers: { Authorization: token }
  });
  return data;
};

export const editComment = async (token, commentId, newContent) => {
  const body = {content: newContent}
  const { data } = await axios.put(`${BASE_URL}/comments/${commentId}`, body, {
    headers: { Authorization: token }
  });
  return data;
};
