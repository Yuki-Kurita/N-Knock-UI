<template>
  <button
    :class="classes"
    :disabled="disabled"
    type="button"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'LoginButton',

  props: {
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    // `type`に応じてクラスを動的に生成する
    classes () {
      const cls = this.type === 'text' ? ('-' + this.type) : ''
      return [`login-button${cls}`]
    }
  },

  methods: {
    // `click`イベントを発行 => 親コンポーネントのclickイベントが発行
    handleClick (ev) {
      this.$emit('click', ev)
    }
  }
}
</script>

<style scoped>
.login-button {
  padding: .6em 1.3em;
}

.login-button-text{
  border: none;
  padding-right: 0;
  padding-left: 0;
}
</style>
