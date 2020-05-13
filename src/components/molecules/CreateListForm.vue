<template>
  <form novalidate>
    <div class="create-list">
      <!-- タイトルの入力フォーム -->
      <div class="form-item">
        <label for="title">タイトル</label>
        <input
          id="title"
          v-model="title"
          type="text"
          autocomplete="off"
          placeholder="例: Javaで文字列操作マスター"
          @focus="resetError">
        <ul class="validation-errors">
          <!-- computedのvalidationに渡して、フォームチェック -->
          <li v-if="!validation.title.format">タイトルは30文字以内で入力してください。</li>
          <li v-if="!validation.title.required">タイトルが入力されていません。</li>
        </ul>
      </div>
      {{ selected_tag }}
      <div class="form-item">
        <!-- タグ選択 -->
        <label for="tag">タグ</label>
        <select
          id="tag"
          v-model="selected_tag"
          @focus="resetError"
        >
          <option
            v-for="tag in tags"
            :value="tag.tag_name"
            :key="tag.id">
            {{ tag.tag_name }}
          </option>
        </select>
        <ul class="validation-errors">
          <!-- computedのvalidationに渡して、フォームチェック -->
          <li v-if="!validation.title.format">タイトルは30文字以内で入力してください。</li>
          <li v-if="!validation.title.required">タイトルが入力されていません。</li>
        </ul>
      </div>
      <div class="form-item">
        <label for="explaination">実行環境</label>
        <input
          id="explaination"
          v-model="explaination"
          type="text"
          autocomplete="off"
          placeholder="例: JDK 8"
          @focus="resetError">
        <ul class="validation-errors">
          <li v-if="!validation.explaination.format">実行環境の説明は200文字以内で入力してください</li>
          <li v-if="!validation.explaination.required">実行環境の説明が入力されていません。</li>
        </ul>
      </div>
    </div>
    <!-- Knock作成用の入力フォーム -->
    <div
      v-for="n of counter"
      :key="n">
      <InputKnockForm
        :reset-error="resetError"
        :error="error"
        :knocks="knocks"
        :id="n"
        @finish-input="knockHandler"
      />
    </div>
    <!-- ボタンを押すたびにcounterが+1されてInputKnockFormコンポーネントが追加される -->
    <button @click="addQuiz">
      問題を追加
    </button>
    <div class="form-actions">
      <!-- 入力条件を満たさないとdisabledスタイルが適用される -->
      <CreateButton
        :disabled="disableCreateAction"
        @click="createList"
      >
        作成
      </CreateButton>
      <p
        v-if="progress"
        class="login-progress"
      >
        作成中...
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
import CreateButton from '@/components/atoms/CreateButton.vue'
import InputKnockForm from '@/components/atoms/InputKnockForm.vue'
import firebase from 'firebase'
// 空白文字以外がフォームに入力されたかどうかをチェック、!!はBoleanに変換
const required = val => !!val.trim()
const titleFormat = val => !!(val.length < 20)
const explainFormat = val => !!(val.length < 200)

export default {
  name: 'CreateListForm',

  components: {
    CreateButton,
    InputKnockForm
  },

  data () {
    return {
      title: '',
      explaination: '',
      progress: false,
      error: '',
      tags: [],
      selected_tag: '',
      knocks: {},
      counter: 3
    }
  },

  computed: {
    validation () { // emailとpasswordのバリデーション
      return {
        title: {
          // 入力されたかどうか返す
          required: required(this.title),
          format: titleFormat(this.title)
        },
        explaination: {
          required: required(this.explaination),
          format: explainFormat(this.explaination)
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

    disableCreateAction () { // validを使ってログイン処理の可否
      // 入力フォームの条件を満たさないとvalid = falseとなる.
      // 条件満たさないとき or ログイン遷移中はdisableスタイルを適用
      return !this.valid || this.progress
    }
  },
  // タグ(プログラミング言語)を全取得
  mounted: function () {
    // マウント後にFirestoreのオブジェクト取得
    const db = firebase.firestore()
    db.collection('tags').get()
      .then((querySnapshot) => {
        let array = []
        querySnapshot.forEach(function (doc) {
          array.push(doc.data())
        })
        this.tags = array
      })
  },

  methods: {
    // フォームにfocusされた時にエラー文を消す
    resetError () {
      this.error = ''
    },
    // 作成ボタンを押した時に発火
    createList (ev) {
      if (this.disableCreateAction) { return } // 不備があればログイン処理が実行されないようガード

      this.progress = true // 作成処理実行中をあらわす
      this.error = ''
      // 作成したリストをFireStoreに追加する処理
      const db = firebase.firestore()
      // ログインユーザIDを取得
      const uid = firebase.auth().currentUser.uid
      let now = new Date()

      // DOM更新が終わった後に実行される : 親コンポーネントのonloginメソッド発火
      this.$nextTick(() => {
        // listコレクションにデータを追加
        db.collection('list').add({
          title: this.title,
          explaination: this.explaination,
          tag: this.selected_tag,
          user_id: uid,
          created_at: now,
          updated_at: now
        })
          .then((doc) => {
            // list追加後、document_idを用いてknock追加
            for (let key in this.knocks) {
              db.collection('knock').add({
                list_id: doc.id,
                quiz: this.knocks[key]['quiz'],
                answer: this.knocks[key]['answer']
              })
            }
            // Knock作成完了後、MyKnockListに遷移
            this.$router.push('/myKnockList')
          })
          .catch((err) => {
            this.error = err.message
            this.progress = false
            console.log('Error adding list documents: ', err)
          })
      })
    },
    addQuiz () {
      this.counter += 1
    },
    // 子コンポーネント(InputKnockForm)からフォーム入力が完了した時に呼ばれる
    knockHandler (id, quiz, answer) {
      this.knocks[String(id)] = {
        'quiz': quiz,
        'answer': answer
      }
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
