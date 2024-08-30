---
date: 2023-06-14 15:19:00
url: 
aliases: 
tags:
  - Nuxt
title: Nuxt系统学习
edited date: 2023-06-14 星期三
---

# Nuxt系统学习

## 前言：环境

见文章：

[Nuxt学习笔记：安装 - 掘金 (juejin.cn)](https://juejin.cn/post/7212249660579971130#heading-2)

或者官网

[安装 · 开始使用Nuxt3 Nuxt中文站](https://nuxt.com.cn/docs/getting-started/installation)

## 0. 第一个App

使用命令创建`nuxt`模板

```cmd
npx nuxi init nuxt-app
```

### 0.1 app.vue

在`app.vue`中将`  <NuxtWelcome />`删除，添加`  <NuxtPage></NuxtPage>`

```vue
<template>
  <div>
    <NuxtPage></NuxtPage>
  </div>
</template>
```

### 0.2 在根目录创建`pages`目录

1. 添加`index.vue`
2. 添加`detail.vue`，目录

####  index.vue

```vue
<template>
  <h1>首页</h1>
  <NuxtLink to="/detail">跳转</NuxtLink>
</template>
```

#### detail.vue

```vue
<template>
  <h1>详情</h1>
  <NuxtLink to="/">跳转</NuxtLink>
</template>
```

### 0.3 启动程序

```cmd
yar dev
```

### 0.4 打包程序

```cmd
yarn build
```

## 1. 文件路由和布局特性

### pages目录

> 如果Nuxt工程中，如果存在 pages 目录，Nuxt会自动整合 vue-router ，并且根据目录中的文件自动创建 routers 配置。

在 `第一个App`中，我们创建了`pages`目录，并且在里面添加了两个`vue`页面，启动程序时，我们在浏览器中输入[localhost:3000](localhost:3000)时，会默认进入`index.vue`页面，[localhost:3000/detail](localhost:3000/detail)，会进入`detail.vue`页面。

并且使用`<NuxtLink to="path"></NuxtLink>`可以**实现页面路由跳转**。

### 动态路由

> 文件名或者文件夹名称里，包含了：**方括号**，它们将被转换为动态路由参数。

在 `pages`- 下创建一个`blog`目录，然后创建`[id].vue`的文件：

```vue
<template>
  <p>
    {{ $route.params.id }}
  </p>

  <NuxtLink to="/detail">Go Back</NuxtLink>
</template>
```

访问[localhost:3000/blog/1](localhost:3000/blog/1)，即可通过` {{ $route.params.id }}` 拿到路由传入的参数信息。

当然也可以在`<script>`标签中使用：

```javascript
<script setup>
    const route = useRoute()
    // When accessing /posts/1, route.params.id will be 1
    console.log(route.params.id)
</script>
```

### 嵌套路由

> 目录和文件同名，就是嵌套路由。**路由嵌套主要做视图共享**。

上面的动态路由可以使用公共的父亲组件进行包装，我们在`pages`目录下，创建一个和`blog`文件夹相同的vue文件：`blog.vue`，内容如下：

```vue
<template>
  <h1>我是父路由</h1>
  <!-- 发生路由嵌套的时候，也需要用到NuxtPage -->
  <NuxtPage></NuxtPage>
</template>
```

子路由的内容将通过`<NuxtPage></NuxtPage>`的方式去导航。

### 布局系统

> 把公用的布局内容提取到layouts目录中

在根目录创建一个`layouts`文件夹，在该文件夹中创建一个名为`default.vue`的文件，在约定中，将其称为默认布局，默认布局可以想象成一个页面整体的公共布局内容，例如导航栏，底部栏这些内容，将其放在布局中。

`/layouts/default.vue`

```vue
<template>
  <div>
    <nav>导航栏</nav>
    <slot></slot>
  </div>
</template>
```

布局系统需要用在根标签中，也就是`app.vue`中，使用`NuxtLayout></NuxtLayout>`标签。

```vue
<template>
  <div>
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>
```

### 路由权限

>  实际上，仍然可以通过`nuxt.config.ts`中的 `router` 选项定义路由规则，但是在Nxut中我们可以不这样做，我们可以使用**导航守卫**去实现这个路由权限的功能

在根目录中，我们创建一个`middleware`文件夹，在该文件夹中我们创建一个名为`auth.ts`的文件：

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.params.id === '1') {

  }else{
    return navigateTo('/')
  }
})
```

该文件实现一个功能：判断这次导航的参数传递内容是否是`1`，如果是1的话就放行路由，如果不是1的话，就重定向到`/`根目录。



我们可以配合嵌套路由去实现这个效果，请在`blog.vue`文件中添加以下内容：

```javascript
<script setup>
  definePageMeta({
    middleware: ["auth"]
  })
</script>
```

使用`definePageMeta`配置我们这个页面的路由规则，规则即在上面的`auth.ts`中定义了。



现在访问[localhost:3000/blog/1](http://localhost:3000/blog/1)，是正常的。如果我们访问：[localhost:3000/blog/2](http://localhost:3000/blog/2)，则会直接跳转到[localhost:3000](http://localhost:3000/)。



至此，实现了路由的权限校验功能。

## 2. 静态资源

1. public：被作为应用程序根目录提供给用户，访问以`/`开头
2. `assets`：打包工具会处理，访问的时候以`~`开头

### public：图片访问

> /，开头

在`public`中访问一个图像文件：`Chengyunlai.ico`。

在需要使用的地方，比如在`<img>`标签中，通过属性`src`，写上：

```vue
<img class="avatar" src="/Chengyunlai.ico">
```

即可访问到静态的图像信息。

### asstes：图片访问

> ~/assets，开头

```vue
<img class="avatar" src="~/assets/Chengyunlai.ico">
```

## 3. 全局样式，TailwindCSS样式的整合

全局配置样式的方式：

1. 配置`nuxt.config.ts`文件
2. 在`app.vue`中引入

### nuxt.config.ts配置

加入`css`属性，内容如下：

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css:[
    'assets/global.css'
  ]
})
```

希望加入`global.css`全局样式，样式的文件存放在`assets`目录中。

```css
a {
  text-decoration: none;
  color: cornflowerblue;
}
```

创建完毕后，重启启动工程会发现全局样式已经生效。

### 在app.vue中配置全局样式

加上`script`标签，内容如下：

```javascript
<script>
  import '~/assets/global.css'
</script>
```



### SCSS 的使用

略 ，可以用TailwindCSS

### TailWindCSS

安装：

```cmd
yarn add -D @nuxtjs/tailwindcss tailwindcss@latest postcss@latest autoprefixer@latest
```

配置项：

```ts
export default defineNuxtConfig({
  modules:[
    '@nuxtjs/tailwindcss'
  ]
});
```

#### 创建配置文件

创建 `tailwind.config.js`文件。

```csharp
npx tailwindcss init
```

#### TailWindCSS全局样式

在目录 `./assets/css/tailwind.css` 文件 并使用 `@tailwind` 指令来包含 Tailwind的 `base`、 `components` 和 `utilities` 样式，如下：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 基于全局的自定义样式

在`./assets/css/_variables.css`中，抽取变量：

```css
:root{
  --link-color:#3370ff;
}
```

全局应用，在 TailWindCSS全局样式中补充：

```css
@import "_variables.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

a {
  text-decoration:none;
  color: var(--link-color);
}
```

这样全局的`a`标签样式就全部改变了。

## 4. 自动导入 - 组件库的导入

Nuxt3会处理以下依赖的自动导入：

1. Nxut本身的：`useFetch`、`useState`、`useNuxtApp`等
2. Vue自动导入：`ref`、`reactive`、`computed`等
3. 基于路径的自动导入：
   * `/components`
   * `/composables`
   * `/utils`

### Component 组件自动导入

> Nuxt约定把组件放在`components/`目录中，这些组件只要被用在页面或其他组件中，就会自动导入并注册。

例如路径：

```cmd
| components/
--| TheHeader.vue
--| TheFooter.vue
```

我们在页面中使用：

```vue
<template>
  <div>
    <TheHeader />
    <slot />
    <TheFooter />
  </div>
</template>
```



嵌套路径：

```cmd
| components/
--| base/
----| foo/
------| Button.vue
```

组件名称：

```vue
<BaseFooButton />
```

### NaiveUI 整合

安装：

```cmd
yarn add @huntersofbook/naive-ui-nuxt -D
```

配置：

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules:[
    '@huntersofbook/naive-ui-nuxt'
  ]
})

```

NaiveUI文档：

[按钮 Button - Naive UI](https://www.naiveui.com/zh-CN/dark/components/button)

### 知晓哪些组件是支持导入的

>  Nuxt3默认只扫描根目录中的模块，例如官方文档中已经提示的目录结构的内容。

我们**自定义配置**，可以通过`nuxt.config.ts`中的`imports`选项自定义扫描目录：

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  imports:{
    dirs:[
      // 扫描compomemts根目录的模块，嵌套的不管
      'components'
    ]
  }
})

```

## 5. 接口开发

> 在Nuxt项目下的`~/server/api`目录下的文件会被注册成服务器API。

在目录中创建一个`hello.ts`

```ts
// default defineEventHandler这是固定写法，服务器是基于H3开发的
export default defineEventHandler((event)=>{
    // 接收路径参数
    
    // 接收请求体参数
    
    // 接收查询的参数
  return {
    message:'hello world'
  }
})
```

测试

```vue
<template>
  <h1>首页</h1>
  <h2>{{ message }}</h2>
</template>

<script setup lang="ts">
  // 请求数据
  const {message} = await $fetch('/api/hello')
</script>
```

### 接口请求的形式

* 路由参数

类似：`http://localhost:8080/user/1`，是一个`get`请求

> 这个route.params.id，其实是在pages中的动态路由的`[id]`决定的。

```javascript
const {res} = await $fetch('url'+route.params.id)
```

**如果要使用Nuxt提供的API，接收这个路由参数：**

```javascript
getRouterParam(event,'id');
```

---

* 请求体方式

类似：`http://localhost:8080/user/save`，是一个`post`请求，请求的内容以`json`的方式放在请求体的`body`中：

```javascript
await $fetch('url',{
    body:{
        xxx:'xxx'
    }
})
```

**如果要使用Nuxt提供的API，接收这个body参数：**

```javascript
await readBody(event)
```



---

1. 查询方式

类似：`http://localhost:8080?id=1`

```javascript
const {res} = await $fetch('url?id='+route.params.id)
```

**如果要使用Nuxt提供的API，接收这个查询参数：**

```javascript
const query = getQuery(event)
const id = query.id
```

其他的：

* getHeader()
* getMethod()
* ...

### * 发起我们的请求

> Nuxt提供了5种数据访问API

1. $fetch
2. useAsyncData
3. useLazyAsyncData
4. useFetch
5. useLazyFetch

#### useFetch（使用的多）

>  是对 `useAsyncData` 和 `$fetch` 的封装，**只需传入请求的URL**或者一个请求函数即可。

返回内容：

* data
* error
* execute
* pending
* refresh：数据刷新

```javascript
<script setup>
  // 请求数据
  // 使用useFetch，请求的内容重命名为result
  const {data:result,pending,error} = await useFetch('http://localhost:8082/hello')
</script>
```

数据使用：

```vue
<template>
  <h1>首页</h1>
  <h2 v-if="error">{{error.message}}</h2>
  <h2 v-if="pending">加载中</h2>
  <h2 v-else>{{ result }}</h2>
  <NuxtLink to="/detail">
    <NButton>跳转</NButton>
  </NuxtLink>
</template>
```

数据刷新，`refresh`用于重新获取数据：

```javascript
const randomId = ref(1)
// refresh 用于数据刷新
const {data:result,pending,error,refresh} = await useFetch(()=>`http://localhost:8082/hello?page=${randomId.value}`)

// refresh()

```

#### useAsyncData

> 是useFetch的底层，使用它需要提供一个用于缓存去重的key和数据请求处理函数。**存在数据刷新的问题。**

```javascript
  // 使用useAsyncData，key必须是唯一的，可以默认不穿让它自动生成，相比$fetch，可以得到pending的状态
  const fetchPost = () =>{
    $fetch('http://localhost:8082/hello')
  }
  const {data,pending,error} = await useAsyncData(fetchPost)
  console.log(data)
```



