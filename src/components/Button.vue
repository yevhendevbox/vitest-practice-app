<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, defineAsyncComponent, useSlots } from 'vue'
import { RouterLink } from 'vue-router'

const Icon = defineAsyncComponent(() => import('./Icon.vue'))

const slots = useSlots()
const props = withDefaults(
  defineProps<{
    icon?: string
    dark?: boolean
    empty?: boolean
    disabled?: boolean
    loading?: boolean
    success?: boolean
    danger?: boolean
    large?: boolean
    href?: string
    to?: object
    active?: boolean
    menuItem?: boolean
    delete?: boolean
    blue?: boolean
    type?: 'button' | 'submit'
  }>(),
  {
    type: 'button'
  }
)

const getClass = computed(() => ({
  'button--primary': !props.dark && !props.empty,
  'button--tertiary': props.dark && !props.empty,
  'is-loading': props.loading,
  'is-approved': props.success,
  'button--red': props.danger,
  'button--lg': props.large,
  'is-active': props.active,
  'button--sky': props.blue
}))

const getTag = computed(() => {
  if (props.href) return 'a'
  if (props.to) return RouterLink
  return 'button'
})

const getBind = computed(() => {
  let result: any = {
    class: getClass.value
  }

  if (props.href) result.href = props.href

  if (props.to) result.to = props.to

  if (props.disabled) result.disabled = props.disabled || props.loading

  return result
})
</script>

<template>
  <component :is="getTag" :type="getTag === 'button' ? props.type : undefined" class="button" v-bind="getBind">
    <span v-if="props.loading" class="button__icon loading">
      <Icon src="spinner" />
    </span>

    <span v-if="props.icon" class="button__icon">
      <Icon :src="props.icon" />
    </span>

    <span v-if="slots.image" class="button__icon">
      <slot name="image"></slot>
    </span>

    <div class="button__text">
      <slot></slot>
    </div>
  </component>
</template>

<style scoped>
.button__icon.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.is-loading {
  .button__icon:not(.loading) {
    opacity: 0;
  }

  .button__text {
    opacity: 0;
  }
}
</style>
