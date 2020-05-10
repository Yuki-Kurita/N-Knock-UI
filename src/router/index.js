import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import firebase from 'firebase'

Vue.use(Router)

// routes.jsを読み込んでRouterインスタンス作成
const router = new Router({ routes })

// ログイン時のuthenticationの設定をする
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // firebaseを通してログインしているか認証
  // ログインされてなければ、ログインページにリダイレクト
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          path: './login',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next()
  }
})

export default router
