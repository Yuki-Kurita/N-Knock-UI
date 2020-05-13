<template>
  <div class="knock-detail-view">
    <Navigation/>
    <!-- Knockとリストを表示 -->
    {{ list }}
    {{ knocks }}
  </div>
</template>

<script>
import Navigation from '@/components/molecules/Navigation.vue'
import firebase from 'firebase'
import UpdateLoginUser from '@/components/mixin/UpdateLoginUser'

export default {
  name: 'KnockDetailView',

  components: {
    Navigation
  },
  mixins: [UpdateLoginUser],
  data () {
    return {
      knocks: [],
      list: {}
    }
  },
  created: function () {
    // インスタンス作成後にリストのKnockを取得
    const db = firebase.firestore()
    db.collection('knock').where('list_id', '==', this.$route.params.listid).get()
      .then((querySnapshot) => {
        let array = []
        querySnapshot.forEach(function (doc) {
          array.push(doc.data())
        })
        this.knocks = array
        console.log('Getting knocks : ', array)
        this.$store.dispatch('updateKnocks', this.knocks)
      })
      .catch((err) => {
        console.log('Error getting knocks : ', err)
      })
    // route.paramsからlistの情報を取得してStoreに登録
    db.collection('list').doc(this.$route.params.listid)
      .get().then((doc) => {
        this.list['explaination'] = doc.data().explaination
        this.list['tag'] = doc.data().tag
        this.list['title'] = doc.data().title
        this.list['updated_at'] = doc.data().updated_at
        this.list['user_id'] = doc.data().user_id
        this.$store.dispatch('updateList', this.list)
      })
      .catch((err) => {
        console.log('Error getting list : ', err)
      })
  }
}
</script>
