import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/FormFields/Button'
import InputField from '../../components/FormFields/InputField'
import AuthLayout from '../../layouts/AuthLayout'
import FormLayout from '../../layouts/FormLayout'

const RegitserUI = () => {

    const handleRegister = async() => {

    }

    return (
        <AuthLayout>
            <FormLayout>
                <h1 className='text-xl font-bold mb-6'>Register</h1>
                <form>
                    <InputField
                        label='Your name'
                        placeholder='Enter name'
                        value={''}
                        setValue={() => { }}
                        type='text'
                        required={true}
                    />

                    <InputField
                        label='Your email'
                        placeholder='Enter email'
                        value={''}
                        setValue={() => { }}
                        type='email'
                        required={true}
                    />


                    <InputField
                        label='Your username'
                        placeholder='Enter username'
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

                    <Button label="Register" type="submit" rightAligned={true} onClick={handleRegister}/>

                    <Link to="/login" className='block mt-4 text-sm'>Already an user? Login</Link>
                </form>
            </FormLayout>
        </AuthLayout>
    )
}

export default RegitserUI