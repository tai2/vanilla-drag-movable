import dragMovable from '../src/index'

dragMovable(document.getElementById('item1'), { x: '10px', y: '10px' })
dragMovable(document.getElementById('item2'), { x: '8em', y: '8em' })
dragMovable(document.getElementById('item3'), {
  x: '10%',
  y: '10%',
  position: 'absolute',
})
