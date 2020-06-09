<template>
  <div class="user-edit-view">
    <Navigation/>
    <UserNameEditForm :on-edit-user-name="handleEditUserName"/>
    <!-- <EmailEditForm/>
    <PasswordEditForm/> -->
  </div>
</template>

<script>
import UserNameEditForm from '@/components/molecules/UserNameEditForm.vue'
import EmailEditForm from '@/components/molecules/EmailEditForm.vue'
import PasswordEditForm from '@/components/molecules/PasswordEditForm.vue'
import Navigation from '@/components/molecules/Navigation.vue'
import UpdateLoginUser from '@/components/mixin/UpdateLoginUser.vue'
import * as api from '@/components/api-types'

export default {
  name: 'UserEditView',

  components: {
    UserNameEditForm,
    EmailEditForm,
    PasswordEditForm,
    Navigation
  },
  mixins: [UpdateLoginUser],
  computed: {
    // gettersでemailを取得
    userName: function () {
      return this.$store.getters.loginUserName
    },
    email: function () {
      return this.$store.getters.loginUserEmail
    }
  },
  methods: {
    // UserNameを更新
    handleEditUserName (userName) {
      this.axios.patch(api.USERPREFIX, {
        userName: userName,
        email: this.email
      })
        .catch(err => {
          console.log(err)
        })
        .then((response) => {
          console.log(response)
          this.$store.dispatch('updateAuth', userName)
          this.$router.push({ path: '/UserDetail' })
        })
    }
  }
}
</script>

<style scoped>
.login-view {
  width: 320px;
  margin: auto;
}
</style>
