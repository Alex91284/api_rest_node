const { Router } = require('express')
const {
  productGet,
  productPost,
  productPut,
  productPatch,
  productDelete,
} = require("../controllers/products")
const multer = require('multer')
const upload = multer()

const router = Router()  

router.get('/', productGet)
router.post('/', upload.single('fotoP'), productPost)
router.put('/:id', upload.single('fotoP'), productPut)
router.patch('/', productPatch)
router.delete('/:id', productDelete)

module.exports = router