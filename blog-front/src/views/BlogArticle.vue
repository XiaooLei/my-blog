<template>
  <div class="page-wrapper">
    <div v-if="article" class="paper-container">
      <div style="position: relative;">
        <h class="text-2xl font-bold">{{ article.title }}</h>
        <span class="text-base" style="position: absolute; bottom: 0; right: 0;">2023/01/34 11:40</span>
      </div>
      <div class="divider"></div> 
      <p v-html="renderMarkdown(article.content)"></p>
    </div>
    <div v-if="error">
      <p>Error: {{ error.message }}</p>
    </div>
  </div>
</template>

<script>
import { fetchArticleById } from '@/api/index.js';
// import { ref, reactive } from 'vue';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  // 其他配置...
});

export default {
  props: {
    id: { type: String, required: true }
  },

  data() {
    return {
      article: {
        id: "0",
        title: "ddd",
        summary: "ddd",
        content: "This is some **bold** text.",
      },
      error: null,
    };
  },
  methods: {
    async fetchArticle() {
      try {
        console.log("begin fetch article by id:" + this.id);
        const data = await fetchArticleById(this.id);
        this.article.title = data.title;
        this.article.content = data.content;
      } catch (err) {
        this.error = err;
      }
    },
    renderMarkdown(content) {
      const res = md.render(content);
      return res;
    },
  },
  mounted() {
    this.fetchArticle();
  },

};
</script>

<style lang="scss" scoped>
.article {
  h1 {
    font-size: 36px;
    text-align: center;
  }

  p {
    font-size: 20px;
    line-height: 1.5;
    margin: 2rem 0;
  }
}


/* 页面背景样式 */
.page-wrapper {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

/* 纸张容器样式 */
.paper-container {
  max-width: 800px;
  background-color: white;
  padding: 20px;
  border-radius: 10px; // 圆角
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

</style>