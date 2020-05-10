<template>
  <div class="kock-list-view">
    <div
      v-for="knockList in knockLists"
      :key="knockList.id"
    >
      <Knock
        :knock-list="knockList"
      />
    </div>
  </div>
</template>

<script>
import Knock from '@/components/atoms/Knock.vue'

export default {
  name: 'KnockList',

  components: {
    Knock
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
