<template>
    <div class="container" id="cart-container">
        <form @submit.prevent="checkout">
            <div v-if="info" class="alert alert-warning">{{ info }}</div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>کالا</th>
                        <th>اندازه</th>
                        <th>تعداد</th>
                        <th>قیمت واحد</th>
                        <th>قیمت کل</th>
                        <th v-if="viewOnly"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in cartItems">
                        <td>{{ getDisplayName(item.productName) }}</td>
                        <td>{{ getSize(item.productName, item.sizeIndex) }}</td>
                        <td>
                            <input
                              v-if="!viewOnly"
                              type="number"
                              v-model="item.quantity"
                              class="form-control text-start"
                              placeholder="تعداد نان را وارد کنید"
                              min="1"
                              max="4"
                            />
                            {{ viewOnly ? item.quantity : "" }}
                        </td>
                        <td>{{ item.price }} ت</td>
                        <td>{{ item.price * item.quantity }} ت</td>
                        <td v-if="!viewOnly">
                            <button class="btn" id="delete-item-btn" @click="deleteItem(item)">
                                <fa-icon icon="fa-solid fa-times" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="display-6 mt-5 bg-light fw-bold">قیمت کل: <strong>{{ totalCartPrice }}</strong></p>
            <button v-if="!viewOnly" class="btn btn-success" type="submit">پرداخت</button>
        </form>
    </div>
</template>
<script>
export default {
    props: {
        viewOnly: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
    data() {
        return {
            info: null,
        }
    },
    methods: {
        getSize(productName, sizeIndex) {
            return this.$store.getters.getSize(productName, sizeIndex);
        },
        getFeePrice(productName) {
            return this.$store.getters.getFeePrice(productName);
        },
        getDisplayName(productName) {
            return this.$store.getters.getDisplayName(productName);
        },
        deleteItem(item) {
            this.$store.commit("DELETE_ITEM_FROM_CART", item);
        },
        checkout() {
            if(this.cartItems.length !== 0) {
                this.$router.push({ name: "checkout" });
            } else {
                this.info = "شما هنوز کالایی انتخاب نکرده اید.";
            }
        }
    },
    computed: {
        cartItems() {
            return this.$store.state.cart;
        },
        totalCartPrice() {
            return this.$store.getters.totalCartPrice;
        }
    }
}
</script>
<style>
    #cart-container {
        font-family: "Far Mitra", sans-serif, Helvetica, Arial;
        font-size: 1.2rem;
        min-width: 400px;
    }
    #delete-item-btn {
        transition: transform 0.1s ease;
    }
    #delete-item-btn:hover {
        transform: scale(1.5);
        color: red;
    }
    #cart-container form button[type=submit] {
        font-size: inherit;
    }
</style>