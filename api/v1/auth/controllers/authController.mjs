import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  sendSuccessResponse,
  sendFailureResponse,
} from "../middlewares/responseHandler.mjs";
import {
  sendInternalServerError,
  sendNoParametersSentError,
} from "../middlewares/errorHandler.mjs";

import { firebaseApp } from "../../config/firebase.mjs";
import { firebaseAdmin } from "../../config/firebase-admin.mjs";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.query;

    if (!email || !password) {
      return sendNoParametersSentError(req, res, "error");
    }

    const auth = getAuth(firebaseApp);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return sendSuccessResponse(
          req,
          res,
          { user: user },
          "User Logged-In Successfully",
          "success"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message, "failure");
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const signupUser = async (req, res) => {
  try {
    const { email, username, password, age, gender } = req.body;

    if (!email || !username || !password || !age || !gender) {
      return sendNoParametersSentError(req, res, "error");
    }

    firebaseAdmin
      .auth()
      .createUser({
        email: email,
        // emailVerified: false,
        // phoneNumber: '+11234567890',
        password: password,
        displayName: username,
        // photoURL: 'http://www.example.com/12345678/photo.png',
        // disabled: false,
      })
      .then((userRecord) => {
        firebaseAdmin
          .database()
          .ref(`users/${userRecord.uid}`)
          .set({
            userId: userRecord.uid,
            username: username,
            email: email,
            password: password,
            age: age,
            gender: gender,
            chat: [
              {
                id: 1,
                key: 1,
                userInput: "",
                response: `Hello ${username}, I am Lux, an AI chatbot made to provide mental health support, I'm pleased to see you here, what would you like to talk about today?`,
              },
            ],
            posts: "",
            summary: "",
            symptom: "",
            belief: "",
            depressionScore: [{name: "depression", score: -1}],
            anxietyScore: [{name: "anxiety", score: -1}],
            ptsdScore: [{name: "ptsd", score: -1}],
            bipolarScore: [{name: "bipolar", score: -1}],
            insomniaScore: [{name: "insomnia", score: -1}],
            generalScore: [{name: "depression", score: -1}, {name: "anxiety", score: -1}, {name: "ptsd", score: -1}, {name: "bipolar", score: -1}, {name: "insomnia", score: -1}],
          });

        return sendSuccessResponse(
          req,
          res,
          { user: userRecord },
          "User Created Successfully",
          "success"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message, "failure");
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return sendNoParametersSentError(req, res, "error");
    }

    const auth = getAuth(firebaseApp);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        return sendSuccessResponse(
          req,
          res,
          null,
          "Password Reset Email Sent Successfully",
          "success"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message, "failure");
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const signoutUser = async (req, res) => {
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

        const auth = firebaseAdmin.auth();
        return auth.revokeRefreshTokens(uid);
      })
      .then(() => {
        const auth = getAuth(firebaseApp);
        return signOut(auth);
      })
      .then(() => {
        return sendSuccessResponse(
          req,
          res,
          null,
          "User Signed-Out Successfully",
          "success"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message, "failure");
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const verifyToken = async (req, res) => {
  try{
    const { userId, accessToken } = req.query;
    
    if(!userId || !accessToken){
      return sendNoParametersSentError(req, res, "error");
    }

    firebaseAdmin
      .auth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        if (uid !== userId) {
          return sendFailureResponse(req, res, "Access Token Expired", "failure");
        }
        return sendSuccessResponse(req, res, {expired: true}, "Access Token Verified Successfully", "success");
      }).catch((error) => {
        return sendFailureResponse(req, res, error.message, "failure");
      })
  }
  catch(error){
    return sendInternalServerError(req, res, "error");
  }
}

export { loginUser, signupUser, resetPassword, signoutUser, verifyToken };
