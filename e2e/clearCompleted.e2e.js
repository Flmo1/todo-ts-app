import { Selector } from 'testcafe'

fixture('Clear completed')
    .page('http://127.0.0.1:5173')

test('removes completed todos and keeps the rest', async t => {
  const input = Selector('#todo-input')
  const addButton = Selector('.todo-form button')
  const doneButtons = Selector('.toggleBtn')
  const items = Selector('.todo-item')
  const clearButton = Selector('#clear-completed')

  await t
    .typeText(input, 'Buy milk')
    .click(addButton)
    .typeText(input, 'Do homework')
    .click(addButton)
    .typeText(input, 'Clean room')
    .click(addButton)

  await t
    .click(doneButtons.nth(0))
    .click(doneButtons.nth(2))
    .click(clearButton)

  await t
    .expect(items.count).eql(1)
    .expect(items.nth(0).innerText).contains('Do homework')
})