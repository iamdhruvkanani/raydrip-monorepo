import { RefObject, useRef } from 'react'
import { useInView } from 'framer-motion'

export const useScrollAnimation = (): {
  ref: RefObject<HTMLDivElement | null>
  isInView: boolean
} => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
    amount: 0.3,
  })

  return { ref, isInView }
}
