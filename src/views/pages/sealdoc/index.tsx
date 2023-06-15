import { useEffect, useState } from "react"
import { Pagination, Table } from 'rsuite';
import { useDispatch } from "react-redux"
import { useToasts } from "react-toast-notifications"

import MainPageLayout from '../../layout/main-layout'
import BreadCrumbs from '../../../components/common/bread-crumbs'
import SealDocumentForm from "./form"
import { getSealdoc } from "../../../api/sealdoc"
import { setLoading } from "../../../store/app"
import { getSortData } from "../../../utils";

const SealDocument = () => {

    const dispatch = useDispatch();
    const { addToast } = useToasts();

    const [documentCreated, setDocumentCreated] = useState(true);
    const [allSealDocs, setAllSealDocs] = useState([]);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();

    useEffect(() => {
        console.log('document created: ', documentCreated);
        if(documentCreated) {
            getAllSealDocs();
        }
    }, [documentCreated])

    const getAllSealDocs = () => {
        dispatch(setLoading(true));
        getSealdoc()
            .then(resp => {
                dispatch(setLoading(false));
                console.log('sealdocs: ', resp);
                const docs = resp.filter((doc: any) => doc.near && doc.near.tokenId );
                
                setAllSealDocs(docs);
            })
            .catch(err => {
                dispatch(setLoading(false));
                addToast('Server Error', {appearance: "error", autoDismiss: true});
            })
    }

    const getData = () => {
        console.log('all docs: ', allSealDocs);
        const sortData: any = getSortData(allSealDocs, sortColumn, sortType);
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
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
      };

    return (
        <MainPageLayout>
            <BreadCrumbs menus={['Home', 'Seal Document in Blockchain']}/>

            <div className="container mx-auto">
                <div className="bg-white rounded-lg px-30 py-10 flex items-center">
                    <span className="text-primary text-16 font-bold leading-[18px]">Seal Document in Blockchain</span>
                </div>

                

                <div className="bg-white rounded-lg my-20 px-35 py-45">

                    <SealDocumentForm setDocumentCreated={(val: any) => setDocumentCreated(val)}/>
                    

                    <hr className="mt-30 text-secondary" />

                    <div className="mt-30">
                        <p className="text-16 font-bold leading-[24px] text-primary">Approved Transactions</p>

                        <div className="mt-30 overflow-auto">
                            {/* <table className="border border-light-100 w-full">
                                <thead className="text-primary border-b border-light-100 bg-primary bg-opacity-10">
                                    <th className="px-15 py-10 border-r border-light-100 text-12 font-normal leading-[18px] min-w-130 max-w-130">
                                        <div className="flex items-center">
                                            <span>Company ID</span>
                                        </div>
                                    </th>
                                    <th className="px-15 py-10 border-r border-light-100 text-12 font-normal leading-[18px] min-w-260">
                                        <div className="flex items-center">
                                            <span>Name</span>
                                        </div>
                                    </th>
                                    <th className="px-15 py-10 border-r border-light-100 text-12 font-normal leading-[18px] min-w-115 max-w-115">
                                        <div className="flex items-center">
                                            <span>IPFS address</span>
                                        </div>
                                    </th>
                                    <th className="px-15 py-10 border-r border-light-100 text-12 font-normal leading-[18px] min-w-230 max-w-230">
                                        <div className="flex items-center">
                                            <span>Description</span>
                                        </div>
                                    </th>
                                    <th className="px-15 py-10 text-12 font-normal leading-[18px] min-w-130 max-w-130">
                                        <div className="flex items-center">
                                            <span>Requested By</span>
                                        </div>
                                    </th>
                                </thead>
                                <tbody className="">
                                    {allSealDocs.map((item: any, index) =>
                                        <tr key={index}>
                                            <td className="px-15 py-10 text-12 font-normal leading-[18px] text-primary border-r border-light-100">{item.company}</td>
                                            <td className="px-15 py-10 text-12 font-normal leading-[18px] text-primary border-r border-light-100">{item.name}</td>
                                            <td className="px-15 py-10 text-12 font-normal leading-[18px] text-primary border-r border-light-100">
                                                <div className="bg-primary-75 px-15 rounded-full">
                                                    <a href={item.ipfsAddress} target="_blank" rel="noreferrer">
                                                        <img src="assets/image/ipfs.png" alt="ipfs" />
                                                    </a>
                                                
                                                </div>
                                            </td>
                                            <td className="px-15 py-10 text-12 font-normal leading-[18px] text-primary border-r border-light-100">{item.description}</td>
                                            <td className="px-15 py-10 text-12 font-normal leading-[18px] text-primary">{item.createdBy}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table> */}

                            <Table 
                                autoHeight data={getData()} wordWrap="break-word" bordered cellBordered
                                sortColumn={sortColumn}
                                sortType={sortType}
                                onSortColumn={handleSortColumn}
                            >

                                <Table.Column width={120} fixed verticalAlign="middle" sortable>
                                    <Table.HeaderCell className="text-primary text-[13px] bg-primary">Company ID</Table.HeaderCell>
                                    <Table.Cell dataKey="company" className="text-primary text-[13px]" />
                                </Table.Column>

                                <Table.Column width={180} fixed verticalAlign="middle" sortable>
                                    <Table.HeaderCell className="text-primary text-[13px] bg-primary">Name</Table.HeaderCell>
                                    <Table.Cell dataKey="name" className="text-primary text-[13px]" />
                                </Table.Column>

                                <Table.Column width={150} fixed verticalAlign="middle"  >
                                    <Table.HeaderCell className="text-primary text-[13px]">NEAR</Table.HeaderCell>
                                    <Table.Cell>
                                        {(rowData) => {
                                            let url = '';
                                            const near: any = rowData.near;
                                            if (near.networkId && near.contractAddress && near.tokenId) {
                                                let prefix = '';
                                                if (near.networkId === 'testnet') {
                                                    prefix = 'testnet.';
                                                }
                                                url = `https://${prefix}nearblocks.io/nft-token/${near.contractAddress}/${near.tokenId}`;
                                            } 
                                            return (
                                                <div className="px-15 py-[3px] rounded-full" style={{backgroundColor: 'lightgray'}}>
                                                    <a href={url} target="_blank" rel="noreferrer">
                                                        <img src="assets/svg/nearblocksblack.svg" className="inline-block" alt="near" />
                                                    </a>
                                                </div>
                                            )
                                        }}
                                    </Table.Cell>
                                </Table.Column>

                                <Table.Column width={120} fixed verticalAlign="middle"  >
                                    <Table.HeaderCell className="text-primary text-[13px]">IPFS Address</Table.HeaderCell>
                                    <Table.Cell>
                                        {(rowData) => {
                                            return (
                                                <div className="bg-primary-75 px-15 py-[3px] rounded-full">
                                                    <a href={rowData.ipfsAddress} target="_blank" rel="noreferrer">
                                                        <img src="assets/image/ipfs.png" className="inline-block" alt="ipfs" />
                                                    </a>
                                                
                                                </div>
                                            )
                                        }}
                                    </Table.Cell>
                                </Table.Column>

                                <Table.Column width={280} fixed verticalAlign="middle" sortable>
                                    <Table.HeaderCell className="text-primary text-[13px] bg-primary">Description</Table.HeaderCell>
                                    <Table.Cell dataKey="description" className="text-primary text-[13px]" />
                                </Table.Column>

                                <Table.Column flexGrow={1}  verticalAlign="middle">
                                    <Table.HeaderCell className="text-primary text-[13px]">Request By</Table.HeaderCell>
                                    <Table.Cell dataKey="createdBy" className="text-primary text-[13px]" />
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
                                total={allSealDocs.length}
                                limitOptions={[5, 10, 20, 50]}
                                limit={limit}
                                activePage={page}
                                onChangePage={setPage}
                                onChangeLimit={handleChangeLimit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MainPageLayout>
    )
}

export default SealDocument