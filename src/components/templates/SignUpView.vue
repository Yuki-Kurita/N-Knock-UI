<template>
  <div class="login-view">
    <h1>SignUp</h1>
    <div class="signUpError">{{ signUpError }}</div>
    <!-- Functionを子コンポーネントへ伝播させる -->
    <SignUpForm
      :onlogin="handleLogin"
      :reset-sign-up-error-message="resetSignUpError"
    />
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

  data () {
    return {
      signUpError: ''
    }
  },

  methods: {
    // 子コンポーネントから伝搬される関数 authInfo : アドレスとパスワード
    handleLogin (authInfo) {
      // signUpアクションを呼び出す
      return firebase.auth().createUserWithEmailAndPassword(authInfo.email, authInfo.password)
        .then(user => {
          // actionに渡すauthInfoにFirebaseのUID, UserName(emailの@以前)を含ませる
          authInfo.id = user.user.uid
          authInfo.userName = authInfo.email.split('@')[0]
          // signUpアクションの発行
          this.$store.dispatch('signUp', authInfo)
          this.$router.push({ path: '/' })
        })
        // ユーザ名・Emailが被っていないかValidation
        .catch(err => {
          if (err.code === 'auth/email-already-in-use') {
            this.signUpError = '入力されたメールアドレスは既に使われています'
          } else if (err.code === 'auth/invalid-email') {
            this.signUpError = '入力されたメールアドレスは有効ではありません。別のアドレスを入力してください'
          } else if (err.code === 'auth/operation-not-allowed') {
            this.signUpError = 'このメールアドレス/パスワードは利用できません。申し訳ございませんが別のメールアドレス/パスワードを入力してください'
          }
        })
    },
    resetSignUpError () {
      this.signUpError = ''
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
