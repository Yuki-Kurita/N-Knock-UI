<template>
  <div class="My-kock-list-view">
    <Navigation/>
    <KnockList
      :knock-lists="lists"
    />
  </div>
</template>

<script>
import Navigation from '@/components/molecules/Navigation.vue'
import KnockList from '@/components/molecules/KnockList.vue'
import firebase from 'firebase'

export default {
  name: 'TagKnockListView',

  components: {
    Navigation,
    KnockList
  },
  data () {
    return {
      lists: []
    }
  },
  created: function () {
    // マウント後に自分で作成したリストを取得
    const db = firebase.firestore()
    const uid = firebase.auth().currentUser.uid
    db.collection('list').where('user_id', '==', uid).get()
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
