const { Router } = require("express");
const upload = require("../middlewares/upload"); // ← Usamos el middleware correcto

const {
  usersGet,
  usersPost,
  userPut,
  usersDelete,
  usersPatch,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);
router.post("/", upload.single("file"), usersPost); // ← Campo debe llamarse "imagen"
router.put("/:id", userPut);
router.patch("/:id", usersPatch);
router.delete("/:id", usersDelete);

module.exports = router;
