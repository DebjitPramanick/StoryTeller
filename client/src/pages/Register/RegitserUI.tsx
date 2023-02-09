import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/FormFields/Button'
import InputField from '../../components/FormFields/InputField'
import AuthLayout from '../../layouts/AuthLayout'
import FormLayout from '../../layouts/FormLayout'

const RegitserUI: React.FC<any> = ({
    handleRegister,
    data,
    handleChangeData,
    loading
}) => {

    return (
        <AuthLayout>
            <FormLayout>
                <h1 className='text-xl font-bold mb-6'>Register</h1>
                <form>
                    <InputField
                        label='Your name'
                        placeholder='Enter name'
                        value={data.name}
                        setValue={(val: string) => handleChangeData('name', val)}
                        type='text'
                        required={true}
                    />

                    <InputField
                        label='Your email'
                        placeholder='Enter email'
                        value={data.email}
                        setValue={(val: string) => handleChangeData('email', val)}
                        type='email'
                        required={true}
                    />


                    <InputField
                        label='Your username'
                        placeholder='Enter username'
                        value={data.username}
                        setValue={(val: string) => handleChangeData('username', val)}
                        type='text'
                        required={true}
                    />


                    <InputField
                        label='Your password'
                        placeholder='Enter password'
                        value={data.password}
                        setValue={(val: string) => handleChangeData('password', val)}
                        type='password'
                        required={true}
                    />

                    <Button label="Register" type="submit" rightAligned={true} onClick={(e: any) => handleRegister(e)}
                    loading={loading}/>

                    <Link to="/login" className='block mt-4 text-sm'>Already an user? Login</Link>
                </form>
            </FormLayout>
        </AuthLayout>
    )
}

export default RegitserUI