const { response, request } = require("express")
const multer = require("multer")
const upload = multer()
const uploadToImgur = require("../middlewares/upload")
const { db } = require("../database/firebase")

const pedidoGet = async (req = request, res = response) => {
  try {
    const snapshot = await db.collection("pedidos").get()
    const pedidos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.json(pedidos)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error al obtener pedidos")
  }
}
const pedidoPost = async (req, res) => {
  try {
    const { cliente, productos, total, estado, vendedor, fecha } = req.body

    if (!cliente || !productos || !total) {
      return res
        .status(400)
        .json({ ok: false, msg: "Cliente, productos y total son obligatorios" })
    }

    const newPedido = {
      fecha: new Date(), // Asegurarse de que la fecha sea un objeto Date
      cliente,
      productos: Array.isArray(productos) ? productos : [productos],
      total,
      estado,
      vendedor: vendedor || "sistema", // Asignar el ID del usuario autenticado
    }

    const ref = await db.collection("pedidos").add(newPedido)

    res.status(201).json({
      ok: true,
      id: ref.id,
      pedido: newPedido,
    })
  } catch (error) {
    console.error("Error guardando pedido en Firestore:", error.message)
    res.status(500).json({ ok: false, msg: "Error al crear pedido" })
  }
}

const pedidoPut = async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    if (req.file) {
      const fotoUrl = await uploadToImgur(req.file.buffer)
      data.fotoUrl = fotoUrl
    }

    await db.collection("pedidos").doc(id).update(data)

    res.json({
      ok: true,
      msg: "Pedido actualizado correctamente",
    })
  } catch (error) {
    console.error("Error actualizando pedido en Firestore:", error.message)
    res.status(500).json({ ok: false, msg: "Error al actualizar pedido" })
  }
}

const pedidoPatch = async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    const pedidoRef = db.collection("pedidos").doc(id)
    await pedidoRef.update(data)

    res.json({
      ok: true,
      msg: "Pedido actualizado correctamente",
    })
  } catch (error) {
    console.error("Error actualizando pedido:", error.message)
    res.status(500).json({ ok: false, msg: "Error al actualizar pedido" })
  }
}

const pedidoDelete = async (req, res) => { 
  const { id } = req.params

  try{
    await db.collection("pedidos").doc(id).delete()
    res.json({ ok: true, msg: "Pedido eliminado correctamente" })
  }
  catch (error) {
    console.error("Error eliminando pedido:", error.message)
    res.status(500).json({ ok: false, msg: "Error al eliminar pedido" })
  }
}

module.exports = {
  pedidoGet,
  pedidoPost,
  pedidoPut,
  pedidoPatch,
  pedidoDelete
}