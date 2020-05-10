<template>
  <div class="nkock-view">
    <Navigation/>
    <p>ログインしました</p>
    <p>{{ email }}</p>
    <div
      v-for="tag in tags"
      :key="tag.tag_name"
    >
      <router-link :to="{path:'/tag/' + tag.tag_name}">{{ tag.tag_name }}</router-link>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/molecules/Navigation.vue'
import firebase from 'firebase'

export default {
  name: 'NKnockView',
  components: {
    Navigation
  },
  data () {
    return {
      tags: []
    }
  },
  computed: {
    // getterdでemailを取得
    email: function () {
      return this.$store.getters.loginEmail
    }
  },
  // タグ(プログラミング言語)を全取得
  mounted: function () {
    // マウント後にFirestoreのオブジェクト取得
    const db = firebase.firestore()
    db.collection('tags').get()
      .then((querySnapshot) => {
        let array = []
        querySnapshot.forEach(function (doc) {
          array.push(doc.data())
        })
        this.tags = array
      })
  }
}
</script>
