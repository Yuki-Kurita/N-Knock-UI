<template>
  <div>
    <nav>
      <router-link to="/createList">作成する</router-link>
      <router-link to="/">タグから探す</router-link>
      <router-link to="/myKnockList">My Knock</router-link>
      <router-link to="userDetail">{{ userName }}</router-link>
      <a @click="logout">logout</a>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  computed: {
    // gettersでemailを取得
    userName: function () {
      return this.$store.getters.loginUserName
    }
  },
  methods: {
    logout () {
      // vuexのlogoutアクションを呼び出す
      this.$store.dispatch('logout')
        .then(() => {
          // ログアウト成功時の処理(アクション完了後に実行される)
          this.$router.push({ path: '/login' })
        })
        .catch(err => this.throwLogoutReject(err))
    },
    // 引数で与えられた理由でリジェクトされたPromiseオブジェクトを返す
    throwLogoutReject (err) { return Promise.reject(err) }
  }
}
</script>
