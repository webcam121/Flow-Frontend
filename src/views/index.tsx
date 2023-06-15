import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import SignIn from './pages/auth/sign-in'
import { AppState } from '../store/types'
import Loader from '../components/loader'
import HomePage from './pages/home'
import UserList from './pages/users'
import Simulator from './pages/iot/simulator'
import Geolocation from './pages/coldchain/geolocation'
import CompanyList from './pages/companies'
import IotDashboard from './pages/iot'
import SealDocument from './pages/sealdoc'
import AccountSetting from './pages/account-setting.tsx'
import ApproveRequest from './pages/certificate/approve-request'
import AssetManagement from './pages/iot/asset-management'
import ColdChainDashboard from './pages/coldchain'
import RequestedCertificates from './pages/certificate'
import { useEffect } from 'react';
import { UserData } from '../constants/base';
import { setLoading } from '../store/app';
import { getMe } from '../api/user';
import useAuth from '../hooks/useAuth';
import { setUserData } from '../store/user';
import CertificateRequest from './pages/certificate/request';
import SignUp from './pages/auth/sign-up';
import Verify from './pages/auth/verify';

function View() {


    const { loading } = useSelector<any, AppState>((state) => state.app)
    const { token } = useAuth()

    const dispatch = useDispatch()

    useEffect(() => {
        if (token) {
            getMe().then((res: UserData) => {
                dispatch(setUserData(res));
                dispatch(setLoading(false))
            })
            .catch((err: any) => {
            })
        }
        
    }, [token])

    return (
        <>
            <header>
                <title>Flow Frontend</title>
            </header>
            <div className="bg-light-50 flex flex-col min-h-[100vh]">
                <Routes>
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/verification" element={<Verify />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/certificate" element={<RequestedCertificates />} />
                    <Route path="/certificate/request" element={<CertificateRequest />} />
                    <Route path="/iot" element={<IotDashboard />} />
                    <Route path="/iot/simulator" element={<Simulator />} />
                    <Route path="/asset-management" element={<AssetManagement />} />
                    <Route path="/coldchain" element={<ColdChainDashboard />} />
                    <Route path="/coldchain/geolocation" element={<Geolocation />} />
                    <Route path="/certificate/approve-request/:id" element={<ApproveRequest />} />
                    <Route path="/user-list" element={<UserList />} />
                    <Route path="/company-list" element={<CompanyList />} />
                    <Route path="/account-setting" element={<AccountSetting />} />
                    <Route path="/seal-document" element={<SealDocument />} />
                </Routes>

            </div>

            {loading ? <Loader /> : null}
        </>
    );
}

export default View;
