<template>
    <div class="new-blog-container">
        <div class="new-blog">
            <h1>新增博客</h1>
            <el-form :model="blogForm" label-width="120px">
                <el-form-item label="标题">
                    <el-input v-model="blogForm.title"></el-input>
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
                        v-model="blogForm.content"
                        :defaultConfig="editorConfig"
                        :mode="mode"
                        @onCreated="handleCreated"
                        />
                    </div>
                </el-form-item>
                <!-- <div class="mb-2 flex items-center text-sm"> -->
                    <el-radio-group v-model="selectedTagId" class="ml-4">
                      <el-radio :value="tag.id" v-for="tag in tags" :key="tag.id" size="large">{{tag.name}}</el-radio>
                    </el-radio-group>
                <!-- </div> -->
                <el-form-item>
                    <el-button type="primary" @click="submitBlog(); this.$router.replace('/');" style="display: block; margin: 0 auto;">提交</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {addArticle} from '@/api/index.js'
import { ElMessage } from 'element-plus';
import { inject } from 'vue';

export default {
  components: { Editor, Toolbar },

  setup() {
    const tags = inject('tags');

    let selectedTagId = ref(0);

    const blogForm = ref({
        title: '',
        content: ''
    });

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

    const submitBlog = () => {
        // 在这里处理表单提交逻辑，例如使用axios发送POST请求到后端API
        console.log('提交的博客信息:', blogForm.value.content);
        // 假设提交成功后的操作
        addArticle(blogForm.value);
        ElMessage.success('博客提交成功！');
    };

    return {
      editorRef,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      submitBlog,
      blogForm,
      tags,
      selectedTagId
    };
  }
}
</script>  

<style>

.new-blog-container {
    margin-top: 60px;
    display: flex;
    justify-content: center; /* 水平居中 */
}



</style>



