const axios = require("axios")

const uploadToImgur = async (fileBuffer) => {
  const apiKey =
    process.env.IMGBB_API_KEY || "d203e774a1ae6a3cef27dda3dcac0126"
  
    if (!fileBuffer) {
      throw new Error("No se proporcionó el buffer de imagen");
    }
  
    const base64Image = fileBuffer.toString("base64")

  const formData = new URLSearchParams()
  formData.append("key", apiKey)
  formData.append("image", base64Image)

  try {
    const response = await axios.post(
      "https://api.imgbb.com/1/upload", formData.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    console.log(">>>>><<<<<", response.data)
    
    return response.data.data.url
  } catch (error) {
    console.error("Error subiendo imagen a ImgBB:", error.response?.data || error.message)
    throw new Error("No se pudo subir la imagen")
  }
}

module.exports = uploadToImgur
