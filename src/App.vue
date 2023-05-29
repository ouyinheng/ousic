<template>
  <div class="home-page">
    <transition-group name="list" mode="fade-in">
      <RouterView />
    </transition-group>
    <audio-component
      class="footer-top"
      v-if="state.url"
      :musicInfo="nowMusicInfo"
      :pause="musicStore.pause"
      @setPlay="setPlayPause"
    ></audio-component>
    <audio :src="state.url" ref="audio"></audio>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from "vue";
import { RouterView } from "vue-router";
import AudioComponent from "@/components/Audio/index.vue";
import { useMusicStore } from "@/stores/music";

const state = reactive({
  url: ""
});
const audio = ref("audio");
const musicStore = useMusicStore();

watch(
  () => musicStore.pause,
  (val) => {
    val ? audio?.value?.play() : audio?.value?.pause();
  }
);
watch(
  () => musicStore.musicList,
  (list) => {
    setPlay();
  },
  {
    deep: true,
    immediate: true
  }
);
const nowMusicInfo = computed(() => {
  return musicStore.musicList[musicStore.nowIndex];
});
// 设置当播放到最后一首时，从头开始
function setInitPlay() {
  audio.value.addEventListener(
    "ended",
    () => {
      const length = musicStore.musicList.length;
      let nowIndex = musicStore.nowIndex + 1;
      if (nowIndex >= length) {
        nowIndex = 0;
      }
      musicStore.nowIndex = nowIndex;
    },
    false
  );
}
function setPlay() {
  state.url = musicStore.musicList[musicStore.nowIndex]?.playUrl;
  nextTick(() => {
    musicStore.pause = true;
  });
}
function setPlayPause(bool) {
  musicStore.pause = bool;
}
onMounted(() => {
  setInitPlay();
});
</script>

<style lang="less" scoped>
.home-page {
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  overflow: hidden;
  .footer-top {
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 60px;
    border-radius: 20px;
  }
}
</style>
