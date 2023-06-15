import { useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import { useToasts } from "react-toast-notifications"
import { Pagination, Table } from 'rsuite';
import DatePicker from 'rsuite/DatePicker';

import stateCounter, { getCertificateBgColor, getSortData } from "../../../utils"
import BreadCrumbs from "../../../components/common/bread-crumbs"
import MainPageLayout from "../../layout/main-layout"
import { setLoading } from "../../../store/app"
import { useEffect, useMemo, useState } from "react"
import { getTasks } from "../../../api/certificate"

type FilterType = {
    taskId: string,
    description: string,
    updatedAt: Date,
    authorityCompany: string,
    requestedBy: string,
    contractorCompany: string,
    contractorUser: string
}
const initialFilter: FilterType = {
    taskId: '',
    description: '',
    updatedAt: null as any,
    authorityCompany: '',
    requestedBy: '',
    contractorCompany: '',
    contractorUser: ''
}
const RequestedCertificates = () => {
    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const [allTasks, setAllTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [openSearch, setOpenSearch] = useState(false);


    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState<FilterType>(initialFilter);
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();

    useEffect(() => {
        getAllTasks();
    }, [])


    useEffect(() => {
        setPage(1);
    }, [filteredTasks])

    const getAllTasks = () => {
        dispatch(setLoading(true));
        getTasks({})
            .then(resp => {
                dispatch(setLoading(false));
                setAllTasks(resp);
                searchTasks(resp, filter);
            })
            .catch(err => {
                dispatch(setLoading(false));
                addToast('Server Error', {appearance: "error", autoDismiss: true});
            })
    }

    

    const handleFilterValueChange = (prop: any, value: any) => {
        setFilter((prevState: any) => ({ ...prevState, [prop]: value }));
    }

    const handleSearch = () => {
        console.log('filter: ', filter);
        searchTasks(allTasks, filter);
    }

    const searchTasks = (tasks: any, query: any) => {
        const resp = tasks.filter((task: any) => {
            for (let key in query) {
                if (key !== 'updatedAt' && query[key]) {
                    if (!task[key] || task[key].toLowerCase().indexOf(query[key].toLowerCase()) === -1 ) {
                        return false;
                    }
                } else if (key === 'updatedAt' && query[key]) {
                    
                }
            }

            return true;
        })

        console.log('filtered list: ', resp);

        setFilteredTasks(resp);
    }

    const handleReset = () => {
        setFilter(initialFilter);
        searchTasks(allTasks, {});
    }    

    const getData = () => {
        console.log('all docs: ', filteredTasks);
        const sortData: any = getSortData(filteredTasks, sortColumn, sortType);
        console.log('all docs: ', sortData);
        return sortData.filter((v: any, i: any) => {
            const start = limit * (page - 1);
            const end = start + limit;
            return i >= start && i < end;
        });
    } 

    const handleChangeLimit = (dataKey: any) => {
        setPage(1);
        setLimit(dataKey);
    };

    const handleSortColumn = (sortColumn: any, sortType: any) => {
        console.log('sort column: ', sortColumn);
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };

    return (
        <MainPageLayout>
            <BreadCrumbs menus={['Home', 'Certification', 'Requested Certificates']}/>

            <div className="container mx-auto">
                <div className="bg-white rounded-lg px-30 py-20 mb-20">
                    <div className="flex items-center justify-between">
                        <p className="text-primary text-16 font-bold leading-[18px]">Request List</p>
                        {!openSearch && <button className="btn" onClick={() => setOpenSearch(!openSearch)}>+</button>}
                    </div>
                    

                    {openSearch && <div className="mt-20 ">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-15 md:gap-20 lg:gap-25">
                            <div>
                                <input type="text" className="input" placeholder="Enter task ID"
                                    value={filter.taskId}
                                    onChange={(e) => handleFilterValueChange('taskId', e.target.value)}
                                />
                            </div>
                            <div>
                                <input type="text" className="input" placeholder="Enter Description" 
                                    value={filter.description}
                                    onChange={(e) => handleFilterValueChange('description', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-15 grid md:flex md:flex-wrap lg:grid grid-cols-1 md:grid-cols-none lg:grid-cols-5 gap-15 md:gap-0 lg:gap-25">
                            <div className="md:w-1/3 lg:w-full md:pr-10 lg:pr-0">
                                <DatePicker size="md" className="w-[100%] custom" placeholder="Updated At"  
                                    value={filter.updatedAt}
                                    onChange={(value, e) => handleFilterValueChange("updatedAt", value)}
                                />
                            </div>
                            <div className="md:w-1/3 lg:w-full md:px-10 lg:px-0">
                                <input type="text" className="input" placeholder="Enter Authority" 
                                    value={filter.authorityCompany}
                                    onChange={(e) => handleFilterValueChange('authorityCompany', e.target.value)}
                                />
                            </div>
                            <div className="md:w-1/3 lg:w-full md:pl-10 lg:pl-0">
                                <input type="text" className="input" placeholder="Requested by" 
                                    value={filter.requestedBy}
                                    onChange={(e) => handleFilterValueChange('requestedBy', e.target.value)}
                                />
                            </div>
                            <div className="md:w-1/2 lg:w-full md:pr-10 lg:pr-0 md:pt-20 lg:pt-0">
                                <input type="text" className="input" placeholder="Contractor" 
                                    value={filter.contractorCompany}
                                    onChange={(e) => handleFilterValueChange('contractorCompany', e.target.value)}
                                />
                            </div>
                            <div className="md:w-1/2 lg:w-full md:pl-10 lg:pr-0 md:pt-20 lg:pt-0">
                                <input type="text" className="input" placeholder="Contractor’s User" 
                                    value={filter.contractorUser}
                                    onChange={(e) => handleFilterValueChange('contractorUser', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-20">
                            <button className="btn btn-filled mr-10" onClick={handleSearch}>Search</button>
                            <button className="btn mr-10" onClick={handleReset}>Reset</button>
                            <button className="btn" onClick={() => setOpenSearch(!openSearch)}>-</button>
                        </div>
                    </div>}

                    <div className="mt-30 overflow-auto">
                        <Table 
                            autoHeight data={getData()} 
                            wordWrap="break-word" 
                            bordered 
                            cellBordered
                            sortColumn={sortColumn}
                            sortType={sortType}
                            onSortColumn={handleSortColumn}
                        >

                            <Table.Column width={150} fixed verticalAlign="middle" >
                                <Table.HeaderCell className="text-primary text-[13px] bg-primary">Status</Table.HeaderCell>
                                <Table.Cell>
                                    {(rowData) => {
                                        return (
                                            <div className="flex items-center">
                                                <p className={"w-full text-center font-bold rounded-sm text-white uppercase px-10 py-5 text-[11px] " + getCertificateBgColor(rowData.state)}>{rowData.state}</p>
                                            </div>
                                        )
                                    }}
                                </Table.Cell>
                            </Table.Column>

                            <Table.Column width={230} fixed verticalAlign="middle" sortable>
                                <Table.HeaderCell className="text-primary text-[13px]">Task Id</Table.HeaderCell>
                                <Table.Cell dataKey="taskId">
                                    {(rowData) => {
                                        return (
                                            <Link to={'/certificate/approve-request/' + rowData.taskId}>{rowData.taskId}</Link>
                                        )
                                    }}
                                </Table.Cell>
                            </Table.Column>

                            <Table.Column width={100}  verticalAlign="middle" sortable>
                                <Table.HeaderCell className="text-primary text-[13px]">Type</Table.HeaderCell>
                                <Table.Cell dataKey="type" className="text-primary text-[13px]"/>
                            </Table.Column>

                            <Table.Column width={180}  verticalAlign="middle" sortable>
                                <Table.HeaderCell className="text-primary text-[13px]">Assigned To</Table.HeaderCell>
                                <Table.Cell dataKey="assignedTo" className="text-primary text-[13px]" />
                            </Table.Column>

                            

                            <Table.Column width={180}  verticalAlign="middle" sortable>
                                <Table.HeaderCell className="text-primary text-[13px]">Document Name</Table.HeaderCell>
                                <Table.Cell dataKey="documentName" className="text-primary text-[13px]" />
                            </Table.Column>

                            <Table.Column verticalAlign="middle">
                                <Table.HeaderCell className="text-primary text-[13px]">Assigned</Table.HeaderCell>
                                <Table.Cell>
                                    {(rowData) => {
                                        const status = stateCounter(rowData);
                                        return (
                                            <span className="text-success">{status.assign}</span>
                                        )
                                    }}
                                </Table.Cell>
                            </Table.Column>

                            <Table.Column  verticalAlign="middle">
                                <Table.HeaderCell className="text-primary text-[13px]">Requested</Table.HeaderCell>
                                <Table.Cell>
                                    {(rowData) => {
                                        const status = stateCounter(rowData);
                                        return (
                                            <span className="text-danger">{status.request}</span>
                                        )
                                    }}
                                </Table.Cell>
                            </Table.Column>

                            <Table.Column width={450}  verticalAlign="middle" sortable>
                                <Table.HeaderCell className="text-primary text-[13px]">Description</Table.HeaderCell>
                                <Table.Cell dataKey="description" className="text-primary text-[13px]"/>
                            </Table.Column>

                            
                            {/* <Table.Column width={180}  verticalAlign="middle" sortable>
                                <Table.HeaderCell className="text-primary text-[13px]">Contractor Company</Table.HeaderCell>
                                <Table.Cell dataKey="contractorCompany" className="text-primary text-[13px]" />
                            </Table.Column>

                            <Table.Column width={180}  verticalAlign="middle" sortable>
                                <Table.HeaderCell className="text-primary text-[13px]">Contractor User</Table.HeaderCell>
                                <Table.Cell dataKey="contractorUser" className="text-primary text-[13px]" />
                            </Table.Column> */}

                        

                        </Table>
                    
                    </div>
                    
                    <div style={{ padding: 20 }}>
                        <Pagination
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            maxButtons={5}
                            size="xs"
                            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                            total={filteredTasks.length}
                            limitOptions={[5, 10, 20, 50]}
                            limit={limit}
                            activePage={page}
                            onChangePage={setPage}
                            onChangeLimit={handleChangeLimit}
                        />
                    </div>

                    {/* <div className="mt-20 flex justify-center">
                        <button className="btn">LOAD MORE</button>
                    </div> */}
                </div>
            </div>
        </MainPageLayout>
    )
}

export default RequestedCertificates