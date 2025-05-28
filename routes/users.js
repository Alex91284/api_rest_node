const { Router } = require("express")
const {
  usersGet,
  usersPost,
  userPut,
  usersPatch,
  usersDelete,
} = require("../controllers/users")
const multer = require("multer")
const upload = multer()

const router = Router()

router.get("/", usersGet)
router.post("/", upload.single("foto"), usersPost) 
router.put("/:id", upload.single("foto"), userPut)
router.patch("/", usersPatch)
router.delete("/:id", usersDelete)

module.exports = router
