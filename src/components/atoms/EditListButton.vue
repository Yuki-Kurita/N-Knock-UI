<template>
  <div>
    <button @click="editEvent">
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  name: 'EditListButton',

  methods: {
    editEvent () {
      this.$emit('edit-event')
    }
  }
}
</script>

<style scoped>
</style>
