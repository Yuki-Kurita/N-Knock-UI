<template>
  <div class="knock-detail-view">
    <Navigation/>
    <!-- リストを表示 -->
    <ListPreview
      :list="list"
    />
    <!-- Knockを表示 -->
    <KnockPreview
      :knocks="knocks"
    />
    <!-- 編集するボタンを表示 -->
    <div v-if="isshow">
      <EditListButton
        @edit-event="editList"
      >
        削除する
      </EditListButton>
    </div>
    <!-- 削除するボタンを表示 -->
    <div v-if="isshow">
      <RemoveListButton
        @remove-event="removeList"
      >
        削除する
      </RemoveListButton>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/molecules/Navigation.vue'
import firebase from 'firebase'
import UpdateLoginUser from '@/components/mixin/UpdateLoginUser'
import ListPreview from '@/components/molecules/ListPreview'
import KnockPreview from '@/components/molecules/KnockPreview'
import EditListButton from '@/components/atoms/EditListButton'
import RemoveListButton from '@/components/atoms/RemoveListButton'

export default {
  name: 'KnockDetailView',

  components: {
    Navigation,
    ListPreview,
    KnockPreview,
    EditListButton,
    RemoveListButton
  },
  mixins: [UpdateLoginUser],
  data () {
    return {
      knocks: [],
      list: {},
      isshow: false
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
        this.list = doc.data()
        this.$store.dispatch('updateList', this.list)
        // ログインユーザとリスト作成ユーザが一致してるか
        let user = firebase.auth().currentUser
        this.isshow = !!(this.list.user_id === user.uid)
      })
      .catch((err) => {
        console.log('Error getting list : ', err)
      })
  },
  methods: {
    removeList () {
      let knockDocs = []
      const db = firebase.firestore()
      // Listを削除する処理
      // ListのDocument idからlistを削除
      db.collection('list').doc(this.$route.params.listid)
        .delete()
        .catch((err) => {
          console.log('Error deleting list doc id : ', err)
        })
      // ListのDocument idを持つKnockのDocument idを取得
      db.collection('knock')
        .where('list_id', '==', this.$route.params.listid).get()
        .then((querySnapshot) => {
          querySnapshot.forEach(function (doc) {
            knockDocs.push(doc.id)
          })
          // 取得できた全てのknockのDocument idに対して削除を行う
          for (let doc of knockDocs) {
            db.collection('knock').doc(doc)
              .delete()
              .catch((err) => {
                console.log('Error deleting knock doc id : ', err)
              })
          }
          // 削除後、マイページに遷移
          this.$router.push('/myKnockList')
        })
        .catch((err) => {
          console.log('Error getting knock doc id : ', err)
        })
    },
    editList () {
      // EditListButtonを押した際に発火、編集ページへ遷移
      this.$router.push('/editKnockList') // paramとしてlistidを含ませたい
    }
  }
}
</script>
