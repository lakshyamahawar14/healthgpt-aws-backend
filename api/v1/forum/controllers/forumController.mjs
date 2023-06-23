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
                    usersPosts.push(post);
                  }
                } else {
                  usersPosts.push(post);
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

export { getPosts };
