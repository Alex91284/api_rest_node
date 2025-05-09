const axios = require("axios")

const uploadToImgur = async (fileBuffer) => {
  const clientId = "bfc022e505fc681"

  const response = await axios.post(
    "https://api.imgur.com/3/image",
    {
      image: fileBuffer.toString("base64"),
      type: "base64",
    },
    {
      headers: {
        Authorization: `Client-ID ${clientId}`,
      },
    }
  )

  return response.data.data.link
}

module.exports = uploadToImgur
