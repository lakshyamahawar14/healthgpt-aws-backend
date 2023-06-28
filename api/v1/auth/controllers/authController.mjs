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
        emailVerified: false,
        // phoneNumber: '+11234567890',
        password: password,
        displayName: username,
        photoURL:
          "https://i.pinimg.com/736x/8b/11/a8/8b11a86980c64720a41ec22332a83115.jpg",
        disabled: false,
      })
      .then((userRecord) => {
        firebaseAdmin
          .database()
          .ref(`users/${userRecord.uid}`)
          .set({
            userId: userRecord.uid,
            username: username,
            email: email,
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
            tasks: [
              {
                url: "/depression",
                name: "Depression Tasks",
                tasks: [
                  {
                    id: 0,
                    title: "Deep Breathing Exercise",
                    description:
                      "Breathe deeply for 5 minutes using your alternate nostrils.",
                    done: false,
                  },
                  {
                    id: 1,
                    title: "Listen to Music",
                    description:
                      "Listen to your favorite music for at least 15 minutes.",
                    done: false,
                  },
                  {
                    id: 2,
                    title: "Journaling",
                    description:
                      "Write a short summary of what you did today and what you plan to do tomorrow.",
                    done: false,
                  },
                  {
                    id: 3,
                    title: "Gratitude List",
                    description:
                      "Write down three things you are grateful for today.",
                    done: false,
                  },
                  {
                    id: 4,
                    title: "Positive Affirmations",
                    description:
                      "Repeat positive affirmations to yourself for 5 minutes.",
                    done: false,
                  },
                ],
              },
              {
                url: "/anxiety",
                name: "Anxiety Tasks",
                tasks: [
                  {
                    id: 0,
                    title: "Progressive Muscle Relaxation",
                    description:
                      "Practice progressive muscle relaxation for 10 minutes.",
                    done: false,
                  },
                  {
                    id: 1,
                    title: "Mindful Breathing",
                    description:
                      "Engage in mindful breathing exercises for 5 minutes.",
                    done: false,
                  },
                  {
                    id: 2,
                    title: "Challenge Negative Thoughts",
                    description:
                      "Identify and challenge negative thoughts using cognitive restructuring techniques.",
                    done: false,
                  },
                  {
                    id: 3,
                    title: "Exposure Therapy",
                    description:
                      "Gradually expose yourself to anxiety-provoking situations.",
                    done: false,
                  },
                  {
                    id: 4,
                    title: "Self-Care Activity",
                    description:
                      "Engage in a self-care activity that brings you joy and relaxation.",
                    done: false,
                  },
                ],
              },
              {
                url: "/ptsd",
                name: "PTSD Tasks",
                tasks: [
                  {
                    id: 0,
                    title: "Grounding Techniques",
                    description:
                      "Practice grounding techniques to stay present in the moment.",
                    done: false,
                  },
                  {
                    id: 1,
                    title: "Relaxation Exercises",
                    description:
                      "Engage in relaxation exercises such as deep breathing or progressive muscle relaxation.",
                    done: false,
                  },
                  {
                    id: 2,
                    title: "Cognitive Processing Therapy",
                    description:
                      "Work through cognitive processing therapy exercises to challenge and reframe traumatic thoughts.",
                    done: false,
                  },
                  {
                    id: 3,
                    title: "Support Network",
                    description:
                      "Reach out to a trusted support network for emotional support.",
                    done: false,
                  },
                  {
                    id: 4,
                    title: "Self-Care Ritual",
                    description:
                      "Establish a self-care ritual that promotes feelings of safety and well-being.",
                    done: false,
                  },
                ],
              },
              {
                url: "/bipolar",
                name: "Bipolar Tasks",
                tasks: [
                  {
                    id: 0,
                    title: "Mood Tracking",
                    description:
                      "Track your mood daily using a mood tracking app or journal.",
                    done: false,
                  },
                  {
                    id: 1,
                    title: "Establish Routine",
                    description:
                      "Create and maintain a consistent daily routine.",
                    done: false,
                  },
                  {
                    id: 2,
                    title: "Medication Adherence",
                    description:
                      "Ensure consistent adherence to prescribed medications.",
                    done: false,
                  },
                  {
                    id: 3,
                    title: "Recognize Warning Signs",
                    description:
                      "Learn to identify early warning signs of mood shifts and take appropriate actions.",
                    done: false,
                  },
                  {
                    id: 4,
                    title: "Psychoeducation",
                    description:
                      "Educate yourself about bipolar disorder and its management strategies.",
                    done: false,
                  },
                ],
              },
              {
                url: "/insomnia",
                name: "Insomnia Tasks",
                tasks: [
                  {
                    id: 0,
                    title: "Sleep Hygiene",
                    description:
                      "Follow good sleep hygiene practices such as maintaining a regular sleep schedule and creating a conducive sleep environment.",
                    done: false,
                  },
                  {
                    id: 1,
                    title: "Relaxation Techniques",
                    description:
                      "Practice relaxation techniques before bedtime, such as deep breathing or progressive muscle relaxation.",
                    done: false,
                  },
                  {
                    id: 2,
                    title: "Limit Stimulants",
                    description:
                      "Avoid consuming stimulants like caffeine or nicotine close to bedtime.",
                    done: false,
                  },
                  {
                    id: 3,
                    title: "Wind-Down Routine",
                    description:
                      "Establish a wind-down routine to signal your body and mind that it's time to sleep.",
                    done: false,
                  },
                  {
                    id: 4,
                    title: "Cognitive Behavioral Therapy for Insomnia (CBT-I)",
                    description:
                      "Engage in CBT-I techniques, such as stimulus control or sleep restriction, as prescribed by a healthcare professional.",
                    done: false,
                  },
                ],
              },
            ],
            scores: [
              { url: "/depression", name: "depression", score: -1 },
              { url: "/anxiety", name: "anxiety", score: -1 },
              { url: "/ptsd", name: "ptsd", score: -1 },
              { url: "/bipolar", name: "bipolar", score: -1 },
              { url: "/insomnia", name: "insomnia", score: -1 },
              {
                url: "/general",
                name: "general",
                scores: "",
              },
            ],
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
          return sendFailureResponse(
            req,
            res,
            "Access Token Expired",
            "failure"
          );
        }
        return sendSuccessResponse(
          req,
          res,
          { expired: true },
          "Access Token Verified Successfully",
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

export { loginUser, signupUser, resetPassword, signoutUser, verifyToken };
