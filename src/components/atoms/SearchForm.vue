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
      selectedTag: null,
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
      if (this.selectedTag === '') {
        this.selectedTag = 0
      }
      // タグとワードでノックリストを取得
      this.axios.get(api.KNOCKLISTPREFIX + '/search', {
        params: {
          knockListName: this.searchWord,
          tagId: this.selectedTag
        }
      })
        .then((response) => {
          // stateに情報を更新する
          console.log('getknocklist!!', response.data.knockLists)
          this.$store.dispatch('getKnockList', response.data.knockLists)
          this.$router.push('/searchResult', () => {}, () => {})
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
