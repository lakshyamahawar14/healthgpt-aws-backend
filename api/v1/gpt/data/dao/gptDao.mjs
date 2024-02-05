import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "..",
  "vars",
  ".env"
);

dotenv.config({ path: envPath });

import axios from "axios";

const fetchUserChat = async (req, res, userId, accessToken) => {
  const response = await axios.get(
    `http://localhost:${process.env.DATABASE_API_PORT}/api/v1/db/chat?userId=${userId}&accessToken=${accessToken}`
  );
  return response.data.data.chat;
};

const formatChat = async (req, res, userChat, numberOfMessages=null) => {
  let chat = [];
  let i;
  let startChat = numberOfMessages || userChat.length;
  for (i = userChat.length-startChat; i < userChat.length; ++i) {
    chat.push({ role: "user", content: userChat[i].userInput });
    chat.push({ role: "assistant", content: userChat[i].response });
  }
  return chat;
};

const convertChatToString = async (req, res, userChat, targetString, numberOfMessages=null) => {
  let chat = "";
  let i;
  let startChat = numberOfMessages || userChat.length;
  for (i = userChat.length-startChat; i < userChat.length; ++i) {
    chat += `user: ${userChat[i].userInput}\n`;
    chat += `therapist: ${userChat[i].response}\n`;
  }
  chat += targetString;

  return chat;
};

const getSystemRoleMessage = async (
  req,
  res,
  userId,
  accessToken,
  chat,
  numMsg = null
) => {
  let defaultString = `You are a mental health therapist providing online therapy to the user. You must keep this conversation in your memory and answer the user's message at the end.`;
  let newUserInstruction =
    ` You Greet the user and be Friendly. If the user is not opening up, find out topics they are open to talk about.`;
  let oldUserInstruction =
    ` You Greet the user and be like friend who know each other.`;
  let positiveBeliefString =
    ` You should engage the user in cognitive restructuring techniques to challenge and convert those irrational beliefs into rational ones which provide a positive emotion to the user. This can involve providing counter-evidence, reframing the situation, offering alternative perspectives, or providing affirmations and positive statements.`;
  let askInDeepString =
    ` You should ask the user in deep about his beliefs like what the user is experiencing and how it's affecting him/her.`;
  let useBrahmastraString =
    ` The user is not telling anything. Meaning, maybe the user is not having any symptoms or not able to identify what user belief is. Ask the user if he is able to do so. Also tell the user that you won't be able to help him/her further if he/she doesn't tell about his/her beliefs.`;

  const response = await axios.get(
    `http://localhost:${process.env.DATABASE_API_PORT}/api/v1/db/belief?userId=${userId}&accessToken=${accessToken}`
  );
  let belief = response.data.data.belief;
  let isNegativeBelief = belief.includes("No") || belief.includes("no") ? false : true;
  let systemRoleMessage = defaultString;
  let numberOfMessages = numMsg || chat.length;
  if (numberOfMessages < 3) {
    systemRoleMessage = defaultString;
  } else if (numberOfMessages < 5) {
    if (isNegativeBelief === true) {
      systemRoleMessage += ` User is identiefied to be having irrational beliefs as '${belief}'`+ askInDeepString;
    } else {
      systemRoleMessage += oldUserInstruction + ` Try to gather information more information about what symptoms or beliefs user might be expericencing.`;
    }
  } else if (numberOfMessages < 10) {
    if (isNegativeBelief === true) {
      systemRoleMessage += positiveBeliefString+` User is identiefied to be having irrational beliefs as '${belief}'. If these beliefs are sufficient to classify the disorder, Try to assist the user by telling the solution and converting his beliefs into rational ones. Otherwise, go try to gather more information about user's symptoms and beliefs.`;
    } else {
      systemRoleMessage += newUserInstruction;
    }
  } else {
    if (isNegativeBelief === true) {
      systemRoleMessage += positiveBeliefString+` User is identiefied to be having irrational beliefs as '${belief}'. Try to assist the user by telling the solution and converting his beliefs into rational ones. You can give him tips to recover those symptoms or beliefs.`;
    } else {
      systemRoleMessage += useBrahmastraString;
    }
  }
  return systemRoleMessage;
};

export { fetchUserChat, formatChat, convertChatToString, getSystemRoleMessage };
