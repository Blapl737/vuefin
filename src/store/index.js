import { createStore } from 'vuex'
import products from './modules/products'
import categories from './modules/categories'
import cart from './modules/cart'

export default createStore({
  modules: {
    products,
    categories,
    cart
  },
  state: {
    searchQuery: '',
    favorites: JSON.parse(localStorage.getItem('favorites')) || []
  },
  mutations: {
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    toggleFavorite(state, productId) {
      const index = state.favorites.indexOf(productId);
      if (index === -1) {
        state.favorites.push(productId);
      } else {
        state.favorites.splice(index, 1);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    }
  },
  getters: {
    isFavorite: (state) => (productId) => {
      return state.favorites.includes(productId);
    }
  }
}) 