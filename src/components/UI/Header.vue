<template>
    <header class="header">
        <div class="container">
            <router-link to="/" class="logo">
                <img src="/src/assets/header/logo.svg" alt="logo">
            </router-link>
            <div class="search">
                <img src="/src/assets/header/search.svg" alt="search">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    v-model="searchQuery"
                    @input="handleSearch"
                    @focus="showResults = true"
                    @blur="handleBlur"
                >
                <div v-if="showResults && searchResults.length > 0" class="results">
                    <div 
                        v-for="product in searchResults" 
                        :key="product.id" 
                        class="item"
                        @mousedown="selectProduct(product)"
                    >
                        <img 
                            v-if="product.images?.[0]" 
                            :src="getImageUrl(product.images[0])" 
                            :alt="product.name"
                            class="img"
                        >
                        <div class="info">
                            <h4>{{ product.name }}</h4>
                            <p>${{ product.price }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nav">
                <router-link to="/favorites" class="fav">
                    <img src="/src/assets/header/Favorites.svg" alt="favorites">
                </router-link>
                <router-link to="/cart" class="cart">
                    <div class="icon">
                        <img src="/src/assets/header/Vector.svg" alt="cart">
                    </div>
                </router-link>
            </div>
        </div>
    </header>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
    name: 'Header',
    setup() {
        const router = useRouter();
        const store = useStore();
        const searchQuery = ref('');
        const showResults = ref(false);
        const searchResults = ref([]);
        const baseImageUrl = import.meta.env.VITE_API_URL || 'http://localhost:1452';

        const getImageUrl = (filename) => {
            if (!filename) return '';
            const cleanFilename = filename.replace(/^image[\\/]/, '');
            return `${baseImageUrl}/image/${cleanFilename}`;
        };

        const handleSearch = async () => {
            store.commit('setSearchQuery', searchQuery.value);
            if (searchQuery.value.trim().length > 0) {
                try {
                    const { data } = await axios.get(`${baseImageUrl}/api/products/`);
                    const query = searchQuery.value.toLowerCase();
                    searchResults.value = data.filter(product => 
                        product.name.toLowerCase().includes(query) ||
                        product.description?.toLowerCase().includes(query) ||
                        product.brand?.toLowerCase().includes(query)
                    ).slice(0, 5);
                } catch (error) {
                    console.error('Error searching products:', error);
                    searchResults.value = [];
                }
            } else {
                searchResults.value = [];
            }
        };

        const handleBlur = () => {
            setTimeout(() => {
                showResults.value = false;
            }, 200);
        };

        const selectProduct = (product) => {
            router.push(`/product/${product.id}`);
            searchQuery.value = '';
            searchResults.value = [];
            showResults.value = false;
        };

        return {
            searchQuery,
            showResults,
            searchResults,
            handleSearch,
            handleBlur,
            selectProduct,
            getImageUrl
        };
    }
};
</script>

<style scoped>
.logo {
    display: inline-block;
    cursor: pointer;
}

.header {
    position: fixed;  
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: white;
    padding: 16px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    margin-left: 0;
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.search {
    position: relative;
    display: flex;
    align-items: center;
}

.search img {
    position: absolute;
    left: 16px;
    pointer-events: none;
}

.search input {
    width: 372px;
    height: 56px;
    border-radius: 8px;
    padding: 0 16px 0 48px;
    border: none;
    background: #F5F5F5;
    font-size: 16px;
}

.search input:focus {
    outline: none;
    background: #e0e0e0;
}

.results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 8px;
    max-height: 400px;
    overflow-y: auto;
    z-index: 1000;
}

.item {
    display: flex;
    align-items: center;
    padding: 12px;
    cursor: pointer;
    transition: background-color 0.2s;
    gap: 12px;
}

.item:hover {
    background-color: #f5f5f5;
}

.img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    flex-shrink: 0;
}

.info {
    flex: 1;
    min-width: 0;
    padding-right: 12px;
    margin-left: 60px;
}

.info h4 {
    margin: 0 0 4px 0;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.info p {
    margin: 0;
    font-size: 14px;
    color: #666;
}

.nav {
    display: flex;
    gap: 24px;
}

.fav, .cart {
    cursor: pointer;
}

.fav img, .cart img {
    width: 32px;
    height: 32px;
}
</style>