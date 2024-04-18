<template>
    <div class="home-container">
        <div class="blog-list">
            <!-- 文章列表 -->
            <!-- <ul>
                <li v-for="article in articles" :key="article.id" class="blog-post">
                    <h2 class="post-title">{{ article.title }}</h2>
                    <p class="post-summary" v-html="renderMarkdown(article.summary)"></p>
                    <router-link class="read-more" :to="{ path: '/article/edit/' + article.id }">开始编辑</router-link>
                    <div class="read-more" @click="deleteBlog(article.id)">删除博客</div>
                </li>
            </ul> -->
        </div>
        <!-- 卡片容器 -->
        <div class="flex gap-4">
            <div v-for="article in articles" :key="article.id" class="card lg:card-side bg-base-100 shadow-xl bg-gray-200">
                <div class="card-body">
                    <h2 class="card-title">{{ article.title }}</h2>
                    <p v-html="renderMarkdown(article.summary)"></p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary"
                            @click="this.$router.replace({ path: '/article/edit/' + article.id })">开始编辑</button>
                    </div>
                </div>
                <button class="close-button" @click="deleteBlog(article.id)">&times;</button>
            </div>
        </div>
    </div>
</template>



<script>
// import { ref, onMounted } from 'vue';
import { fetchArticles } from '@/api';
import MarkdownIt from 'markdown-it';
import { deleteArticle } from '@/api/index.js'
import { userAuthStore } from '@/store';
const md = new MarkdownIt({
    html: true,
    linkify: true,
    // 其他配置...
});

export default {
    data() {
        return {
            articles: [],
        }
    },
    methods: {
        async loadData() {
            try {
                const data = await fetchArticles();
                const summaryLength = 200;
                for (const article of data) {
                    // 确保article对象有content属性
                    if (article && typeof article.content === 'string') {
                        let summary = article.content.slice(0, summaryLength);
                        // 如果内容被截断，添加省略号
                        if (summary.length < article.content.length) {
                            summary += '...';
                        }
                        // 设置文章的summary属性
                        article.summary = summary;
                    }
                }
                this.articles = data;
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        },
        deleteBlog(id) {
            const confirmed = confirm('您确定要删除这篇博客吗？');
            if (confirmed) {
                return deleteArticle(id).then(() => {
                    // 成功删除后，重新加载页面
                    window.location.reload();
                }).catch(error => {
                    console.error('Error deleting article:', error);
                    // 可以在这里显示一个错误提示给用户
                });
            }
        },
        renderMarkdown(text) {
            return md.render(text);
        }
    },
    mounted() {
        this.loadData();
    },
    created() {
        this.store = userAuthStore(); // 将存储实例的创建移到 created 钩子中
    },
}

</script>

<style scoped>
.home-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    margin-top: 60px;
}

.home-title {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
}

.blog-list {
    list-style: none;
    padding: 0;
}

.blog-post {
    background-color: #f4f0f0;
    border-radius: 5px;
    margin-bottom: 20px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-title {
    color: #333;
    margin: 10px;
    font-size: 1.5em;
}

.post-summary {
    margin: 10px;
    color: #666;
    line-height: 1.6;
    font-size: small;
}

.read-more {
    display: block;
    margin: 10px;
    background-color: #007bff;
    color: white;
    padding: 5px 10px;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
    text-align: center;
}

.delete-blog {
    display: flex;
    /* 启用Flexbox布局 */
    justify-content: center;
    /* 水平居中 */
    background-color: #007bff;
    color: white;
    padding: 5px 10px;
    text-decoration: none;
    border-radius: 5px;
    text-align: center;
}

.button-container {
    display: flex;
    /* 启用Flexbox布局 */
    justify-content: center;
    /* 水平居中 */
}


.read-more:hover {
    background-color: #0056b3;
}


.close-button {
    position: absolute;
    top: 10px;
    /* 右上角的距离，可以根据需要调整 */
    right: 10px;
    /* 右上角的距离，可以根据需要调整 */
    cursor: pointer;
    font-size: 20px;
    background: transparent;
    border: none;
    padding: 0;
}
</style>