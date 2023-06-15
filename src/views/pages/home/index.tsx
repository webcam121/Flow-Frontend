import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import { Table } from 'rsuite';

import BreadCrumbs from "../../../components/common/bread-crumbs"
import MainPageLayout from "../../layout/main-layout"
import { UserState } from '../../../store/types'

import { setLoading } from '../../../store/app'
import { getTasks } from '../../../api/certificate'
import stateCounter, { getCertificateBgColor } from '../../../utils';
import { Link } from 'react-router-dom'
import { CertificateStatus } from '../../../constants/base'

type IndicatorType = {
    request: number,
    request_average: number,
    progress: number,
    progress_average: number,
    expired: number,
    expired_average: number
}
const HomePage = () => {

    const { user } = useSelector<any, UserState>((state) => state.user)

    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const [allTasks, setAllTasks] = useState([]);
    const [indicator, setIndicator] = useState<IndicatorType>({
        request: 0,
        request_average: 0,
        progress: 0,
        progress_average: 0,
        expired: 0,
        expired_average: 0
    })
    const [requestTypeChart, setRequestTypeChart] = useState<any>();
    const [expiredTypeChart, setExpiredTypeChart] = useState<any>();

    useEffect(() => {
        getAllTasks();
    }, [])

    const getAllTasks = () => {
        dispatch(setLoading(true));
        getTasks({})
            .then(resp => {
                dispatch(setLoading(false));
                setAllTasks(resp);
            })
            .catch(err => {
                dispatch(setLoading(false));
                addToast('Server Error', {appearance: "error", autoDismiss: true});
            })
    }

    useEffect(() => {
        updateSummary();
    }, [allTasks])

    const updateSummary = () => {
        // update indicators
        const requestedTasks = allTasks.filter((task: any) => task.state == CertificateStatus.Requested);
        const progressTasks = allTasks.filter((task: any) => task.state == CertificateStatus.InProgress);
        const expiredTasks = allTasks.filter((task: any) => {
            const expiryTime = task.documentExpiryTime ? task.documentExpiryTime : null;
            if (expiryTime) {
                return new Date(expiryTime).getTime() < new Date().getTime();
            } else {
                return false;
            }
        });

        setIndicator({
            request: requestedTasks.length,
            request_average: Math.floor((requestedTasks.length / 12) * 100) / 100,
            progress: progressTasks.length,
            progress_average: Math.floor((progressTasks.length / 12) * 100) / 100,
            expired: expiredTasks.length,
            expired_average: Math.floor((expiredTasks.length / 12) * 100) / 100,
        })


        /// type chart of request certificate
        let total = requestedTasks.length;
        let type_9001 = (requestedTasks.filter((task: any) => task.type === '9001')).length;
        let type_iso_5000 = (requestedTasks.filter((task: any) => task.type === 'ISO 5000')).length;
        let type_iso_9000 = (requestedTasks.filter((task: any) => task.type === 'ISO 9000')).length;
        let type_unknown = requestedTasks.length - type_9001 - type_iso_5000 - type_iso_9000;

        let type_9001_percentage = Math.floor((type_9001 * 100 / total ) * 100) / 100;
        let type_iso_5000_percentage = Math.floor((type_iso_5000 * 100 / total ) * 100) / 100;
        let type_iso_9000_percentage = Math.floor((type_iso_9000 * 100 / total ) * 100) / 100;
        let type_unknown_percentage = Math.floor((type_unknown * 100 / total ) * 100) / 100;

        let series = [type_9001, type_iso_5000, type_iso_9000, type_unknown];
        let labels = [
            '9001 ' + type_9001_percentage + '%',
            'ISO 5001 ' + type_iso_5000_percentage + '%',
            'ISO 9000 ' + type_iso_9000_percentage + '%',
            'Other ' + type_unknown_percentage + '%'
        ]

        setRequestTypeChart({
            series: series,
            options: chartOption(labels)
        });


        /// type chart of expired certificate
        total = expiredTasks.length;
        type_9001 = (expiredTasks.filter((task: any) => task.type === '9001')).length;
        type_iso_5000 = (expiredTasks.filter((task: any) => task.type === 'ISO 5000')).length;
        type_iso_9000 = (expiredTasks.filter((task: any) => task.type === 'ISO 9000')).length;
        type_unknown = expiredTasks.length - type_9001 - type_iso_5000 - type_iso_9000;

        type_9001_percentage = Math.floor((type_9001 * 100 / total ) * 100) / 100;
        type_iso_5000_percentage = Math.floor((type_iso_5000 * 100 / total ) * 100) / 100;
        type_iso_9000_percentage = Math.floor((type_iso_9000 * 100 / total ) * 100) / 100;
        type_unknown_percentage = Math.floor((type_unknown * 100 / total ) * 100) / 100;

        series = [type_9001, type_iso_5000, type_iso_9000, type_unknown];
        labels = [
            '9001 ' + type_9001_percentage + '%',
            'ISO 5001 ' + type_iso_5000_percentage + '%',
            'ISO 9000 ' + type_iso_9000_percentage + '%',
            'Other ' + type_unknown_percentage + '%'
        ]

        setExpiredTypeChart({
            series: series,
            options: chartOption(labels)
        });


    }

    const chartOption = (labels: any) => {
        return {
            chart: {
                type: 'donut',
            },
            dataLabels: {
                enabled: false,
            },
            labels: labels,
            plotOptions: {
                pie: {
                    size: 20,
                    donut: {
                        size: '80%',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                offsetY: 35,
                                
                            },
                            value: {
                                show: true,
                                fontSize: '55px',
                                color: "#18058D",
                                offsetY: -10,
                            },
                            total: {
                                show: true,
                                color: "#18058D",
                                fontSize: "22px",
                                fontWeight: 900,
                            },
                            
                        }
                    }
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
    }

    // const chartValue = {
    //     series: [44, 55, 41],
    //     options: chartOption('')
    // }

    

    return (
        <MainPageLayout>
            <BreadCrumbs menus={['Home', 'Dashboard', 'Certificate\'s Report']}/>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                    <div className="rounded-lg bg-white text-primary px-25 pt-25 pb-10">
                        <div className="flex justify-between items-start">
                            <span className="text-16 font-bold leading-[24px]">My Certificates Request</span>
                            <div>
                                <img src="/assets/svg/user-card.svg" alt="card img" />
                            </div>
                        </div>
                        <div>
                            <span className="text-38 leading-[57px] font-normal">{indicator.request}</span>
                        </div>
                        <div>
                            <span className="text-12 font-normal leading-[18px]">Monthly Average # of Requests {indicator.request_average}</span>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white text-primary px-25 pt-25 pb-10">
                        <div className="flex justify-between items-start">
                            <span className="text-16 font-bold leading-[24px]">My Certificates In Progress</span>
                            <div>
                                <img src="/assets/svg/card-check.svg" alt="card img" />
                            </div>
                        </div>
                        <div>
                            <span className="text-38 leading-[57px] font-normal">{indicator.progress}</span>
                        </div>
                        <div>
                            <span className="text-12 font-normal leading-[18px]">Daily Average # of Approved Requests {indicator.progress_average}</span>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white text-primary px-25 pt-25 pb-10">
                        <div className="flex justify-between items-start">
                            <span className="text-16 font-bold leading-[24px]">My Expiring Certificates</span>
                            <div>
                                <img src="/assets/svg/user-card1.svg" alt="card img" />
                            </div>
                        </div>
                        <div>
                            <span className="text-38 leading-[57px] font-normal">{indicator.expired}</span>
                        </div>
                        <div>
                            <span className="text-12 font-normal leading-[18px]">Average # of Exprired Certificates {indicator.expired_average}</span>
                        </div>
                    </div>
                </div>

                {requestTypeChart && expiredTypeChart && <div className="mt-20 bg-white rounded-lg py-20 px-30 grid grid-cols-1 md:grid-cols-2">
                    <div className="text-primary border-0 mb-50 md:mb-0 md:pr-30 md:border-r-2 border-light-50">
                        <p className="text-16 font-bold leading-[24px]">Type of Requested Certificate</p>
                        <div className="mt-45">
                            <div className="flex justify-center md:block">
                                <Chart options={requestTypeChart.options as ApexOptions} series={requestTypeChart.series as ApexOptions['series']} type="donut" height={250} />
                            </div>
                        </div>
                    </div>

                    <div className="text-primary md:pl-30">
                        <p className="text-16 font-bold leading-[24px]">Type of Expired Certificate</p>
                        <div className="mt-45">
                            <div className="flex justify-center md:block">
                                <Chart options={expiredTypeChart.options as ApexOptions} series={expiredTypeChart.series as ApexOptions['series']} type="donut" height={250} />
                            </div>
                        </div>
                    </div>
                </div>}

                <div className="my-20 bg-white rounded-lg py-20 px-30">
                    <p className="text-16 text-primary leading-[24px] font-bold">Requested Certificates</p>
                    <div className="mt-20 overflow-auto">
                        {/* <table className="border border-light-100 w-full">
                            <thead className="text-primary border-b border-light-100 bg-primary bg-opacity-10">
                                <th className="px-35 py-10 border-r border-light-100 text-12 font-normal leading-[18px] min-w-220 max-w-220">
                                    <div className="flex items-center">
                                        <div className="mr-10">
                                            <img src="/assets/svg/union.svg" alt="requested since"/>
                                        </div>
                                        <span>Requested since</span>
                                    </div>
                                </th>
                                <th className="px-35 py-10 border-r border-light-100 text-12 font-normal leading-[18px] min-w-380">
                                    <div className="flex items-center">
                                        <div className="mr-10">
                                            <img src="/assets/svg/check.svg" alt="requested since"/>
                                        </div>
                                        <span>Assigned since</span>
                                    </div>
                                </th>
                                <th className="px-35 py-10 text-12 font-normal leading-[18px] max-w-390">
                                    <div className="flex items-center">
                                        <div className="mr-10">
                                            <img src="/assets/svg/double-circle.svg" alt="requested since"/>
                                        </div>
                                        <span>Task ID</span>
                                    </div>
                                </th>
                            </thead>
                            <tbody>
                                {allTasks.slice(0, 10).map((item: any, index) => {
                                    const status = stateCounter(item);
                                    return (
                                        <tr key={index}>
                                            <td className="px-15 py-10 text-12 font-normal leading-[18px] text-danger border-r border-light-100">{status.request}</td>
                                            <td className="px-15 py-10 text-12 font-normal leading-[18px] text-success border-r border-light-100">{status.assign}</td>
                                            <td className="px-15 py-10 text-12 font-normal leading-[18px] text-primary">
                                                <Link to={'/certificate/approve-request/' + item.taskId}>{item.taskId}</Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table> */}

                        <Table 
                            autoHeight data={allTasks.slice(0, 10)} 
                            wordWrap="break-word" 
                            bordered 
                            cellBordered
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

                            
                            {/* <Table.Column width={180}  verticalAlign="middle">
                                <Table.HeaderCell className="text-primary text-[13px]">Contractor Company</Table.HeaderCell>
                                <Table.Cell dataKey="contractorCompany" className="text-primary text-[13px]" />
                            </Table.Column>

                            <Table.Column width={180}  verticalAlign="middle">
                                <Table.HeaderCell className="text-primary text-[13px]">Contractor User</Table.HeaderCell>
                                <Table.Cell dataKey="contractorUser" className="text-primary text-[13px]" />
                            </Table.Column> */}

                        

                        </Table>
                    </div>

                    <div className="mt-20 flex justify-center">
                        <Link to="/certificate"><button className="btn">See MORE</button></Link>
                    </div>
                </div>
            </div>
        </MainPageLayout>
    )
}

export default HomePage