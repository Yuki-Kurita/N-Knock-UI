// mutation-typesでAUTH_LOGINなどを定義 => type.AUTH_LOGINなどでアクセス可能
import * as types from './mutation-types'

export default{
  // 定数を関数名として利用できる
  [types.AUTH_LOGIN] (state, authInfo) {
    // firebaseが返したuser情報
    state.email = authInfo.email
    state.userName = authInfo.userName
    state.auth = true
  },

  [types.AUTH_UPDATE] (state, userName) {
    state.userName = userName
    state.auth = true
  },

  [types.AUTH_LOGOUT] (state) {
    state.email = ''
    state.userName = ''
    state.auth = false
  },

  [types.UPDATE_LIST] (state, list) {
    state.list = list
  },
  [types.UPDATE_KNOCKS] (state, knocks) {
    state.knocks = knocks
  },
  [types.GET_KNOCKLIST] (state, knockLists) {
    state.knockLists = knockLists
  }
}
