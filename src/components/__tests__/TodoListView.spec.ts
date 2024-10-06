import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TodoListView from '../TodoListView.vue'
import { TodoListLabels } from '@/constants/GlobalLabels'
import { Priority, Status } from '@/types/TodoTypes'

const mockToDoList = [
  {
    id: 1,
    title: 'Todo 1',
    description: 'Todo description 1',
    priority: Priority.MODERATE,
    status: Status.IN_PROGRESS
  },
  {
    id: 2,
    title: 'Todo 2',
    description: 'Todo description 2',
    priority: Priority.CRITICAL,
    status: Status.COMPLETED
  }
]

describe('TodoListView', () => {
  it('renders empty to do message when to do list is empty', () => {
    const wrapper = mount(TodoListView)
    const todo = wrapper.get('[data-test="todo-empty-view"]')
    expect(todo.text()).toEqual(TodoListLabels.noTodoLable)
  })

  it('creates a todo', async () => {
    localStorage.setItem('todoList', JSON.stringify(mockToDoList))
    const wrapper = mount(TodoListView)

    const todo = wrapper.get('[data-test="todo-empty-view"]')
    expect(todo.text()).toEqual(TodoListLabels.noTodoLable)
  })
})
