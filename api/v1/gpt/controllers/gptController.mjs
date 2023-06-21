import {
  sendSuccessResponse,
  sendFailureResponse,
} from "../middlewares/responseHandler.mjs";
import {
  sendInternalServerError,
  sendNoParametersSentError,
} from "../middlewares/errorHandler.mjs";

import { openaiApp } from "../../config/openapi.mjs";
import { firebaseAdmin } from "../../config/firebase-admin.mjs";

import {
  fetchUserChat,
  formatChat,
  convertChatToString,
  getSystemRoleMessage,
} from "../data/dao/gptDao.mjs";

const getTurboResponse = async (req, res) => {
  try {
    const { userId, userInput, accessToken, numberOfMessages } = req.query;

    if (!userId || !userInput || !accessToken) {
      return sendNoParametersSentError(req, res, "error");
    }

    firebaseAdmin
      .auth()
      .verifyIdToken(accessToken)
      .then(() => {
        fetchUserChat(req, res, userId, accessToken)
          .then((userChat) => {
            formatChat(req, res, userChat, numberOfMessages)
              .then((chat) => {
                getSystemRoleMessage(
                  req,
                  res,
                  userId,
                  accessToken,
                  chat,
                  numberOfMessages
                ).then((systemRole) => {
                  let systemRoleMessage = systemRole;
                  let systemRoleRestriction = `You must give an answer in no more than 2 sentences, and each sentence must be as short as possible.`;
                  chat.unshift({
                    role: "system",
                    content: systemRoleMessage,
                  });
                  chat.push({
                    role: "user",
                    content: userInput,
                  });
                  chat.push({
                    role: "system",
                    content: systemRoleRestriction,
                  });
                  openaiApp
                    .createChatCompletion({
                      model: "gpt-3.5-turbo",
                      messages: chat,
                    })
                    .then((response) => {
                      return sendSuccessResponse(
                        req,
                        res,
                        {
                          response: response.data.choices[0].message,
                        },
                        "Fetched GPT Response Successfully",
                        "success"
                      );
                    })
                    .catch((error) => {
                      return sendFailureResponse(
                        req,
                        res,
                        error.message,
                        "failure"
                      );
                    });
                });
              })
              .catch((error) => {
                return sendFailureResponse(req, res, error.message, "failure");
              });
          })
          .catch((error) => {
            return sendFailureResponse(req, res, error.message, "failure");
          });
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message, "failure");
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const getAdaSummary = async (req, res) => {
  try {
    const { userId, accessToken, numberOfMessages } = req.query;

    if (!userId || !accessToken) {
      return sendNoParametersSentError(req, res, "error");
    }

    fetchUserChat(req, res, userId, accessToken)
      .then((userChat) => {
        const summaryString =
          "\nThis is the conversation between a user and his therapist. You have to analyze this between a user and a mental health therapist. You have to tell in brief about what mental issue the user might be having *recently*.\n";

        convertChatToString(req, res, userChat, summaryString, numberOfMessages)
          .then((chat) => {
            openaiApp
              .createCompletion({
                model: "text-ada-001",
                prompt: chat,
                temperature: 1,
                max_tokens: 60,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
              })
              .then((response) => {
                return sendSuccessResponse(
                  req,
                  res,
                  { summary: response.data.choices[0].text },
                  "Fetched GPT Summary Successfully",
                  "success"
                );
              })
              .catch((error) => {
                return sendFailureResponse(req, res, error.message, "failure");
              });
          })
          .catch((error) => {
            return sendFailureResponse(req, res, error.message, "failure");
          });
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message, "failure");
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const getDavinciSummary = async (req, res) => {
  try {
    const { userId, accessToken, numberOfMessages } = req.query;

    if (!userId || !accessToken) {
      return sendNoParametersSentError(req, res, "error");
    }

    fetchUserChat(req, res, userId, accessToken)
      .then((userChat) => {
        const summaryString =
          "\nThis is the conversation between a user and a mental health therapist. Tell in brief about what mental issue the user might be having *recently*?.\n";

        convertChatToString(req, res, userChat, summaryString, numberOfMessages)
          .then((chat) => {
            openaiApp
              .createCompletion({
                model: "text-davinci-003",
                prompt: chat,
                temperature: 1,
                max_tokens: 60,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
              })
              .then((response) => {
                return sendSuccessResponse(
                  req,
                  res,
                  { summary: response.data.choices[0].text },
                  "Fetched GPT Summary Successfully",
                  "success"
                );
              })
              .catch((error) => {
                return sendFailureResponse(req, res, error.message, "failure");
              });
          })
          .catch((error) => {
            return sendFailureResponse(req, res, error.message, "failure");
          });
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message, "failure");
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const getDavinciUserBelief = async (req, res) => {
  try {
    const { userId, accessToken, numberOfMessages } = req.query;

    if (!userId || !accessToken) {
      return sendNoParametersSentError(req, res, "error");
    }

    fetchUserChat(req, res, userId, accessToken)
      .then((userChat) => {
        const beliefString =
          "\nThis is the conversation between a user and a mental health therapist. From this conversation determine if the patient has any negative beliefs. Remember that you have to consider user's latest message. If user says that he's not experiencing any symptoms or negative beliefs, your response must be a 'No'. If user's latest message says that he is experiencing negative beliefs, your response must be a 'Yes', followed by that negative belief.";

        convertChatToString(req, res, userChat, beliefString, numberOfMessages)
          .then((chat) => {
            openaiApp
              .createCompletion({
                model: "text-davinci-003",
                prompt: chat,
                temperature: 1,
                max_tokens: 30,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
              })
              .then((response) => {
                return sendSuccessResponse(
                  req,
                  res,
                  { belief: response.data.choices[0].text },
                  "Fetched GPT Belief Successfully",
                  "success"
                );
              })
              .catch((error) => {
                return sendFailureResponse(req, res, error.message, "failure");
              });
          })
          .catch((error) => {
            return sendFailureResponse(req, res, error.message, "failure");
          });
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message, "failure");
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const getDavinciUserSymptom = async (req, res) => {
  try {
    const { userId, accessToken, numberOfMessages } = req.query;

    if (!userId || !accessToken) {
      return sendNoParametersSentError(req, res, "error");
    }

    fetchUserChat(req, res, userId, accessToken)
      .then((userChat) => {
        const symptomString =
          "\nThis is the conversation between a user and a mental health therapist. From this conversation, You have to determine, with which mental illness the user might be suffering from. Remember that you have to consider user's latest message. If, the user says he/she is not experiencing the symptoms anymore or he/she is now fine, your response must be a'no'. Otherwise, your response must be the name of the mental illness, from which the symptom belongs. Your choices for choosing mental illness is in this array of mental illness: ['anxiety', 'ptsd', 'trauma', 'short term memory loss', 'schizophrenia', 'autism', 'insomnia', 'depression', 'phobia', 'bipolar disorder', 'borderline personality disorder', 'alzheimer', 'adhd', 'headache', 'other']. That mental illness *must be one from the array* of mental illness provided. You must have to respond in *one word only*, the name of the mental illness.";

        convertChatToString(req, res, userChat, symptomString, numberOfMessages)
          .then((chat) => {
            openaiApp
              .createCompletion({
                model: "text-davinci-003",
                prompt: chat,
                temperature: 1,
                max_tokens: 30,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
              })
              .then((response) => {
                return sendSuccessResponse(
                  req,
                  res,
                  { symptom: response.data.choices[0].text },
                  "Fetched GPT Symptom Successfully",
                  "success"
                );
              })
              .catch((error) => {
                return sendFailureResponse(req, res, error.message, "failure");
              });
          })
          .catch((error) => {
            return sendFailureResponse(req, res, error.message, "failure");
          });
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message, "failure");
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

export {
  getTurboResponse,
  getAdaSummary,
  getDavinciSummary,
  getDavinciUserBelief,
  getDavinciUserSymptom
};
