<script setup lang="ts">
import { ref, computed } from 'vue'
import { Priority, Status } from '@/types/TodoTypes'
import { TodoItemLabels, PriorityList, StatusList } from '@/constants/GlobalLabels'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { type Todo_Item, ActionType } from '@/types/TodoTypes'

const { addItem, updateItem } = useLocalStorage()

const props = defineProps<{
  actionType?: ActionType
  currentTodoItem?: Todo_Item
}>()

const actionType = ref<ActionType>(props.actionType || ActionType.ADD)

const isDisabledField = computed((): boolean => {
  return actionType.value === ActionType.VIEW
})

const todoItem = ref<Todo_Item>({
  id: props.currentTodoItem?.id || 0,
  title: props.currentTodoItem?.title || '',
  description: props.currentTodoItem?.description || '',
  priority: props.currentTodoItem?.priority || Priority.MODERATE,
  status: props.currentTodoItem?.status || Status.NOT_STARTED
})

const emit = defineEmits(['toggleListView'])

function toggleLIstView() {
  emit('toggleListView')
}

function saveToDoItem() {
  if (props.actionType === ActionType.EDIT) {
    updateItem(todoItem.value)
  } else {
    addItem(todoItem.value)
  }
  toggleLIstView()
}
</script>

<template>
  <div class="todo-item-container padding-10">
    <h1 class="header-label">{{ props.actionType + ' ' + TodoItemLabels.headerTitle }}</h1>

    <form v-on:submit.prevent="saveToDoItem" id="todo-form">
      <div class="form-item padding-10">
        <label for="title">{{ TodoItemLabels.title }}</label>
        <input id="title" type="text" required :placeholder="TodoItemLabels.titlePlaceHolder"
          :disabled="isDisabledField" v-model="todoItem.title" />
      </div>

      <div class="form-item padding-10">
        <label for="description">{{ TodoItemLabels.descriptionTitle }}</label>
        <input id="description" type="text" :placeholder="TodoItemLabels.descriptionPlaceHolder"
          :disabled="isDisabledField" v-model="todoItem.description" />
      </div>

      <div class="form-item padding-10">
        <label for="priority">{{ TodoItemLabels.priorityTitle }}</label>
        <select v-model="todoItem.priority" required :disabled="isDisabledField">
          <option v-for="itemPriority in PriorityList" :value="itemPriority.id" :key="itemPriority.id">
            {{ itemPriority.value }}
          </option>
        </select>
      </div>

      <div class="form-item padding-10">
        <label for="status">{{ TodoItemLabels.statusTitle }}</label>
        <select v-model="todoItem.status" required :disabled="isDisabledField">
          <option v-for="itemStatus in StatusList" :value="itemStatus.id" :key="itemStatus.id">
            {{ itemStatus.value }}
          </option>
        </select>
      </div>

      <div class="button-container">
        <button type="submit" class="primary-button" v-show="actionType !== ActionType.VIEW" id="submit-button">
          {{
            actionType === ActionType.EDIT
              ? TodoItemLabels.UpdateButtonTitle
              : TodoItemLabels.AddButtonTitle
          }}
        </button>
        <button type="reset" class="secondary-button" @click="toggleLIstView" id="back-button">
          {{ TodoItemLabels.backButtonTitle }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
#todo-form {
  border: 2px solid #ddd;
  border-radius: 5px;
  padding: 20px 10px 40px 10px;
}

.form-item label {
  padding-right: 10px;
  width: 35%;
  display: inline-block;
}

.form-item input,
.form-item select {
  display: inline-block;
  width: 65%;
  padding: 5px 10px;
}

@media (min-width: 1024px) {
  .todo-item-container {
    width: 40%;
    margin: auto;
  }

  .button-container {
    padding-right: 10px;
  }
}
</style>
