<script>
import firebase from 'firebase'

export default {
  name: 'UpdateLoginUser',
  created: function () {
    // 現在ログインしており、Storeで認証情報が管理できてなければ更新する
    let user = firebase.auth().currentUser
    let loginUserEmail = this.$store.getters.loginUserEmail
    if (user && !loginUserEmail) {
      // emailからユーザ名を取得
      let authInfo = {'email': user.email}
      this.$store.dispatch('login', authInfo)
        .catch(err => {
          console.log('update login user error', err)
        })
    }
  }
}
</script>
