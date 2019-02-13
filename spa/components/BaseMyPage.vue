<template>
  <div>
    <h1>{{ title }}</h1>
    <form @submit.prevent="login">
      <div>
        <label>Username</label>
        <!-- vue/html-self-closing と prettier/prettier が衝突してしまうので回避している -->
        <!-- eslint-disable prettier/prettier -->
        <div><input
          v-model="userName"
          type="text" ></div>
          <!-- eslint-ensable prettier/prettier -->
      </div>

      <div>
        <label>Password</label>
        <!-- vue/html-self-closing と prettier/prettier が衝突してしまうので回避している -->
        <!-- eslint-disable prettier/prettier -->
        <div><input
          v-model="password"
          type="password" ></div>
          <!-- eslint-ensable prettier/prettier -->
      </div>

      <div class="has-text-centered">
        <button>Login</button>
        <div
          v-if="loginErrorMessage"
          style="color: red;"
        >{{ loginErrorMessage }}</div>
      </div>
    </form>
    <p v-if="user">
      {{ user }} としてログインしています。
    </p>
    <p v-else>
      ログインしていません。
    </p>
    <p v-if="user">
      <button @click="logout">Logout</button>
    </p>
    <div>
      <div>購入数： {{ count === null ? 'ログインしないと購入数は表示されません' : count }}</div>
      <button @click="buy">Buy</button>
      <button @click="reset">Reset</button>
      <div
        v-if="buyErrorMessage"
        style="color: red;">{{ buyErrorMessage }}</div>
    </div>
  </div>
</template>

<script>
const constants = require('../../constants');

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    apiOrigin: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      userName: '',
      password: '',
      loginErrorMessage: null,
      user: null,
      count: null,
      buyErrorMessage: null,
    };
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    async apiRequest(method, endPoint, body) {
      this.loginErrorMessage = '';
      this.buyErrorMessage = '';
      const {COOKIE_API_PATH} = constants;
      const fetchUrl = `${this.apiOrigin}${COOKIE_API_PATH}${endPoint}`;
      const fetchOptions = {
        method,
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'fetch',
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(fetchUrl, fetchOptions);
      const json = await response.json();
      return {status: response.status, body: json};
    },

    async fetchUser() {
      const res = await this.apiRequest('GET', constants.END_POINT_USER);
      const {result} = res.body;
      if (result) {
        this.user = result.name;
        this.count = result.count;
      }
    },

    async login() {
      const res = await this.apiRequest('POST', constants.END_POINT_LOGIN, {
        userName: this.userName,
        password: this.password,
      });
      if (res.status !== 200) {
        this.loginErrorMessage = 'ログインできませんでした。';
      } else {
        await this.fetchUser();
        localStorage.setItem('user', this.user);
      }
    },

    async logout() {
      await this.apiRequest('GET', constants.END_POINT_LOGOUT);
      this.user = null;
      this.count = null;
      localStorage.clear();
    },

    async buy() {
      const res = await this.apiRequest('POST', constants.END_POINT_INCREMENT, {
        amount: 1,
      });
      if (res.status === 200) {
        await this.fetchUser();
      } else if (res.status === 401) {
        this.buyErrorMessage = 'この機能はログインしていないと使えません。';
      }
    },

    async reset() {
      const res = await this.apiRequest(
        'POST',
        constants.END_POINT_COUNT_RESET
      );
      if (res.status === 200) {
        await this.fetchUser();
      } else if (res.status === 401) {
        this.buyErrorMessage = 'この機能はログインしていないと使えません。';
      }
    },
  },
};
</script>
