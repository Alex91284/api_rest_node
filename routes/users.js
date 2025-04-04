const { Router } = require('express');
const {
  usersGet,
  usersPost,
  userPut,
  usersDelete,
  usersPatch} = require('../controllers/users');

const router = Router()

router.get("/", usersGet)

router.post("/", usersPost)

router.put("/:id", userPut)

router.patch("/", usersPatch)

router.delete("/", usersDelete)

module.exports= router