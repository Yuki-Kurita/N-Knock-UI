<template>
  <div class="knock-preview">
    <div
      v-for="knock in knocks"
      :key="knock.id">
      Quiz : {{ knock.quiz }}
      Answer : {{ knock.answer }}
    </div>
  </div>
</template>

<script>

export default{
  name: 'KnockPreview',

  props: {
    knocks: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
