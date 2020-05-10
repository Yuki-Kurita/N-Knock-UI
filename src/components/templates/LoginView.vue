<template>
  <div class="login-view">
    <h1>Login</h1>
    <!-- Functionを子コンポーネントへ伝播させる -->
    <LoginForm :onlogin="handleLogin" />
    <router-link to="/signup">Sign Up</router-link>
  </div>
</template>

<script>
import LoginForm from '@/components/molecules/LoginForm.vue'
import firebase from 'firebase'

export default {
  name: 'LoginView',

  components: {
    LoginForm
  },

  methods: {
    // 子コンポーネントから伝搬される関数 authInfo : アドレスとパスワード
    handleLogin (authInfo) {
      // Firebaseでログイン
      return firebase.auth().signInWithEmailAndPassword(authInfo.email, authInfo.password)
        .then(() => {
          // loginアクションの呼び出し
          this.$store.dispatch('login', authInfo)
          this.$router.push('/')
        })
        .catch(error => {
          alert(error.message)
        })
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
