<script>
import firebase from 'firebase'

export default {
  name: 'UpdateLoginUser',
  created: function () {
    // 現在ログインしていたら、そのユーザ情報をVuexで管理
    console.log(this)
    let user = firebase.auth().currentUser
    if (user) {
      let authInfo = { 'email': user.email }
      console.log(this)
      this.$store.dispatch('login', authInfo)
        .catch(err => {
          console.log('update login user error', err)
        })
    }
  }
}
</script>
