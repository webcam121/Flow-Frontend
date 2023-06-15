import { useDispatch } from "react-redux"
import { useToasts } from "react-toast-notifications"
import { useEffect, useState } from "react"
import { Pagination, Table } from 'rsuite';

import MainPageLayout from "../../layout/main-layout"
import BreadCrumbs from "../../../components/common/bread-crumbs"
import { setLoading } from "../../../store/app"
import { getColdchainEvents } from "../../../api/iot"
import { getDateTimeString, getIotBgColorAndText, getSortData } from "../../../utils"

type FilterType = {
    sensor: string
}
type IndicatorType = {
    sensors: number,
    critical_sensors: number,
    critical_events: number,
}
const ColdChainDashboard = () => {
    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const [iotList, setIotList] = useState([]);
    const [indicator, setIndicator] = useState<IndicatorType>({
        sensors: 0,
        critical_sensors: 0,
        critical_events: 0,
    })

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();

    const [filter, setFilter] = useState<FilterType>({
        sensor: '',
    })

    const handleFilterChange = (prop: any, value: any) => {
        setFilter((prevState) => ({ ...prevState, [prop]: value }));
    };

    useEffect(() => {
        handleSearch({sensor: ''});
    }, [])

    const handleSearch = (query: any = null) => {
        dispatch(setLoading(true));
        getColdchainEvents(query ? query: filter)
            .then(resp => {
                dispatch(setLoading(false));
                console.log('iot events: ', resp);
                setIotList(resp);
            })
            .catch(err => {
                dispatch(setLoading(false));
                addToast('Server Error', {appearance: "error", autoDismiss: true});
            })
    }

    const handleReset = () => {
        setFilter({sensor: ''})
        handleSearch({sensor: ''})
    }

    const getData = () => {
        console.log('all docs: ', iotList);
        const sortData: any = getSortData(iotList, sortColumn, sortType);
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

    useEffect(() => {
        updateSummary();
    }, [iotList])

    const updateSummary = () => {
        // update indicators
        let sensorIdList = [];
        let sensorList = [];

        for(var i = 0; i < iotList.length; i++){
            let sensor: any = iotList[i];
            
            if(sensorIdList.indexOf(sensor.idSens) > -1) continue;
            sensorIdList.push(sensor.idSens);

            sensorList.push(sensor);
        }

        let criticalSensorList = sensorList.filter((sensor: any) => sensor.criticality > 7 && sensor.criticality <=10);
        let critical_events = iotList.filter((sensor: any) => sensor.criticality > 7 && sensor.criticality <=10);

        setIndicator({
            sensors: sensorList.length,
            critical_sensors: criticalSensorList.length,
            critical_events: critical_events.length
        })
    }


    return (
        <MainPageLayout>
            <BreadCrumbs menus={['Home', 'Iot on Blockchain', 'Iot Dashboard']}/>

            <div className="container mx-auto">
                <div className="bg-white rounded-lg px-30 py-10">
                    <p className="text-primary text-16 font-bold leading-[18px]">Coldchain Dashboard</p>
                </div>

                <div className="mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                        <div className="rounded-lg bg-white text-primary px-25 pt-25 pb-10">
                            <div className="flex justify-between items-start">
                                <span className="text-16 font-bold leading-[24px]">Number of Critical Sensors</span>
                                <div><img src="/assets/svg/target-with-light.svg" alt="critical sensor img"/></div>
                            </div>
                            <div>
                                <span className="text-38 leading-[57px] font-normal">{indicator.critical_sensors}</span>
                            </div>
                            <div>
                                <span className="text-12 font-normal leading-[18px]">chains.subtitle.timestamp</span>
                            </div>
                        </div>
                        <div className="rounded-lg bg-white text-primary px-25 pt-25 pb-10">
                            <div className="flex justify-between items-start">
                                <span className="text-16 font-bold leading-[24px]">Number of Sensors</span>
                                <div><img src="/assets/svg/target.svg" alt="sensor img"/></div>
                            </div>
                            <div>
                                <span className="text-38 leading-[57px] font-normal">{indicator.sensors}</span>
                            </div>
                            <div>
                                <span className="text-12 font-normal leading-[18px]">chains.subtitle.timestamp</span>
                            </div>
                        </div>
                        <div className="rounded-lg bg-white text-primary px-25 pt-25 pb-10">
                            <div className="flex justify-between items-start">
                                <span className="text-16 font-bold leading-[24px]">Number of critical Events</span>
                                <div><img src="/assets/svg/rec-with-spin.svg" alt="critical event img"/></div>
                            </div>
                            <div>
                                <span className="text-38 leading-[57px] font-normal">{indicator.critical_events}</span>
                            </div>
                            <div>
                                <span className="text-12 font-normal leading-[18px]">chains.subtitle.timestamp</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-30 my-20">
                    <div className="md:flex items-center">
                        <div className="flex-grow grid grid-cols-1 md:grid-cols-1 gap-15">
                            <div>
                                <input type="text" className="input" placeholder="Enter Sensor" onChange={(e) => handleFilterChange("sensor", e.target.value)} value={filter.sensor}/>
                            </div>
                            
                        </div>
                        <div className="mt-15 md:mt-0 md:ml-15">
                            <button className="btn btn-filled mr-10" onClick={(e) => handleSearch()}>Search</button>
                            <button className="btn mr-10" onClick={handleReset}>Reset</button>
                        </div>
                    </div>
                    <div className="mt-25 overflow-auto">
                        <Table 
                            autoHeight data={getData()} wordWrap="break-word" bordered cellBordered
                            sortColumn={sortColumn}
                            sortType={sortType}
                            onSortColumn={handleSortColumn}
                        >

                            <Table.Column width={130} fixed verticalAlign="middle" sortable>
                                <Table.HeaderCell className="text-primary text-[13px] bg-primary">Criticalitly</Table.HeaderCell>
                                <Table.Cell dataKey="criticality">
                                    {(rowData) => {
                                        return (
                                            <div className="flex items-center">
                                                <p className={"w-full text-center rounded-sm text-white uppercase px-15 py-5 " + getIotBgColorAndText(rowData.criticality)['bgClassName']}>{getIotBgColorAndText(rowData.criticality)['text']}</p>
                                            </div>
                                        )
                                    }}
                                </Table.Cell>
                            </Table.Column>

                            <Table.Column width={130} fixed verticalAlign="middle" sortable>
                                <Table.HeaderCell className="text-primary text-[13px] bg-primary text-center">Date</Table.HeaderCell>
                                <Table.Cell dataKey="createdAt">
                                    {(rowData) => {
                                        const dateTimeStr = rowData.createdAt ? getDateTimeString(new Date(rowData.createdAt)) : "";
                                        return (
                                            <div className="flex items-center text-center justify-center">
                                                <span className="text-primary text-[13px]">{dateTimeStr}</span>
                                            </div>
                                        )
                                    }}
                                </Table.Cell>
                            </Table.Column>

                            <Table.Column width={140} fixed verticalAlign="middle" sortable>
                                <Table.HeaderCell className="text-primary text-[13px] bg-primary text-center">Event ID</Table.HeaderCell>
                                <Table.Cell dataKey="idEvent" className="text-primary text-[13px] text-center" />
                            </Table.Column>

                            <Table.Column width={160} fixed verticalAlign="middle" sortable >
                                <Table.HeaderCell className="text-primary text-[13px]">Vendor</Table.HeaderCell>
                                <Table.Cell dataKey="vendor" className="text-primary text-[13px]" />
                            </Table.Column>

                            <Table.Column width={160} fixed verticalAlign="middle" sortable>
                                <Table.HeaderCell className="text-primary text-[13px] bg-primary">Sensor ID</Table.HeaderCell>
                                <Table.Cell dataKey="idSens" className="text-primary text-[13px]" />
                            </Table.Column>

                            <Table.Column width={160}  verticalAlign="middle" sortable>
                                <Table.HeaderCell className="text-primary text-[13px]">Buffer</Table.HeaderCell>
                                <Table.Cell dataKey="buffer" className="text-primary text-[13px]" />
                            </Table.Column>

                            <Table.Column flexGrow={1}  verticalAlign="middle">
                                <Table.HeaderCell className="text-primary text-[13px]">Coordinates</Table.HeaderCell>
                                <Table.Cell>
                                    {(rowData) => {
                                        return (
                                            <div className="text-primary text-[13px]">{rowData.coordinateLat}, {rowData.coordinateLong}</div>
                                        )
                                    }}
                                </Table.Cell>
                            </Table.Column>

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
                            total={iotList.length}
                            limitOptions={[5, 10, 20, 50]}
                            limit={limit}
                            activePage={page}
                            onChangePage={setPage}
                            onChangeLimit={handleChangeLimit}
                        />
                    </div>

                    {/* <div className="mt-20 flex justify-center">
                        <button className="btn w-full md:w-120">LOAD MORE</button>
                    </div> */}
                </div>
            </div>
        </MainPageLayout>
    )
}

export default ColdChainDashboard