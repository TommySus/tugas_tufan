const express = require('express')
const router = express.Router()
const pegawai = require('./pegawai')
const user = require('./user')

router.use("/pegawai",pegawai)
router.use("/user",user)


module.exports = router