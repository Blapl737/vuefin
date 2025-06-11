<template>
    <div class="banner">
      <div class="content">
        <h1>Big Summer <strong><em> Sale</em></strong></h1>
        <p>Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
        <router-link to="/category">
            <button class="btn">Shop Now</button>
        </router-link>
        </div>
        <div class="imgs">
            <div class="left">
                <img class="one" src="/src/assets/bigsale/lab.png" alt="">
            <img class="two" src="/src/assets/bigsale/skren.png" alt="">
            <img class="three" src="/src/assets/bigsale/bluskren.png" alt="">
            </div>
            <div class="right">
                <img class="four" src="/src/assets/bigsale/iph.png" alt="">
            <img class="five" src="/src/assets/bigsale/wthah.png" alt="">
            </div>
            
        </div>
    </div>
</template>

<style scoped>
.banner {
    background: linear-gradient(135deg, #2E2E2E 0%, #000000 100%);
  width: 100%;
  height: 448px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  box-sizing: border-box;
}

.content {
  width: 100%;
  color: white;
  z-index: 1;
}

.content h1 {
  margin-bottom: 20px;
}

.content p {
  color: #787878;
  margin-bottom: 50px;
}

.btn {
  color: white;
  width: 188px;
  height: 56px;
  border: 1px solid #ffffff;
  border-radius: 6px;
  padding: 16px 56px;
  background: none;
  margin-left: 20px;
  cursor: pointer;
}

.imgs {
    position: absolute;
    z-index: 0;
}

.imgs .one {
    margin-left: -430px;
    margin-top: -20px;
    position: absolute;
    z-index: 1;
}

.imgs .two {
    margin-left: -600px;
    margin-top: -20px;
    position: absolute;
    z-index: 2;
}

.imgs .three {
    margin-left: -670px;
    margin-top: 150px;
    position: absolute;
}

.imgs .four {
    margin-left: 768px;
    margin-top: -230px;
    position: absolute;
    z-index: 1;
}

.imgs .five {
    margin-left: 555px;
    margin-top: 23px;
    position: absolute;
    z-index: 1;
}

.left {
    margin-top: -204px;
    margin-left: -570px;
}

.right {
    margin-top: 204px;
}
</style>