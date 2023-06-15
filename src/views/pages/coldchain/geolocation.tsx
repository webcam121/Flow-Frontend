import { useEffect, useRef, useState } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
import { Pagination, Table } from 'rsuite';
import { useDispatch } from 'react-redux'
import { useToasts } from 'react-toast-notifications'

import MainPageLayout from '../../layout/main-layout'
import BreadCrumbs from '../../../components/common/bread-crumbs'
import { setLoading } from '../../../store/app'
import { getColdchainEvents } from '../../../api/iot'
import { config } from '../../../config'
import { getSortData } from '../../../utils';

const googleMapConfig = {
    center: {
        lat: 43.5486888, 
        lng: 11.2073966
    },
    zoom: 9
}

const Map = ({ center, zoom, markers, selectedSensor }: { center: any; zoom: number; markers: any[]; selectedSensor: any}) => {
    const ref = useRef(null)

    useEffect(() => {
        const map = new (window as any).google.maps.Map(ref.current, {
            center: selectedSensor ? {lat: selectedSensor.lat, lng: selectedSensor.lng} : center,
            zoom,
        })
        markers.forEach((marker: any) => {
            new (window as any).google.maps.Marker({
                position: { lat: marker.lat, lng: marker.lng },
                icon: marker.idSens === selectedSensor.idSens ? '/assets/svg/geo-marker.svg' : '/assets/svg/geo-marker-disable.svg',
                map: map,
            })
        })
    }, [center, zoom, markers, selectedSensor])

    return <div ref={ref} id="map" className="min-h-400 max-h-400" />;
}

const Geolocation = () => {

    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const [sensorList, setSensorList] = useState<any>([]);
    const [selectedSenesor, setSelectedSensor] = useState<any>(null);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();

    useEffect(() => {
        getSensors();
    }, [])

    const getSensors = () => {
        setSelectedSensor('')
        dispatch(setLoading(true));
        getColdchainEvents({})
            .then(resp => {
                dispatch(setLoading(false));
                console.log('iot coldchain events: ', resp);
                filterSensors(resp);
            })
            .catch(err => {
                dispatch(setLoading(false));
                addToast('Server Error', {appearance: "error", autoDismiss: true});
            })
    }

    const filterSensors = (sensors: [any]) => {
        let sensorIdList = [];
        let resp = [];

        for(var i = 0; i < sensors.length; i++){
            let sensor = sensors[i];
            if(!sensor.payload.length) continue;

            let payloads = sensor.payload[0].split(',');
            let _temp = '';
            for (var j = 0; j < payloads.length; j++) {
                let p = payloads[j];
                let item = p.split(':');
                if (item[0] === 'Temperature' || item[0] === 'temperature') _temp = item[1];
            }

            if(!_temp) continue;
            if(sensorIdList.indexOf(sensor.idSens) > -1) continue;
            sensorIdList.push(sensor.idSens);

            resp.push({
                Temperature: Number(_temp),
                lat: Number(sensor.coordinateLat),
                lng: Number(sensor.coordinateLong),
                idSens: sensor.idSens.charAt(0).toUpperCase() + sensor.idSens.slice(1),
                criticality: sensor.criticality,
                key: sensorIdList.length
            });
        }

        setSensorList(resp);
    }

    const selectSenesor = (sensor: any) => {
        setSelectedSensor(sensor)
    }

    const getData = () => {
        const sortData: any = getSortData(sensorList, sortColumn, sortType);
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
            <BreadCrumbs menus={['Home', 'Coldchain', 'Geolocation']}/>

            <div className="container mx-auto">
                <div className="bg-white rounded-lg px-30 py-10">
                    <p className="text-primary text-16 font-bold leading-[18px]">Geolocation</p>
                </div>

                <div className="mt-20 min-h-400 max-h-400 bg-white rounded-lg relative overflow-hidden">
                    <Wrapper apiKey={config.GOOGLE_MAP_API_KEY}>
                        <Map center={googleMapConfig.center} zoom={googleMapConfig.zoom} markers={sensorList} selectedSensor={selectedSenesor}/>
                    </Wrapper>
                </div>

                <div className="bg-white rounded-lg p-[15px] my-[15px]">
                    <div className="overflow-auto">
                        <Table 
                            autoHeight data={getData()} wordWrap="break-word" bordered cellBordered
                            sortColumn={sortColumn}
                            sortType={sortType}
                            onSortColumn={handleSortColumn}
                            onRowClick={(rowData) => selectSenesor(rowData)}
                            rowClassName={(rowData) => selectedSenesor && rowData && rowData.idSens === selectedSenesor.idSens ? 'geo-table-row-selected' : ''}
                        >

                            <Table.Column width={130} fixed verticalAlign="middle">
                                <Table.HeaderCell className="text-primary text-[13px] bg-primary">Type</Table.HeaderCell>
                                <Table.Cell dataKey="criticality">
                                    {(rowData) => {
                                        return (
                                            <div className="flex items-center justify-center">
                                                {/* <img src={rowData.idSens === selectedSenesor.idSens ? "/assets/image/bus-selected.png" : "/assets/image/bus.png"} alt="bus"/> */}
                                                <img src={rowData.idSens === selectedSenesor.idSens ? "/assets/image/bus.png" : "/assets/image/bus.png"} alt="bus"/>
                                            </div>
                                        )
                                    }}
                                </Table.Cell>
                            </Table.Column>

                            <Table.Column width={250} fixed verticalAlign="middle" sortable>
                                <Table.HeaderCell className="text-primary text-[13px] bg-primary">Sensor ID</Table.HeaderCell>
                                <Table.Cell dataKey="idSens" className="text-primary text-[13px]" />
                            </Table.Column>

                            <Table.Column width={300}  verticalAlign="middle" sortable>
                                <Table.HeaderCell className="text-primary text-[13px]">Temperature °C</Table.HeaderCell>
                                <Table.Cell dataKey="Temperature" className="text-primary text-[13px]" />
                            </Table.Column>

                            <Table.Column flexGrow={1}  verticalAlign="middle">
                                <Table.HeaderCell className="text-primary text-[13px]">Coordinates</Table.HeaderCell>
                                <Table.Cell>
                                    {(rowData) => {
                                        return (
                                            <div className="text-primary text-[13px]">{rowData.lat}, {rowData.lng}</div>
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
                            total={sensorList.length}
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

export default Geolocation