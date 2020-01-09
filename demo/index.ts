import dragMovable from '../src/index'

dragMovable(document.getElementById('item1'), { x: 10, y: 10 })
dragMovable(document.getElementById('item2'), { x: 300, y: 300 })
dragMovable(document.getElementById('item3'), {
  x: 10,
  y: 10,
  position: 'absolute',
})
