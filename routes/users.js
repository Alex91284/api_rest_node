const { Router } = require("express")
const multer = require("multer")
const upload = multer()
const {
  usersGet,
  usersPost,
  userPut,
  usersDelete,
  usersPatch,
} = require("../controllers/users")

const router = Router()

router.get("/", usersGet)

router.post("/", upload.single("file"), usersPost)

router.put("/:id", userPut)

router.patch("/:id", usersPatch)

router.delete("/:id", usersDelete)

module.exports = router
