<script lang="ts" setup>
interface Doc extends IApi.Doc {
  title: string
  _path: string
}

const route = useRoute()
const id = (route.params as { id: string }).id

const { data } = await useAsyncData<Doc>(`content-${id}`, () => queryContent<Doc>(id.includes('oiowebApi-') ? 'tripartite-apis' : 'docs').where({ id: { $eq: id } }).findOne(), { server: true })
const { data: count } = await useFetch(`/api/core/count?id=${id}`)
const { name, desc, _path } = data.value!

const { data: pageInfo } = await useAsyncData<[Doc, Doc]>(
  `${id}-findSurround`,
  async () => {
    const [prev, next] = await queryContent<Doc>().findSurround(_path)
    console.log(prev)
    return [prev, next]
  },
  { server: true },
)

const [prev, next] = pageInfo.value!

useHead({
  title: name,
  meta: [
    { hid: 'description', name: 'description', content: desc },
  ],
})
</script>

<template>
  <div class="mb-6">
    <DocHeader v-bind="{ name, desc, count: [undefined, null].includes(count as any) ? 0 : count as number }" class="mb-4" />
    <DocInfo :info="data!" />
    <DocPagination v-bind="{ prev, next }" class="mt-2" />
    <!-- <DocTest /> -->
  </div>
</template>
