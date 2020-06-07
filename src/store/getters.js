export default{
  //  ログインユーザのユーザ名を取得
  loginUserName: (state) => {
    return state.userName
  },

  // ログインユーザのemailを取得
  loginUserEmail: (state) => {
    return state.email
  }
}
