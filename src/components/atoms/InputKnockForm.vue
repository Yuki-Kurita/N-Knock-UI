<template>
  <div>
    <!-- タイトルの入力フォーム -->
    <div class="form-item">
      <label for="quiz">問題</label>
      <input
        id="quiz"
        v-model="quiz"
        type="text"
        autocomplete="off"
        placeholder="例: 'a'と'b'を結合して出力せよ"
        @change="changeKnock"
        @focus="resetError">
      <ul class="validation-errors">
        <!-- computedのvalidationに渡して、フォームチェック -->
        <li v-if="!validation.quiz.format">問題は200文字以内で入力してください。</li>
        <li v-if="!validation.quiz.required">問題が入力されていません。</li>
      </ul>
    </div>
    <div class="form-item">
      <label for="answer">正解</label>
      <input
        id="answer"
        v-model="answer"
        type="text"
        autocomplete="off"
        placeholder="例: print('a' + 'b')"
        @change="changeKnock"
        @focus="resetError">
      <ul class="validation-errors">
        <li v-if="!validation.answer.format">正解は400文字以内で入力してください</li>
        <li v-if="!validation.answer.required">正解が入力されていません。</li>
      </ul>
    </div>
  </div>
</template>

<script>
const required = val => !!val.trim()
const quizFormat = val => !!(val.length < 200)
const answerFormat = val => !!(val.length < 400)

export default{
  name: 'InputKnockForm',

  props: {
    resetError: {
      type: Function,
      required: true
    },
    error: {
      type: String,
      default: ''
    },
    knocks: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      quiz: '',
      answer: ''
    }
  },

  computed: {
    validation () { // emailとpasswordのバリデーション
      return {
        quiz: {
          // 入力されたかどうか返す
          required: required(this.quiz),
          format: quizFormat(this.quiz)
        },
        answer: {
          required: required(this.answer),
          format: answerFormat(this.answer)
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
    }
  },
  methods: {
    changeKnock () {
      // 両方のフォームが入力されていると更新処理を行う
      if (this.quiz && this.answer) {
        // idが同じ(コンポーネントが同じ)であればオブジェクトの更新を行う
        this.$emit('finish-input', this.id, this.quiz, this.answer)
      }
    }
  }
}
</script>
