<template>
  <div class="home-page">
    <header class="flex">
      <n-input-group>
        <n-input
          v-model:value="state.searchKey"
          clearable
          type="text"
          placeholder="请输入歌名或歌手名"
        />
        <n-button
          type="primary"
          :disabled="!state.searchKey"
          :loading="state.btnloading"
          @click="searchHandler"
          >搜索</n-button
        >
      </n-input-group>
    </header>
    <section class="music-list">
      <div
        class="music-item"
        :class="{
          'active-item': index === state.active
        }"
        v-for="(item, index) in state.musicInfoList"
        :key="index"
        @click="setPlayMusic(item, index)"
      >
        <n-image
          class="music-cover"
          width="40"
          :src="item.cover ? item.cover : 'asd'"
          :fallback-src="defaultImg"
        />
        <div class="music-info">
          <div class="music-name">{{ item.name }}</div>
          <div class="music-author">{{ item.author }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, inject, reactive, onMounted } from "vue";
import { useMusicStore } from "@/stores/music";
import defaultImg from "@/assets/images/default.png";
const baseUrl = ref("https://www.fangpi.net");
const $axios = inject("$axios");

const state = reactive({
  btnloading: false,
  musicInfoList: [],
  searchKey: "",
  defaultImg: defaultImg,
  active: -1
});
const musicStore = useMusicStore();
//
const emit = defineEmits(["playMusic"]);

async function searchHandler() {
  state.musicInfoList = [];
  state.active = -1;
  state.btnloading = true;
  musicStore.searchKey = state.searchKey; //存储当前搜索的值
  const res = await $axios.get(`${baseUrl.value}/s/${state.searchKey}`);
  state.btnloading = false;
  if (res.status === 200) {
    const { data } = res;
    localStorage.test = data;
    const ele = document.createElement("div");
    ele.innerHTML = data;
    const list = ele.querySelectorAll(".card-text .text-primary");
    const author = ele.querySelectorAll(".card-text .ext-success");
    list.forEach((item) => {
      const name = item?.innerText || "";
      const href = item?.getAttribute("href") || "";
      const author =
        item?.parentElement?.parentElement?.querySelector(".text-success")?.innerText || "";
      state.musicInfoList.push({
        name,
        author,
        href
      });
    });
    musicStore.searchList = state.musicInfoList;
  }
}
// 获取具体信息
async function getMusicInfo(item, index) {
  const res = await $axios.get(`${baseUrl.value}/${item.href}`);
  if (res.status === 200) {
    const { data } = res;
    const cover = data.match(/cover: (\S*)jpg/gi)[0]?.replace("cover: '", "");
    const playUrl = data.split("url = '")[1].split(".replace")[0].replace("'", "");
    const ele = document.createElement("div");
    ele.innerHTML = data;
    const contentLrc = ele.querySelector(".content-lrc")?.innerText;
    const music = {
      ...item,
      playUrl,
      cover,
      contentLrc
    };
    musicStore.setMusicList(music);
    musicStore.nowIndex = musicStore.musicList.length - 1;
    state.musicInfoList[index].cover = cover;
  }
}
async function setPlayMusic(item, index) {
  musicStore.pause = false;
  state.active = index;
  await getMusicInfo(item, index);
}

onMounted(() => {
  state.searchKey = musicStore.searchKey;
  state.musicInfoList = musicStore.searchList;
});
</script>

<style lang="less" scoped>
.home-page {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: #fafafc;
  .music-list {
    width: 100%;
    height: calc(100% - 70px);
    margin-top: 10px;
    padding-bottom: 80px;
    box-sizing: border-box;
    overflow: auto;
    .music-item {
      width: 100%;
      padding: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      border: 1px solid rgb(239, 239, 245);
      margin: 10px 0;
      background-color: white;
      border-radius: 5px;
      box-sizing: border-box;
      .music-cover {
        margin-right: 10px;
        border-radius: 5px;
      }

      .music-info {
        width: 100%;
        .music-name {
          width: 90%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: rgb(51, 54, 57);
          font-size: 16px;
        }
        .music-author {
          width: 90%;
          font-size: 12px;
          color: rgb(118, 124, 130);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .active-item {
      background-color: rgba(245, 94, 85, 0.12) !important;
      border-color: #f55e55 !important;
      color: #f55e55 !important;
      .music-author,
      .music-name {
        color: #f55e55 !important;
      }
    }
  }
}
</style>
