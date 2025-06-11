<template>
  <div class="category">
    <ProductFilters 
      :initial-category="categoryName"
      @filters-changed="onFiltersChange"
    />
    <div class="container">
      <div v-if="loading" class="loading">
        Loading...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <template v-else>
      </template>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Footer from '../UI/Footer.vue'
import ProductFilters from '../UI/ProductFilters.vue'

const route = useRoute()
const products = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(9)
const selectedFilters = ref({})
const categoryName = ref(route.params.categoryName || '')
const loading = ref(false)
const error = ref(null)

const fetchProducts = async () => {
  loading.value = true
  error.value = null
  try {
    const categoryId = route.params.categoryId
    let response
    if (categoryId) {
      response = await axios.get(`http://localhost:1452/api/category/${categoryId}`)
    } else {
      response = await axios.get('http://localhost:1452/api/products/')
    }
    if (Array.isArray(response.data)) {
      products.value = response.data.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: `http://localhost:1452/${product.images[0]}`,
        brand: product.brand,
        battery_capacity: product.battery_capacity,
        screen_type: product.screen_type,
        screen_size: product.screen_diagonal,
        protection_class: product.protection_class
      }))
    } else {
      throw new Error('Неверный формат данных от сервера')
    }
  } catch (e) {
    console.error('Ошибка при загрузке товаров:', e)
    error.value = 'Ошибка при загрузке товаров. Пожалуйста, попробуйте позже.'
  } finally {
    loading.value = false
  }
}

const filteredProducts = computed(() => {
  let filtered = [...products.value]
  const f = selectedFilters.value
  if (f.brands?.length) {
    filtered = filtered.filter(product => f.brands.includes(product.brand))
  }
  if (f.batteryCapacities?.length) {
    filtered = filtered.filter(product => f.batteryCapacities.includes(product.battery_capacity))
  }
  if (f.screenTypes?.length) {
    filtered = filtered.filter(product => f.screenTypes.includes(product.screen_type))
  }
  if (f.screenSizes?.length) {
    filtered = filtered.filter(product => f.screenSizes.includes(product.screen_size))
  }
  if (f.protectionClasses?.length) {
    filtered = filtered.filter(product => f.protectionClasses.includes(product.protection_class))
  }
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filtered.slice(start, end)
})

const totalPages = computed(() => {
  let filtered = [...products.value]
  const f = selectedFilters.value
  if (f.brands?.length) {
    filtered = filtered.filter(product => f.brands.includes(product.brand))
  }
  if (f.batteryCapacities?.length) {
    filtered = filtered.filter(product => f.batteryCapacities.includes(product.battery_capacity))
  }
  if (f.screenTypes?.length) {
    filtered = filtered.filter(product => f.screenTypes.includes(product.screen_type))
  }
  if (f.screenSizes?.length) {
    filtered = filtered.filter(product => f.screenSizes.includes(product.screen_size))
  }
  if (f.protectionClasses?.length) {
    filtered = filtered.filter(product => f.protectionClasses.includes(product.protection_class))
  }
  return Math.ceil(filtered.length / itemsPerPage.value)
})

function onFiltersChange(filters) {
  selectedFilters.value = filters
  currentPage.value = 1
}

watch(() => route.params.categoryId, () => {
  fetchProducts()
})

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.category {
  display: flex;
  gap: 30px;
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.container {
  flex: 1;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.img {
  position: relative;
  padding-top: 100%;
}

.img img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 20px;
}

.fav {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #333;
}

.info {
  padding: 15px;
  text-align: center;
}

.info h3 {
  margin: 0 0 10px;
  font-size: 16px;
  color: #333;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin: 0 0 15px;
}

.btn {
  background: #000;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
}

.btn:hover {
  background: #333;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}

.pagination button {
  width: 30px;
  height: 30px;
  border: 1px solid #e5e5e5;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button.active {
  background: #000;
  color: white;
  border-color: #000;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.error {
  color: #dc3545;
}

.empty {
  color: #666;
  font-style: italic;
}
</style> 