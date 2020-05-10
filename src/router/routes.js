import LoginView from '@/components/templates/LoginView.vue'
import NKnockView from '@/components/templates/NKnockView.vue'
import SignUpView from '@/components/templates/SignUpView.vue'
import TagKnockListView from '@/components/templates/TagKnockListView.vue'
import CreateListView from '@/components/templates/CreateListView.vue'
import MyKnockListView from '@/components/templates/MyKnockListView.vue'

// routeの振り分け
export default [{
  // ログイン後のページ
  path: '/',
  component: NKnockView,
  meta: { requiresAuth: true }
}, {
  path: '/createList',
  component: CreateListView,
  meta: { requiresAuth: true }
}, {
  path: '/myKnockList',
  component: MyKnockListView,
  meta: { requiresAuth: true }
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
  path: '*',
  redirect: '/login'
}]
