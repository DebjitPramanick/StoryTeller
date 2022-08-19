import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/FormFields/Button'
import InputField from '../../components/FormFields/InputField'
import AuthLayout from '../../layouts/AuthLayout'
import FormLayout from '../../layouts/FormLayout'

const LoginUI = () => {

    const handleLogin = async() => {

    }

    return (
        <AuthLayout>
            <FormLayout>
                <h1 className='text-xl font-bold mb-6'>Login</h1>
                <form>
                    <InputField
                        label='Your email or username'
                        placeholder='Enter email or username'
                        value={''}
                        setValue={() => { }}
                        type='text'
                        required={true}
                    />
                    
                    <InputField
                        label='Your password'
                        placeholder='Enter password'
                        value={''}
                        setValue={() => { }}
                        type='password'
                        required={true}
                    />

                    <Button label="Login" type="submit" rightAligned={true} onClick={handleLogin}/>

                    <Link to="/register" className='block mt-4 text-sm'>Not an user? Login</Link>
                </form>
            </FormLayout>
        </AuthLayout>
    )
}

export default LoginUI