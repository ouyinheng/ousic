<template>
  <div class="audio-component" @click="showInfo">
    <div class="left-img">
      <img :src="props.musicInfo.cover" />
    </div>
    <div class="right-text">
      <div class="music-name">{{ props.musicInfo.name }}</div>
      <div class="control">
        <span class="iconfont icon-zanting1" @click.stop="setPlay(fasle)" v-if="props.pause"></span>
        <span class="iconfont icon-bofang1" @click.stop="setPlay(true)" v-else></span>
      </div>
    </div>
    <n-drawer height="100vh" v-model:show="state.active" placement="bottom" resizable>
      <n-drawer-content>
        <template #header>
          <span class="iconfont icon-moreunfold" @click="hideDrawer"></span>
        </template>
        <div v-for="(item, index) in contentLrc" :key="index">{{ item.split("]")[1] }}</div>
        <template #footer>
          <n-button>Footer</n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup>
import { useMusicStore } from "@/stores/music";
import { computed, reactive } from "vue";
const emit = defineEmits(["setPlay"]);
const props = defineProps({
  musicInfo: {
    type: Object,
    default: () => ({
      cover: "",
      name: ""
    })
  },
  pause: Boolean
});
const state = reactive({
  active: false
});

const contentLrc = computed(() => {
  return props?.musicInfo?.contentLrc.split("\n");
});

function setPlay(bool) {
  emit("setPlay", bool);
}
function showInfo() {
  state.active = true;
}
function hideDrawer() {
  state.active = false;
}
</script>

<style lang="less" scoped>
.audio-component {
  position: relative;
  display: flex;
  border-radius: 50px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  align-items: center;
  background-color: white;
  overflow: hidden;
  .left-img {
    position: fixed;
    z-index: 999;
    width: 55px;
    height: 55px;
    bottom: 55px;
    left: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .right-text {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    padding: 0 20px;
    margin-left: 50px;
    display: flex;
    justify-content: space-between;
    .music-name {
      color: white;
      line-height: 35px;
    }
    .control span {
      font-size: 26px;
      color: white;
    }
  }
  .music-details {
    height: 100vh;
  }
}
</style>
