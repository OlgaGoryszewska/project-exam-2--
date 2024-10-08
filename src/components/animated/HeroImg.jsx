import heroImg from '../../assets/img/heroImg.png'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { useRef } from 'react'

export function HeroImg() {
    const imageRef = useRef(null)

    useEffect(() => {
        gsap.from(imageRef.current, {
            duration: 1,
            scale: 1.5,
            opacity: 1,
            ease: 'back.out(1.7)',
            delay: 0.5,
            transformOrigin: 'center',
            stagger: {
                amount: 0.5,
                from: 'center',
            },
        })
    }, [])

    return (
        <>
            <img
                className="max-h-96  object-cover "
                src={heroImg}
                alt="home"
                ref={imageRef}
            />
        </>
    )
}
