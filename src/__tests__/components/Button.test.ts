import { mount } from "@vue/test-utils";
import { describe, expect, test  } from "vitest";

import Button from '@/components/Button.vue'

describe('Button.vue', () => {
  const wrapper = mount(Button)

  test('should render properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('should render primary class if no props provided', () => {
    expect(wrapper.classes()).toContain('button--primary')
  })

  test('should not render primary when dark props provided', async () => {
    await wrapper.setProps({ dark: true })
    expect(wrapper.classes()).not.toContain('button--primary')
  })

  test.each([
    { type: 'dark', expectedClass: 'button--tertiary' },
    { type: 'danger', expectedClass: 'button--red' },
    { type: 'large', expectedClass: 'button--lg' },
    { type: 'active', expectedClass: 'is-active' },
    { type: 'blue', expectedClass: 'button--sky' },
    { type: 'loading', expectedClass: 'is-loading' },
  ])('should contain expected class for item type "%s"', async ({ type, expectedClass }) => {
    await wrapper.setProps({
      [type]: true
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain(expectedClass)
  })

  test('should render image slot if slot provided', () => {
    const wrapper = mount(Button, {
      slots: {
        image: '<img src="https://via.placeholder.com/150" />'
      }
    })

    expect(wrapper.find('img').exists()).toBe(true)
  })

  test('should render default slot if slot provided', () => {
    const wrapper = mount(Button, {
      slots: {
        default: '<p>Test Slot Text</p>'
      }
    })

    expect(wrapper.find('p').text()).toContain('Test Slot Text')
  })
})