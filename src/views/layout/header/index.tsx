import { useState } from 'react'

import DropDownMenu from './dropdown-menu'
import { deleteLocalStorageValue } from '../../../hooks/useLocalStorage'
import Dropdown from 'rsuite/Dropdown';
import ExitIcon from '@rsuite/icons/Exit';
import AdminIcon from '@rsuite/icons/Admin';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/types';
import { Link } from 'react-router-dom';

const userIcon = (props: any, ref: any) => {
    return (
      <div className='py-[10px] cursor-pointer' {...props} ref={ref}>
        <img src="/assets/svg/user.svg" alt="search" />
        <span></span>
      </div>
    );
  };
  

const Header = () => {
    const { user } = useSelector<any, UserState>((state) => state.user)
    const [openSubMenu, setOpenSubMenu] = useState<boolean>(false)
    const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false)


    const handleLogout = () => {
        deleteLocalStorageValue('token')
        document.location.href = '/login'
    }
    return (
        <>
            <div className="h-80 bg-primary">
                <div className="container h-full mx-auto flex justify-between">
                    <div className="h-full flex items-center">
                        <Link to="/"><img src="/assets/svg/logo.svg" alt="logo" /></Link>
                    </div>
                    <div className="h-full flex items-center md:hidden">
                        <div className="text-white mx-15 cursor-pointer h-full flex items-center">
                            <Dropdown renderToggle={userIcon} placement="bottomEnd">
                                <Dropdown.Item icon={<AdminIcon />}>{user.companyType ? user.companyType[0].toUpperCase() + user.companyType.substring(1) + ' User': 'User'}</Dropdown.Item>
                                <Dropdown.Item divider />
                                <Dropdown.Item icon={<ExitIcon />} onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown>
                        </div>
                        <div className="cursor-pointer" onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                            <img src="/assets/svg/mobile-menu.svg" alt="mobile menu" />
                        </div>
                        <div className={"z-10 delay ease-in-out absolute top-80 left-[-100%] h-full w-full bg-primary " + (openMobileMenu ? "left-to-right-exit-active" : "left-to-right-exit")}>
                            <DropDownMenu/>
                        </div>

                        
                    </div>

                    
                    <div className="h-full hidden md:flex items-center ">
                        <div className={"relative mr-15 cursor-pointer h-full flex items-center pr-15 pl-20 " + (openSubMenu ? "text-white bg-primary" : "text-primary bg-white")} onMouseOver={() => setOpenSubMenu(true)} onMouseLeave={() => setOpenSubMenu(false)}>
                            <div className="flex justify-between items-center">
                                <span>
                                    <img src={"/assets/svg/" + (openSubMenu ? "menu-product-white.svg" : "menu-product.svg")} alt="down-arrow" />
                                </span>
                                <span className="ml-15 mr-55 text-15 font-normal">Products</span>
                                <span>
                                    {openSubMenu && <img src="/assets/svg/up-arrow.svg" alt="up-arrow" />}
                                    {!openSubMenu && <img src="/assets/svg/down-arrow.svg" alt="down-arrow" />}
                                </span>
                            </div>
                            <div className="absolute top-full left-0 w-full z-10">
                                {openSubMenu ? <DropDownMenu/> : null}
                            </div>
                        </div>
                        <div className="text-white mx-15 cursor-pointer h-full flex items-center">
                            <img src="/assets/svg/question.svg" alt="question-mark" />
                        </div>
                        <div className="text-white mx-15 cursor-pointer h-full flex items-center">
                            <img src="/assets/svg/bell.svg" alt="bell" />
                        </div>
                        <div className="text-white mx-15 cursor-pointer h-full flex items-center">
                            <img src="/assets/svg/search.svg" alt="search" />
                        </div>
                        <div className="text-white mx-15  h-full flex items-center relative justify-center">
                            <Dropdown renderToggle={userIcon} placement="bottomStart">
                                <Dropdown.Item icon={<AdminIcon />}>{user.companyType ? user.companyType[0].toUpperCase() + user.companyType.substring(1) + ' User': 'User'}</Dropdown.Item>
                                <Dropdown.Item divider />
                                <Dropdown.Item icon={<ExitIcon />} onClick={handleLogout} className="min-w-[200px]">Logout</Dropdown.Item>
                            </Dropdown>
                            <span className='absolute bottom-[5px] text-[13px]'>{user.companyType ? user.companyType[0].toUpperCase() + user.companyType.substring(1) + '': ''}</span>
                        </div>
                        <div className="text-white ml-15 cursor-pointer underline h-full flex items-center">en</div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header