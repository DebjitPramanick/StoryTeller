import React from 'react'
import InputField from '../../components/FormFields/InputField'
import AuthLayout from '../../layouts/AuthLayout'
import FormLayout from '../../layouts/FormLayout'

const RegitserUI = () => {
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


                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                type="checkbox" value=""
                                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300"
                                required />
                        </div>
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>
                    
                    <button type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                        Register
                    </button>
                </form>
            </FormLayout>
        </AuthLayout>
    )
}

export default RegitserUI