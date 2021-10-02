const { Pegawai } = require('../models')
const wa = require('@open-wa/wa-automate');
const cron = require('node-cron');

class PegawaiController {
    static viewPegawai (req, res) {
        Pegawai.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
    }

    static addPegawai (req, res) {
        const date = new Date(req.body.tanggal_piket)
        date.setDate(date.getDate())
        const obj = {
            nama: req.body.nama,
            nomor_whatsapp: req.body.nomor_whatsapp,
            tanggal_piket: date,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        Pegawai.create(obj)
        .then(data => {
            res.status(201).json({
                nama: data.nama,
                nomor_whatsapp: data.nomor_whatsapp, 
                tanggal_piket: data.tanggal_piket
            })
        })
        .catch(error => {
            res.status(500).json({message: error})
        })
    }
// cron.schedule('0 */12 * * *', function() {
    
// }); <--- cron 12 jam sekali, masukkan static cariPiket di sini untuk menjalankan sesuai dengan cron
    static cariPiket (req, res) {
        let tommorow = new Date()
        tommorow = tommorow.toString().slice(0,9)
        tommorow = new Date(tommorow)
        tommorow.setDate(tommorow.getDate() + 4)

        Pegawai.find({where: {tanggal_piket: tommorow}})
        .then(data => {
            if (data) {
                wa.create({
                    useChrome: true,
                    maxMessages: data.length
                })
                .then(client => {
                    for (let i = 0; i < data.length; i++) {
                        start(client, i)
                    }
                });
                
                
                function start(client, i) {
                  client.onMessage(async message => {
                      return await client.sendText("6285155091559@c.us", `👋 Hello! index ke - ${i}`);
                  });
                }
            }
        })
        .catch(error => {
            res.status(500).json({message: error})
        })
    }

    static deletePegawai (req, res) {
        Pegawai.destroy({where: {id: req.params.id}})
        .then( data => {
            if (data){
                res.status(200).json({message: 'pegawai berhasil di hapus'})
            } else {
                res.status(404).json({message: "pegawai tidak ada"})
            }
        })
        .catch( error => {
            res.status(500).json({message: error})
        })
    }

    static updatePegawai (req, res) {
        const date = new Date(req.body.tanggal_piket)
        date.setDate(date.getDate() + 1)
        const obj = {
            nama: req.body.nama,
            nomor_whatsapp: req.body.nomor_whatsapp,
            tanggal_piket: date
        }
        Pegawai.update(obj, {where: {id: req.params.id}})
        .then(data => {
            if (data) {
                Pegawai.findOne({where: {id: req.params.id}})
                .then(data2 => {
                    res.status(200).json({
                        nama: data2.nama,
                        nomor_whatsapp: data2.nomor_whatsapp, 
                        tanggal_piket: data2.tanggal_piket
                    })
                })
                .catch(error => {
                    res.status(404).json({message: "pegawai tidak ada"})
                })
            } else {
                res.status(404).json({message: "pegawai tidak ada"})
            }
        })
        .catch(error => {
            res.status(500).json({message: error})
        })
    }
}

module.exports = PegawaiController