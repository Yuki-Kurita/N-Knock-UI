<template>
  <form novalidate>
    <!-- メールアドレスの入力フォーム -->
    <div class="form-item">
      <label for="username">ユーザ名</label>
      <!-- 入力されたemailをdataにバインド -->
      <input
        id="user-name"
        v-model="userName"
        type="text"
        autocomplete="off"
        @focus="resetError">
      <ul class="validation-errors">
        <!-- computedのvalidationに渡して、フォームチェック -->
        <li v-if="!validation.userName.over">ユーザ名は10文字以下で入力してください</li>
        <li v-if="!validation.userName.required">ユーザ名が入力されていません。</li>
      </ul>
    </div>
    <div class="form-actions">
      <!-- 入力条件を満たさないとdisabledスタイルが適用される -->
      <!-- 親コンポーネントでclickイベントをlistenしている -->
      <LoginButton
        :disabled="disableLoginAction"
        @click="handleClick"
      >
        ユーザ編集
      </LoginButton>
      <p
        v-if="progress"
        class="login-progress"
      >
        変更中...
      </p>
      <p
        v-if="error"
        class="login-error"
      >
        {{ error }}
      </p>
    </div>
  </form>
</template>

<script>
// LoginButtonをインポート
import LoginButton from '@/components/atoms/LoginButton.vue'
// 空白文字以外がフォームに入力されたかどうかをチェック、!!はBoleanに変換
const required = val => !!val.trim()

export default {
  name: 'UserNameEditForm',

  components: {
    LoginButton
  },

  props: {
    onEditUserName: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      userName: '',
      progress: false,
      error: ''
    }
  },

  computed: {
    validation () { // userNameとpasswordのバリデーション
      return {
        userName: {
          // 入力されたかどうか返す
          required: required(this.userName),
          // 10文字以内か
          over: this.userName.length <= 10
        }
      }
    },

    valid () {
      const validation = this.validation // 先に定義したvalidationを用いて可否を返す
      // fields => validationキーの配列
      const fields = Object.keys(validation)
      let valid = true
      for (let i = 0; i < fields.length; i++) {
        // validationのキー(email, password)が順に入る
        const field = fields[i]
        // 全てのキーに対して値(boolean)を求める. keyにはrequired, formatが入る
        valid = Object.keys(validation[field])
          .every(key => validation[field][key])
        // validation関数でいずれかの入力フォーム条件をみたさない(valid = false)だとbreakする
        if (!valid) { break }
      }
      return valid
    },

    disableLoginAction () { // validを使ってログイン処理の可否
      // 入力フォームの条件を満たさないとvalid = falseとなる.
      // 条件満たさないとき or ログイン遷移中はdisableスタイルを適用
      return !this.valid || this.progress
    }
  },

  methods: {
    // フォームにfocusされた時にエラー文を消す
    resetError () {
      this.error = ''
    },
    // ログインボタンを押した時に発火
    handleClick (ev) {
      if (this.disableLoginAction) { return } // 不備があればログイン処理が実行されないようガード

      this.progress = true // ログイン処理実行中をあらわす
      this.error = ''
      this.$nextTick(() => {
        this.onEditUserName(this.userName)
        this.progress = false
      })
    }
  }
}
</script>

<style scoped>
form {
  display: block;
  margin: 0 auto;
  text-align: left;
}
label {
  display: block;
}
input {
  width: 100%;
  padding: .5em;
  font: inherit;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0.25em 0;
}
ul li {
  font-size: 0.5em;
}
.validation-errors {
  height: 32px;
}
.form-actions p {
  font-size: 0.5em;
}
</style>
