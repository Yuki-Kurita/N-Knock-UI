<template>
  <div class="kock-view">
    {{ title }}
    {{ explaination }}
    {{ tag }}
    {{ updated }}
    {{ name }}
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Knock',
  props: {
    knockList: {
      type: Object,
      default: () => ({}),
      required: false
    }
  },
  data () {
    return {
      name: '',
      title: '',
      explaination: '',
      tag: '',
      updated: ''
    }
  },
  mounted: function () {
    this.title = this.knockList.title
    this.explaination = this.knockList.explaination
    this.tag = this.knockList.tag
    // timestampをDate型のYYYY/MM/DDにフォーマットする
    let dt = this.knockList.updated_at.toDate()
    this.updated = `${dt.getFullYear()}/${(dt.getMonth() + 1).toString()
      .padStart(2, '0')}/${dt.getDate().toString().padStart(2, '0')}`
    // uidからユーザ名取得
    let userName = ''
    const db = firebase.firestore()
    db.collection('users').where('id', '==', this.knockList.user_id).get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          userName = doc.data().name
        })
        this.name = userName
      })
  }
}
</script>
