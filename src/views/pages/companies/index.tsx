import MainPageLayout from '../../layout/main-layout'
import BreadCrumbs from '../../../components/common/bread-crumbs'

const CompanyList = () => {
    const companies = [
        {
            type: 'Contractor',
            companyId: 'CPCC000100',
            name: 'Mario Rossi',
            email: 'info@chainplug.io',
            address: '1 New Street',
            createdAt: '2019-09-28 17:28',
            state: 'enabled',
        },
        {
            type: 'Contractor',
            companyId: 'CPCC000100',
            name: 'Mario Rossi',
            email: 'info@chainplug.io',
            address: '1 New Street',
            createdAt: '2019-09-28 17:28',
            state: 'enabled',
        },
        {
            type: 'Contractor',
            companyId: 'CPCC000100',
            name: 'Mario Rossi',
            email: 'info@chainplug.io',
            address: '1 New Street',
            createdAt: '2019-09-28 17:28',
            state: 'enabled',
        },
        {
            type: 'Contractor',
            companyId: 'CPCC000100',
            name: 'Mario Rossi',
            email: 'info@chainplug.io',
            address: '1 New Street',
            createdAt: '2019-09-28 17:28',
            state: 'enabled',
        },
    ]

    return (
        <MainPageLayout>
            <BreadCrumbs menus={['Home', 'Admin', 'Users / Companies List']}/>

            <div className="container mx-auto">
                <div className="bg-white rounded-lg px-30 py-10">
                    <p className="text-primary text-16 font-bold leading-[18px]">List of companies</p>
                </div>

                <div className="my-20 p-30 bg-white rounded-lg">
                <div className="md:flex items-center">
                        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-15">
                            <div>
                                <input type="text" className="input" placeholder="Company ID" />
                            </div>
                            <div>
                                <input type="text" className="input" placeholder="Name" />
                            </div>
                        </div>
                        <div className="mt-15 md:mt-0 md:ml-15">
                            <button className="btn btn-filled mr-10">Search</button>
                            <button className="btn mr-10">Reset</button>
                            <button className="btn mr-10">+</button>
                        </div>
                    </div>
                    <div className="mt-25 overflow-auto">
                        <table className="border border-light-100 w-full">
                            <thead className="text-primary border-b border-light-100 bg-primary bg-opacity-10">
                                <th className="px-15 py-10 border-r border-light-100 text-12 font-normal leading-[18px] min-w-140 max-w-140">
                                    <div className="flex items-start">
                                        <input type="checkbox" disabled className="mr-15" />
                                        <span>Type</span>
                                    </div>
                                </th>
                                <th className="px-15 py-10 border-r border-light-100 text-12 font-normal leading-[18px] min-w-150 max-w-150">
                                    <div className="flex items-center">
                                        <span>Company ID</span>
                                    </div>
                                </th>
                                <th className="px-15 py-10 border-r border-light-100 text-12 font-normal leading-[18px] min-w-125 max-w-125">
                                    <div className="flex items-center">
                                        <span>Name</span>
                                    </div>
                                </th>
                                <th className="px-15 py-10 border-r border-light-100 text-12 font-normal leading-[18px] min-w-175 max-w-175">
                                    <div className="flex items-center">
                                        <span>Email</span>
                                    </div>
                                </th>
                                <th className="px-15 py-10 border-r border-light-100 text-12 font-normal leading-[18px] min-w-150">
                                    <div className="flex items-center">
                                        <span>Address</span>
                                    </div>
                                </th>
                                <th className="px-15 py-10 border-r border-light-100 text-12 font-normal leading-[18px] min-w-150 max-w-150">
                                    <div className="flex items-center">
                                        <span>CreatedAt</span>
                                    </div>
                                </th>
                                <th className="px-15 py-10 text-12 font-normal leading-[18px] min-w-150 max-w-150">
                                    <div className="flex items-center">
                                        <span>State</span>
                                    </div>
                                </th>
                            </thead>
                            <tbody>
                                {companies.map((item, index) =>
                                    <tr key={index}>
                                        <td className="px-15 py-10 text-12 font-normal leading-[18px] text-danger border-r border-light-100">
                                            <div className="flex items-center">
                                                <input type="checkbox" className="mr-15" />
                                                <span className="text-primary">{item.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-15 py-10 text-12 font-normal leading-[18px] text-primary border-r border-light-100">{item.companyId}</td>
                                        <td className="px-15 py-10 text-12 font-normal leading-[18px] text-primary border-r border-light-100">{item.name}</td>
                                        <td className="px-15 py-10 text-12 font-normal leading-[18px] text-primary border-r border-light-100">{item.email}</td>
                                        <td className="px-15 py-10 text-12 font-normal leading-[18px] text-primary border-r border-light-100">{item.address}</td>
                                        <td className="px-15 py-10 text-12 font-normal leading-[18px] text-primary border-r border-light-100">{item.createdAt}</td>
                                        <td className="px-15 py-10 text-12 font-normal leading-[18px] text-primary">{item.state}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-20 flex justify-center">
                        <button className="btn w-full md:w-120">LOAD MORE</button>
                    </div>
                </div>
            </div>
        </MainPageLayout>
    )
}

export default CompanyList