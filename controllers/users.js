const { response, request } = require('express')


const usersGet = (req = request, res = response) => {
  const {q, nombre='no name', apikey, page, limit} = req.query
  res.json({
    msg: "get API",
  })
}

const usersPost = (req, res = response) => {  
  const body = req.body
  res.json({
    msg: "post API",
    body
  })
}

const userPut = (req, res = response) => {

  const {id} = req.params.id
  res.json({
    msg: "put API",
  })
}


const usersPatch = (req, res = response) => {
  res.json({
    msg: "patch API",
  })
}
const usersDelete = (req, res = response) => {
  res.json({
    msg: "delete API",
  })
}

module.exports = {   
  usersGet,
  usersPost,
  userPut,
  usersPatch,
  usersDelete
}