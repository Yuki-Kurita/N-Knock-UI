<template>
  <div class="user-detail-view">
    <h1>ユーザ詳細</h1>
    <div class="email">{{ email }}</div>
    <div class="user-name">{{ userName }}</div>
    <router-link to="userEdit">編集する</router-link>
  </div>
</template>

<script>

export default {
  name: 'UserDetailView',

  data () {
    return {
      email: this.$store.getters.loginUserEmail,
      userName: this.$store.state.loginUserName
    }
  }
}
</script>

<style scoped>
.login-view {
  width: 320px;
  margin: auto;
}
</style>
