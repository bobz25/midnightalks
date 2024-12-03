export interface rssObj {
  title: string
  description: string
  link: string
  image: string
  category: []
  items: episode[]
}

export interface episode {
  author: undefined
  category: []
  content: undefined
  created: number
  description: string
  'enclosures': object[]
  'id': undefined
  'itunes_author': string
  'itunes_duration': number
  'itunes_image': image
  'link': string
  'media': {}
  'published': number
  'title': string
}

export interface image {
  href: string
}

export function getNumberFrom(title: string) {
  const hello = {
    '大内密谈试录不一定播': '00',
    '谁的青春不2B': '02',
    '／号外／面对事故我们该怎么办': '号外',
    '所有乐于挥霍的时间都不叫浪费': '时间的歌-2013芒种',
    '一首歌的诞生 EP01 后海大鲨鱼': '一首歌的诞生-01',
    '一首歌的诞生 EP02 斯威特FROM丹镇北京': '一首歌的诞生-02',
    '一首歌的诞生 EP03 火星电台': '一首歌的诞生-03',
    '一首歌的诞生 EP04 旅行团': '一首歌的诞生-04',
    'SP/一件小事和一些片段': 'SP-一件小事和一些片段',
    '盗音档案 EP01 : 遗落的电影与院线': '盗音档案-01',
    '盗音档案 EP02 : 电影的小众和大众之路': '盗音档案-02',
    '盗音档案 EP03 : 电影未来将何去何从': '盗音档案-03',
    'SP / RESURGENCE  你念念不忘的灵异节目一定会回来找你': 'SP/RESURGENCE-你念念不忘的灵异节目一定会回来找你',
    'SP 和张震嶽一起露营莫干山的夜晚': 'SP-和张震嶽一起露营莫干山的夜晚',
    'SP 我生命中的6张唱片': 'SP-我生命中的6张唱片',
    '九年。九个故事。': '九年。九个故事。',
  }
  if (title in hello) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return hello[title]
  }
  const regex = /(?<=vol\.\s?)\d{2,4}/
  const result = regex.exec(title) || ''
  console.error(`${result[0]} - ${title}`)
  return result[0]
}

export function getEpisodeCover(aEpisode: episode) {
  return fixedCoverUrl(aEpisode.itunes_image?.href)
}

export function fixedCoverUrl(originUrl: string | undefined, originImage = false, size = 1000) {
  console.log(originImage)
  if (!originUrl) return ''
  if (originUrl.length === 70)
    return `https${originUrl.toString().slice(5, 60)}.jpg`

  if (originUrl.length === 71)
    return `https${originUrl.toString().slice(5, 61)}.jpg`

  return originImage
    ? `https${originUrl.toString().slice(5, 63)}.jpg`
    : `https${originUrl.toString().slice(5, 63)}_${size}x${size}.jpg`
}
