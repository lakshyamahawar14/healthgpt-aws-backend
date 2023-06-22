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
        const dataRef = firebaseAdmin.database().ref(`users`);
        dataRef.once("value").then((snapshot) => {
            const usersData = snapshot.val();
            let usersPosts = [];
            const userIds = Object.keys(usersData);
            userIds.forEach((userId) => {
                if(usersData[userId].posts){
                    const posts = usersData[userId].posts;
                    if(posts !== ""){
                        posts.forEach((post) => {
                          usersPosts.push(post);
                        });
                    }
                }
            });
            return sendSuccessResponse(
                req,
                res,
                { communityposts: usersPosts },
                "Community Posts Fetched Successfully"
            );
        }).catch((error) => {
            return sendFailureResponse(req, res, error.message, "failure");
        })
    } catch (error) {
        console.log(error);
      return sendInternalServerError(req, res, "error");
    }
  };
  
  export { getPosts };
  