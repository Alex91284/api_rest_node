const { Router } = require("express")
const multer = require("multer")
const upload = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Solo imágenes son permitidas"), false);
    }
  },
})

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
