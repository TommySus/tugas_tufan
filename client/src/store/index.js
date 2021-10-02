import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataTable: []
  },
  mutations: {
    getAllTable(state, payload) {
      state.dataTable = payload
    }
  },
  actions: {
    login (context, payload) {
      return axios({
        method: 'POST',
        url: '/user/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    register (context, payload) {
      return axios({
        method: 'POST',
        url: '/user/register',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      })
    },
    fetchDataTable (context) {
      axios({
        method: 'GET',
        url: '/pegawai',
      })
        .then(({ data }) => {
          context.commit('getAllTable', data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addDataTable (context, payload) {
      axios({
        method: 'POST',
        url: '/pegawai',
        data: {
          nama: payload.nama,
          nomor_whatsapp: payload.nomor_whatsapp, 
          tanggal_piket: payload.tanggal_piket
        }
      })
        .then(({ data }) => {
          if (data) {
            context.dispatch('fetchDataTable')
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Berhasil menambah data pegawai'
            })
          }
          
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteDataTable (context, id) {
      axios({
        method: 'DELETE',
        url: `/pegawai/${id}`
      })
      .then(data => {
        if (data) {
          context.dispatch('fetchDataTable')
          Swal.fire('Berhasil menghapus data karyawan!', '', 'success')
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    editDataTable (context, payload) {
      axios({
        method: 'PUT',
        url: `/pegawai/${payload.id}`,
        data: {
          nama: payload.nama,
          nomor_whatsapp: payload.nomor_whatsapp, 
          tanggal_piket: payload.tanggal_piket
        }
      })
        .then(({ data }) => {
          if (data) {
            context.dispatch('fetchDataTable')
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Berhasil mengedit data pegawai'
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
