<template>
  <div class="login-view">
    <h1>SignUp</h1>
    <!-- Functionを子コンポーネントへ伝播させる -->
    <SignUpForm :onlogin="handleLogin" />
    <router-link to="/login">login</router-link>
  </div>
</template>

<script>
import SignUpForm from '@/components/molecules/SignUpForm.vue'
import firebase from 'firebase'

export default {
  name: 'SignUpView',

  components: {
    SignUpForm
  },

  methods: {
    // 子コンポーネントから伝搬される関数 authInfo : アドレスとパスワード
    handleLogin (authInfo) {
      // signUpアクションを呼び出す
      return firebase.auth().createUserWithEmailAndPassword(authInfo.email, authInfo.password)
        .then(user => {
          authInfo.id = user.user.uid
          // signUpアクションの発行
          this.$store.dispatch('signUp', authInfo)
          this.$router.push({ path: '/' })
        })
        .catch(err => {
          console.log(err.code)
          console.log(err.Message)
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
