import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  const wrapper = mount(HelloWorld, {
    props: {
      msg: 'Test Message'
    }
  })

  test('should render properly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('You’ve successfully created a project with')
  })

  test('should render the correct message', () => {
    const title = wrapper.find('h1')
    expect(title.text()).toContain(wrapper.props().msg)
  })
})
