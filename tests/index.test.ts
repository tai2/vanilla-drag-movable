import dragMovable from '../src/index'

beforeEach(() => {
  document.head.innerHTML = `
    <style>
      html,
      body {
        height: 100%;
        margin: 0;
      }

      #draggable {
        width: 100px;
        height: 100px;
        background: red;
      }
    </style>
  `

  document.body.innerHTML = `
    <div id="draggable">draggable</div>
  `
})

test("dragMovable sets target DOM's initial property", () => {
  const draggable = document.getElementById('draggable')
  dragMovable(draggable, { x: 10, y: 20 })

  expect(draggable.style.right).toBe('10px')
  expect(draggable.style.bottom).toBe('20px')
  expect(draggable.style.position).toBe('fixed')
  expect(draggable.style.zIndex).toBe('2147483647')
})

test('dragMovable without extra params sets default values', () => {
  const draggable = document.getElementById('draggable')
  dragMovable(draggable)

  expect(draggable.style.right).toBe('0px')
  expect(draggable.style.bottom).toBe('0px')
})
