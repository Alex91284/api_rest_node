const multer = require("multer")

// Configuración de almacenamiento en memoria
const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // máximo 5MB por imagen
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(file.originalname.toLowerCase())

    if (mimetype && extname) {
      return cb(null, true)
    }
    cb(
      new Error(
        "Error: El archivo debe ser una imagen válida (jpeg, jpg, png, gif)"
      )
    )
  },
})

module.exports = upload
