<template>
<!-- DataTales Example -->
<div class="card shadow mb-4">
  <div class="card-header py-3">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-outline-primary btn-sm"
      data-toggle="modal"
      data-target="#add-modal"
      @click="addData"
    >
      Add
    </button>
    <vue-excel-xlsx
    style="margin-left: 10px;"
        class="btn btn-outline-primary btn-sm"
        :data="dataToexcel"
        :columns="columns"
        :filename="'filename'"
        :sheetname="'sheetname'"
        >
        Download
    </vue-excel-xlsx>
  </div>
  <div class="card-body">
    <div class="table-responsive">
      <table
        class="table table-bordered"
        id="table"
        width="100%"
        cellspacing="0"
        data-b-a-s="thin"
      >
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Nomor WhatsApp</th>
            <th>Tanggal Piket</th>
            <th data-exclude="true">Action</th>
          </tr>
        </thead>
        <tbody v-for="(data, index) in allDataTable" :key="index">
            <tr>
              <td>{{ index + 1 }}</td>
              <td>{{ data.nama }}</td>
              <td>{{ data.nomor_whatsapp }}</td>
              <td>{{ data.tanggal_piket.slice(0,10) }}</td>
              <td class="text-center">
                <form
                  method="POST"
                >
                  <a
                    class="btn btn-outline-warning btn-sm button-update"
                    @click="editData(data.id,data.nama,data.nomor_whatsapp,data.tanggal_piket.slice(0,10))"
                    >Edit</a
                  >
                  <a
                    
                    @click="deleteData(data.id,data.nama)"
                    class="btn btn-outline-danger btn-sm"
                    style="margin-left: 10px;"
                  >
                    Delete
                  </a>
                </form>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import Swal from 'sweetalert2'
// import wa from '@open-wa/wa-automate'

export default {
  name: 'Table',
  data() {
    return {
      columns : [
          {
            label: "Nama",
            field: "nama",
          },
          {
            label: "Nomor whatsapp",
            field: "nomor_whatsapp",
          },
          {
            label: "Tanggal piket",
            field: "tanggal_piket",
          },
      ]
    }
},
  methods: {
    fetchDataTable () {
      this.$store.dispatch('fetchDataTable')
    },
    deleteData (id, nama) {
      Swal.fire({
        icon: 'warning',
        title: `apakah anda ingin menghapus pegawai:  ${nama}`,
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        confirmButtonColor: "#ff0f0f"
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.$store.dispatch('deleteDataTable', id)
          // Swal.fire('Saved!', '', 'success')
        }
      })
    },
    editData (id, nama, nomor_whatsapp, tanggal_piket) {
       Swal.fire({
        title: 'Edit Data Piket',
        html: `
        <div style="display: flex; flex-direction: column;">
          <label style="margin-top: 10px; margin-bottom: -10px; " for="nama"><h3>Nama</h3></label>
          <input required type="text" id="nama" autocomplete="off" value="${nama}" class="swal2-input" placeholder="nama">
        </div>

        <div style="display: flex; flex-direction: column;">
          <label style="margin-top: 10px; margin-bottom: -10px;" for="nomor_whatsapp"><h3>Nomor whatsapp</h3></label>
          <input required type="number" value=${nomor_whatsapp} id="nomor_whatsapp" class="swal2-input" placeholder="nomor whatsapp">
        </div>

        <div style="display: flex; flex-direction: column;">
          <label style="margin-top: 10px; margin-bottom: -10px;" for="tanggal_piket"><h3>Tanggal piket</h3></label>
          <input required type="date" id="tanggal_piket" value=${tanggal_piket} class="swal2-input" placeholder="tanggal piket">
        </div>
        `,
        confirmButtonText: 'Edit data',
        focusConfirm: false,
        preConfirm: () => {
          const nama = Swal.getPopup().querySelector('#nama').value
          const nomor_whatsapp = Swal.getPopup().querySelector('#nomor_whatsapp').value
          const tanggal_piket = Swal.getPopup().querySelector('#tanggal_piket').value
          let alert = []
          if (!nama) {
            alert.push("nama pegawai")
          }
          if (!nomor_whatsapp) {
            alert.push("nomor whatsapp pegawai")
          }
          if (!tanggal_piket) {
            alert.push("tanggal piket pegawai")
          }
          if (alert.length > 0) {
            let resultAlert = alert.toString()
            Swal.showValidationMessage(`Mohon masukkan ${resultAlert}`)
          }
          return { nama: nama, nomor_whatsapp: nomor_whatsapp, tanggal_piket: tanggal_piket }
        }
      }).then((result) => {
        if ("value" in result) {
          const payload = {
            id : id,
            nama: result.value.nama,
            nomor_whatsapp : result.value.nomor_whatsapp,
            tanggal_piket: result.value.tanggal_piket
          }
          this.$store.dispatch('editDataTable', payload)
        }
       
      })
      
    },
    addData () {
      Swal.fire({
        title: 'Add Data Piket',
        html: `
        <div style="display: flex; flex-direction: column;">
          <label style="margin-top: 10px; margin-bottom: -10px; " for="nama"><h3>Nama</h3></label>
          <input required type="text" id="nama" class="swal2-input" placeholder="nama">
        </div>

        <div style="display: flex; flex-direction: column;">
          <label style="margin-top: 10px; margin-bottom: -10px;" for="nomor_whatsapp"><h3>Nomor whatsapp</h3></label>
          <input required type="number" id="nomor_whatsapp" class="swal2-input" placeholder="nomor whatsapp">
        </div>

        <div style="display: flex; flex-direction: column;">
          <label style="margin-top: 10px; margin-bottom: -10px;" for="tanggal_piket"><h3>Tanggal piket</h3></label>
          <input required type="date" id="tanggal_piket" class="swal2-input" placeholder="tanggal piket">
        </div>
        `,
        confirmButtonText: 'Tambahkan',
        focusConfirm: false,
        preConfirm: () => {
          const nama = Swal.getPopup().querySelector('#nama').value
          const nomor_whatsapp = Swal.getPopup().querySelector('#nomor_whatsapp').value
          const tanggal_piket = Swal.getPopup().querySelector('#tanggal_piket').value
          let alert = []
          if (!nama) {
            alert.push("nama pegawai")
          }
          if (!nomor_whatsapp) {
            alert.push("nomor whatsapp pegawai")
          }
          if (!tanggal_piket) {
            alert.push("tanggal piket pegawai")
          }
          if (alert.length > 0) {
            let resultAlert = alert.toString()
            Swal.showValidationMessage(`Mohon masukkan ${resultAlert}`)
          }
          return { nama: nama, nomor_whatsapp: nomor_whatsapp, tanggal_piket: tanggal_piket }
        }
      }).then((result) => {
        const payload = {
          nama: result.value.nama,
          nomor_whatsapp : result.value.nomor_whatsapp,
          tanggal_piket: result.value.tanggal_piket
        }
        this.$store.dispatch('addDataTable', payload)
      })
      
      
    }
  },
  computed: {
    allDataTable () {
      let data = this.$store.state.dataTable
      data.sort(function(a, b) {
        var keyA = new Date(a.id),
          keyB = new Date(b.id);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      return data
    },
    dataToexcel () {
      let result = []
      for (let i = 0; i < this.allDataTable.length; i++) {
        result.push({
          nama: this.allDataTable[i].nama,
          nomor_whatsapp: this.allDataTable[i].nomor_whatsapp,
          tanggal_piket: this.allDataTable[i].tanggal_piket.slice(0,10)
        })
      }
      return result
    }
  },
  created () {
    this.fetchDataTable()
  }
}
</script>

<style>

</style>