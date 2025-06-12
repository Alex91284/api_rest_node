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
  const { cliente, productos, total, estado, vendedor } = req.body

  if (!cliente || !productos || !total) {
    return res.status(400).json({
      ok: false,
      msg: "Cliente, productos y total son obligatorios",
    })
  }

  try {
    const contadorRef = db.collection("contadores").doc("pedidos")

    const pedidoId = await db.runTransaction(async (transaction) => {
      const contadorDoc = await transaction.get(contadorRef)

      if (!contadorDoc.exists) {
        throw new Error("El documento del contador no existe")
      }

      const ultimoNumero = contadorDoc.data().valor
      const nuevoNumero = ultimoNumero + 1

      // Actualizar contador
      transaction.update(contadorRef, { valor: nuevoNumero })

      // Crear nuevo pedido
      const newPedido = {
        num_pedido: nuevoNumero,
        fecha: new Date(),
        cliente,
        productos: Array.isArray(productos) ? productos : [productos],
        total,
        estado: estado || "pendiente",
        vendedor: vendedor || "sistema",
      }

      const pedidoRef = db.collection("pedidos").doc()
      transaction.set(pedidoRef, newPedido)

      return pedidoRef.id
    })

    res.status(201).json({
      ok: true,
      id: pedidoId,
      msg: "Pedido creado correctamente con número incremental",
    })
  } catch (error) {
    console.error("Error al guardar pedido:", error.message)
    res.status(500).json({
      ok: false,
      msg: "Error al crear el pedido",
    })
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