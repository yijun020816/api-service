<script lang="ts" setup>
const apiStore = useApiStore()
const list = computed(() => apiStore.list)

await useAsyncData<IApi.Info[]>('api-list', async () => {
  const apiCount: { id: string, count: number }[] = JSON.parse(await $fetch('/api/count'))
  let result = await queryContent<IApi.Info>('docs').find()
  const result2: any = await queryContent<IApi.Info>('tripartite-apis').find()
  result = result.concat(result2)
  result.forEach((r) => {
    const count = apiCount.find(c => c.id === r.id)?.count ?? 0
    r.count ||= count
  })
  apiStore.apiList = result
  return result
})
</script>

<template>
  <div>
    <Hero />
    <ApiList :data="list" class="mb-10" />
  </div>
</template>
