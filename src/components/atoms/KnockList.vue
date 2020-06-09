<template>
  <div class="knock-view">
    <router-link :to="{path:'/knockDetail/' + knockList.knockListId}">{{ knockListName }}</router-link>
    {{ overview }}
    {{ updatedAt }}
    {{ tagName }}
    {{ userName }}
    test
  </div>
</template>

<script>
export default {
  name: 'KnockList',
  props: {
    knockList: {
      type: Object,
      default: () => ({}),
      required: false
    }
  },
  data () {
    return {
      knockListName: '',
      overview: '',
      updatedAt: '',
      tagName: '',
      userName: ''
    }
  },
  mounted: function () {
    this.knockListName = this.knockList.knockListName
    this.overview = this.knockList.overview
    this.tagName = this.knockList.tagName
    // timestampをDate型のYYYY/MM/DDにフォーマットする
    this.updatedAt = this.knockList.updatedAt.split('T')[0].replace(/-/g, '/')
    this.userName = this.knockList.userName
  }
}
</script>
