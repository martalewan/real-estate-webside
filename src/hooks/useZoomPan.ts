import { useEffect, useRef, useState } from "react"

const DRAG_THRESHOLD = 4

export function useZoomPan({ scale, resetKey }) {
    const imgRef = useRef(null)
    const posRef = useRef({ x: 0, y: 0 })
    const [zoomed, setZoomed] = useState(false)

    const drag = useRef({
        active: false,
        moved: false,
        startX: 0,
        startY: 0
    })

    const apply = (x, y, isZoomed) => {
        if (!imgRef.current) return

        imgRef.current.style.transform = isZoomed
            ? `translate(${x}px, ${y}px) scale(${scale})`
            : "translate(0px, 0px) scale(1)"
    }

    const clampPosition = (x, y) => {
        if (!imgRef.current) return { x, y }

        const rect = imgRef.current.getBoundingClientRect()

        const maxX = ((scale - 1) * rect.width) / (2 * scale)
        const maxY = ((scale - 1) * rect.height) / (2 * scale)

        return {
            x: Math.max(-maxX, Math.min(maxX, x)),
            y: Math.max(-maxY, Math.min(maxY, y))
        }
    }

    const reset = () => {
        setZoomed(false)
        posRef.current = { x: 0, y: 0 }
        drag.current.active = false
        drag.current.moved = false
        apply(0, 0, false)
    }

    useEffect(() => {
        reset()
    }, [resetKey])

    const onPointerDown = (e) => {
        if (!zoomed) return

        e.preventDefault()
        e.stopPropagation()

        drag.current.active = true
        drag.current.moved = false
        drag.current.startX = e.clientX - posRef.current.x
        drag.current.startY = e.clientY - posRef.current.y

        e.currentTarget.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e) => {
        if (!drag.current.active || !zoomed) return

        const { x, y } = clampPosition(
            e.clientX - drag.current.startX,
            e.clientY - drag.current.startY
        )

        if (
            Math.abs(x - posRef.current.x) > DRAG_THRESHOLD ||
            Math.abs(y - posRef.current.y) > DRAG_THRESHOLD
        ) {
            drag.current.moved = true
        }

        posRef.current = { x, y }
        apply(x, y, true)
    }

    const onPointerUp = (e) => {
        drag.current.active = false

        if (imgRef.current?.hasPointerCapture?.(e.pointerId)) {
            imgRef.current.releasePointerCapture(e.pointerId)
        }
    }

    const toggleZoom = (e) => {
        e.stopPropagation()

        if (drag.current.moved) {
            drag.current.moved = false
            return
        }

        setZoomed((z) => {
            const next = !z

            if (next) {
                apply(posRef.current.x, posRef.current.y, true)
            } else {
                posRef.current = { x: 0, y: 0 }
                apply(0, 0, false)
            }

            return next
        })
    }

    return {
        imgRef,
        zoomed,
        toggleZoom,
        onPointerDown,
        onPointerMove,
        onPointerUp
    }
}