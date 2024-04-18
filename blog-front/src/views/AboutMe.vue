<template>
  <div class="about-me">
    <div class="personal-info">
      <h2>肖磊</h2>
      <img class="avatar" src="../assets/avator.jpeg" alt="肖磊的照片">
      <p>软件工程师，热衷于互联网技术和机器学习。</p>
      <p>2022年毕业于暨南大学。</p>
      <p>目前正在学习前端开发。</p>
    </div>
    <div class="interests">
      <h3>感兴趣的方向</h3>
      <ul>
        <li>互联网技术</li>
        <li>机器学习</li>
        <li>前端开发</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.about-me {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  margin-top: 60px;
}

.personal-info {
  margin-bottom: 20px;
}

.personal-info h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.interests {
  margin-top: 20px;
}

.interests h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.interests ul {
  list-style: none;
  padding: 0;
}

.interests li {
  margin-bottom: 5px;
}
</style>