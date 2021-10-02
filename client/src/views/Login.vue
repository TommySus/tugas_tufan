<template>
  <div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
        <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i>  Login</h1>

        <form action="/cred/login" method="POST">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              class="form-control"
              placeholder="Masukkan Email"
              v-model="user.email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              class="form-control"
              placeholder="Masukkan Password"
              v-model="user.password"
            />
          </div>
          <button type="submit" class="btn btn-primary btn-block">Masuk</button>
        </form>
        <p class="lead mt-4 linkTo" @click="toRegister">
          Belum punya akun?? <a >Daftar</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return{
        user: {
            email: "",
            password: ""
        }
    }
  },
  methods: {
    toRegister () {
      this.$router.push({ path: '/Register' })
    }
  }
}
</script>

<style>
  .linkTo {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
    opacity: 0.8;
    transition: 0.3s;
  }
  .linkTo:hover {
    transition: 0.3s;
    color: black;
    opacity: 1;
  }
</style>