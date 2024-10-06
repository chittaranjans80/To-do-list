import { describe, it, expect } from 'vitest'

import { useLocalStorage } from '../useLocalStorage'
import { Priority, Status } from '@/types/TodoTypes'

import type { App } from 'vue'
import { createApp } from 'vue'

export function withSetup<T>(composable: () => T): [T, App] {
  let result!: T
  const app = createApp({
    setup() {
      result = composable()
      return () => {}
    }
  })

  app.mount(document.createElement('div'))
  return [result, app]
}

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

describe('useLocalStorage', () => {
  it('should load the initialValue', () => {
    const { todoList } = useLocalStorage()
    expect(todoList.value).toEqual([])
  })

  it('should load from localStorage', async () => {
    localStorage.setItem('todoList', JSON.stringify(mockToDoList))

    const [result] = withSetup(() => useLocalStorage())
    expect(result.todoList.value.length).toEqual(2)
    expect(result.todoList.value[0].title).toEqual('Todo 1')
    expect(result.todoList.value[1].title).toEqual('Todo 2')
  })

  it('should able to add item to localStorage', async () => {
    localStorage.clear()

    const [result] = withSetup(() => useLocalStorage())
    result.addItem(mockToDoList[0])
    expect(result.todoList.value.length).toEqual(1)
    expect(result.todoList.value[0]).toEqual(mockToDoList[0])
  })

  it('should able to clear localStorage', async () => {
    const [result] = withSetup(() => useLocalStorage())
    expect(result.todoList.value.length).toEqual(1)
    result.clearStorage()
    expect(result.todoList.value.length).toEqual(0)
  })
})
