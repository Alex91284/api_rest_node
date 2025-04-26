const admin = require("firebase-admin")
const serviceAccount = require("../firebase-key.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "tu-proyecto.appspot.com",
})

const db = admin.firestore()
const bucket = admin.storage().bucket()

module.exports = { db, bucket }
