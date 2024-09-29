import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrambleTextPlugin)

export const HeroText = () => {
    const textRef = useRef(null)

    useEffect(() => {
        gsap.to(textRef.current, {
            duration: 3,
            scrambleText: { text: 'Discover the best retreats of Sri Lanka' },
            chars: 'XO',
            ease: 'power3',

        })
    }, [])

    return (
        <h1 ref={textRef} className="text-center p-4 ">
            Discover the best retreats of Sri Lanka
        </h1>
    )
}
