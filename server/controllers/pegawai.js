const { Pegawai } = require('../models')
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op;
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
        let today = new Date()
        let tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const date = new Date(req.body.tanggal_piket)
        date.setDate(date.getDate())
        console.log(date)
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
        function appendLeadingZeroes(n){
            if(n <= 9){
              return "0" + n;
            }
            return n
        }
        let current_datetime = new Date()
        let formatted_date = current_datetime.getFullYear() + "-" + appendLeadingZeroes(current_datetime.getMonth() + 1) + "-" + appendLeadingZeroes(current_datetime.getDate())
        let tomorrow = new Date(formatted_date)
        tomorrow.setDate(tomorrow.getDate() + 1)

        let current_datetime2 = new Date()
        let formatted_date2 = current_datetime2.getFullYear() + "-" + appendLeadingZeroes(current_datetime2.getMonth() + 1) + "-" + appendLeadingZeroes(current_datetime2.getDate())
        let tomorrow2 = new Date(formatted_date2)
        tomorrow2.setDate(tomorrow2.getDate() + 1)
        let tommorow_START = tomorrow2.setHours(23)


        let number;

        Pegawai.findAll({where: 
            {
                tanggal_piket:  { 
                    [Op.gte]: tomorrow ,
                    [Op.lte]: tommorow_START
                }
            }
        })
        .then(data => {
            console.log(data)
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    number = data[i].nomor_whatsapp
                    start(client, number)
                }
                wa.create({
                    useChrome: true,
                    maxMessages: data.length
                })
                .then(client => {
                    for (let i = 0; i < data.length; i++) {
                        number = data[i].nomor_whatsapp
                        console.log(number, i)
                        // start(client, number)
                    }
                });
                
                
                function start(client, number) {
                  client.onMessage(async message => {
                      return await client.sendText(`62${number}@c.us`, `👋 Hello! index ke - `);
                  });
                }
            }
        })
        .catch(error => {
            // console.log(error)
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