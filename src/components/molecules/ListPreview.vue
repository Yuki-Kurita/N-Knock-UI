<template>
  <div class="list-preview">
    タイトル : {{ list['title'] }}
    実行環境 : {{ list['explaination'] }}
    更新日 : {{ list['updated_at'] }}
    タグ : {{ list['tag'] }}
  </div>
</template>

<script>

export default{
  name: 'ListPreview',

  props: {
    list: {
      type: Object,
      required: true
    }
  }
}
</script>
