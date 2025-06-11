<template>
    <div class="popular">
        <div class="img1">
            <img src="/src/assets/banners/applwath.png" alt="">
        </div>
        <div class="img2">
            <img src="/src/assets/banners/huawei.png" alt="">
        </div>
        <h2>Popular Products</h2>
        <p>iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
        <router-link to="/category">
            <button class="btn">Shop Now</button>
        </router-link>
    </div>
    <div class="ipad">
        <img src="/src/assets/banners/ipad.png" alt="">
        <h2>Ipad Pro</h2>
        <p>iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
        <router-link to="/category">
            <button class="btn">Shop Now</button>
        </router-link>
    </div>
    <div class="samsung">
        <img src="/src/assets/banners/samsung.png" alt="">
        <h2>Samsung Galaxy</h2>
        <p>iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
        <router-link to="/category">
            <button class="btn">Shop Now</button>
        </router-link>
    </div>
    <div class="macbook">
        <img src="/src/assets/banners/macbook.png" alt="">
        <h2>Macbook Pro</h2>
        <p>iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
        <router-link to="/category">
            <button class="btn">Shop Now</button>
        </router-link>
    </div>
</template>

<style>
.popular {
    width: 460px;
    height: 640px;
    margin-left: 100px;
    margin-top: 150px;
}

.popular img {
    position: relative;
}

.popular .img2 img {
    left: 180px;
    position: absolute;
    margin-top: -340px;
}

.popular h2 {
    color: #000;
    font-size: 33px;
    margin-left: 20px;
    margin-top: -100px;
    margin-bottom: 20px;
}

.popular p {
    color: #909090;
    font-size: 14px;
    max-width: 250px;
    margin-left: 20px;
    margin-bottom: 20px;
}

.popular button {
    width: 188px;
    height: 56px;
    border: 1px solid #000;
    border-radius: 6px;
    padding: 16px 56px;
    background: none;
    margin-left: 20px;
    cursor: pointer;
}

.ipad {
    width: 460px;
    height: 640px;
    margin-left: 537px;
    margin-top: -640px;
    background-color: #F9F9F9;
}

.ipad img {
    margin-left: 50px;
}

.ipad h2 {
    color: #000;
    font-size: 33px;
    margin-left: 20px;
    margin-top: -18px;
    margin-bottom: 20px;
}

.ipad p {
    color: #909090;
    font-size: 14px;
    max-width: 250px;
    margin-left: 20px;
    margin-bottom: 20px;
}

.ipad button {
    width: 188px;
    height: 56px;
    border: 1px solid #000;
    border-radius: 6px;
    padding: 16px 56px;
    background: none;
    margin-left: 20px;
    cursor: pointer;
}

.samsung {
    width: 460px;
    height: 640px;
    margin-left: 997px;
    margin-top: -640px;
    background-color: #EAEAEA;
}

.samsung img {
    margin-left: 50px;
}

.samsung h2 {
    color: #000;
    font-size: 33px;
    margin-left: 20px;
    margin-top: -12px;
    margin-bottom: 20px;
}

.samsung p {
    color: #909090;
    font-size: 14px;
    max-width: 250px;
    margin-left: 20px;
    margin-bottom: 20px;
}

.samsung button {
    width: 188px;
    height: 56px;
    border: 1px solid #000;
    border-radius: 6px;
    padding: 16px 56px;
    background: none;
    margin-left: 20px;
    cursor: pointer;
}

.macbook {
    width: 448px;
    height: 640px;
    margin-left: 1457px;
    margin-top: -640px;
    background-color: #2C2C2C;
}

.macbook img {
    margin-left: 50px;
}

.macbook h2 {
    color: #ffffff;
    font-size: 33px;
    margin-left: 30px;
    margin-top: -28px;
    margin-bottom: 20px;
}

.macbook p {
    color: #909090;
    font-size: 14px;
    max-width: 250px;
    margin-left: 30px;
    margin-bottom: 20px;
}

.macbook button {
    width: 188px;
    height: 56px;
    border: 1px solid #ffffff;
    border-radius: 6px;
    padding: 16px 56px;
    background: none;
    margin-left: 30px;
    cursor: pointer;
    color: #fff;
}
</style>