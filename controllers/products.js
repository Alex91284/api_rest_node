const { response, request } = require("express")
const multer = require("multer")
const upload = multer()
const uploadToImgur = require("../middlewares/upload")
const { db } = require("../database/firebase")

const productGet = async (req = request, res = response) => {
  try {
    const snapshot = await db.collection("products").get()
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error al obtener productos")
  }
}

const productPost = async (req, res) => {
  try {
    const { name, price, description, category } = req.body

    if (!name || !price || !description || !category) {
      return res
        .status(400)
        .json({ ok: false, msg: "Nombre, precio, descripción y categoría son obligatorios" })
    }

    let fotoUrl = null
    if (req.file) {
      fotoUrl = await uploadToImgur(req.file.buffer)
    }

    const newProduct = {
      name,
      price,
      description,
      category,
      fotoUrl
    }

    const ref = await db.collection("products").add(newProduct)

    res.json({
      ok: true,
      id: ref.id,
      product: newProduct,
    })
  } catch (error) {
    console.error("Error guardando producto en Firestore:", error.message)
    res.status(500).json({ ok: false, msg: "Error al crear producto" })
  }
}

const productPut = async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    if (req.file) {
      const fotoUrl = await uploadToImgur(req.file.buffer);
      data.fotoUrl = fotoUrl;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        ok: false,
        msg: "No se proporcionaron datos para actualizar.",
      })
    }

    await db.collection("products").doc(id).update(data)
    res.json({ ok: true, id, ...data })
  } catch (err) {
    console.error("Error actualizando product:", err.message)
    res.status(500).json({ ok: false, msg: "Error al actualizar product" })
  }
}

const productPatch = async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    const productRef = db.collection("products").doc(id)
    await productRef.update(data)

    res.json({
      ok: true,
      msg: "Producto actualizado correctamente",
    })
  } catch (error) {
    console.error("Error actualizando producto:", error.message)
    res.status(500).json({ ok: false, msg: "Error al actualizar producto" })
  }
}

const productDelete = async (req, res) => {
  const { id } = req.params

  try {
    await db.collection("products").doc(id).delete()
    res.json({
      ok: true,
      msg: "Producto eliminado correctamente",
    })
  } catch (error) {
    console.error("Error eliminando producto:", error.message)
    res.status(500).json({ ok: false, msg: "Error al eliminar producto" })
  }
}

module.exports = {
  productGet,
  productPost,
  productPut,
  productPatch,
  productDelete
}