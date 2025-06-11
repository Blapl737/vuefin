<template>
  <div class="banner">
    <div class="content">
      <div class="text">
        <p class="tag">Pro.Beyond.</p>
        <h1 class="title">iPhone 14 Pro</h1>
        <p class="desc">Created to change everything for the better. For everyone.</p>
        <router-link to="/category">
          <button class="btn">Shop Now </button>
        </router-link>
      </div>
      <img class="img" src="/src/assets/header/Iphone.svg" alt="iPhone 14 Pro">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<style scoped>
.banner {
  background: linear-gradient(50deg, #211c24 0%, #211c24 100%);
  width: 100%;
  height: 632px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.content {
  width: 100%;
  max-width: 1440px;
  padding: 0 5%;
  position: relative;
  display: flex;
}

.text {
  max-width: 600px;
  z-index: 2;
}

.tag {
  font-size: 24px;
  font-weight: 500;
  color: #aaa;
  margin-bottom: 10px;
}

.title {
  font-size: 80px;
  font-weight: 700;
  color: white;
  line-height: 1.1;
  margin-bottom: 20px;
}

.desc {
  font-size: 20px;
  font-weight: 400;
  color: #aaa;
  margin-bottom: 40px;
}

.btn {
  color: white;
  width: 188px;
  height: 56px;
  border: 1px solid #ffffff;
  border-radius: 6px;
  padding: 16px 56px;
  background: none;
  cursor: pointer;
}

.img {
  margin-top: -100px;
  position: absolute;
  margin-left: 1000px;
  width: 406px;
}

@media (max-width: 1024px) {
  .title {
    font-size: 60px;
  }
  .img {
    opacity: 0.5;
  }
}
</style>