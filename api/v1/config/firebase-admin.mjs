import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(__dirname, "..", "..", "..", "vars", ".env");

dotenv.config({ path: envPath });

import firebaseAdmin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

// firebaseAdmin
//   .auth()
//   .listUsers()
//   .then((data) => {
//     console.log(data.users);
//   });

export { firebaseAdmin };
