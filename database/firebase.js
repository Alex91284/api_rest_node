const admin = require("firebase-admin")
const serviceAccount = require("../firebase-key.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

  storageBucket: "rest-server-45f4c.appspot.com",
});

const db = admin.firestore()
const bucket = admin.storage().bucket()

module.exports = { db, bucket }
