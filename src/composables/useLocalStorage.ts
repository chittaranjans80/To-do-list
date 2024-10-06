import { ref, onMounted } from 'vue'
import type { Todo_Item } from '@/types/TodoTypes'

export function useLocalStorage() {
  const todoList = ref<Todo_Item[]>([])

  const getTodoList = (): void => {
    const storageValue = localStorage.getItem('todoList')
    const listItems = storageValue ? JSON.parse(storageValue) : []
    todoList.value = listItems
  }

  const addItem = (item: Todo_Item): void => {
    item.id = todoList.value.length + 1
    todoList.value.push(item)
    localStorage.setItem('todoList', JSON.stringify(todoList.value))
  }

  const updateItem = (updatedItem: Todo_Item): void => {
    const selectedIndex = todoList.value?.findIndex((todoItem) => todoItem.id === updatedItem.id)
    if (selectedIndex > -1) {
      todoList.value[selectedIndex] = updatedItem
    }
    localStorage.setItem('todoList', JSON.stringify(todoList.value))
  }

  const removeItem = (itemId: Todo_Item['id']): void => {
    const updatedList =
      todoList.value?.length > 0
        ? todoList.value.filter((item: Todo_Item) => item.id !== itemId)
        : []
    localStorage.setItem('todoList', JSON.stringify(updatedList))
    todoList.value = updatedList
  }

  const clearStorage = (): void => {
    localStorage.clear()
    todoList.value = []
  }

  onMounted(getTodoList)

  return { todoList, addItem, removeItem, clearStorage, updateItem }
}
