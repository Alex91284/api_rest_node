const { Router } = require('express')
const multer = require('multer')
const upload = multer()

const {
  productGet,
  productGetById,
  productPost,
  productPut,
  productPatch,
  productDelete,
} = require("../controllers/products")

const router = Router()  

router.get('/', productGet)
router.get("/:id", productGetById)
router.post('/', upload.single('fotoP'), productPost)
router.put('/:id', upload.single('fotoP'), productPut)
router.patch('/', productPatch)
router.delete('/:id', productDelete)

module.exports = router