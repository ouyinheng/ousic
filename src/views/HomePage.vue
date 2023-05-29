<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div style="height: 20px; background-color: white"></div>
    <div class="main-content">
      <RouterView />
      <footer class="footer">
        <div
          v-for="(item, index) in state.urlList"
          :key="index"
          :class="{
            'bootom-nav': true,
            'active-nav': state.active === index
          }"
          @click="changeUrl(item.url, index)"
        >
          <div
            :class="['iconfont', state.active === index ? item.fill : item.icon]"
            class="font-md"
          ></div>
          <span>{{ item.title }}</span>
        </div>
      </footer>
    </div>
  </n-config-provider>
</template>

<script setup>
import { reactive, ref } from "vue";
import { RouterView } from "vue-router";
const themeOverrides = {
  common: {
    primaryColor: "#f55e55",
    primaryColorHover: "#F57B74",
    primaryColorSuppl: "#F57B74",
    primaryColorPressed: "#F64B41"
  }
};

const state = reactive({
  componentName: "HomePage",
  active: 0,
  url: "",
  musicInfo: null,
  urlList: [
    {
      url: "/home",
      title: "发现",
      icon: "icon-faxian2",
      fill: "icon-faxian1"
    },
    {
      url: "/discover",
      title: "音乐",
      icon: "icon-yinyue",
      fill: "icon-yinle2"
    },
    {
      url: "/circle",
      title: "优圈",
      icon: "icon-iconquanzinor",
      fill: "icon-iconquanzisel"
    },
    {
      url: "/mine",
      title: "我的",
      icon: "icon-wode1",
      fill: "icon-wode"
    }
  ]
});
const musicInfo = ref(null);

function playMusic(item) {
  state.musicInfo = item;
}
const changeUrl = (url, index) => {
  state.active = index;
};
</script>

<style lang="less" scoped>
.main-content {
  height: calc(100vh - 44px - env(safe-area-inset-top));
  width: 100vw;
  overflow: auto;
}
.audio-footer {
  position: absolute;
  bottom: 62px;
  left: 20px;
  right: 20px;
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  background-color: white;
  // padding: 8px 0;
  z-index: 10;
  img {
    display: block;
    box-sizing: content-box;
    background-color: transparent;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    top: -15px;
    border: 5px solid white;
  }
  .bootom-nav {
    width: 100%;
    text-align: center;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #bcaaa4;
  }
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 1px;
    background-color: gainsboro;
    top: 0;
    left: 0;
    transform: scaleY(0.5);
  }
  .active-nav {
    color: #ff4545;
    animation: activeNav 0.3s;
  }
}
</style>
