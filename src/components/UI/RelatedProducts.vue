<template>
    <div class="section">
      <h2>Related Products</h2>
      <div class="container">
            <div class="grid">
                <div class="card" v-for="product in displayedProducts" :key="product.id">
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

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || [])

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

const products = ref([])

const fetchProducts = async () => {
  try {
    const { data } = await axios.get('http://localhost:1452/api/products/')
    products.value = data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const displayedProducts = computed(() => {
  const shuffled = [...products.value]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, 4)
})

const getImageUrl = (filename) => {
  const cleanFilename = filename.replace(/^image[\\/]/, '')
  return `http://localhost:1452/image/${cleanFilename}`
}

onMounted(fetchProducts)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

.section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 50px;
}

.section h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  font-family: "ABeeZee", sans-serif;
  margin-left: 50px;
}

.container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  color: #000;
  font-size: 20px;
}

.card {
  font-weight: bold;
  width: 266px;
  height: 500px;
  background: #F6F6F6;
  padding: 1rem;
  text-align: center;
  box-sizing: border-box;
  border-radius: 9px;
  position: relative;
  cursor: default;
  font-family: "ABeeZee", sans-serif;
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
  font-family: "ABeeZee", sans-serif; 
}

.img {
  width: 200px;
  object-fit: contain;
  margin-top: 50px;
}

@media (max-width: 1200px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
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