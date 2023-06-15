import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import MainPageLayout from '../../layout/main-layout'
import BreadCrumbs from '../../../components/common/bread-crumbs'

const AccountSetting = () => {
    return (
        <MainPageLayout>
            <BreadCrumbs menus={['Home', 'Admin', 'Users / Consortium List']}/>

            <div className="container mx-auto">
                <div className="bg-white rounded-lg px-30 py-10 flex items-center">
                    <div className="mr-10">
                        <img src="/assets/svg/user-active.svg" alt="search" />
                    </div>
                    <span className="text-primary text-16 font-bold leading-[18px]">Account</span>
                </div>

                <div className="my-30">
                    <Tabs>
                        <TabList>
                            <Tab>Basic Settings</Tab>
                            <Tab>Reset Password</Tab>
                            <Tab>New Message Notification</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="lg:px-180 py-20 md:py-50 lg:py-80">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-15">
                                    <div>
                                        <label className="label">Name</label>
                                        <input type="text" className="input" />
                                    </div>
                                    <div>
                                        <label className="label">Surname</label>
                                        <input type="text" className="input" />
                                    </div>
                                    <div>
                                        <label className="label">Email</label>
                                        <input type="text" className="input" />
                                    </div>
                                </div>
                                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-15">
                                    <div>
                                        <label className="label">Company ID</label>
                                        <input type="text" className="input" />
                                    </div>
                                    <div>
                                        <label className="label">Phone Number</label>
                                        <input type="text" className="input" />
                                    </div>
                                </div>
                                <div className="mt-20">
                                    <button className="btn btn-filled w-full">Save</button>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 2</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 3</h2>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </MainPageLayout>
    )
}

export default AccountSetting