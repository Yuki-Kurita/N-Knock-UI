<template>
  <div class="nkock-view">
    <Navigation/>
    <p>ログインしました</p>
    <KnockLists
      :knock-lists="knockListGroup"
    />
  </div>
</template>

<script>
import Navigation from '@/components/molecules/Navigation.vue'
import UpdateLoginUser from '@/components/mixin/UpdateLoginUser.vue'
import * as api from '@/components/api-types'
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
  // ノックリストを全取得
  mounted: function () {
    this.axios.get(api.KNOCKLISTPREFIX + '/all')
      .then((response) => {
        console.log('response : ', response.data.knockLists)
        this.knockListGroup = response.data.knockLists
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>
