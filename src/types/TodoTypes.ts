export enum Priority {
  CRITICAL = 'critical',
  MODERATE = 'moderate',
  OPTIONAL = 'optional'
}

export enum Status {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed'
}

export enum ActionType {
  ADD = 'Add',
  EDIT = 'Edit',
  VIEW = 'View',
  DELETE = 'Delete'
}

export enum SortBy {
  PRIORITY_ASC = 'Priority Ascending',
  PRIORITY_DESC = 'Priority Descending'
}

export type Todo_Item = {
  id: number
  title: string
  description?: string
  priority: Priority
  status: Status
}
