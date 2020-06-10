import LoginView from '@/components/templates/LoginView.vue'
import NKnockView from '@/components/templates/NKnockView.vue'
import SignUpView from '@/components/templates/SignUpView.vue'
import TagKnockListView from '@/components/templates/TagKnockListView.vue'
import CreateListView from '@/components/templates/CreateListView.vue'
import MyKnockListView from '@/components/templates/MyKnockListView.vue'
import KnockDetailView from '@/components/templates/KnockDetailView'
import UserDetailView from '@/components/templates/UserDetailView'
import UserEditView from '@/components/templates/UserEditView'
import SearchResultView from '@/components/templates/SearchResultView'

// routeの振り分け : Knockの閲覧だけならログインする必要はない
// Knockの作成やいいね、save機能を使いたければログインさせる
export default [{
  // ログイン後のページ
  path: '/',
  component: NKnockView,
  meta: { requiresAuth: true }
}, {
  path: '/userDetail',
  component: UserDetailView,
  meta: {requiresAuth: true}
}, {
  path: '/userEdit',
  component: UserEditView,
  meta: {requiresAuth: true}
}, {
  path: '/createList',
  component: CreateListView
}, {
  path: '/myKnockList',
  component: MyKnockListView,
  meta: { requiresAuth: true }
}, {
  path: '/searchResult',
  component: SearchResultView,
  meta: {requiresAuth: true}
}, {
  path: '/login',
  component: LoginView
}, {
  path: '/signup',
  component: SignUpView
}, {
  path: '/tag/:tagName',
  component: TagKnockListView
}, {
  path: '/knockDetail/:listid',
  component: KnockDetailView
}, {
  path: '*',
  redirect: '/login'
}]
