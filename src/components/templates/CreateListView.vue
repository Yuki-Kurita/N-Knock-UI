<template>
  <div class="create-list-view">
    <Navigation/>
    <CreateListForm/>
  </div>
</template>

<script>
import Navigation from '@/components/molecules/Navigation.vue'
import CreateListForm from '@/components/molecules/CreateListForm.vue'

export default {
  name: 'CreateListView',

  components: {
    Navigation,
    CreateListForm
  }
}
</script>
