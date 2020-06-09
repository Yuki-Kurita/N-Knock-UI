<template>
  <div class="kock-list-view">
    <div
      v-for="knockList in knockLists"
      :key="knockList.knockListId"
    >
      <KnockList
        :knock-list="knockList"
      />
    </div>
  </div>
</template>

<script>
import KnockList from '../atoms/KnockList.vue'

export default {
  name: 'KnockLists',
  components: {
    KnockList
  },
  props: {
    knockLists: {
      type: Array,
      default: () => ([]),
      required: false
    }
  }
}
</script>
