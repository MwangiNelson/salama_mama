import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../contexts/AppContexts";
import CustomToast from "../components/toast";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { useForm } from 'react-hook-form'
import { RiCheckLine, RiCloseLine, RiLockPasswordFill, RiLockPasswordLine, RiProfileLine, RiUser2Fill, RiUser3Fill } from "react-icons/ri";
import { MdEmail, MdInfo } from "react-icons/md";
function Auth() {
    const { login, signup, userData } = useContext(AppContext)
    const [errorMessage, setErrorMessage] = useState(null)

    const [inL, setIn] = useState(true)
    const navigate = useNavigate();

    console.log('userdata', userData)

    const toggleAuth = () => {
        setIn(!inL)
    }

    const handleSignIn = async (data) => {

            const email =  data.email
            const password = data.password
        
        try {
            await login(email,password);
            CustomToast({ type: 'success', message: 'User logged in successfully.' })
            navigate('/');

        } catch (error) {
            // Handle error (e.g., set error message)
            CustomToast({ type: 'danger', message: 'Login Failed' });
            setErrorMessage(error.message);
        }
    }

    async function handleSignUp(data) {

        const username = data.username
        const email = data.email
        const password = data.password

        console.log({ username, email, password })
        // Await the login function and handle successful login
        const SignUpMessage = await signup(email, password, username);

        console.log("Signup Message :", SignUpMessage)
        if (!SignUpMessage.success) {
            // CustomToast({ type: 'danger', message: SignUpMessage.message })
            setErrorMessage(SignUpMessage)
            console.log("Error msg ", errorMessage)
            return
        }
        setErrorMessage(SignUpMessage)
        // CustomToast({ type: 'success', message: 'User account created successfully.' })
        navigate('/chat')
    }

    const {
        getValues,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const SignInForm = () => (
        <div className="w-full flex flex-row justify-center items-center h-full">
            <form
                onSubmit={handleSubmit(handleSignIn)}
                className="w-10/12 md:w-3/4 lg:w-1/3 rounded-lg items-center flex flex-col ">
                <h2 className="text-3xl md:text-5xl  w-3/4 text-center md:py-5 py-2"><b>Welcome back</b>, we missed you.</h2>
                <h3 className="text-sm md:text-xl font-base text-gray-800 text-center py-2 md:py-5">
                    Continue where you left off...
                </h3>
                {
                    errorMessage && <Toast >

                        {!errorMessage.success && <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                            <RiCloseLine className="h-5 w-5" />
                        </div>}
                        {
                            errorMessage.success && <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <RiCheckLine className="h-5 w-5" />
                            </div>
                        }
                        <div className="ml-3 text-sm font-normal">{errorMessage.message}</div>
                        <Toast.Toggle />
                    </Toast>
                }
                <div className="flex flex-col w-full gap-5 items-center justify-center py-10">
                    <div className="flex flex-col gap-1 w-full md:w-3/4">
                        <Label >Enter your email here:</Label>
                        <TextInput
                            type="email"
                            id="email"
                            {...register('email', {
                                required: 'Email Address is required.',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address format.',
                                },
                            })}
                            className=" border  text-cream-900 text-sm rounded-lg  block w-full "
                            placeholder="sampleemail@gmail.com"
                            icon={RiUser3Fill}
                            color={errors.email?.message ? 'failure' : 'gray'}
                            helperText={errors.email?.message}
                        /></div>
                    <div className="flex flex-col gap-1 w-full md:w-3/4">
                        <Label >Enter your password here:</Label>
                        <TextInput
                            type="password"
                            id="password"
                            icon={RiLockPasswordFill}
                            {...register('password', {
                                required: 'Password is required.',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long.',
                                },
                            })}
                            className=" text-cream-900 text-sm rounded-lg  block w-full"
                            placeholder="*****************"
                            color={errors.password ? 'failure' : 'gray'}
                            helperText={errors.password?.message}
                        />
                    </div>

                </div>
                <div className="flex flex-col gap-3 w-full items-center">
                    <div className="flex flex-row-reverse justify-center w-10/12 lg:w-3/4 md:justify-between">
                        <Link to={""} onClick={toggleAuth} >Create an account?</Link>
                    </div>
                    <Button
                        type="submit"
                        color="dark"
                        pill
                        className=" text-white  w-fit px-10 font-semibold text-2xl">
                        Log In
                    </Button>
                </div>

            </form>
        </div>
    )
    const SignUpForm = () => (
        <div className="w-full  flex flex-row-reverse justify-center items-center h-full">
            <form
                onSubmit={handleSubmit(handleSignUp)}
                className="w-10/12 md:w-3/4 lg:w-1/3 rounded-lg items-center flex flex-col">
                <h2 className="text-3xl md:text-5xl  w-3/4 text-center md:py-5 py-2">Create a <b className="me-3 text-gray-700">free</b>
                    account with us</h2>
                <h3 className="text-xs md:text-xl font-base text-gray-800 text-center pb-10 md:py-5">
                    Get started with an account to help us improve our services for you.
                </h3>
                <div className="flex w-full items-center flex-col gap-4">
                    {
                        errorMessage && <Toast className="!w-full !max-w-full" >

                            {!errorMessage.success && <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                                <RiCloseLine className="h-5 w-5" />
                            </div>}
                            {
                                errorMessage.success && <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                    <RiCheckLine className="h-5 w-5" />
                                </div>
                            }
                            <div className="ml-3 w-full text-sm font-normal">{errorMessage.message}</div>
                            <Toast.Toggle />
                        </Toast>
                    }
                    <div className="flex flex-col gap-1 w-full md:w-3/4">
                        <Label >Enter your username here:</Label>
                        <TextInput
                            type="text"
                            id="username"
                            {...register('username', {
                                required: 'Username is required.',
                            })}
                            className=" border  text-cream-900 text-sm rounded-lg  block w-full "
                            placeholder="Jane Doe"
                            icon={RiUser3Fill}
                            color={errors.username?.message ? 'failure' : 'gray'}
                            helperText={errors.username?.message}
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full md:w-3/4">
                        <Label >Enter your email here:</Label>
                        <TextInput
                            type="email"
                            id="email"
                            {...register('email', {
                                required: 'Email Address is required.',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address format.',
                                },
                            })}
                            className=" border  text-cream-900 text-sm rounded-lg  block w-full "
                            placeholder="sampleemail@gmail.com"
                            icon={MdEmail}
                            color={errors.email?.message ? 'failure' : 'gray'}
                            helperText={errors.email?.message}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-3/4">
                        <div className="flex flex-col !w-full gap-1">
                            <Label >Choose a password:</Label>
                            <TextInput
                                {...register("password", {
                                    required: 'Password is required.',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters long.',
                                    },
                                })}
                                type="password"
                                placeholder="Password"
                                className='w-full'
                                icon={RiLockPasswordLine}
                                color={errors.password ? 'failure' : 'gray'}
                                helperText={errors.password?.message}
                            />
                        </div>

                        <div className="flex flex-col w-full gap-1">
                            <Label >Confirm password:</Label>
                            <TextInput
                                {...register("confirm_password", {
                                    required: 'Please confirm your password.',
                                    validate: (value) => value === getValues('password') || 'Passwords do not match.',
                                })}
                                icon={MdInfo}
                                type="password"
                                placeholder="Confirm Password"
                                className='w-full'
                                helperText={errors.confirm_password?.message}
                                color={errors.confirm_password ? 'failure' : (watch('password') === getValues('confirm_password') ? 'success' : 'gray')}
                            />

                        </div>
                    </div>

                </div>


                <Button pill type="submit" color="dark" className="mt-4 lg:mt-0" >Create An Account</Button>
                <div className="flex flex-row py-4 pb-10 w-10/12 lg:w-3/4 justify-center lg:justify-between">
                    <Link to={""} onClick={toggleAuth}>Already have an account?</Link>
                </div>
            </form>
        </div>

    )
    return (
        inL ? <SignInForm /> : <SignUpForm />
    );
}

export default Auth;
