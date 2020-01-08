import dragMovable from '..'

test("dragMovable sets target DOM's initial property", () => {
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

  const draggable = document.getElementById('draggable')
  dragMovable(draggable, { x: 10, y: 20 })

  expect(draggable.style.right).toBe('10px')
  expect(draggable.style.bottom).toBe('20px')
  expect(draggable.style.position).toBe('fixed')
  expect(draggable.style.zIndex).toBe('2147483647')
})
