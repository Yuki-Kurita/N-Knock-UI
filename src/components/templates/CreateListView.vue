<template>
  <div class="create-list-view">
    <Navigation/>
    <CreateListForm/>
  </div>
</template>

<script>
import Navigation from '@/components/molecules/Navigation.vue'
import CreateListForm from '@/components/molecules/CreateListForm.vue'
import UpdateLoginUser from '@/components/mixin/UpdateLoginUser'

export default {
  name: 'CreateListView',
  components: {
    Navigation,
    CreateListForm
  },
  mixins: [UpdateLoginUser]
}
</script>
