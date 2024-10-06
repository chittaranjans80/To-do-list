<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'

import { TodoListLabels } from '@/constants/GlobalLabels'
import { type Todo_Item, ActionType } from '@/types/TodoTypes'

const sortByPriorityDesc = ref<boolean>(true)

const { todoList, removeItem, clearStorage } = useLocalStorage()

const todoListItems = computed(() => {
  const todoListArray = [...todoList.value]
  if (sortByPriorityDesc.value) {
    todoListArray.sort((item1, item2) => {
      if (item1.priority < item2.priority) return -1
      if (item1.priority > item2.priority) return 1
      return 0
    })
  } else {
    todoListArray.sort((item1, item2) => {
      if (item1.priority < item2.priority) return 1
      if (item1.priority > item2.priority) return -1
      return 0
    })
  }

  return todoListArray
})

const emit = defineEmits(['toggleListView'])

function toggleView(todoItem?: Todo_Item, actionType?: string) {
  emit('toggleListView', todoItem, actionType)
}

function removeTodoItem(item: Todo_Item) {
  //Todo: Add functionality for modal confirmation before deleting item
  removeItem(item.id)
}

function clearALlItems() {
  //Todo: Add functionality for modal confirmation before deleting item
  clearStorage()
}
function updateSortBy() {
  sortByPriorityDesc.value = !sortByPriorityDesc.value
}
</script>
<template>
  <div class="todo-list-container padding-10">
    <h1 class="header-label">{{ TodoListLabels.header }}</h1>

    <template v-if="todoList?.length > 0">
      <table id="todo-list">
        <thead>
          <tr>
            <td>{{ TodoListLabels.title }}</td>
            <td>{{ TodoListLabels.description }}</td>
            <td class="clickable-td" @click="updateSortBy" :title="TodoListLabels.sortByTitle">
              {{ TodoListLabels.priority }}
              <span v-if="sortByPriorityDesc">
                <font-awesome-icon icon="chevron-down" />
              </span>
              <span v-else>
                <font-awesome-icon icon="chevron-up" />
              </span>
            </td>
            <td>{{ TodoListLabels.status }}</td>
            <td>{{ TodoListLabels.actions }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in todoListItems" :key="todo.id" data-test="todo-list-view">
            <td>{{ todo.title }}</td>
            <td>{{ todo.description }}</td>
            <td>{{ todo.priority }}</td>
            <td>{{ todo.status }}</td>
            <td>
              <span :title="TodoListLabels.viewTitle" class="view-icon" @click="toggleView(todo, ActionType.VIEW)">
                <font-awesome-icon icon="eye" />
              </span>
              <span :title="TodoListLabels.editTitle" @click="toggleView(todo, ActionType.EDIT)">
                <font-awesome-icon icon="pen" />
              </span>
              <span :title="TodoListLabels.deleteTitle" class="delete-icon" @click="removeTodoItem(todo)">
                <font-awesome-icon icon="trash" />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </template>

    <template v-else>
      <p class="no-items-container" data-test="todo-empty-view">{{ TodoListLabels.noTodoLable }}</p>
    </template>

    <div class="button-container">
      <button type="submit" class="primary-button" @click="toggleView()">
        {{ TodoListLabels.submitButtonTitle }}
      </button>

      <button v-show="todoList?.length > 0" type="reset" class="delete-button" @click="clearALlItems">
        <span :title="TodoListLabels.deleteTitle" class="danger">
          <font-awesome-icon icon="trash" />
        </span>
        {{ TodoListLabels.clearAllButtonTitle }}
      </button>
    </div>
  </div>
</template>

<style scoped>
#todo-list {
  width: 100%;
  border-collapse: collapse;

  tbody {
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #ddd;
    }

    tr td span {
      cursor: pointer;
      display: inline-block;
      padding: 0 12px;
      font-size: 18px;
    }

    tr td span.delete-icon {
      color: red;
    }

    tr td span.view-icon {
      color: hsla(160, 100%, 37%, 1);
      ;
    }
  }

  thead {
    text-align: left;
    background-color: hsla(160, 100%, 37%, 1);
    color: white;
    border: 1px solid #ddd;
    padding: 8px;

    tr td {
      font-weight: 600;
    }

    .clickable-td {
      cursor: pointer;

      span {
        display: inline-block;
        padding: 0 5px;
        vertical-align: sub;
      }
    }
  }

  td {
    border: 1px solid #ddd;
    padding: 8px;
  }
}

.no-items-container {
  padding: 30px 10px;
  border: 2px solid #ddd;
  font-weight: 600;
  color: brown;
  font-size: 18px;
}

@media (min-width: 1024px) {
  .todo-list-container {
    width: 70%;
    margin: auto;
  }
}
</style>
