<template>
  <div class="search-form">
    <select
      v-model="selectedTag"
      name="tag"
      class="tag"
    >
      <option
        v-for="tag in tags"
        :key="tag.tagId"
        :value="tag.tagId"
      >
        {{ tag.tagName }}
      </option>
    </select>
    <input
      v-model="searchWord"
      class="search-word"
      name="search-word"
      type="text"
    >
    <button
      class="search-button"
      @click="searchKnockList"
    >
      検索
    </button>
  </div>
</template>

<script>
import * as api from '@/components/api-types'

export default {
  name: 'SearchForm',

  data () {
    return {
      tags: [],
      selectedTag: '',
      searchWord: ''
    }
  },

  mounted: function () {
    // mount時にタグ名とidを全取得
    this.axios.get(api.KNOCKLISTPREFIX + '/tags')
      .then((response) => {
        console.log(response)
        this.tags = response.data.tags
      })
      .catch((err) => {
        console.log(err)
      })
  },

  methods: {
    searchKnockList () {
      // タグとワードでノックリストを取得
      let searchInfo = {
        knockListName: this.searchWord,
        tagId: this.tagId
      }
      this.$store.dispatch('getKnockList', searchInfo)
    }
  }
}
</script>
