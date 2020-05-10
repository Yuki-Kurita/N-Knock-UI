<template>
  <div class="tag-kock-list-view">
    <Navigation/>
    <p>{{ $route.params.tagName }}</p>
    <KnockList
      :knock-lists="lists"
    />
  </div>
</template>

<script>
import Navigation from '@/components/molecules/Navigation.vue'
import KnockList from '@/components/molecules/KnockList.vue'
import UpdateLoginUser from '@/components/mixin/UpdateLoginUser'
import firebase from 'firebase'

export default {
  name: 'TagKnockListView',

  components: {
    Navigation,
    KnockList
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
    db.collection('list').where('tag', '==', this.$route.params.tagName).get()
      .then((querySnapshot) => {
        let array = []
        querySnapshot.forEach(function (doc) {
          array.push(doc.data())
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
