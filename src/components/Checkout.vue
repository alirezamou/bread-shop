<template>
    <div class="container" style="min-width: 500px;" id="checkout-form">
        <ul class="nav nav-tabs nav-fill">
            <li class="nav-item">
                <router-link to="#" class="nav-link" :class="{ 'active': (step === 0) }">اطلاعات شما</router-link>
            </li>
            <li class="nav-item">
                <router-link to="#" class="nav-link" :class="{ 'active': (step === 1) }">پرداخت و ارسال</router-link>
            </li>
            <li class="nav-item">
                <router-link to="#" class="nav-link" :class="{ 'active': (step === 2) }">تایید سفارش</router-link>
            </li>
        </ul>
        <Form v-if="step === 0" @submit="nextStep" id="checkout-personal-info">
            <h1 class="title">اطلاعات شما</h1>
            <template v-for="(source, key) in personalInfo">
                <div class="form-group mb-4">
                    <label class="form-label" :for="key"><strong>{{ source.placeholder }}</strong></label>
                    <Field
                      :name="key"
                      class="form-control text-start"
                      :id="key"
                      :type="source.type ? source.type : 'text'"
                      v-model="source.value"
                      autocomplete="off"
                      :placeholder="source.placeholder"
                      :rules="source.rule"
                    />
                    <ErrorMessage :name="key" class="text-danger fs-6"/>
                </div>
            </template>
            <button class="btn btn-primary" type="submit">ادامه به ارسال و پرداخت</button>
        </Form>

        <Form
          v-if="step === 1"
          @submit="nextStep"
          id="checkout-shipping-payment-form"
        >
            <div class="row gx-md-3 gy-3">
                <div class="col-12 col-md-4">
                    <div class="card shadow" id="shipping">
                        <div class="card-body">
                            <div class="card-title mb-2">
                                <h2>نحوه‌ی ارسال</h2>
                            </div>
                            <template v-for="(option, index) in shippingOptions" :key="index">
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" v-model="selectedShippingOption" :value="option" />
                                    <label class="form-check-label">{{ option.optionName }} <span v-if="option.price">({{ option.price }} تومان)</span></label>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="card shadow" id="payment">
                        <div class="card-body">
                            <div class="card-title mb-2">
                                <h2>نحوه‌ی پرداخت</h2>
                            </div>
                            <template v-for="(option, index) in paymentOptions" :key="index">
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" v-model="selectedPaymentOption" :value="option" />
                                    <label class="form-check-label">{{ option.optionName }} <span v-if="option.price">({{ option.price }} تومان)</span></label>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="card shadow" id="final-price">
                        <div class="card-body">
                            <div class="card-title mb-2">
                                <h2>جمع</h2>
                            </div>
                            <p>جمع سبد خرید: <strong>{{ $store.getters.totalCartPrice }}</strong> تومان</p>
                            <p>همراه با هزینه‌ی ارسال و پرداخت: 
                                <strong>{{ totalOrdersPrice }}</strong> تومان
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">ادامه و تایید</button>
        </Form>

        <Form @submit="nextStep" v-if="step === 2" id="checkout-confirmation">
            <h2 class="h2 fw-bold">سبد خرید</h2>
            <Cart :viewOnly="true" />
            <hr />
            <div class="row mb-3">
                <div class="col-12 col-md-6">
                    <h2 class="fw-bold">هزینه‌ی ارسال</h2>                    
                    <p>
                        {{ selectedShippingOption.optionName }} &nbsp;
                        <span v-if="selectedShippingOption.price">{{ selectedShippingOption.price }} تومان</span></p>
                </div>
                <div class="col-12 col-md-6">
                    <h2 class="fw-bold">نحوه‌ی پرداخت</h2>                    
                    <p>
                        {{ selectedPaymentOption.optionName }} &nbsp;
                        <span v-if="selectedPaymentOption.price">{{ selectedPaymentOption.price }} تومان</span></p>
                </div>
            </div>
            <hr />
            <h2 class="h2 mb-2 fw-bold bg-light">جمع کل رسید :‌ <span>{{ totalOrdersPrice }}</span></h2>
            <button type="submit" class="btn btn-primary float-end">تایید و ثبت سفارش</button>
        </Form>
    </div>
</template>
<script>
import iziToast from 'izitoast';
import Cart from "@/components/Cart.vue";
import { Form, Field, ErrorMessage } from "vee-validate";

import "izitoast/dist/css/iziToast.css";

export default {
    name: "Checkout",
    components: {
        Cart,
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            step: 0,
            personalInfo: {
                name: {
                    value: "",
                    placeholder: "نام",
                    rule: (value) => value ? true : "لطفا نام خود را وارد کنید",
                },
                address: {
                    value: "",
                    placeholder: "آدرس",
                    rule: (value) => value ? true : "لطفا آدرس خود را وارد کنید",
                },
                phoneNumber: {
                    value: "",
                    placeholder: "شماره تلفن",
                    rule: (value) => value ? true : "لطفا شماره تلفن خود را وارد کنید",
                },
                email: {
                    value: "",
                    placeholder: "ایمیل",
                    type: "email",
                    rule: this.validateEmail,
                },
                postalCode: {
                    value: "",
                    placeholder: "کد پستی",
                    rule: this.validatePostalCode,
                },
            },
            shippingOptions: [
                {
                    optionName: "ارسال درب منزل",
                    price: 2000,
                },
                {
                    optionName: "مراجعه به فروشگاه",
                    price: 0,
                }
            ],
            selectedShipping: null,
            paymentOptions: [
                {
                    optionName: "پرداخت درب منزل",
                    price: 0,
                }
            ],
            selectedPayment: null,
        }
    },
    computed: {
        selectedShippingOption: {
            get() {
                return this.selectedShipping ? this.selectedShipping : this.shippingOptions[0];
            },
            set(newOption) {
                this.selectedShipping = newOption;
            }
        },
        selectedPaymentOption: {
            get() {
                return this.selectedPayment ? this.selectedPayment : this.paymentOptions[0];
            },
            set(newOption) {
                this.paymentShipping = newOption;
            }
        },
        totalOrdersPrice() {
            return this.$store.getters.totalCartPrice + this.selectedShippingOption.price + this.selectedPaymentOption.price;
        }
    },
    methods: {
        nextStep() {
            if(this.step === 2) {
                this.checkout();
                iziToast.success({
                    message: "سفارش شما با موفقیت ثبت شد.",
                    timeout: 2000,
                    icon: "ico-success",
                });
                setTimeout(() => this.$router.push({ name: "home" }), 2000);
            }
            this.step++;
        },
        checkout() {
            const order = {
                cart: JSON.parse(JSON.stringify(this.$store.state.cart)),
                customer: {
                    name: JSON.parse(JSON.stringify(this.personalInfo.name.value)),
                    address: JSON.parse(JSON.stringify(this.personalInfo.address.value)),
                    phoneNumber: JSON.parse(JSON.stringify(this.personalInfo.phoneNumber.value)),
                    email: JSON.parse(JSON.stringify(this.personalInfo.email.value)),
                    postalCode: JSON.parse(JSON.stringify(this.personalInfo.postalCode.value)),
                },
                shipping: JSON.parse(JSON.stringify(this.selectedShippingOption)),
                payment: JSON.parse(JSON.stringify(this.selectedPaymentOption)),
                timestamp: new Date(),
            };
            this.$store.dispatch("addOrder", order);
        },
        validateEmail(value) {
            if (!value) {
              return 'لطفا آدرس ایمیل خود را وارد کنید';
            }
        
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!regex.test(value)) {
              return 'آدرس ایمیل معتبر نیست';
            }
        
            return true;
        },
        validatePostalCode(value) {
            if (!value) {
              return 'لطفا کد پستی خود را وارد کنید';
            }
            if(isNaN(value)) {
                return "لطفا کد پستی معتبر وارد کنید";
            }
            return true;
        }
    },
}
</script>
<style>
    #checkout-form a {
        text-decoration: none;
        color: inherit;
        pointer-events: none;
    }
    #checkout-form a.active {
        color: rgba(80, 70, 230, 1);
    }
    #checkout-form {
        font-family: "Far Mitra", sans-serif, Helvetica, Arial;
        font-size: 1rem;
    }
    #checkout-form .title {
        font-weight: bold;
    }
    #checkout-form input,
    #checkout-form input::placeholder {
        font-size: 1rem;
    }
    #checkout-form form button[type=submit] {
        font-size: inherit;
    }
    @media screen and (min-width: 640px) {
        #checkout-form {
            font-size: 1.2rem;
        }
        #checkout-form input,
        #checkout-form input::placeholder {
            font-size: 1.2rem;
        }
        #checkout-form form button[type=submit] {
            font-size: 1.2rem;
        }
    }
    #checkout-shipping-payment-form {
        font-weight: 900;
    }
    #checkout-shipping-payment-form h2 {
        font-size: 1.5rem;
    }
    #checkout-shipping-payment-form #final-price {
        font-weight: normal;
    }
</style>