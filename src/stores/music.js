// store/user.ts
import { defineStore } from "pinia";

export const useMusicStore = defineStore("storeMusic", {
  state: () => {
    return {
      historyMusic: [], //历史播放
      searchKey: "", // 搜索
      searchList: [], // 当前搜索的列表
      musicList: [], // 当前播放列表
      nowIndex: -1, // -1为不播放,
      pause: true // 是否暂停
    };
  },
  actions: {
    setMusicList(list) {
      if (Array.isArray(list)) {
        this.musicList = list;
      } else {
        const isExsit = this.musicList.some((item) => list.playUrl === item.playUrl);
        if (!isExsit) {
          this.musicList.push(list);
        }
      }
    }
  }
});
