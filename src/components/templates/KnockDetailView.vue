<template>
  <div class="knock-detail-view">
    <Navigation/>
    {{ $route.params.listid }}
  </div>
</template>

<script>
import Navigation from '@/components/molecules/Navigation.vue'
// import firebase from 'firebase'
import UpdateLoginUser from '@/components/mixin/UpdateLoginUser'

export default {
  name: 'KnockDetailView',

  components: {
    Navigation
  },
  mixins: [UpdateLoginUser],
  data () {
    return {
      knocks: []
    }
  },
  created: function () {
    // インスタンス作成後にリストのKnockを取得
    // const db = firebase.firestore()
    // const uid = firebase.auth().currentUser.uid
    // db.collection('list').where('user_id', '==', uid).get()
    //   .then((querySnapshot) => {
    //     let array = []
    //     querySnapshot.forEach(function (doc) {
    //       array.push(doc.data())
    //     })
    //     this.lists = array
    //     console.log('Getting list : ', array)
    //   })
    //   .catch((err) => {
    //     console.log('Error getting list : ', err)
    //   })
  }
}
</script>
