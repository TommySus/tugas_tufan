'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pegawai.init({
    nama: DataTypes.STRING,
    nomor_whatsapp: DataTypes.INTEGER,
    tanggal_piket: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pegawai',
  });
  return Pegawai;
};