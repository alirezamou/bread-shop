<template>
    <div class="text-end p-3 mb-2" id="return-link">
        <router-link to="/" class="">
            بازگشت&nbsp;
            <fa-icon icon="fa-solid fa-arrow-left-long" />
        </router-link>
    </div>
    <div class="container shadow" style="margin-top: 30px; min-width: 350px;" id="product-details">
        <div v-if="error" class="alert alert-warning">{{ error }}</div>
        <div class="row p-2 gy-4">
            <img :src="product.img" :alt="product.displayName" id="product-image" class="image-fluid col-sm-12 col-md-6 col-lg-5" />
            <div class="col-sm-12 col-md-6 col-lg-6 offset-lg-1">
                <h3 class="mb-3">{{ product.displayName }}</h3>
                <form @submit.prevent="addToCart">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>اندازه</th>
                                <th>وزن</th>
                                <th>قیمت</th>
                            </tr>
                        </thead>
                        <tbody v-if="product.sizes.length">
                            <tr v-for="(size, index) in product.sizes">
                                <td>
                                    <input type="radio" v-model="selectedSize" :value="index" />
                                    &nbsp;
                                    {{ size.size }}
                                </td>
                                <td>{{ size.weight }}</td>
                                <td>{{ size.price }} تومان</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex mt-4">
                        <input
                          id="product-input"
                          v-model="quantity"
                          class="form-control mb-4 w-25 me-5"
                          type="number"
                          min="1"
                          max="4"
                          placeholder="تعداد نان را وارد کنید"
                        />
                        <p>مجموع کل: <strong>{{ totalPrice }} تومان</strong></p>
                    </div>
                    <button class="btn btn-success w-100" type="submit">
                        <fa-icon icon="fa-solid fa-plus" />
                        &nbsp;
                        اضافه کردن به سبد خرید
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.css";

export default {
    name: "ProductDetails",
    data() {
        return {
            selectedSize: null,
            quantity: 1,
            error: "",
        }
    },
    computed: {
        product() {
            return this.$store.getters.getProductByName(this.$route.params.name);
        },
        totalPrice() {
            if(this.selectedSize !== null) {
                return this.quantity * this.product.sizes[this.selectedSize].price;
            } else {
                return 0;
            }
        }
    },
    methods: {
        addToCart() {
            if(this.selectedSize !== null) {
                const order = {
                    productName: this.product.name,
                    price: this.totalPrice,
                    quantity: this.quantity,
                    sizeIndex: this.selectedSize,
                };
                this.$store.commit("ADD_TO_CART", order);
                iziToast.success({
                    message: "سفارش شما با موفقیت به سبد خرید اضافه شد.",
                    timeout: 2000,
                    icon: "ico-success",
                })
                setTimeout(() => this.$router.push({ name: "home" }), 2000);
            } else {
                this.error = "لطفا یک اندازه را انتخاب نمایید.";
                return;
            }
        },
    },
    watch: {
        selectedSize(newSelectedSize) {
            if(newSelectedSize !== null)
                this.error = null;
        }
    }
}
</script>
<style>
#return-link a {
    text-decoration: none;
    color: rgba(50, 50, 150, 0.5);
}
#return-link a:hover {
    color: rgba(50, 50, 150, 1);
}
#return-link a svg {
    transition: transform 0.2s ease;
}
#return-link a:hover svg {
    transform: translateX(-5px);
}
#product-details {
    font-family: "Far Mitra", sans-serif, Helvetica;
    font-size: 1.2rem;
}
@media screen and (min-width: 768px) {
    #product-details {
        font-size: 1.2rem;
    }
}
#product-details form button[type=submit],
#product-details form input[type=number] {
    font-size: inherit;
}
#product-image {
    max-height: 350px;
    border-radius: 5px;
}
@media screen and (min-width: 768px) {
    #product-image {
        max-height: 300px;
    }
}
#product-input {
    text-align: right;
}
#product-input::placeholder {
    text-align: right;
}
</style>