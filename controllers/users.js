const { response, request } = require("express")
const db = require('../database/firebase')


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

const Usuario = require("../models/usuario")

const usersPost = async (req, res = response) => {
  try {
    const newUser = new Usuario(req.body)

    const docRef = await db.collection("users").add({ ...newUser })

    res.status(201).json({
      msg: "Usuario agregado correctamente",
      id: docRef.id,
      ...newUser,
    });
  } catch (err) {
    console.error(err)
    res.status(500).send("Error al agregar usuario")
  }
};



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