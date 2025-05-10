const { response, request } = require("express")
const multer = require("multer")
const upload = multer()
const uploadToImgur = require("../middlewares/upload")
const Usuario = require("../models/usuario")
const { db } = require("../database/firebase")

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

const usersPost = async (req, res) => {
  try {
    const { name, email, password, role, state, google } = req.body

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ ok: false, msg: "Nombre, email y password son obligatorios" })
    }

    let fotoUrl = null
    if (req.file) {
      fotoUrl = await uploadToImgur(req.file.buffer)
    }

    const nuevoUsuario = {
      name,
      email,
      password,
      fotoUrl,
      role,
      state,
      google
    }

    const ref = await db.collection("users").add(nuevoUsuario)

    res.json({
      ok: true,
      id: ref.id,
      usuario: nuevoUsuario,
    })
  } catch (error) {
    console.error("Error guardando usuario en Firestore:", error.message)
    res.status(500).json({ ok: false, msg: "Error al crear usuario" })
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
  res.json({ msg: "patch API" })
}

const usersDelete = async (req, res = response) => {
  const { id } = req.params
  try {
    await db.collection("users").doc(id).delete()
    res.json({ msg: "Usuario eliminado", id })
  } catch (err) {
    console.error(err)
    res.status(500).send("Error al eliminar usuario")
  }
}

module.exports = {
  usersGet,
  usersPost,
  userPut,
  usersPatch,
  usersDelete,
}
