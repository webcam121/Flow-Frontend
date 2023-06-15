import { useEffect, useRef } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'

import MainPageLayout from '../../layout/main-layout'
import BreadCrumbs from '../../../components/common/bread-crumbs'
import { getIotBgColorAndText } from '../../../utils'

const Map = ({ center, zoom }: { center: any; zoom: number; }) => {
    const ref = useRef(null);

    useEffect(() => {
        new (window as any).google.maps.Map(ref.current, {
            center,
            zoom,
        });
    }, [center, zoom])

    return <div ref={ref} id="map" className="min-h-400 max-h-400" />;
}

const AssetManagement = () => {

    const googleMapConfig = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    }

    const iotList = [
        {
            criticalitly: 'approved',
            eventId: '604a1a896eadb917ca8e5834',
            vendor: '1',
            sensorId: '1',
            type: 'Type',
            buffer: '2',
            coordinates: '43.7696,11.2558',
        },
        {
            criticalitly: 'requested',
            eventId: '604a1a896eadb917ca8e5834',
            vendor: '1',
            sensorId: '1',
            type: 'Type',
            buffer: '2',
            coordinates: '43.7696,11.2558',
        },
        {
            criticalitly: 'ongoing',
            eventId: '604a1a896eadb917ca8e5834',
            vendor: '1',
            sensorId: '1',
            type: 'Type',
            buffer: '2',
            coordinates: '43.7696,11.2558',
        },
        {
            criticalitly: 'approved',
            eventId: '604a1a896eadb917ca8e5834',
            vendor: '1',
            sensorId: '1',
            type: 'Type',
            buffer: '2',
            coordinates: '43.7696,11.2558',
        },
    ]

    return (
        <MainPageLayout>
            <BreadCrumbs menus={['Home', 'Iot on Blockchain', 'Asset Management']}/>

            <div className="container mx-auto">
                <div className="bg-white rounded-lg px-30 py-10">
                    <p className="text-primary text-16 font-bold leading-[18px]">Asset Management</p>
                </div>

                <div className="mt-20 min-h-400 max-h-400 bg-white rounded-lg relative overflow-hidden">
                    <Wrapper apiKey="AIzaSyCHX-aU0YxNQHyOaDiUHmPv3BYpuV6PMG4">
                        <Map center={googleMapConfig.center} zoom={googleMapConfig.zoom} />
                    </Wrapper>
                </div>

                <div className="bg-white rounded-lg p-30 my-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        <div>
                            <input type="text" className="input" placeholder="Enter Sensor" />
                        </div>
                        <div>
                            <input type="text" className="input" placeholder="Enter Sensor’s Name" />
                        </div>
                        <div>
                            <input type="text" className="input" placeholder="Enter Sensor’s Type" />
                        </div>
                        <div>
                            <button className="btn flex items-center justify-between w-full">
                                <span className="text-12 font-normal leading-[18px]">Choose Date</span>
                                <div className="ml-10">
                                    <img src="/assets/svg/calendar.svg" alt="updated at"/>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="mt-20">
                        <button className="btn btn-filled mr-10">Search</button>
                        <button className="btn mr-10">Reset</button>
                        <button className="btn mr-10">-</button>
                    </div>

                    <div className="mt-40">
                        <button className="btn btn-filled mr-10">+ New</button>
                    </div>

                    <div className="mt-20 overflow-auto">
                        <table className="border border-light-100 w-full">
                            <thead className="text-primary border-b border-light-100 bg-primary bg-opacity-10">
                                <th className="px-15 py-10 border-r border-light-100 text-12 font-normal leading-[18px] min-w-140 max-w-140">
                                    <div className="flex items-start">
                                        <input type="checkbox" disabled className="mr-15" />
                                        <span>Criticalitly</span>
                                    </div>
                                </th>
                                <th className="px-15 py-10 border-r border-light-100 text-12 font-normal leading-[18px] min-w-215 max-w-215">
                                    <div className="flex items-center">
                                        <span>Event ID</span>
                                    </div>
                                </th>
                                <th className="px-15 py-10 border-r border-light-100 text-12 font-normal leading-[18px] min-w-125">
                                    <div className="flex items-center">
                                        <span>Vendor</span>
                                    </div>
                                </th>
                                <th className="px-15 py-10 border-r border-light-100 text-12 font-normal leading-[18px] min-w-125 max-w-125">
                                    <div className="flex items-center">
                                        <span>Sensor ID</span>
                                    </div>
                                </th>
                                <th className="px-15 py-10 border-r border-light-100 text-12 font-normal leading-[18px] min-w-125 max-w-125">
                                    <div className="flex items-center">
                                        <span>Type</span>
                                    </div>
                                </th>
                                <th className="px-15 py-10 border-r border-light-100 text-12 font-normal leading-[18px] min-w-125 max-w-125">
                                    <div className="flex items-center">
                                        <span>Buffer</span>
                                    </div>
                                </th>
                                <th className="px-15 py-10 text-12 font-normal leading-[18px] min-w-125 max-w-125">
                                    <div className="flex items-center">
                                        <span>Coordinates</span>
                                    </div>
                                </th>
                            </thead>
                            <tbody>
                                {iotList.map((item: any, index) =>
                                    <tr key={index}>
                                        <td className="px-15 py-10 text-12 font-normal leading-[18px] text-danger border-r border-light-100">
                                            <div className="flex items-center">
                                                <input type="checkbox" className="mr-15" />
                                                <p className={"w-full text-center rounded-sm text-white uppercase px-15 py-5 " + getIotBgColorAndText(item.criticality)['bgClassName']}>{getIotBgColorAndText(item.criticality)['text']}</p>
                                            </div>
                                        </td>
                                        <td className="px-15 py-10 text-12 font-normal leading-[18px] text-primary border-r border-light-100">{item.eventId}</td>
                                        <td className="px-15 py-10 text-12 font-normal leading-[18px] text-primary border-r border-light-100">{item.vendor}</td>
                                        <td className="px-15 py-10 text-12 font-normal leading-[18px] text-primary border-r border-light-100">{item.sensorId}</td>
                                        <td className="px-15 py-10 text-12 font-normal leading-[18px] text-primary border-r border-light-100">{item.type}</td>
                                        <td className="px-15 py-10 text-12 font-normal leading-[18px] text-primary border-r border-light-100">{item.buffer}</td>
                                        <td className="px-15 py-10 text-12 font-normal leading-[18px] text-primary">{item.coordinates}</td>
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

export default AssetManagement