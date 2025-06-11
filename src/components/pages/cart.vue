<template>
  <Header />
  <div class="cart">
    <div class="items">
      <h1>Shopping Cart</h1>
      <div v-for="(item, index) in cartItems" :key="item.id" class="item" :class="{ 'fade': isCheckingOut }">
        <img
          v-if="item.images?.[0]"
          :src="getImageUrl(item.images[0])"
          alt="Product Image"
          class="img"
          @error="handleImageError"
        />
        <img
          v-else
          :src="placeholderImage"
          alt="No Image Available"
          class="img"
        />

        <div class="details">
          <div class="info">
            <h3>{{ item.name }}</h3>
            <p v-if="item.description"><i>{{ item.description }}</i></p>
            <p>#{{ item.sku }}</p>
          </div>
          <div class="actions">
            <div class="qty">
              <button class="btn" @click="decreaseQuantity(index)">−</button>
              <span class="num">{{ item.quantity }}</span>
              <button class="btn" @click="increaseQuantity(index)">+</button>
            </div>
            <span class="price">${{ item.price * item.quantity }}</span>
            <button @click="removeItem(index)" class="del">×</button>
          </div>
        </div>
      </div>
      <div v-if="cartItems.length === 0" class="empty">
        <h2>Your cart is empty</h2>
        <p>Add some items to your cart to continue shopping</p>
      </div>
    </div>

    <div class="summary" :class="{ 'fade': isCheckingOut }">
      <h2>Order Summary</h2>

      <div class="promo">
        <p>Discount code / Promo code</p>
        <input type="text" placeholder="Code" v-model="promoCode" />
      </div>

      <div class="bonus">
        <p>Your bonus card number</p>
        <div class="input">
          <input type="text" placeholder="Enter Card Number" v-model="bonusCardNumber" />
          <button @click="applyBonusCard">Apply</button>
        </div>
      </div>

      <div class="total">
        <div class="sub">
          <span>Subtotal</span>
          <span>${{ subtotal }}</span>
        </div>
        <div class="tax">
          <span>Estimated Tax</span>
          <span>${{ estimatedTax }}</span>
        </div>
        <div class="ship">
          <span>Estimated shipping & Handling</span>
          <span>${{ shipping }}</span>
        </div>
        <div class="final">
          <span>Total</span>
          <span>${{ total }}</span>
        </div>
      </div>

      <button 
        class="checkout" 
        @click="checkout" 
        :disabled="cartItems.length === 0 || isCheckingOut"
      >
        {{ isCheckingOut ? 'Processing...' : 'Checkout' }}
      </button>
    </div>
  </div>
  <Footer />
</template>

<script>
import placeholderImage from '@/assets/placeholder.svg';
import Header from '@/components/UI/Header.vue';
import Footer from '../UI/Footer.vue';

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      cartItems: [],
      promoCode: '',
      bonusCardNumber: '',
      estimatedTax: 50,
      shipping: 29,
      placeholderImage,
      isCheckingOut: false,
      baseImageUrl: import.meta.env.VITE_API_URL || 'http://localhost:1452'
    };
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    total() {
      return this.subtotal + this.estimatedTax + this.shipping;
    }
  },
  methods: {
    getImageUrl(filename) {
      if (!filename) return this.placeholderImage;
      try {
        const imagePath = filename.startsWith('image/') ? filename : `image/${filename}`;
        const url = `${this.baseImageUrl}/${imagePath}`;
        console.log('Generated image URL:', url);
        return url;
      } catch (error) {
        console.error('Error generating image URL:', error);
        return this.placeholderImage;
      }
    },
    handleImageError(event) {
      console.error('Image failed to load:', event.target.src);
      event.target.src = this.placeholderImage;
    },
    loadCartItems() {
      try {
        const savedCart = localStorage.getItem('vue-cart');
        if (savedCart) {
          this.cartItems = JSON.parse(savedCart);
          console.log('Loaded cart items:', this.cartItems);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    },
    saveCart() {
      localStorage.setItem('vue-cart', JSON.stringify(this.cartItems));
    },
    increaseQuantity(index) {
      this.cartItems[index].quantity += 1;
      this.saveCart();
    },
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity -= 1;
        this.saveCart();
      }
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
      this.saveCart();
    },
    applyBonusCard() {
      console.log('Bonus card applied:', this.bonusCardNumber);
    },
    async checkout() {
      if (this.cartItems.length === 0) return;
      
      this.isCheckingOut = true;
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        this.cartItems = [];
        this.saveCart();
        
        alert('Thank you for your order! Your items will be shipped soon.');
      } catch (error) {
        console.error('Error during checkout:', error);
        alert('There was an error processing your order. Please try again.');
      } finally {
        this.isCheckingOut = false;
      }
    }
  },
  mounted() {
    this.loadCartItems();
    console.log('Cart items after load:', this.cartItems);
  }
};
</script>

<style scoped>
.cart {
  font-family: Arial, sans-serif;
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 100px;
}

.cart {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: flex-start;
}

.items {
  flex: 1;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.item {
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
  gap: 15px;
}

.img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.details {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
}

.info p {
  margin: 2px 0;
  font-size: 14px;
  color: #666;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.qty {
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn {
  background: none;
  border: 1px solid #ddd;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 16px;
}

.num {
  font-size: 14px;
  width: 20px;
  text-align: center;
}

.price {
  font-weight: bold;
  font-size: 16px;
}

.del {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 18px;
}

.del:hover {
  color: #333;
}

.summary {
  width: 340px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.summary h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

.promo,
.bonus {
  margin-bottom: 15px;
}

.promo p,
.bonus p {
  margin: 0 0 5px 0;
  font-size: 14px;
}

input[type='text'] {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.input {
  display: flex;
  gap: 10px;
  margin-top: 5px;
}

.input button {
  padding: 8px 15px;
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.input button:hover {
  background-color: #f0f0f0;
}

.total {
  margin: 20px 0;
  font-size: 14px;
}

.total div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.final {
  font-weight: bold;
  font-size: 16px;
}

.checkout {
  width: 100%;
  padding: 12px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

.fade {
  animation: fadeOut 0.5s ease-out forwards;
}

.empty {
  text-align: center;
  padding: 40px 0;
  color: #666;
}

.empty h2 {
  margin-bottom: 10px;
  font-size: 24px;
}

.empty p {
  font-size: 16px;
}

.checkout:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>