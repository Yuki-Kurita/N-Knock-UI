<template>
  <div class="login-view">
    <h1>SignUp</h1>
    {{ signUpError }}
    <!-- Functionを子コンポーネントへ伝播させる -->
    <SignUpForm :onlogin="handleLogin" />
    <router-link to="/login">login</router-link>
    <button
      @click="signUpTest"
    >
      test
    </button>
  </div>
</template>

<script>
import SignUpForm from '@/components/molecules/SignUpForm.vue'
import firebase from 'firebase'
import * as api from '../api-types'

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
          console.log(err.code)
          if (err.code === 'auth/email-already-in-use') {
            this.signUpError = '入力されたメールアドレスは既に使われています'
          } else if (err.code === 'auth/invalid-email') {
            this.signUpError = '入力されたメールアドレスは有効ではありません。別のアドレスを入力してください'
          } else if (err.code === 'auth/operation-not-allowed') {
            this.signUpError = 'このメールアドレス/パスワードは利用できません。申し訳ございませんが別のメールアドレス/パスワードを入力してください'
          }
        })
    },
    signUpTest () {
      this.axios.post(api.USERPREFIX, {
        email: 'email',
        fireId: 'testid',
        userName: 'email'
      })
        .then((response) => {
          console.log('success!!')
          console.log(response)
        })
        .catch((err) => {
          // サーバエラー、ログにも残したい
          console.log('faiture...')
          alert(err)
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
