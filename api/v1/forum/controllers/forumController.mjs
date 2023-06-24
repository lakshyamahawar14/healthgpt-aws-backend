import {
  sendInternalServerError,
  sendNoParametersSentError,
} from "../middlewares/errorHandler.mjs";
import {
  sendFailureResponse,
  sendSuccessResponse,
} from "../middlewares/responseHandler.mjs";

import { firebaseAdmin } from "../../config/firebase-admin.mjs";

const getPosts = async (req, res) => {
  try {
    let searchQuery = req.query.searchQuery;
    const numberOfResults = req.query.numberOfResults;

    if (!numberOfResults) {
      return sendNoParametersSentError(req, res, "error");
    }

    if (searchQuery && searchQuery.charAt(0) !== "/") {
      searchQuery = "/" + searchQuery;
    }

    const dataRef = firebaseAdmin.database().ref(`users`);
    dataRef
      .once("value")
      .then((snapshot) => {
        const usersData = snapshot.val();
        let usersPosts = [];
        const userIds = Object.keys(usersData);

        userIds.forEach((userId) => {
          if (usersData[userId].posts) {
            const posts = usersData[userId].posts;
            if (posts !== "") {
              posts.forEach((post) => {
                if (searchQuery) {
                  const tags = post.tags;
                  if (tags.includes(searchQuery)) {
                    const selectedPost = {
                      title: post.title,
                      date: post.date,
                      description: post.description,
                      username: post.username,
                      userId: post.userId,
                      postId: post.postId,
                      tags: post.tags,
                    };
                    usersPosts.push(selectedPost);
                  }
                } else {
                  const selectedPost = {
                    title: post.title,
                    date: post.date,
                    description: post.description,
                    username: post.username,
                    userId: post.userId,
                    postId: post.postId,
                    tags: post.tags,
                  };
                  usersPosts.push(selectedPost);
                }
              });
            }
          }
        });

        usersPosts.sort((a, b) => {
          const dateA = new Date(usersData[a.userId].date);
          const dateB = new Date(usersData[b.userId].date);
          return dateB - dateA;
        });

        usersPosts.reverse();

        const recentPosts = usersPosts.slice(0, numberOfResults);

        return sendSuccessResponse(
          req,
          res,
          { communityposts: recentPosts },
          "Community Posts Fetched Successfully"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message, "failure");
      });
  } catch (error) {
    console.log(error);
    return sendInternalServerError(req, res, "error");
  }
};

const getPost = async (req, res) => {
  try {
    const userId = req.query.userId;
    const accessToken = req.query.accessToken;
    const postId = req.query.postId;

    if (!userId || !accessToken || !postId) {
      return sendNoParametersSentError(req, res, "error");
    }

    firebaseAdmin
      .auth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        if (uid !== userId) {
          throw new Error(
            "Access denied: userId does not match the token's UID"
          );
        }
        const postUserId = postId.substring(0, 28);
        const dataRef = firebaseAdmin
          .database()
          .ref(`users/${postUserId}/posts`);
        return dataRef.once("value");
      })
      .then((snapshot) => {
        const data = snapshot.val();
        let post = {};
        data.forEach((p) => {
          if (p.postId === postId) {
            post = p;
            return;
          }
        });

        return sendSuccessResponse(
          req,
          res,
          { post: post },
          "Post Fetched Successfully"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message, "failure");
      });
  } catch (error) {
    console.log(error);
    return sendInternalServerError(req, res, "error");
  }
};

const updateComments = async (req, res) => {
  try {
    const { userId, accessToken, postId, comment } = req.body;

    if (!userId || !accessToken || !postId || !comment) {
      return sendNoParametersSentError(req, res, "error");
    }

    firebaseAdmin
      .auth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        if (uid !== userId) {
          throw new Error(
            "Access denied: userId does not match the token's UID"
          );
        }
        const postUserId = postId.substring(0, 28);
        const dataRef = firebaseAdmin
          .database()
          .ref(`users/${postUserId}/posts`);
        return dataRef.once("value");
      })
      .then((snapshot) => {
        const data = snapshot.val();
        let updatedPosts = [];

        data.forEach((p) => {
          if (p.postId === postId) {
            const updatedComments = [...p.comments, comment];
            p.comments = updatedComments;
          }
          updatedPosts.push(p);
        });

        const postUserId = postId.substring(0, 28);
        const userRef = firebaseAdmin.database().ref(`users/${postUserId}`);
        return userRef.update({ posts: updatedPosts });
      })
      .then(() => {
        return sendSuccessResponse(
          req,
          res,
          null,
          "Comments Updated Successfully"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message, "failure");
      });
  } catch (error) {
    console.log(error);
    return sendInternalServerError(req, res, "error");
  }
};

export { getPosts, getPost, updateComments };
