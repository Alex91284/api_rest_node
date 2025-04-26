const { Router } = require("express")
const {
  usersGet,
  usersPost,
  userPut,
  usersDelete,
  usersPatch,
} = require("../controllers/users")

const router = Router()

router.get("/", usersGet)

router.post("/", usersPost)

router.put("/:id", userPut)

router.patch("/:id", usersPatch)

router.delete("/:id", usersDelete)

module.exports = router
