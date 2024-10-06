<script setup lang="ts">
import { ref } from 'vue'

import TodoItemView from './TodoItemView.vue'
import TodoListView from './TodoListView.vue'
import { type Todo_Item, ActionType } from '@/types/TodoTypes'

const displayListView = ref<boolean>(true)
const actionType = ref<ActionType>()
const currentTodoItem = ref<Todo_Item>()

function toggleLIstView(todoItem?: Todo_Item, type?: ActionType) {
  currentTodoItem.value = todoItem
  actionType.value = type || ActionType.ADD
  displayListView.value = !displayListView.value
}
</script>

<template>
  <template v-if="displayListView">
    <TodoListView @toggle-list-view="toggleLIstView"></TodoListView>
  </template>

  <template v-else>
    <TodoItemView
      @toggle-list-view="toggleLIstView"
      :actionType="actionType"
      :currentTodoItem="currentTodoItem"
    ></TodoItemView>
  </template>
</template>
