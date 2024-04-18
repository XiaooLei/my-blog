// src/services/ArticlesService.js
import axios from 'axios'

export default {
    async getArticleById(id) {
        try {
            const response = await axios.get(
                /api/articles / ${ id }
            ) return response.data
        } catch (error) { console.error('Error fetching article:', error) throw error }
    },

}