import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ButtonSwitch from './ButtonSwitch'
import { registerUser } from '../services/registerUser'
import logoRound from '../assets/img/logoRound.png'
import { CustomAlert } from './CustomAlert'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrambleTextPlugin)

const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm()
    const [alertMessage, setAlertMessage] = useState({
        message: '',
        show: false,
    })

    const [error, setError] = useState('')
    const navigate = useNavigate()

    const isValidUrl = (url) => {
        try {
            new URL(url)
            return true
        } catch {
            return false
        }
    }

    const onSubmit = async (data) => {
        try {
            const avatar = data.avatarUrl
                ? { url: data.avatarUrl, alt: data.avatarAlt }
                : undefined

            const banner = data.bannerUrl
                ? { url: data.bannerUrl, alt: data.bannerAlt }
                : undefined

            const newUser = {
                name: data.name,
                email: data.email,
                password: data.password,
                bio: data.bio,
                avatar: avatar,
                banner: banner,
                venueManager: data.venueManager || false,
            }

            await registerUser(newUser)
            setAlertMessage({
                message: 'User registered successfully!',
                type: 'success',
                show: true,
            })
        } catch (error) {
            setError('Error registering user: ' + error.message)
        }
    }
    const handleCloseAlert = () => {
        setAlertMessage({ ...alert, show: false })
        navigate('/Login')
    }

    const textRef = useRef(null)
    const logoRef = useRef(null)

    useEffect(() => {
        gsap.to(textRef.current, {
            duration: 3,
            scrambleText: { text: 'Register' },
            chars: 'XO',
            ease: 'power3',
        })
    }, [])

    useEffect(() => {
        gsap.fromTo(
            logoRef.current,
            { x: '-100%', opacity: 0 },
            { x: '0%', opacity: 1, duration: 1.5, ease: 'power3.out' }
        )
    }, [])

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-registration"
            >
                {error && <p className="text-red-500">{error}</p>}
                <img
                    className="w-16 h-16 mx-auto mt-14"
                    src={logoRound}
                    alt="logo"
                    ref={logoRef}
                />
                <h2 ref={textRef} className="py-4 mx-auto">
                    Register
                </h2>

                <label>Full Name</label>
                <input
                    type="text"
                    {...register('name', {
                        required: 'Name is required.',
                        pattern: {
                            value: /^[a-zA-Z0-9_ ]+$/,
                            message:
                                'Name must not contain punctuation symbols apart from underscore (_).',
                        },
                    })}
                    placeholder="Name"
                    className="text-field"
                />
                {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                )}

                <label>Email</label>
                <input
                    type="email"
                    {...register('email', {
                        required: 'Email is required.',
                        pattern: {
                            value: /^[^\s@]+@stud\.noroff\.no$/,
                            message:
                                'Email must be a valid stud.noroff.no email address.',
                        },
                    })}
                    placeholder="Email (must be @stud.noroff.no)"
                    className="text-field"
                />
                {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                )}

                <label>Password</label>
                <input
                    type="password"
                    {...register('password', {
                        required: 'Password is required.',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters.',
                        },
                    })}
                    placeholder="Password"
                    className="text-field"
                />
                {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                )}

                <label>Bio</label>
                <textarea
                    {...register('bio', {
                        maxLength: {
                            value: 160,
                            message: 'Bio must be less than 160 characters.',
                        },
                    })}
                    placeholder="Bio (max 160 characters)"
                    className="text-field"
                />
                {errors.bio && (
                    <p className="text-red-500">{errors.bio.message}</p>
                )}

                <label>Avatar URL</label>
                <input
                    type="text"
                    {...register('avatarUrl', {
                        validate: (value) => {
                            if (value && !isValidUrl(value)) {
                                return 'Avatar URL must be a valid URL.'
                            }
                        },
                    })}
                    placeholder="Avatar URL"
                    className="text-field"
                />
                {errors.avatarUrl && (
                    <p className="text-red-500">{errors.avatarUrl.message}</p>
                )}

                <input
                    type="text"
                    {...register('avatarAlt', {
                        maxLength: {
                            value: 120,
                            message:
                                'Avatar alt text must be less than 120 characters.',
                        },
                        validate: (value) => {
                            if (value && !watch('avatarUrl')) {
                                return 'Avatar alt text requires avatar URL to be set.'
                            }
                        },
                    })}
                    placeholder="Avatar Alt Text"
                    className="text-field hidden"
                />
                {errors.avatarAlt && (
                    <p className="text-red-500">{errors.avatarAlt.message}</p>
                )}

                <label>Banner URL</label>
                <input
                    type="text"
                    {...register('bannerUrl', {
                        validate: (value) => {
                            if (value && !isValidUrl(value)) {
                                return 'Banner URL must be a valid URL.'
                            }
                        },
                    })}
                    placeholder="Banner URL"
                    className="text-field"
                />
                {errors.bannerUrl && (
                    <p className="text-red-500">{errors.bannerUrl.message}</p>
                )}

                <input
                    type="text"
                    {...register('bannerAlt', {
                        maxLength: {
                            value: 120,
                            message:
                                'Banner alt text must be less than 120 characters.',
                        },
                        validate: (value) => {
                            if (value && !watch('bannerUrl')) {
                                return 'Banner alt text requires banner URL to be set.'
                            }
                        },
                    })}
                    placeholder="Banner Alt Text"
                    className="text-field hidden"
                />
                {errors.bannerAlt && (
                    <p className="text-red-500">{errors.bannerAlt.message}</p>
                )}

                <div className="flex flex-row py-4 justify-between">
                    <p>Are you a venue manager?</p>
                    <ButtonSwitch
                        onChange={(checked) =>
                            setValue('venueManager', checked)
                        }
                        checked={watch('venueManager') || false}
                    />
                </div>

                <button type="submit" className="button-blue">
                    Register
                </button>
                <div className="flex my-4">
                    <p className="text-dark-gray">Already have an account? </p>
                    <Link to="/Login">
                        <p className="pl-2">Login</p>
                    </Link>
                </div>
            </form>
            <div>
                {alertMessage.show && (
                    <CustomAlert
                        message={alertMessage.message}
                        onClose={handleCloseAlert}
                    />
                )}
            </div>
        </>
    )
}

export default RegistrationForm
