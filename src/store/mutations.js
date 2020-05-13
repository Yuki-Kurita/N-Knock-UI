// mutation-typesでAUTH_LOGINなどを定義 => type.AUTH_LOGINなどでアクセス可能
import * as types from './mutation-types'

export default{
  // 定数を関数名として利用できる
  [types.AUTH_LOGIN] (state, email) {
    // firebaseが返したuser情報
    state.email = email
    state.auth = true
  },

  [types.AUTH_LOGOUT] (state) {
    state.email = ''
    state.auth = false
  },

  [types.UPDATE_LIST] (state, list) {
    state.list = list
  },
  [types.UPDATE_KNOCKS] (state, knocks) {
    state.knocks = knocks
  }
}
