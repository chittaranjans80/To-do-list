import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TodoItemView from '../TodoItemView.vue'

describe('TodoListView', () => {
  it('testing TodoItemView component props', async () => {
    expect(TodoItemView.props.actionType.required).toEqual(false)
    expect(TodoItemView.props.currentTodoItem.required).toEqual(false)
  })

  it('Test back button functionality', async () => {
    const wrapper = mount(TodoItemView)
    const backButton = wrapper.find('#back-button')
    await backButton.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('toggleListView')
  })
})
