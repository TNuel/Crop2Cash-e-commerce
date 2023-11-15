<template>
  <div class="w-screen lg:grid lg:grid-cols-3 overflow-y-scroll">
    <div class="hidden lg:flex justify-center items-center bg-secondary">
      <div>
        <img src="../../assets/c2c-logo.svg" alt="Crop2Cash Logo" class="" />
      </div>
    </div>

    <div
      class="font-urbanist h-screen px-6 lg:px-0 lg:col-span-2 my-auto flex flex-col justify-center items-center bg-gradient-to-tr from-white via-white to-secondary/5 lg:to-secondary/25"
    >
      <div class="lg:self-center mx-auto w-full lg:max-w-lg">
        <div class="lg:-ml-20">
          <div class="my-5 lg:my-10">
            <div class="mb-6">
              <h2 class="text-3xl font-semibold mb-3 text-secondary">
                You're Welcome
              </h2>
              <p
                class="font-urbanist text-textPrimary/70 text-sm md:text-base font-medium leading-5 tracking-normal text-left"
              >
                Enter your Credentials below to get Started
              </p>
            </div>

            <!-- <div
              v-if="err"
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span
                v-if="err == 'Request failed with status code 404'"
                class="block sm:inline"
                >incorrect login credentails</span
              >
              <span v-else class="block sm:inline">{{ err }}</span>
            </div> -->

            <div
              v-if="success"
              class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span class="block sm:inline">{{ success }}</span>
            </div>

            <form @submit.prevent="createUser" class="py-4">
              <div class="relative text-textPrimary">
                <label class="" for="name">Name</label>

                <input
                  id="name"
                  type="text"
                  v-model="registerationFormData.name"
                  placeholder="John Doe"
                  class="w-full p-3 lg:py-4 my-2 text-sm md:text-base ring-1 ring-gray-300 rounded-xl placeholder-gray-300 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                />
              </div>
              <div class="relative text-textPrimary">
                <label class="" for="email">Email Address</label>

                <input
                  id="email"
                  type="text"
                  v-model="registerationFormData.email"
                  placeholder="john.doe@gmail.com"
                  class="w-full p-3 lg:py-4 my-2 text-sm md:text-base ring-1 ring-gray-300 rounded-xl placeholder-gray-300 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                />
              </div>
              <div class="relative text-textPrimary">
                <label class="" for="phone">Phone Number</label>

                <input
                  id="phone"
                  type="text"
                  v-model="registerationFormData.phoneNumber"
                  placeholder="0812 345 6789"
                  class="w-full p-3 lg:py-4 my-2 text-sm md:text-base ring-1 ring-gray-300 rounded-xl placeholder-gray-300 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                />
              </div>

              <div class="relative my-5 text-textPrimary">
                <label class="" for="password">Password</label>

                <input
                  id="password"
                  v-model="registerationFormData.password"
                  :type="[showPassword ? 'text' : 'password']"
                  placeholder="Password"
                  class="w-full p-3 lg:py-4 my-2 ring-1 text-sm md:text-xl ring-gray-300 rounded-xl placeholder-gray-300 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                />

                <span @click="showPassword = !showPassword">
                  <i
                    class="absolute cursor-pointer top-[3rem] md:top-[3.2rem] right-[1rem] fa"
                    :class="{
                      'fa-eye-slash': !showPassword,
                      'fa-eye': showPassword,
                    }"
                  ></i>
                </span>
              </div>

              <div class="relative my-5 text-textPrimary">
                <label class="" for="confirmPassword">Confirm Password</label>

                <input
                  id="confirmPassword"
                  v-model="registerationFormData.confirmPassword"
                  :type="[showConfirmPassword ? 'text' : 'password']"
                  placeholder="confirmPassword"
                  class="w-full p-3 lg:py-4 my-2 ring-1 text-sm md:text-xl ring-gray-300 rounded-xl placeholder-gray-300 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                />

                <span @click="showConfirmPassword = !showConfirmPassword">
                  <i
                    class="absolute cursor-pointer top-[3rem] md:top-[3.2rem] right-[1rem] fa"
                    :class="{
                      'fa-eye-slash': !showConfirmPassword,
                      'fa-eye': showConfirmPassword,
                    }"
                  ></i>
                </span>
              </div>

              <div
                v-if="err"
                class="font-urbanist text-red-500 relative"
                role="alert"
              >
                <span class="">{{ err }}</span>
              </div>

              <div class="my-10">
                <button
                  class="w-full px-6 py-3 lg:py-4 rounded-xl bg-secondary/80 transition hover:bg-textPrimary focus:border-secondary active:bg-secondary/90 disabled:bg-secondary/25"
                >
                  <div v-if="isLoading" class="flex justify-center">
                    <svg
                      aria-hidden="true"
                      class="mx-auto w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                  <span
                    v-else
                    class="font-semibold text-white text-base lg:text-lg"
                    >Sign Up</span
                  >
                </button>
              </div>
            </form>
            <div class="flex justify-end">
              <p class="text-sm font-semibold text-textPrimary mt-2 pt-1 mb-0">
                Already have an account?
                <router-link
                  to="/"
                  class="text-secondary/80 hover:text-secondary hover:border-b-2 hover:border-secondary focus:text-secondary transition duration-200 ease-in-out"
                  >Log In</router-link
                >
                <!-- <a href="#!"
                    class="text-secondary hover:text-[#7ec9ea] focus:text-[#0898D7] transition duration-200 ease-in-out">Log In</a> -->
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();

const isLoading = ref(false);
const btnDisable = ref(false);

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const registerationFormData = ref({
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
});

const err = ref("");
const success = ref("");

const profile = ref({});

const createUser = async () => {
  btnDisable.value = true;
  console.log("something pressed");

  // validating name characters
  if (registerationFormData.value.name < 3) {
    // alert("Your first name and last name should be 3 characters and above");
    btnDisable.value = false;
    err.value = "Name should be 3 characters and above";
    return setTimeout(() => {
      err.value = "";
    }, 3000);
  }

  // validating phone number
  if (!/^\d{10}$/.test(registerationFormData.value.phoneNumber)) {
    // alert("Your phone number must be 11 digits number");
    // alert('Please enter a valid 10-digit phone number.')
    err.value = "Your phone number must be 10 digits number";
    return setTimeout(() => {
      btnDisable.value = false;
      err.value = "";
      // message.value = "";
    }, 3000);
  }

  // check if user entered a normal email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerationFormData.value.email)) {
    // alert("Please enter a valid email address");
    err.value = "Please enter a valid email address";
    return setTimeout(() => {
      btnDisable.value = false;
      err.value = "";
    }, 3000);
  }

  // check if password and confirm password match
  if (
    registerationFormData.value.password !==
    registerationFormData.value.confirmPassword
  ) {
    err.value = "Password and confirm password does not match";
    return setTimeout(() => {
      btnDisable.value = false;
      err.value = "";
    }, 3000);
  }

  isLoading.value = true;
  const registerData = {
    email: registerationFormData.value.email,
    username: registerationFormData.value.email,
    password: registerationFormData.value.password,
    name: {
      firstname: registerationFormData.value.name,
      lastname: registerationFormData.value.name,
    },
    phone: registerationFormData.value.phoneNumber
  };
  console.log(registerData);
  try {
    const success = await authStore.register(registerData);
    authStore.setUsername(registerationFormData.value.email.toString());
    console.log("success data", success);

    // successModalPreview.value = true;
    success.value = "Login Successfully!";
    setTimeout(() => {
      success.value = "";
      router.push("/");
    }, 4000);
    btnDisable.value = false;
    // isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    console.error(error);
    btnDisable.value = false;
    if (error.response.status == 200) {
      success.value = "Login Successfully!";
      setTimeout(() => {
        success.value = "";
        router.push("/main");
      }, 4000);
    }
    if (error.response.status == 401) {
      err.value = "Invalid credentials";
    }
    setTimeout(() => {
      err.value = "";
    }, 3000);
  }
};
</script>

<style scoped>
.gradient-color {
  background: linear-gradient(
    127.55deg,
    rgba(18, 35, 53, 0.98) 8.34%,
    rgba(148, 0, 240, 0.79) 92.26%
  );
}
</style>
