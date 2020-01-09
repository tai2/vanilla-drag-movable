import dragMovable from '../src/index'

beforeEach(() => {
  document.head.innerHTML = `
    <style>
      html,
      body {
        height: 100%;
        margin: 0;
      }

      #item {
        width: 100px;
        height: 100px;
      }
    </style>
  `

  document.body.innerHTML = `
    <div id="item"></div>
  `
})

test("dragMovable sets target DOM's initial property", () => {
  const item = document.getElementById('item')
  dragMovable(item, { x: '10px', y: '20px' })

  expect(item.style.right).toBe('10px')
  expect(item.style.bottom).toBe('20px')
  expect(item.style.position).toBe('fixed')
})

test('dragMovable without extra params sets default values', () => {
  const item = document.getElementById('item')
  dragMovable(item)

  expect(item.style.right).toBe('0px')
  expect(item.style.bottom).toBe('0px')
  expect(item.style.position).toBe('fixed')
})

test("position property in extra should set target's one", () => {
  const item = document.getElementById('item')
  dragMovable(item, { position: 'absolute' })

  expect(item.style.position).toBe('absolute')
})

test('pointerdown event move the element position at the front', () => {
  const newItem = document.createElement('div')
  document.body.appendChild(newItem) // Insert a new item at last
  const item = document.getElementById('item')
  dragMovable(item)

  expect(
    item.compareDocumentPosition(newItem) & Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy()
  item.dispatchEvent(
    new MouseEvent('pointerdown', { screenX: 10, screenY: 10 }),
  )
  expect(
    item.compareDocumentPosition(newItem) & Node.DOCUMENT_POSITION_FOLLOWING,
  ).not.toBeTruthy()
})
