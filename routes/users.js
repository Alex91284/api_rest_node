const { Router } = require("express");
const {
  usersGet,
  usersPost,
  userPut,
  usersPatch,
  usersDelete,
} = require("../controllers/users");
const multer = require("multer");
const upload = multer();

const router = Router();

router.get("/", usersGet);
router.post("/", upload.single("foto"), usersPost); // << aquí procesamos la imagen
router.put("/:id", userPut);
router.patch("/", usersPatch);
router.delete("/:id", usersDelete);

module.exports = router;
