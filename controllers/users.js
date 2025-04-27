const { response, request } = require("express")
const { db, bucket } = require("../database/firebase")
const { v4: uuidv4 } = require("uuid")


const usersGet = async (req = request, res = response) => {
  try {
    const snapshot = await db.collection("users").get()
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error al obtener usuarios")
  }
}

const usersPost = async (req = request, res = response) => {
  try {
    const { name, email, password, role } = req.body
    const file = req.file //archivo imagen recibido

    let imgUrl = ""

    if (file) {
      const blob = bucket.file(`users/${uuidv4()}_${file.originalname}`)
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      })

      blobStream.end(file.buffer)

      await new Promise((resolve, reject) => {
        blobStream.on("finish", resolve)
        blobStream.on("error", reject)
      })
      await blob.makePublic()
      // Obtener URL pública
      imgUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    }

    const user = {
      name,
      email,
      password,
      role,
      img: imgUrl, //  URL de la imagen
      state: true,
      google: false,
    }

    const docRef = await db.collection("users").add(user)

    res.status(201).json({
      msg: "Usuario agregado correctamente",
      id: docRef.id,
      user,
    })
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al agregar usuario")
  }
}

const userPut = async (req, res = response) => {
  const { id } = req.params
  const data = req.body
  try {
    await db.collection("users").doc(id).update(data)
    res.json({ id, ...data })
  } catch (err) {
    console.error(err)
    res.status(500).send("Error al actualizar usuario")
  }
}

const usersPatch = (req, res = response) => {
  res.json({ msg: "patch API" });
}

const usersDelete = async (req, res = response) => {
  const { id } = req.params;
  try {
    await db.collection("users").doc(id).delete()
    res.json({ msg: "Usuario eliminado", id })
  } catch (err) {
    console.error(err)
    res.status(500).send("Error al eliminar usuario")
  }
};

module.exports = {
  usersGet,
  usersPost,
  userPut,
  usersPatch,
  usersDelete,
}