<template>
  <div class="search-result-view">
    <Navigation/>
    <KnockLists
      :knock-lists="knockListGroup"
    />
  </div>
</template>

<script>
import Navigation from '@/components/molecules/Navigation.vue'
import UpdateLoginUser from '@/components/mixin/UpdateLoginUser.vue'
import KnockLists from '@/components/molecules/KnockLists.vue'

export default {
  name: 'NKnockView',
  components: {
    Navigation,
    KnockLists
  },
  mixins: [UpdateLoginUser],
  data () {
    return {
      knockListGroup: []
    }
  },
  computed: {
    getKnockLists () {
      return this.$store.getters.searchKnockLists
    }
  },
  watch: {
    getKnockLists (val, old) {
      this.knockListGroup = val
    }
  }
}
</script>
