<template>
  <div class="h-auto w-auto relative items-center">
    <div class="w-8 h-12">
      <div class="logo bg-base-content" />
    </div>
  </div>
</template>

<style>
@reference "tailwindcss";
.logo {
  @apply h-full;
  -webkit-mask-size: cover;
  mask-size: cover;
  mask: url(/svg/logo.svg) no-repeat 25% 25%;
}
</style>
