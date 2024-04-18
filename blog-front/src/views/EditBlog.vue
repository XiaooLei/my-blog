<template>
    <div class="edit-blog-page">
        <el-card class="box-card">
            <h2>编辑博客</h2>
            <el-form :model="article" label-width="120px">
                <el-form-item label="标题">
                    <el-input v-model="article.title"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <div style="border: 1px solid #ccc">
                        <Toolbar
                        style="border-bottom: 1px solid #ccc"
                        :editor="editorRef"
                        :defaultConfig="toolbarConfig"
                        :mode="mode"
                        />
                        <Editor
                        style="height: 500px; overflow-y: hidden;"
                        v-model="article.content"
                        :defaultConfig="editorConfig"
                        :mode="mode"
                        @onCreated="handleCreated"
                        />
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateArticle(article.id, article);ElMessage.success('博客提交成功！');
                    this.$router.replace('/')" style="display: block; margin: 0 auto;">提交修改</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { fetchArticleById } from '@/api/index.js';
import { onBeforeUnmount, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {updateArticle} from "@/api/index.js"
import { ElMessage } from 'element-plus';

export default {
    props: {
        id: { type: String, required: true }
    },
    components: { Editor, Toolbar },
    setup(props) {
        const article = reactive({
            id: "0",
            title: "ddd",
            summary: "ddd",
            content: "This is some **bold** text."
        });
        const error = ref(null);

            // 编辑器实例，必须用 shallowRef
        const editorRef = shallowRef()

        const toolbarConfig = {}
        const editorConfig = { placeholder: '请输入内容...' }

            // 组件销毁时，也及时销毁编辑器
        onBeforeUnmount(() => {
            const editor = editorRef.value
            if (editor == null) return
            editor.destroy()
        })

        const handleCreated = (editor) => {
            editorRef.value = editor // 记录 editor 实例，重要！
        }


        const fetchArticle = async () => {
            try {
                console.log("begin fetch article by id:" + props.id);
                const data = await fetchArticleById(props.id);
                article.id = data.id
                article.title = data.title;
                article.content = data.content;
            } catch (err) {
                error.value = err;
            }
        };

        fetchArticle();

        return { 
            article, 
            mode: 'default',
            toolbarConfig,
            editorConfig,
            editorRef,
            handleCreated,
            fetchArticle,
            updateArticle,
            error,
            ElMessage,
        };
  }
}
</script>

<style scoped>
.edit-blog-page {
    padding: 30px;
    max-width: 100%;
    margin: 0 auto;
}

.box-card {
    margin-bottom: 30px;
}
</style>