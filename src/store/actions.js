import * as types from './mutation-types'
import firebase from 'firebase'
import * as api from '../components/api-types'
import axios from 'axios'

export default {
  // KbnLoginViewから呼び出される AUTH_LOGIN mutationを実行
  login: (ctx, authInfo) => {
    // APIからユーザ名を取得
    axios.get(api.USERPREFIX, {
      params: {
        email: authInfo.email
      }
    })
      .then((response) => {
        console.log(response)
        authInfo.userName = response.data.userName
        ctx.commit(types.AUTH_LOGIN, authInfo)
      })
      .catch((err) => {
        console.log(err)
      })
  },

  signUp: (ctx, authInfo) => {
    console.log('mutation signup : ' + authInfo.userName)
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
  updateAuth: (ctx, userName) => {
    ctx.commit(types.AUTH_UPDATE, userName)
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
  },
  getKnockList: (ctx, knockLists) => {
    ctx.commit(types.GET_KNOCKLIST, knockLists)
  }
}
