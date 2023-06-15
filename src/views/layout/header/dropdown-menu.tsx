import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { UserState } from '../../../store/types'
import { CompanyType } from '../../../constants/base'
import { useEffect } from 'react'

const DropDownMenu = () => {
    const { user } = useSelector<any, UserState>((state) => state.user)

    useEffect(() => {
    }, [user])

    return (
        <>
            <div className="bg-primary px-5 py-10 rounded-b-md">
                <div className="relative text-white px-10 py-5 my-5 flex items-center">
                    <div className="w-full h-full absolute top-0 left-0 bg-white opacity-20 rounded-sm"></div>
                    <span><img src="/assets/svg/menu-dashboard.svg" alt="dashboard" /></span>
                    <span className="text-12 font-bold leading-[18px] ml-15">Dashboard</span>
                </div>
                <Link to="/">
                    <div className="hover:opacity-70 relative text-white px-10 py-5 my-5 flex items-center">
                        <span className="text-12 font-bold leading-[18px] ml-30">Certification Report</span>
                    </div>
                </Link>

                <div className="relative text-white px-10 py-5 my-5 flex items-center">
                    <div className="w-full h-full absolute top-0 left-0 bg-white opacity-20 rounded-sm"></div>
                    <span><img src="/assets/svg/menu-certification.svg" alt="certification" /></span>
                    <span className="text-12 font-bold leading-[18px] ml-15">Certification</span>
                </div>
                <Link to="/certificate">
                    <div className="hover:opacity-70 relative text-white px-10 py-5 my-5 flex items-center">
                        <span className="text-12 font-bold leading-[18px] ml-30">Certificates</span>
                    </div>
                </Link>
                {user.companyType === CompanyType.Contractor && <Link to="/certificate/request">
                    <div className="hover:opacity-70 relative text-white px-10 py-5 my-5 flex items-center">
                        <span className="text-12 font-bold leading-[18px] ml-30">Request a Certificate</span>
                    </div>
                </Link>}

                <div className="relative text-white px-10 py-5 my-5 flex items-center">
                    <div className="w-full h-full absolute top-0 left-0 bg-white opacity-20 rounded-sm"></div>
                    <span><img src="/assets/svg/menu-iot.svg" alt="certification" /></span>
                    <span className="text-12 font-bold leading-[18px] ml-15">IoT on Blockchain</span>
                </div>
                <Link to="/iot">
                    <div className="hover:opacity-70 relative text-white px-10 py-5 my-5 flex items-center">
                        <span className="text-12 font-bold leading-[18px] ml-30">Dashboard</span>
                    </div>
                </Link>
                <Link to="/iot/simulator">
                    <div className="hover:opacity-70 relative text-white px-10 py-5 my-5 flex items-center">
                        <span className="text-12 font-bold leading-[18px] ml-30">Simulator</span>
                    </div>
                </Link>

                <div className="relative text-white px-10 py-5 my-5 flex items-center">
                    <div className="w-full h-full absolute top-0 left-0 bg-white opacity-20 rounded-sm"></div>
                    <span><img src="/assets/svg/menu-coldchain.svg" alt="certification" /></span>
                    <span className="text-12 font-bold leading-[18px] ml-15">Coldchain</span>
                </div>
                <Link to="/coldchain">
                    <div className="hover:opacity-70 relative text-white px-10 py-5 my-5 flex items-center">
                        <span className="text-12 font-bold leading-[18px] ml-30">Dashboard</span>
                    </div>
                </Link>
                <Link to="/coldchain/geolocation">
                    <div className="hover:opacity-70 relative text-white px-10 py-5 my-5 flex items-center">
                        <span className="text-12 font-bold leading-[18px] ml-30">Geolocation</span>
                    </div>
                </Link>

                <div className="relative text-white px-10 py-5 my-5 flex items-center">
                    <div className="w-full h-full absolute top-0 left-0 bg-white opacity-20 rounded-sm"></div>
                    <span><img src="/assets/svg/menu-coldchain.svg" alt="certification" /></span>
                    <span className="text-12 font-bold leading-[18px] ml-15">Seal Document</span>
                </div>

                <Link to="/seal-document">
                    <div className="hover:opacity-70 relative text-white px-10 py-5 my-5 flex items-center">
                        <span className="text-12 font-bold leading-[18px] ml-30">Mint Document</span>
                    </div>
                </Link>
                

                {user.companyType === CompanyType.Admin && <Link to="/user-list">
                    <div className="hover:opacity-70 relative text-white px-10 py-5 my-5 flex items-center">
                        <div className="w-full h-full absolute top-0 left-0 bg-white opacity-20 rounded-sm"></div>
                        <span><img src="/assets/svg/menu-coldchain.svg" alt="certification" /></span>
                        <span className="text-12 font-bold leading-[18px] ml-15">Admin Dashboard</span>
                    </div>
                </Link>}
                {user.companyType === CompanyType.Admin && <Link to="/user-list">
                    <div className="hover:opacity-70 relative text-white px-10 py-5 my-5 flex items-center">
                        <span className="text-12 font-bold leading-[18px] ml-30">Users</span>
                    </div>
                </Link>}
                {user.companyType === CompanyType.Admin && <Link to="/company-list">
                    <div className="hover:opacity-70 relative text-white px-10 py-5 my-5 flex items-center">
                        <span className="text-12 font-bold leading-[18px] ml-30">Companies</span>
                    </div>
                </Link>}

                <div className="relative text-white px-10 py-5 my-5 flex items-center">
                    <div className="w-full h-full absolute top-0 left-0 bg-white opacity-20 rounded-sm"></div>
                    <span><img src="/assets/svg/user.svg" alt="certification" /></span>
                    <span className="text-12 font-bold leading-[18px] ml-15">Profile</span>
                </div>
                <Link to="/account-setting">
                    <div className="hover:opacity-70 relative text-white px-10 py-5 my-5 flex items-center">
                        <span className="text-12 font-bold leading-[18px] ml-30">Account Setting</span>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default DropDownMenu