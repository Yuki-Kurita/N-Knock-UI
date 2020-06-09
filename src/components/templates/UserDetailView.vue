<template>
  <div class="user-detail-view">
    <Navigation/>
    <h1>ユーザ詳細</h1>
    <div class="email">Email : {{ email }}</div>
    <div class="user-name">Your Name : {{ userName }}</div>
    <router-link to="userEdit">編集する</router-link>
  </div>
</template>

<script>
import Navigation from '@/components/molecules/Navigation.vue'
import UpdateLoginUser from '@/components/mixin/UpdateLoginUser.vue'

export default {
  name: 'UserDetailView',

  components: {
    Navigation
  },
  mixins: [UpdateLoginUser],
  computed: {
    // gettersでemailを取得
    userName: function () {
      return this.$store.getters.loginUserName
    },
    email: function () {
      return this.$store.getters.loginUserEmail
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
