<template>
  <div>
    <button @click="removeEvent">
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  name: 'RemoveListButton',

  methods: {
    removeEvent () {
      this.$emit('remove-event')
    }
  }
}
</script>

<style scoped>
</style>
