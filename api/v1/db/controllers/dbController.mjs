import {
  sendSuccessResponse,
  sendFailureResponse,
} from "../middlewares/responseHandler.mjs";
import {
  sendInternalServerError,
  sendNoParametersSentError,
} from "../middlewares/errorHandler.mjs";

import { firebaseAdmin } from "../../config/firebase-admin.mjs";

const getChat = async (req, res) => {
  try {
    const userId = req.query.userId;
    const accessToken = req.query.accessToken;

    if (!userId || !accessToken) {
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

        const dataRef = firebaseAdmin.database().ref(`users/${userId}/chat`);

        return dataRef.once("value");
      })
      .then((snapshot) => {
        const data = snapshot.val();

        return sendSuccessResponse(
          req,
          res,
          { chat: data },
          "Chat Fetched Successfully"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message);
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const updateChat = async (req, res) => {
  try {
    const { userId, accessToken, chatObject } = req.body;
    if (!userId || !chatObject || !accessToken) {
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

        const dataRef = firebaseAdmin.database().ref(`users/${userId}/chat`);

        return dataRef.once("value");
      })
      .then((snapshot) => {
        const chat = snapshot.val();
        const previousChat = chat[chat.length - 1];

        const currentDate = new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        const updatedChatObject = {
          ...chatObject,
          id: previousChat ? previousChat.id + 1 : 1,
          key: previousChat ? previousChat.key + 1 : 1,
          date: currentDate,
        };

        const updatedChat = [...chat, updatedChatObject];

        const userRef = firebaseAdmin.database().ref(`users/${userId}`);
        return userRef.update({ chat: updatedChat });
      })
      .then(() => {
        return sendSuccessResponse(req, res, null, "Chat Updated Successfully");
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message);
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const getSymptom = async (req, res) => {
  try {
    const userId = req.query.userId;
    const accessToken = req.query.accessToken;

    if (!userId || !accessToken) {
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

        const dataRef = firebaseAdmin.database().ref(`users/${userId}/symptom`);

        return dataRef.once("value");
      })
      .then((snapshot) => {
        const data = snapshot.val();

        return sendSuccessResponse(
          req,
          res,
          { symptom: data },
          "Symptom Fetched Successfully"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message);
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const updateSymptom = async (req, res) => {
  try {
    const { userId, accessToken, symptom } = req.body;
    if (!userId || !symptom || !accessToken) {
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

        const dataRef = firebaseAdmin.database().ref(`users/${userId}/symptom`);

        return dataRef.once("value");
      })
      .then((snapshot) => {
        const userRef = firebaseAdmin.database().ref(`users/${userId}`);
        return userRef.update({ symptom });
      })
      .then(() => {
        return sendSuccessResponse(
          req,
          res,
          null,
          "Symptom Updated Successfully"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message);
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const getUserData = async (req, res) => {
  try {
    const { userId, accessToken } = req.query;
    if (!userId || !accessToken) {
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

        const dataRef = firebaseAdmin.database().ref(`users/${userId}`);

        return dataRef.once("value");
      })
      .then((snapshot) => {
        const data = snapshot.val();

        return sendSuccessResponse(
          req,
          res,
          { userData: data },
          "User Database Retrieved Successfully"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message);
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const getSummary = async (req, res) => {
  try {
    const userId = req.query.userId;
    const accessToken = req.query.accessToken;

    if (!userId || !accessToken) {
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

        const dataRef = firebaseAdmin.database().ref(`users/${userId}/summary`);

        return dataRef.once("value");
      })
      .then((snapshot) => {
        const data = snapshot.val();

        return sendSuccessResponse(
          req,
          res,
          { summary: data },
          "Summary Fetched Successfully"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message);
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const updateSummary = async (req, res) => {
  try {
    const { userId, accessToken, summary } = req.body;
    if (!userId || !summary || !accessToken) {
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

        const dataRef = firebaseAdmin.database().ref(`users/${userId}/summary`);

        return dataRef.once("value");
      })
      .then((snapshot) => {
        const userRef = firebaseAdmin.database().ref(`users/${userId}`);
        return userRef.update({ summary });
      })
      .then(() => {
        return sendSuccessResponse(
          req,
          res,
          null,
          "Summary Updated Successfully"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message);
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const getBelief = async (req, res) => {
  try {
    const userId = req.query.userId;
    const accessToken = req.query.accessToken;

    if (!userId || !accessToken) {
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

        const dataRef = firebaseAdmin.database().ref(`users/${userId}/belief`);

        return dataRef.once("value");
      })
      .then((snapshot) => {
        const data = snapshot.val();

        return sendSuccessResponse(
          req,
          res,
          { belief: data },
          "User Belief Fetched Successfully"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message);
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const updateBelief = async (req, res) => {
  try {
    const { userId, accessToken, belief } = req.body;
    if (!userId || !belief || !accessToken) {
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

        const dataRef = firebaseAdmin.database().ref(`users/${userId}/belief`);

        return dataRef.once("value");
      })
      .then((snapshot) => {
        const userRef = firebaseAdmin.database().ref(`users/${userId}`);
        return userRef.update({ belief });
      })
      .then(() => {
        return sendSuccessResponse(
          req,
          res,
          null,
          "User Belief Updated Successfully"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message);
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const getScore = async (req, res) => {
  try {
    const userId = req.query.userId;
    const accessToken = req.query.accessToken;
    const url = req.query.url;

    if (!userId || !accessToken || !url) {
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

        const dataRef = firebaseAdmin.database().ref(`users/${userId}/scores`);

        return dataRef.once("value");
      })
      .then((snapshot) => {
        const data = snapshot.val();
        let score = "";
        data.forEach((s) => {
          if (s.url === url) {
            score = s;
            return;
          }
        });
        if (score === "") {
          return sendFailureResponse(
            req,
            res,
            "No Score found with given Url",
            "failure"
          );
        }
        return sendSuccessResponse(
          req,
          res,
          { score: score },
          "Score Fetched Successfully"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message);
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const updateScore = async (req, res) => {
  try {
    const { userId, accessToken, url, scoreObj } = req.body;

    if (!userId || !accessToken || !url || !scoreObj) {
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
        const dataRef = firebaseAdmin.database().ref(`users/${userId}/scores`);

        return dataRef.once("value");
      })
      .then((snapshot) => {
        if (url === "/general") {
          let score = scoreObj;
          const oldScores = snapshot.val();
          const userRef = firebaseAdmin.database().ref(`users/${userId}`);
          let newScores = [];
          oldScores.forEach((s) => {
            if (s.url === "/general") {
              s.scores = score;
            }
            newScores.push(s);
          });
          return userRef.update({ scores: newScores });
        } else {
          let score = scoreObj[0].score;
          const oldScores = snapshot.val();
          const userRef = firebaseAdmin.database().ref(`users/${userId}`);
          let newScores = [];
          oldScores.forEach((s) => {
            if (s.url === url) {
              s.score = score;
            }
            newScores.push(s);
          });
          return userRef.update({ scores: newScores });
        }
      })
      .then(() => {
        return sendSuccessResponse(
          req,
          res,
          null,
          "Score Updated Successfully"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message);
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const getUserPosts = async (req, res) => {
  try {
    const userId = req.query.userId;
    const accessToken = req.query.accessToken;

    if (!userId || !accessToken) {
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

        const dataRef = firebaseAdmin.database().ref(`users/${userId}/posts`);

        return dataRef.once("value");
      })
      .then((snapshot) => {
        const data = snapshot.val();

        return sendSuccessResponse(
          req,
          res,
          { posts: data },
          "User Posts Fetched Successfully"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message);
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const updateUserPosts = async (req, res) => {
  try {
    const { userId, accessToken, postObject } = req.body;
    if (!userId || !postObject || !accessToken) {
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

        const dataRef = firebaseAdmin.database().ref(`users/${userId}/posts`);

        return dataRef.once("value");
      })
      .then((snapshot) => {
        const posts = snapshot.val();
        const previousPosts = posts[posts.length - 1];

        const previousPostIdNumber = previousPosts
          ? parseInt(previousPosts.postId.split(userId)[1])
          : 0;
        const updatedPostsObject = {
          ...postObject,
          postId: userId + (previousPosts ? previousPostIdNumber + 1 : 1),
        };

        const updatedPosts = [...posts, updatedPostsObject];

        const userRef = firebaseAdmin.database().ref(`users/${userId}`);
        return userRef.update({ posts: updatedPosts });
      })
      .then(() => {
        return sendSuccessResponse(
          req,
          res,
          null,
          "User Posts Updated Successfully"
        );
      })
      .catch((error) => {
        console.log(error);
        return sendFailureResponse(req, res, error.message);
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

export {
  getChat,
  updateChat,
  getSymptom,
  updateSymptom,
  getUserData,
  getSummary,
  updateSummary,
  getBelief,
  updateBelief,
  getScore,
  updateScore,
  getUserPosts,
  updateUserPosts,
};
