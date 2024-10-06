import { expectTypeOf, test } from 'vitest'
import { Priority, Status, ActionType, SortBy } from '../TodoTypes'

test('type should match as per the definition', () => {
  expectTypeOf(Priority.CRITICAL).toBeString()
  expectTypeOf(Status.COMPLETED).toBeString()
  expectTypeOf(ActionType.DELETE).toBeString()
  expectTypeOf(SortBy.PRIORITY_ASC).toBeString()
})
