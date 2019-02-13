<template>
  <div>
    <router-link :to="GOOD_MYPAGE_PATH" style="color: blue;">
      CSRF対策が行われているAPIを利用しているマイページへ
    </router-link>
    <BaseMyPage
      :api-origin="`http://localhost:${BAD_API_PORT_NUMBER}`"
      title="マイページ ~BAD API VERSION~"
    />
    <!-- vue/html-self-closing と prettier/prettier が衝突してしまうので回避している -->
    <!-- eslint-disable prettier/prettier -->
    <hr >
    <p>
      <span style="color: red;">
        これは脆弱性のあるAPIを利用しているマイページです。<br >
      </span>
      <span>
        Username: <b>numb</b> Password: <b>pass</b> でログインできます。
      </span>
    </p>
    <p>
      ログインしている状態で罠ページを利用してしまうことで、CSRF攻撃を仕掛けることが出来ます。<br >
      このマイページが利用しているAPIサーバーには脆弱性があるので、攻撃が成功します。<br>
      詳細は罠ページに書かれてある解説を参照してください。
    </p>
    <p>
      <a :href="`http://localhost:${CRACKER_PORT_NUMBER}/bad/`" style="color: blue;">
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
      BAD_API_PORT_NUMBER: constants.BAD_API_PORT_NUMBER,
      CRACKER_PORT_NUMBER: constants.CRACKER_PORT_NUMBER,
      GOOD_MYPAGE_PATH: constants.GOOD_MYPAGE_PATH,
    };
  },
};
</script>
