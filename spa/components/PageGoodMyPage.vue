<template>
  <div>
    <router-link :to="BAD_MYPAGE_PATH" style="color: blue;">
      脆弱性のあるAPIを利用しているマイページへ
    </router-link>
    <BaseMyPage
      :api-origin="`http://localhost:${GOOD_API_PORT_NUMBER}`"
      title="マイページ ~GOOD API VERSION~"
    />
    <!-- vue/html-self-closing と prettier/prettier が衝突してしまうので回避している -->
    <!-- eslint-disable prettier/prettier -->
    <hr >
    <p>
      <span style="color: #3CB371;">
        これはCSRF対策が行われているAPIを利用しているマイページです。<br >
      </span>
      <span>
        Username: <b>numb</b> Password: <b>pass</b> でログインできます。
      </span>
    </p>
    <p>
      ログインしている状態で罠ページを利用してしまうことで、CSRF攻撃を仕掛けることが出来ます。<br >
      しかしこのマイページが利用しているAPIはCSRF対策済みなので、被害は発生しません。
    </p>
    <p>
      <a :href="`http://localhost:${CRACKER_PORT_NUMBER}/good/`" style="color: blue;">
        罠ページへ（このリンクをクリックするだけでは攻撃は発生しません）
      </a>
    </p>
    <!-- eslint-enable prettier/prettier -->
  </div>
</template>

<script>
import BaseMyPage from './BaseMyPage.vue';

const constants = require('../../constants');

export default {
  components: {
    BaseMyPage,
  },
  data() {
    return {
      GOOD_API_PORT_NUMBER: constants.GOOD_API_PORT_NUMBER,
      CRACKER_PORT_NUMBER: constants.CRACKER_PORT_NUMBER,
      BAD_MYPAGE_PATH: constants.BAD_MYPAGE_PATH,
    };
  },
};
</script>
