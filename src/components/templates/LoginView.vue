<template>
  <div class="login-view">
    <h1>Login</h1>
    <div class="loginError">{{ loginError }}</div>
    <!-- Functionを子コンポーネントへ伝播させる -->
    <LoginForm
      :onlogin="handleLogin"
      :reset-login-error-message="resetLoginError"
    />
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

  data () {
    return {
      loginError: ''
    }
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
        .catch(err => {
          if (err.code === 'auth/invalid-email') {
            this.loginError = '入力されたメールアドレスのフォーマットは有効ではありません'
          } else if (err.code === 'auth/user-disabled') {
            this.loginError = 'ログインいただいたユーザは現在お使いになれません。申し訳ございませんが新しくユーザを作成してください。'
          } else if (err.code === 'auth/user-not-found') {
            this.loginError = 'ユーザが見つかりませんでした。正しいメールアドレス・パスワードを入力してください'
          } else if (err.code === 'auth/wrong-password') {
            this.loginError = 'パスワードが間違っています。正しいパスワードを入力してください'
          }
        })
    },
    resetLoginError () {
      this.loginError = ''
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
