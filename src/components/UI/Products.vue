<template>
    <Header />
    <div class="wrap">
      <div class="page">
        <div class="tabs">
    <button
      class="tab"
      :class="{ active: activeTab === 'new' }"
      @click="changeTab('new')"
    >
      New Arrival
    </button>
    <button
      class="tab"
      :class="{ active: activeTab === 'bestseller' }"
      @click="changeTab('bestseller')"
    >
      Bestseller
    </button>
    <button
      class="tab"
      :class="{ active: activeTab === 'featured' }"
      @click="changeTab('featured')"
    >
      Featured Products
    </button>
  </div>

        <div class="grid">
          <div class="card" v-for="product in products" :key="product.id">
            <div class="fav" @click="toggleFavorite(product.id)">
              <span class="heart" :class="{ active: isFavorite(product.id) }">♥</span>
            </div>
            <img
              v-if="product.images?.[0]"
              :src="getImageUrl(product.images[0])"
              :alt="product.name"
              class="img"
              @click="goToProductPage(product.id)"
            />
            <h4 @click="goToProductPage(product.id)">{{ product.name }}</h4>
            <p>${{ product.price }}</p>
            <button class="btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from '../UI/Header.vue'
  
  export default {
    name: 'NewArrivalsPage',
    components: {
      Header
    }
  }
  </script>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  
  const router = useRouter()
  const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || [])
  const products = ref([])
  const activeTab = ref('new')
  
  const fetchProducts = async () => {
  try {
    const { data } = await axios.get('http://localhost:1452/api/products/')
    if (activeTab.value === 'new') {
      products.value = data.slice(0, 8)
    } else if (activeTab.value === 'bestseller') {
      products.value = data.slice(8, 16)
    } else if (activeTab.value === 'featured') {
      products.value = data.slice(16, 24)
    }
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const changeTab = (tab) => {
  activeTab.value = tab
  fetchProducts()
}

  const toggleFavorite = (productId) => {
    const index = favorites.value.indexOf(productId)
    if (index === -1) {
      favorites.value.push(productId)
    } else {
      favorites.value.splice(index, 1)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }
  
  const isFavorite = (productId) => {
    return favorites.value.includes(productId)
  }
  
  const goToProductPage = (productId) => {
    router.push(`/product/${productId}`)
  }
  
  
  const getImageUrl = (filename) => {
    const cleanFilename = filename.replace(/^image[\\/]/, '')
    return `http://localhost:1452/image/${cleanFilename}`
  }
  
  onMounted(fetchProducts)
  </script>
  
  <style scoped>
@import url('https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

.wrap {
  margin-top: 80px;
  display: flex;
  justify-content: center; 
}

.page {
  font-family: "ABeeZee", sans-serif;
  color: #000;
  padding: 20px;
  max-width: 1200px;
  width: 100%; 
  margin: 0 auto; 
}

.tabs {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 30px;
  gap: 40px;
  padding: 10px 0;
}

.tab {
  background: none;
  border: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  padding: 8px 16px;
  font-family: "ABeeZee", sans-serif;
  color: #999; 
  position: relative;
  transition: all 0.3s ease;
}

.tab.active {
  color: #000; 
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #000;
  border-radius: 3px;
}

.tab:hover {
  color: #666; 
}

.tab.active:hover {
  color: #000; 
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.card {
  font-weight: bold;
  width: 100%;
  height: 432px;
  background: #F6F6F6;
  padding: 1rem;
  text-align: center;
  box-sizing: border-box;
  border-radius: 9px;
  position: relative;
  cursor: default;
}

.fav {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 1;
}

.img, h4 {
  cursor: pointer;
}

.card .btn {
  width: 186px;
  height: 48px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 5px;
  font-family: "ABeeZee", sans-serif;
}

.img {
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-top: 50px;
}

h4 {
  margin: 15px 0;
  font-size: 16px;
  font-weight: bold;
}

p {
  font-size: 18px;
  margin: 10px 0;
}

.heart {
  font-size: 24px;
  color: #bbb;
  cursor: pointer;
  transition: color 0.2s;
  user-select: none;
}
.heart.active {
  color: red;
}
</style>