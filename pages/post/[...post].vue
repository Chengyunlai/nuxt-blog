<script setup lang="ts">
const route = useRoute()
const post = route.params.post as Array<string>
const path = post.join('/')
</script>

<template>
  <section class="prose relative slide-enter-content">
    <ContentDoc :path="path">
      <template #default="{ doc }">
        <DocBack />
        <doc-render :article="doc" />
        <doc-toc :toc="doc.body.toc" />
      </template>

      <template #empty>
        <h1 class="text-center">
          文档目前是空的😅
        </h1>
      </template>

      <template #not-found>
        <h1 class="text-center">
          404 - 没有找到与之相关的任何文章😗
        </h1>
      </template>
    </ContentDoc>
  </section>
</template>
