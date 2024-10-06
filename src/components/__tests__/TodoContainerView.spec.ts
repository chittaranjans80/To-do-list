import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TodoContainerView from '../TodoContainerView.vue'
import TodoItemView from '../TodoItemView.vue'
import TodoListView from '../TodoListView.vue'

describe('TodoListView', () => {
  it('validate child components visibility on page load', () => {
    const wrapper = mount(TodoContainerView)
    expect(wrapper.findComponent(TodoListView).exists()).toEqual(true)
    expect(wrapper.findComponent(TodoItemView).exists()).toEqual(false)
  })

  it('toggleLIstView should toggle child components', () => {
    const wrapper = mount(TodoContainerView)
    wrapper.findComponent(TodoListView).vm.$emit('toggleListView')
    expect(wrapper.findComponent(TodoItemView).exists()).toEqual(false)
  })
})
