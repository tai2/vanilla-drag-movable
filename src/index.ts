function pxNumber(pxValue: string): number {
  return parseInt(pxValue.match(/(\d+)px/)[1], 10)
}

export default function dragMovable(
  target: HTMLElement,
  {
    x = '0px',
    y = '0px',
    position = 'fixed',
  }: { x?: string; y?: string; position?: string } = {},
) {
  // TODO: Make base position selectable: 'top-left', 'top-right', 'bottom-left', 'bottom-right'
  target.style.right = x
  target.style.bottom = y
  target.style.position = position

  const computedStyle = getComputedStyle(target, '')
  // TODO: Expand each properties to independent variables
  const props = {
    x: pxNumber(computedStyle.right),
    y: pxNumber(computedStyle.bottom),
    dragging: false,
  }

  let pointerDownX = 0
  let pointerDownY = 0
  let pointerDownPanelX = 0
  let pointerDownPanelY = 0

  // What's this?
  //target.addEventListener("touchstart", (ev: TouchEvent) => {
  //    ev.preventDefault()
  //})

  target.addEventListener('pointerdown', (ev: PointerEvent) => {
    ev.preventDefault()
    ev.stopPropagation()

    props.dragging = true
    pointerDownX = ev.screenX
    pointerDownY = ev.screenY
    pointerDownPanelX = props.x
    pointerDownPanelY = props.y

    // TODO: Make z-order change optional
    // Move it front
    target.parentElement.insertBefore(target, null)
  })
  window.addEventListener('pointerup', () => {
    props.dragging = false
  })

  window.addEventListener('pointermove', (ev: PointerEvent) => {
    if (!props.dragging) {
      return
    }

    if (!(ev.buttons & 0x01)) {
      props.dragging = false
      return
    }

    ev.preventDefault()

    props.x = pointerDownPanelX + pointerDownX - ev.screenX
    props.y = pointerDownPanelY + pointerDownY - ev.screenY

    const top = target.parentElement.clientHeight
    const bottom = 0
    const right = 0
    const left = target.parentElement.clientWidth

    if (props.x < right) {
      props.x = right
    } else if (props.x > left - target.clientWidth) {
      props.x = left - target.clientWidth
    }

    if (props.y < bottom) {
      props.y = bottom
    } else if (props.y > top - target.clientHeight) {
      props.y = top - target.clientHeight
    }

    target.style.right = `${props.x}px`
    target.style.bottom = `${props.y}px`
  })
}
