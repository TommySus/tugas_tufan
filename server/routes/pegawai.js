const express = require('express')
const router = express.Router()
const PegawaiController = require('../controllers/pegawai')


router.get("/", PegawaiController.viewPegawai)
router.post("/", PegawaiController.addPegawai)
router.delete("/:id", PegawaiController.deletePegawai)
router.put("/:id", PegawaiController.updatePegawai)

module.exports = router