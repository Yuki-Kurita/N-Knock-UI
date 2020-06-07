import * as types from './mutation-types'
import firebase from 'firebase'
import * as api from '../components/api-types'
import axios from 'axios'

export default {
  // KbnLoginViewから呼び出される AUTH_LOGIN mutationを実行
  login: (ctx, authInfo) => {
    // firebaseでログイン認証
    // mutationを実行
    console.log('mutation login')
    ctx.commit(types.AUTH_LOGIN, authInfo.email)
  },

  signUp: (ctx, authInfo) => {
    console.log('mutation signup' + authInfo.userName)
    // APIにユーザ情報を登録
    axios.post(api.USERPREFIX, {
      email: authInfo.email,
      fireId: authInfo.id,
      userName: authInfo.userName
    })
      .then((response) => {
        console.log(response)
        // ログインユーザ情報の更新
        ctx.commit(types.AUTH_LOGIN, authInfo)
      })
      .catch((err) => {
        // サーバエラー、ログにも残したい
        console.log('faiture...')
        alert(err)
      })
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
