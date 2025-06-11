<template>
  <div class="page">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="product" class="product">
      <Header />
      <div class="details">
        <div class="img">
          <img :src="getImageUrl(product.images[0])" :alt="product.name">
        </div>
        <div class="info">
          <h1>{{ product.brand }} {{ product.name }}</h1>
          <div class="price">
            <span class="curr">{{ formattedPrice.current }}</span>
            <span v-if="formattedPrice.original" class="orig">{{ formattedPrice.original }}</span>
          </div>
          
          <div class="specs">
            <div class="spec" v-for="(spec, index) in displayedSpecs" :key="index">
              <div class="icon">
                <img v-if="spec.label === 'Screen Size'" src="@/assets/propage/screen.png" alt="Screen Size">
                <img v-else-if="spec.label === 'CPU'" src="@/assets/propage/cpu.png" alt="CPU">
                <img v-else-if="spec.label === 'Number of Cores'" src="@/assets/propage/core.png" alt="Cores">
                <img v-else-if="spec.label === 'Main Cameras'" src="@/assets/propage/camera.png" alt="Main Camera">
                <img v-else-if="spec.label === 'Front Camera'" src="@/assets/propage/frocame.png" alt="Front Camera">
                <img v-else-if="spec.label === 'Battery Capacity'" src="@/assets/propage/battery.png" alt="Battery">
                <img v-else src="@/assets/propage/verify.png" alt="Default">
              </div>
              <div class="content">
                <strong>{{ spec.label }}</strong>
                <span>{{ spec.value }}</span>
              </div>
            </div>
          </div>
          <p class="desc">
            Enhanced capabilities thanks to an enlarged display of {{ getScreenSize }} inches and work without recharging throughout the day. Incredible photos in weak and bright light using the new system with two cameras more...
          </p>
          <div class="actions">
            <button class="wish">Add to Wishlist</button>
            <button 
              class="cart" 
              @click="addToCartHandler"
              :disabled="isAddingToCart"
            >
              {{ isAddingToCart ? 'Adding...' : 'Add to Cart' }}
            </button>
          </div>
          <div class="delivery">
            <div class="d-item">
              <div class="d-icon">
                <img src="@/assets/propage/deli.png" alt="Delivery">
              </div>
              <div class="text">
                <span>Free Delivery</span>
                <span>1–2 day</span>
              </div>
            </div>
            <div class="d-item">
              <div class="d-icon">
                <img src="@/assets/propage/shop.png" alt="In Stock">
              </div>
              <div class="text">
                <span>In Stock</span>
                <span>Today</span>
              </div>
            </div>
            <div class="d-item">
              <div class="d-icon">
                <img src="@/assets/propage/verify.png" alt="Guarantee">
              </div>
              <div class="text">
                <span>Guaranteed</span>
                <span>{{ (product.guarantee || 12) + ' months' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="more">
        <div class="display">
          <h2>Display</h2>
          <p>Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone is the display. Nothing surprising, because advanced technologies allow you to practically level the display frames and cutouts for the front camera and speaker, leaving no room for bold design solutions. And how good that in such realities Apple everything is fine with displays. Both critics and mass consumers always praise the quality of the picture provided by the products of the Californian brand. And last year's 6.7-inch Retina panels, which had ProMotion, caused real admiration for many.</p>
          <div class="grid">
            <div class="item">
              <span class="label">Screen diagonal</span>
              <span class="value">{{ displaySpecs.screenDiagonal || 'N/A' }}</span>
            </div>
            <div class="item">
              <span class="label">Screen resolution</span>
              <span class="value">{{ displaySpecs.screenResolution || 'N/A' }}</span>
            </div>
            <div class="item">
              <span class="label">Refresh rate</span>
              <span class="value">{{ displaySpecs.refreshRate || 'N/A' }}</span>
            </div>
            <div class="item">
              <span class="label">Pixel density</span>
              <span class="value">{{ displaySpecs.pixelDensity || 'N/A' }}</span>
            </div>
            <div class="item">
              <span class="label">Screen type</span>
              <span class="value">{{ displaySpecs.screenType || 'N/A' }}</span>
            </div>
            <div class="item">
              <span class="label">CPU</span>
              <span class="value">{{ displaySpecs.cpu || 'N/A'}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="rating">
        <div class="r-value">{{ product.rating }}</div>
        <div class="r-text">of {{ product.count_review }} nations</div>
        <div class="r-stars">
        <span v-for="i in 5" :key="i" class="star">
          <span class="s-filled" :style="getStarStyle(i)">★</span>
          <span class="s-empty">★</span>
        </span>
      </div>
      </div>
      <RelatedProducts />
    </div>
  </div>
  <Footer />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Header from '../UI/Header.vue'
import Footer from '../UI/Footer.vue'
import RelatedProducts from '../UI/RelatedProducts.vue'

export default {
  components: {
    Header,
    RelatedProducts,
    Footer
  },
  name: 'ProductPage',
  data() {
    return {
      quantity: 1,
      isAddingToCart: false
    }
  },
  computed: {
    ...mapState('products', ['currentProduct', 'loading', 'error']),
    product() {
      return this.currentProduct || {}
    },
    displaySpecs() {
      return {
        screenDiagonal: this.getCharacteristicValue('Диагональ') || 'N/A"',
        screenResolution: this.getCharacteristicValue('Разрешение') || 'N/A',
        refreshRate: this.getCharacteristicValue('Частота обновления') || 'N/A',
        pixelDensity: this.getCharacteristicValue('Плотность пикселей') || 'N/A',
        screenType: this.getCharacteristicValue('Тип экрана') || 'N/A',
        cpu: this.getCharacteristicValue('Процессор') || 'N/A'
      }
    },
    displayedSpecs() {
      const specMapping = [
        { label: 'Screen Size', key: 'Диагональ' },
        { label: 'CPU', key: 'Процессор' },
        { label: 'Number of Cores', key: 'Ядра' },
        { label: 'Main Cameras', key: 'Основная камера' },
        { label: 'Front Camera', key: 'Фронтальная камера' },
        { label: 'Battery Capacity', key: 'Аккумулятор' }
      ]
      return specMapping.map(spec => ({
        label: spec.label,
        value: this.getCharacteristicValue(spec.key) || 'N/A'
      })).slice(0, 6)
    },
    getScreenSize() {
      const screenSize = this.getCharacteristicValue('Диагональ') || 'N/A'
      return screenSize !== 'N/A' ? screenSize : 'unknown'
    },
    formattedPrice() {
      if (!this.product.price) return {}
      
      const price = this.product.discount_price 
        ? this.product.discount_price 
        : this.product.price
      
      return {
        current: `$${price}`,
        original: this.product.discount_price 
          ? `$${this.product.price}` 
          : null
      }
    }
  },
  created() {
    this.fetchProductById(this.$route.params.id)
  },
  methods: {
    ...mapActions('products', ['fetchProductById']),
    ...mapActions('cart', ['addProductToCart']),
    
    getImageUrl(imagePath) {
      return imagePath ? `http://localhost:1452/${imagePath}` : 'placeholder-image.jpg'
    },
    getCharacteristicValue(key) {
      const char = this.product.characteristics?.find(c => c.characteristic === key)
      return char ? char.value : null
    },
    getStarStyle(starIndex) {
      const rating = this.product.rating || 0
      const fillPercentage = Math.min(1, Math.max(0, rating - (starIndex - 1)))
      return {
        width: `${fillPercentage * 100}%`
      }
    },
    async addToCartHandler() {
      if (!this.product || this.isAddingToCart) return
      
      this.isAddingToCart = true
      try {
        await this.addProductToCart({
          product: this.product,
          quantity: this.quantity
        })
        
        alert(`${this.product.name} added to cart!`)
      } catch (error) {
        console.error('Error adding to cart:', error)
        alert('Failed to add product to cart')
      } finally {
        this.isAddingToCart = false
      }
    }
  }
}
</script>

<style scoped>
.page {
  padding: 20px;
  max-width: 1200px;
  margin: 80px auto 0; 
  font-family: 'Arial', sans-serif;
}

.product {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.img img {
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  border-radius: 8px;
}

.info {
  padding: 20px;
}

.price {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.curr {
  font-size: 24px;
  font-weight: 600;
  color: #000;
}

.orig {
  font-size: 18px;
  color: #A0A0A0;
  text-decoration: line-through;
}

.specs {
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 10px;
  padding: 15px; 
  border-radius: 10px; 
}

.spec {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  background-color: #F4F4F4;
}

.icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: #4E4E4E;
  margin-top: 5px;
}

.icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.content {
  display: flex;
  flex-direction: column;
}

.content strong {
  color: #6e6e73;
  font-weight: 400;
  font-size: 13px;
  margin-bottom: 4px;
}

.content span {
  color: #1d1d1f;
  font-weight: 600;
  font-size: 14px;
}

.desc {
  margin: 20px 0;
  line-height: 1.6;
  color: #1d1d1f;
  font-size: 15px;
}

.actions {
  display: flex;
  gap: 15px;
  margin: 20px 0;
}

.wish, .cart {
  width: 260px;
  height: 56px;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.wish {
  background: none;
  color: #000;
  border: 1px solid #000;
}

.wish:hover {
  background: #f5f5f7;
}

.cart {
  background: #000;
  color: white;
  border: none;
}

.cart:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.delivery {
  display: flex;
  gap: 20px; 
  margin-top: 30px;
}

.d-item {
  display: flex;
  align-items: center; 
  gap: 15px; 
  padding: 15px;
  border-radius: 16px;
  min-width: 160px; 
}

.d-icon {
  background-color: #F6F6F6; 
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px; 
  height: 32px; 
}

.d-icon img {
  width: 24px;
  height: 24px;
}

.text {
  text-align: left; 
  display: flex;
  flex-direction: column;
}

.text span:first-child {
  color: #1d1d1f; 
  font-size: 14px;
  font-style: normal;
  font-weight: 600; 
}

.text span:last-child {
  color: #6e6e73; 
  font-size: 13px;
  font-style: italic;
  font-weight: 400;
}

.more {
  background: #FAFAFA;
  width: 100vw; 
  min-height: 100vh; 
  margin-left: -368px;
}

.display {
  font-family: Arial, sans-serif;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  padding: 40px 40px;
  margin-top: 150px;
}

.display h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
}

.display p {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 50px;
  color: #666;
}

.display .grid {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.display .item {
  display: flex;
  width: 100%;
  margin-bottom: 30px;
  border-bottom: 1px solid #CDCDCD;
}

.display .label {
  font-weight: normal;
  color: #333;
  flex: 0 0 50%;
  font-size: 14px;
}

.display .value {
  font-weight: bold;
  flex: 0 0 50%;
  text-align: right;
  font-size: 14px;
}

.rating {
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin: 30px 0;
  padding: 20px;
  background-color: #FAFAFA;
  border-radius: 25px;
}

.r-value {
  font-size: 32px;
  font-weight: bold;
  line-height: 1;
}

.r-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.r-stars {
  font-size: 24px;
  color: #FFB800;
  letter-spacing: 1px;
  position: relative;
  display: inline-block;
}

.star {
  position: relative;
  display: inline-block;
}

.s-filled {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  white-space: nowrap;
  overflow: hidden;
}

.s-empty {
  color: #ddd; 
}

.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

.error {  
  color: #ff1900;
}
</style>