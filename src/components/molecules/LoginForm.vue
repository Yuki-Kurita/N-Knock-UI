<template>
  <form novalidate>
    <!-- メールアドレスの入力フォーム -->
    <div class="form-item">
      <label for="email">メールアドレス</label>
      <!-- 入力されたemailをdataにバインド -->
      <input
        id="email"
        v-model="email"
        type="text"
        autocomplete="off"
        placeholder="例: kanban@domain.com"
        @focus="resetError">
      <ul class="validation-errors">
        <!-- computedのvalidationに渡して、フォームチェック -->
        <li v-if="!validation.email.format">メールアドレスの形式が不正です。</li>
        <li v-if="!validation.email.required">メールアドレスが入力されていません。</li>
      </ul>
    </div>
    <div class="form-item">
      <label for="passowrd">パスワード</label>
      <!-- 入力されたpasswordをdataにバインド -->
      <input
        id="password"
        v-model="password"
        type="password"
        autocomplete="off"
        placeholder="例: xxxxxxxx"
        @focus="resetError">
      <ul class="validation-errors">
        <li v-if="!validation.password.required">パスワードが入力されていません。</li>
      </ul>
    </div>
    <div class="form-actions">
      <!-- 入力条件を満たさないとdisabledスタイルが適用される -->
      <!-- 親コンポーネントでclickイベントをlistenしている -->
      <LoginButton
        :disabled="disableLoginAction"
        @click="handleClick"
      >
        ログイン
      </LoginButton>
      <p
        v-if="progress"
        class="login-progress"
      >
        ログイン中...
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
// メールアドレスのフォーマットをチェックする正規表現
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// 空白文字以外がフォームに入力されたかどうかをチェック、!!はBoleanに変換
const required = val => !!val.trim()

export default {
  name: 'LoginForm',

  components: {
    LoginButton
  },

  props: {
    onlogin: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      email: '',
      password: '',
      progress: false,
      error: ''
    }
  },

  computed: {
    validation () { // emailとpasswordのバリデーション
      return {
        email: {
          // 入力されたかどうか返す
          required: required(this.email),
          // test()メソッドで正規表現と指定された文字列の一致を調べる
          // => メールアドレスのフォーマットと合っていればtrueを返す
          format: REGEX_EMAIL.test(this.email)
        },
        password: {
          required: required(this.password)
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
      // DOM更新が終わった後に実行される : 親コンポーネントのonloginメソッド発火
      this.$nextTick(() => {
        this.onlogin({ email: this.email, password: this.password })
          .catch(err => {
            this.error = err.message
          })
          .then(() => {
            this.progress = false
          })
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
