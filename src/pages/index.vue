<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { computed, onBeforeMount, onMounted, onUnmounted, ref, vModelCheckbox } from 'vue'
import { useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { usePodcastStore } from '../stores'
import type { episode } from '../utils'

const podcastStore = usePodcastStore()
const episodeData = ref<episode[]>()
const searchText = ref('')
const $loading = useLoading()

onBeforeMount(
  async () => {
    if (!podcastStore.podcastData.items) {
      const loader = $loading.show()
      await podcastStore.getPodcastData().then(() => {
        loader.hide()
      })
    }
    episodeData.value = podcastStore.podcastData.items
  },
)
const router = useRouter()

onMounted(() => {
  // 微信浏览器中，路由跳转新页面不会自动到顶部
  router.afterEach(() => { window.scrollTo(0, 0) })
})

const showReturnTop = ref('none')

const handleScroll = useDebounceFn(() => {
  if (window.scrollY > 1000)
    showReturnTop.value = 'block'

  else
    showReturnTop.value = 'none'
}, 200)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const goTo = {
  episodeDetail: (created: number) => {
    router.push({
      name: 'EpisodeDetail',
      params: {
        created,
      },
    })
  },
}

// 搜索过滤后的数据
const searchEpisodeData = ref()

const withDescription = ref(false)

const searchResultCount = computed(() => {
  return searchEpisodeData.value?.length
})

const search = () => {
  if (searchText.value === '') { searchEpisodeData.value = null }

  else {
    searchEpisodeData.value = episodeData.value?.filter((item) => {
      if (withDescription.value)
        return item.title?.toLowerCase().includes(searchText.value.toLowerCase()) || item.description?.toLowerCase().includes(searchText.value.toLowerCase())

      return item.title?.toLowerCase().includes(searchText.value.toLowerCase())
    })
  }
}
</script>

<template>
  <div flex="~ col" justify-center items-center @scroll="handleScroll">
    <!-- 搜索区域 -->
    <div class="w-full max-w-5xl px-4 my-4">
      <div class="flex flex-col sm:flex-row items-center gap-4">
        <input
          v-model="searchText"
          placeholder="输入关键词进行搜索"
          class="w-full sm:flex-1 h-12 px-4 text-lg sm:text-xl rounded-lg
                 border border-gray-200 focus:outline-none focus:border-gray-400
                 transition-colors duration-200"
          @keyup.enter="search"
        >
        <div class="flex items-center gap-2">
          <input
            v-model="withDescription"
            name="withDescription"
            type="checkbox"
            class="w-4 h-4"
            @change="search"
          >
          <label for="withDescription" class="text-sm sm:text-base">包含描述</label>
        </div>
      </div>
    </div>

    <!-- 搜索结果计数 -->
    <div v-if="searchEpisodeData" class="w-full max-w-5xl px-4 mb-4 text-[#eee]">
      共得到 {{ searchResultCount }} 个搜索结果
    </div>

    <!-- 搜索结果网格 -->
    <div
      v-if="searchEpisodeData"
      class="w-full max-w-5xl px-4 grid grid-cols-1 sm:grid-cols-2
             gap-6 bg-[#eee] bg-opacity-20 rounded-lg p-4"
    >
      <div
        v-for="{ created, itunes_image, title } in searchEpisodeData"
        :id="created.toString()"
        :key="created.toString()"
        class="aspect-square w-full relative min-w-[280px]"
      >
        <CoverCard
          :created="created"
          :itunes_image="itunes_image"
          :title="title"
          :go-to="goTo.episodeDetail"
        />
      </div>
    </div>

    <!-- 主要内容网格 -->
    <div class="w-full max-w-5xl px-4 grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
      <div
        v-for="{ created, itunes_image, title } in episodeData"
        :id="created.toString()"
        :key="created.toString()"
        class="aspect-square w-full relative min-w-[280px]"
      >
        <CoverCard
          :created="created"
          :itunes_image="itunes_image"
          :title="title"
          :go-to="goTo.episodeDetail"
        />
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <button
      class="fixed z-50 bottom-5 right-5 bg-black hover:bg-opacity-70
             transition-all duration-200 rounded-full
             w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center
             text-white text-sm sm:text-base"
      :style="{ display: showReturnTop }"
      @click="scrollToTop"
    >
      Top
    </button>
  </div>
</template>
