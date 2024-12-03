// @ts-check
import { acceptHMRUpdate, defineStore } from 'pinia'
import { PodcastData } from '../apis'
import type { rssObj } from '../utils/index'

export const usePodcastStore = defineStore('podcastId', {
  state: () => {
    return {
      podcastData: {} as rssObj,
    }
  },
  getters: {
  },
  actions: {
    async getPodcastData() {
      try {
        const podcastData = await PodcastData() as rssObj
        console.log(podcastData)
        this.$patch({ podcastData },
        )
      }
      catch (e) {
        console.error(e)
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePodcastStore, import.meta.hot))
