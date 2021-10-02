<template>
<div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
        <h1 class="text-center mb-3">
          <i class="fas fa-user-plus"></i> Register
        </h1>
 
        <form action="/cred/register" method="POST">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="name"
              id="username"
              name="username"
              class="form-control"
              placeholder="Enter Name"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              class="form-control"
              placeholder="Enter Email"
              
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              class="form-control"
              placeholder="Create Password"
              
            />
          </div>
          <div class="form-group">
            <label for="password2">Konfirmasi Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              class="form-control"
              placeholder="Confirm Password"
            />
          </div>
          <button type="submit" class="btn btn-primary btn-block">
            Register
          </button>
        </form>
        <p @click="toLogin" class="lead mt-4 linkTo">Punya akun? <a >Login</a></p>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Register',
  methods: {
    toLogin () {
      this.$router.push({ path: '/Login' })
    }
  }
}
</script>

<style>

</style>