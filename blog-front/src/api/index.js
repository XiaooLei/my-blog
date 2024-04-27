const API_END_POINT = "http://47.120.78.107:8000"

export const fetchArticles = async () => {
    try {
        const response = await fetch(`${API_END_POINT}/blogs`);
        if (!response.ok) {
            throw new Error(`Network error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
};

export const fetchArticleById = async (id) => {
    try {
        console.log("enter fetchArticleById");
        const response = await fetch(`${API_END_POINT}/blog/${id}`);
        if (!response.ok) {
            throw new Error(`Network error: ${response.status}`);
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error(
            "Error fetching article with id ${ id }", error); throw error;
    }
};

export const addArticle = async (article) => {
    try {
        console.log("enter addArticle");
        // 构建请求 URL
        const url = `${API_END_POINT}/blog/`;
        // 设置请求头
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        // 发送 POST 请求
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(article) // 将对象转换为 JSON 字符串
        });
        if (!response.ok) {
            throw new Error(`Network error: ${response.status}`);
        } 
        const data = await response.json();
        return data;
    } catch (error) { 
        console.error("Error adding article", error); 
        throw error; 
    }
};

export const updateArticle = async (id, article) => {
    try {
        console.log(`enter updateArticle, id:${id}`);
        // 构建请求 URL
        const url = `${API_END_POINT}/blog/${id}`;
        // 设置请求头
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        // 发送 PUT 请求
        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(article) // 将对象转换为 JSON 字符串
        });
        if (!response.ok) {
            throw new Error(`Network error: ${response.status}`);
        } 
        const data = await response.json(); 
        return data;

    } catch (error) {
        console.error("Error updating article", error); 
        throw error; 
    }
}

export const deleteArticle = async (id) => {
    try{
        console.log(`enter deleteArticle, id:${id}`);
        const url = `${API_END_POINT}/blog/${id}`;
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        // 发送 DELETE 请求
        const response = await fetch(url, {
            method: 'DELETE',
            headers: headers});
        if (!response.ok) {
            throw new Error(`Network error: ${response.status}`);
        } 
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error("Error deleting article", error); 
        throw error; 
    }
}

export const tryLogin = async (account, password) => {
    try {
        const url = `${API_END_POINT}/login`;
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                account: account,
                password: password
            }) // 将对象转换为 JSON 字符串
        });
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error("Error updating article", error); 
        throw error; 
    }
}






