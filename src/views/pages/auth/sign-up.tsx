import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCallback, useState } from "react"
import { useToasts } from "react-toast-notifications";

import { signIn, signUp } from '../../../api/auth'
import useAuth from '../../../hooks/useAuth'
import { setLoading } from '../../../store/app'
import { validateEmail } from '../../../utils'
import AuthPageLayout from '../../layout/auth-layout'
import { setUserData } from '../../../store/user';

export type SignupData = {
    email: string
    password: string,
    confirm_password: string
}

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { addToken } = useAuth()
    const { addToast } = useToasts();
    const [data, setData] = useState<SignupData>({
        email: '',
        password: '',
        confirm_password: ''
    })

    const [validations, setValidations] = useState<SignupData>({
        email: '',
        password: '',
        confirm_password: '',
    })

    const onChange = (type: string, value: string) => {
        setData((prevState) => ({ ...prevState, [type]: value }))
        setValidations((prevState) => ({ ...prevState, [type]: '' }))
    }

    const handleSignUp = useCallback(() => {
        console.log(data);
        if (data.email === '') {
            setValidations((prevState) => ({ ...prevState, email: 'empty' }))
        } else if (!validateEmail(data.email)) {
            setValidations((prevState) => ({ ...prevState, email: 'invalid' }))
        } else if (data.password === '') {
            setValidations((prevState) => ({ ...prevState, password: 'empty' }))
        } else if (data.confirm_password === '') {
            setValidations((prevState) => ({ ...prevState, confirm_password: 'empty' }))
        } else if (data.password !== data.confirm_password) {
            setValidations((prevState) => ({ ...prevState, confirm_password: 'not-match' }))
        } else {
            dispatch(setLoading(true))
            signUp(data)
                .then((res: any) => {
                    console.log(res);
                    dispatch(setLoading(false))
                    addToast("Registered successfully", {
                        appearance: "success",
                        autoDismiss: true,
                    });
                    navigate('/login');
                })
                .catch((err: any) => {
                    let message = "Register failed";
                    if (err && err.response && err.response.data && err.response.data.message) {
                        message = err.response.data.message;
                    }
                    addToast(message, {
                        appearance: "error",
                        autoDismiss: true,
                    });
                    dispatch(setLoading(false))
                })
        }
    }, [addToken, data, dispatch, navigate])

    return (
        <AuthPageLayout>
            <div className="max-w-420 mx-auto mt-100 mb-50 bg-white rounded-lg p-20">
                <div>
                    <label className="label">Email ID</label>
                    <input type="text" className="input" value={data.email} onChange={(e) => onChange('email', e.target.value)} />{!!validations.email ? (
                    <span className="text-10 leading-[16px] text-danger mt-5">
                        {validations.email === 'empty'
                        ? 'Please enter an email address.'
                        : validations.email === 'invalid'
                        ? 'Please enter a valid email address.'
                        : 'Email address incorrect. Please try again.'}
                    </span>
                    ) : null}
                </div>

                <div className="mt-20">
                    <label className="label">Password</label>
                    <input type="password" className="input" value={data.password} onChange={(e) => onChange('password', e.target.value)} />
                    {!!validations.password ? (
                    <span className="text-10 leading-[16px] text-danger mt-5">
                        {validations.password === 'empty' ? 'Please enter a password.' : 'Password incorrect. Please try again.'}
                    </span>
                    ) : null}
                </div>


                <div className="mt-20">
                    <label className="label">Confirm Password</label>
                    <input type="password" className="input" value={data.confirm_password} onChange={(e) => onChange('confirm_password', e.target.value)} />
                    {!!validations.confirm_password ? (
                    <span className="text-10 leading-[16px] text-danger mt-5">
                        {validations.password === 'empty' ? 'Please enter a confirm password.' : 'The passwords entered twice do not match!'}
                    </span>
                    ) : null}
                </div>

                <div className="mt-20">
                    <button className="btn btn-filled w-full" onClick={() => handleSignUp()}>SignUp</button>
                    <div className='mt-20 flex justify-center items-center'>
                        <span style={{color: '#5763e4'}}>Power by Blockchain and DLT technologies</span>
                    </div>
                    <div className='mt-20 flex justify-center items-center'>
                        
                        <div className='mr-20'>
                            <img src="/assets/image/near-logo.png" alt="near logo" className='h-[55px]'/>
                        </div>
                        <div className=''>
                            <img src="/assets/image/ipfs-logo.png" alt="ipfs logo" className='h-[60px]'/>
                        </div>
                    </div>
                    <div className="w-full h-30" />
                    <div className="flex justify-center px-10 text-14 leading-[18px]">
                        <span className="text-primary mr-5">Already have an account?</span>
                        <Link to="/login">
                            <span className="text-sf-rose-700 cursor-pointer hover:underline">Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthPageLayout>
    )
}

export default SignUp