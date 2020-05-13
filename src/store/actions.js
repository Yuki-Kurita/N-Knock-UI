import * as types from './mutation-types'
import firebase from 'firebase'

export default {
  // KbnLoginViewから呼び出される AUTH_LOGIN mutationを実行
  login: (ctx, authInfo) => {
    // firebaseでログイン認証
    // mutationを実行
    console.log('mutation login')
    ctx.commit(types.AUTH_LOGIN, authInfo.email)
  },
  signUp: (ctx, authInfo) => {
    console.log('mutation signup')
    // SignUp成功時の処理
    const db = firebase.firestore()
    // usersコレクションにデータを追加
    db.collection('users').add({
      id: authInfo.id,
      email: authInfo.email,
      name: authInfo.email.split('@')[0]
    })
      .catch(function (err) {
        console.log('Error adding users documents: ', err)
      })
    ctx.commit(types.AUTH_LOGIN, authInfo.email)
  },
  updateAuth: (ctx, email) => {
    console.log('updateAuth')
    ctx.commit(types.AUTH_LOGIN, email)
  },
  logout: (ctx) => {
    // firebaseでログアウトを行う
    firebase.auth().signOut().then(() => {
      ctx.commit(types.AUTH_LOGOUT)
    })
  },
  updateList: (ctx, list) => {
    console.log('update list')
    ctx.commit(types.UPDATE_LIST, list)
  },
  updateKnocks: (ctx, knocks) => {
    console.log('update knocks')
    ctx.commit(types.UPDATE_KNOCKS, knocks)
  }
}
