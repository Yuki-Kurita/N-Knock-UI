<template>
  <div class="My-kock-list-view">
    <Navigation/>
    <KnockLists
      :knock-lists="knockLists"
    />
  </div>
</template>

<script>
import Navigation from '@/components/molecules/Navigation.vue'
import KnockLists from '@/components/molecules/KnockLists.vue'
import firebase from 'firebase'
import UpdateLoginUser from '@/components/mixin/UpdateLoginUser'
import * as api from '@/components/api-types'

export default {
  name: 'TagKnockListView',

  components: {
    Navigation,
    KnockLists
  },
  mixins: [UpdateLoginUser],
  data () {
    return {
      knockLists: []
    }
  },
  created: function () {
    // 自身のuid(fireId)に一致するノックリストを取得
    let firebaseId = firebase.auth().currentUser.uid
    console.log(firebaseId)
    this.axios.get(api.KNOCKLISTPREFIX + '/search', {
      params: {
        fireId: firebaseId
      }
    })
      .then((response) => {
        console.log(response)
        this.knockLists = response.data.knockLists
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>
