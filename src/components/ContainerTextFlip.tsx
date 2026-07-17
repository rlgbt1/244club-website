import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type ContainerTextFlipProps = {
  words: string[]
  interval?: number
}

export function ContainerTextFlip({ words, interval = 3000 }: ContainerTextFlipProps) {
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState<number>()
  const wordRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (words.length < 2) return
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % words.length), interval)
    return () => window.clearInterval(timer)
  }, [interval, words.length])

  useLayoutEffect(() => {
    if (wordRef.current) setWidth(wordRef.current.getBoundingClientRect().width)
  }, [index])

  return (
    <span className="container-text-flip" style={width ? { width } : undefined} aria-live="polite">
      <span ref={wordRef} key={words[index]} className="container-text-flip-word">{words[index]}</span>
    </span>
  )
}
