const { animals } = require("../../models")

module.exports = async(req, res) => {
    res.send({
      fileName: req.file.filename,
    })
}