const { Router } = require('express')
const {
  pedidoGet,
  pedidoPost,
  pedidoPut,
  pedidoPatch,
  pedidoDelete,
} = require("../controllers/pedidos")
const multer = require('multer')
const upload = multer()

const router = Router()

router.get('/', pedidoGet)
router.post('/', pedidoPost)
router.put('/:id', upload.single('fotoPed'), pedidoPut)
router.patch('/', pedidoPatch)
router.delete('/:id', pedidoDelete) 

module.exports = router