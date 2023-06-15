import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from "react"

import AuthPageLayout from '../../layout/auth-layout'
import { verifyEmail } from '../../../api/auth'

export type VerifyData = {
    email: string
    key: string
}

const Verify = () => {
    const [verified, setVerified] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const {search} = useLocation();
    
    useEffect(() => {
        const searchParams = new URLSearchParams(search);
        const email = searchParams.get('email');
        const key = searchParams.get('key');

        if (email && key) {
            verifyEmail({email: email, key: key})
                .then((res: any) => {
                    console.log(res);
                    setLoaded(true);
                    setVerified(true);
                })
                .catch((err: any) => {
                    setLoaded(true);        
                })
        } else {
            setLoaded(true);
        }
    }, [])

    return (
        <AuthPageLayout>
            <div className="mx-auto mt-100 mb-50 text-center">
                { loaded && verified && <div>
                    <span className='text-success text-[24px]'>You verified your email successfully</span>
                    <div className='mt-[30px]'>
                        <span className="text-primary mr-5">Click </span>
                        <Link to="/login">
                            <span className="text-sf-rose-700 cursor-pointer hover:underline">Here</span>
                        </Link>
                        <span className="text-primary mr-5"> to Login</span>
                    </div>
                </div> }
                { loaded && !verified && <div>
                    <span className='text-danger text-[24px]'>Email Verification Failed</span>
                </div> }
            </div>
        </AuthPageLayout>
    )
}

export default Verify