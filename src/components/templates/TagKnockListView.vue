<template>
  <div class="tag-knock-list-view">
    <Navigation/>
    <p>{{ $route.params.tagName }}</p>
    <KnockLists
      :knock-lists="lists"
    />
  </div>
</template>

<script>
import Navigation from '@/components/molecules/Navigation.vue'
import KnockLists from '@/components/molecules/KnockLists.vue'
import UpdateLoginUser from '@/components/mixin/UpdateLoginUser'
import firebase from 'firebase'

export default {
  name: 'TagKnockListView',

  components: {
    Navigation,
    KnockLists
  },
  mixins: [UpdateLoginUser],
  data () {
    return {
      lists: []
    }
  },
  created: function () {
    // マウント後にルーティングされたタグのリストを取得
    const db = firebase.firestore()
    let listData = {}
    db.collection('list').where('tag', '==', this.$route.params.tagName).get()
      .then((querySnapshot) => {
        let array = []
        querySnapshot.forEach(function (doc) {
          listData = doc.data()
          listData.id = doc.id
          array.push(listData)
        })
        this.lists = array
        console.log('Getting list : ', array)
      })
      .catch((err) => {
        console.log('Error getting list : ', err)
      })
  }
}
</script>
