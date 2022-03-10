import React, { useState, useEffect } from "react"
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router"
import { useForm } from 'react-hook-form'

import { createAccountAction, loginAction } from './../../redux/reducers/account/actions'
import { useAppSelector } from "../../redux/hooks"

import { registerOptions } from './registerOptions'

import { 
    LoginBox, 
    Box, 
    Title, 
    LoginInut, 
    InputDesc, 
    SubmitButton, 
    Form, 
    Change,
    ErrorDesc,
    InputBox
} from './styles'

type FormValues = {
    username: string
    email: string
    password: string
}

const Account: React.FC = () => {
    const [isCreateAccount, setIsCreateAccount] = useState(true)
    const { user, fail } = useAppSelector(state => state.account)
    const dispatch = useDispatch()
    const history = useHistory()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        mode: 'onBlur'
    })

    useEffect(() => {
        if (user) {
            history.push(`/user/${user.id}`)
        }

        if (localStorage.getItem('token')) {
            history.push('/')
        }
    }, [user])

    const createAccount = () => {
        setIsCreateAccount(true)
        reset()
    }

    const login = () => {
        setIsCreateAccount(false)
        reset()
    }

    const onSubmit = (data: FormValues): void => {
        if (isCreateAccount) {
            dispatch(createAccountAction(data))
            return
        }
        dispatch(loginAction({ email: data.email, password: data.password }))
    }

    return (
        <LoginBox>
            <Box border='1px solid #ccc' borderRadius='10px' width='29rem'>
                <Title marginTop='0' size='2rem'>Welcome to Blog</Title>
                {isCreateAccount
                    ? <Title marginTop='.1rem' size='1.3rem'>Create Account</Title>
                    : <Title marginTop='.1rem' size='1.3rem'>Log In</Title>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {isCreateAccount && (
                        <InputBox>
                            <InputDesc>Username</InputDesc>
                            <LoginInut
                                error={!!errors?.username}
                                type="text"
                                {...register('username', registerOptions.username)}
                            />
                            <ErrorDesc>{errors?.username?.message}</ErrorDesc>
                        </InputBox>
                    )}

                    <InputBox>
                        <InputDesc>Email</InputDesc>
                        <LoginInut
                            error={!!errors?.email}
                            type="email"
                            {...register('email', registerOptions.email)}
                        />
                        <ErrorDesc>{errors?.email?.message}</ErrorDesc>
                    </InputBox>

                    <InputBox>
                        <InputDesc>Password</InputDesc>
                        <LoginInut
                            error={!!errors?.password}
                            type="password"
                            {...register('password', registerOptions.password)}
                        />
                        <ErrorDesc>{errors?.password?.message}</ErrorDesc>
                    </InputBox>
                    {
                        fail && <ErrorDesc>{fail} (Invalid Credentials)</ErrorDesc>
                    }  
                    <SubmitButton type='submit'>Continue</SubmitButton>
                </Form>
                {isCreateAccount
                    ? <InputDesc>Already have an account? <Change onClick={login}>Log in</Change></InputDesc>
                    : <InputDesc>Don't have an account? <Change onClick={createAccount}>Create</Change></InputDesc>
                }
            </Box>
        </LoginBox>
    )
}

export default Account
