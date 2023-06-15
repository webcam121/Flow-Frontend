
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import SelectPicker from 'rsuite/SelectPicker';
import Dropzone from "react-dropzone";
import { TiDocument } from "react-icons/ti";
import DatePicker from 'rsuite/DatePicker';

import MainPageLayout from '../../layout/main-layout'
import BreadCrumbs from '../../../components/common/bread-crumbs'
import { getTaskById, updateTask } from '../../../api/certificate';
import { setLoading } from '../../../store/app';
import CertificateDiagram from './certificate-diagram';
import { UserState } from '../../../store/types';
import stateCounter, { getDateTimeString, getTimeAgo } from '../../../utils';

const ApproveRequest = () => {

    const { user } = useSelector<any, UserState>((state) => state.user)

    const { id } = useParams();
    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const [task, setTask] = useState<any>({});
    
    const users = [
        { companyId: 'CPCACE3685', firstName: 'Fed', lastName: 'Man', email: 'fed@chainplug.io' },
    ];

    const [formData, setFormData] = useState<any>({});
    const [docFormData, setDocFormData] = useState<any>({
        name: '',
        description: '',
        comment: '',
        expiryTime: '',
        file: null
    })

    const [docValidations, setDocValidations] = useState({
        name: '',
        description: '',
        comment: '',
        expiryTime: '',
        file: ''
    })
    const [comment, setComment] = useState('');

    useEffect(() => {
        initializePage();
    }, [id])

    

    const getTask = () => {
        dispatch(setLoading(true));
        getTaskById(id)
            .then(resp => {
                dispatch(setLoading(false));
                setTask(resp);
            })
            .catch(err => {
                dispatch(setLoading(false));
                addToast('Server Error', {appearance: "error", autoDismiss: true});
            })
    }

    const statusOptions = useCallback(() => {
        const options = [];
        if (user.companyType === 'contractor') {
            switch (task.state) {
                case 'requested':
                    options.push({
                        value: "cancelled", key: "cancelled"
                    });
                    break;
                case 'assigned':
                    options.push({
                        value: "cancelled", key: "cancelled"
                    });
                    break;
                case 'in-progress':
                    options.push({
                        value: "cancelled", key: "cancelled"
                    });
                    break;
                default:
                    break;
            }
        } else if (user.companyType === 'authority') {
            switch (task.state) {
                case 'requested':
                    options.push({
                        value: "assigned", key: "assigned"
                    });
                    options.push({
                        value: "rejected", key: "rejected"
                    });
                    break;
                case 'assigned':
                    options.push({
                        value: "in-progress", key: "in-progress"
                    });
                    options.push({
                        value: "rejected", key: "rejected"
                    });
                    break;
                case 'in-progress':
                    options.push({
                        value: "approved", key: "approved"
                    });
                    options.push({
                        value: "rejected", key: "rejected"
                    });
                    break;
                default:
                    break;
            }
        }
        
        return options;
    }, [user, task])

    const getStatusNum = (status: any) => {
        if (status === 'requested') return 1;
        else if (status === 'assigned') return 2;
        else if (status === 'in-progress') return 3;
        else if (status === 'approved' || status === 'approved-blockchain-registered') return 4;
        else if (status === 'rejected' || status === 'rejected-blockchain-registered') return 5;
        else if (status === 'cancelled') return 6;
    
        return 0;
    }

    const getStateSelectClass = useCallback(() => {
        let state = '';

        if (formData.state) {
            state = formData.state;
        } else if (task.state) {
            state = task.state
        }

        return 'certificate-style-' + state;
    }, [task, formData])

    const handleStateChange = (value: any) => {
        setFormData((prev: any) => ({...prev, state: value}));
    }

    const handleAssignChange = (value: any) => {
        setFormData((prev: any) => ({...prev, assignedTo: value}));
    }

    const handleDocChange = (prop: any, value: any) => {
        setDocValidations((prevState) => ({ ...prevState, [prop]: "" }));
        setDocFormData((prevState: any) => ({ ...prevState, [prop]: value }));
    };

    const handleAcceptedFiles = (files: any) => {
        if(files.length) {
            setDocValidations((prevState) => ({ ...prevState, file: "" }));
            setDocFormData((prev: any) => ({...prev, file: files[0]}));
        }
    };

    const checkDocValidations = () => {
        let isValid = true;
        for (let key in docValidations) {
            if (!docFormData[key]) {
                setDocValidations((prevState) => ({ ...prevState, [key]: "has-empty" }));
                isValid = false;
            } else {
                setDocValidations((prevState) => ({ ...prevState, [key]: "" }));
            }
        }

        return isValid;
    };

    const handleSubmit = () => {
        let param: any = {};
        for (let key in formData) {
            if (formData[key]) param[key] = formData[key];
        }


        if (param.state === 'assigned' && !param.assignedTo) {
            addToast('Please select user to assign this task', {appearance: "error", autoDismiss: true});
            return;
        }

        if (param.state === 'approved') {
            console.log('check validation');
            if (!checkDocValidations()) return;

            param.documentName = docFormData.name;
            param.documentDescription = docFormData.description;
            param.documentComment = docFormData.comment;
            param.documentExpiryTime = docFormData.expiryTime.toISOString().substr(0, 10);
        }

        let _formData = new FormData();
        for (let key in param) {
            _formData.append(key, param[key]);
        }
        if (param.state === 'approved') _formData.append('file', docFormData.file);
            
        ///// submit
        dispatch(setLoading(true));

        updateTask(id, _formData)
            .then((resp: any) => {
                dispatch(setLoading(false));
                addToast('Updated Task Successfully', {appearance: "success", autoDismiss: true});
                initializePage();
            })
            .catch(err => {
                dispatch(setLoading(false));
                addToast('Task update failed', {appearance: "error", autoDismiss: true});
            })
    }

    const initializePage = () => {
        setFormData({});
        setDocFormData({
            name: '',
            description: '',
            comment: '',
            expiryTime: '',
            file: null
        })
        getTask();
    }

    const handlePostComment = () => {
        if (!comment) {
            addToast('Please write comment before post', {appearance: "error", autoDismiss: true});
            return;
        }

        updateTask(id, {comment: comment})
            .then((resp: any) => {
                dispatch(setLoading(false));
                addToast('Posted comment Successfully', {appearance: "success", autoDismiss: true});
                getTask();
            })
            .catch(err => {
                dispatch(setLoading(false));
                addToast('Comment post failed', {appearance: "error", autoDismiss: true});
            })
    }

    const docForm = useMemo(() => {
        
        return formData.state === 'approved' && (
            <div>
                <p className="mt-[15px] text-16 font-bold leading-[24px] text-primary">Certificate Document</p>

                <div className="mt-[15px]">
                    <input type="text" className="input" placeholder="Document Name" onChange={(e) => handleDocChange("name", e.target.value)} value={formData.name}/>
                    {docValidations.name === "has-empty" && <span className="text-12 text-danger pl-[2px]">Document Name Required*</span>}
                </div>

                <div className="mt-[15px]">
                    <textarea className="input h-100" placeholder="Description"  onChange={(e) => handleDocChange("description", e.target.value)} value={formData.description}/>
                    {docValidations.description === "has-empty" && <span className="text-12 text-danger pl-[2px]">Document Description Required*</span>}
                </div>

                <div className="mt-[15px]">
                    <textarea className="input h-100" placeholder="Comment"  onChange={(e) => handleDocChange("comment", e.target.value)} value={formData.comment}/>
                    {docValidations.comment === "has-empty" && <span className="text-12 text-danger pl-[2px]">Document Comment Required*</span>}
                </div>

                <div className="mt-[15px]">
                    <DatePicker size="md" className="w-[100%] custom" placeholder="Expiry Time"  onChange={(value, e) => handleDocChange("expiryTime", value)} value={formData.expiryTime}/>
                    {docValidations.expiryTime === "has-empty" && <span className="text-12 text-danger pl-[2px]">Expiry Time Required*</span>}
                </div>


                <div className="mt-[15px] rounded-sm border border-primary border-dashed h-190 flex flex-col justify-center items-center cursor-pointer">
                    <Dropzone
                        maxFiles={1}
                        multiple={false}
                        onDrop={acceptedFiles =>
                            handleAcceptedFiles(acceptedFiles)
                        }
                    >
                        {({ getRootProps, getInputProps }) => (
                        <div className="dropzone h-[100%] w-[100%] text-center">
                            <div
                            className="dz-message needsclick w-[100%] h-[100%] flex justify-center items-center"
                            {...getRootProps()}
                            >
                            <input {...getInputProps()} />
                            <div>
                                <img src="/assets/image/upload-document.png" alt="upload" className="inline-block"/>
                                <p className="text-16 font-bold leading-[24px] text-primary">Drop a file or click to upload</p>
                                <h5>{docFormData.file && (<span className="text-[25px]"><TiDocument className="inline-block"/>  {docFormData.file.name}</span>)}</h5>
                            </div>
                            
                            </div>
                        </div>
                        )}
                    </Dropzone>
                </div>
                {docValidations.file === "has-empty" && <span className="text-12 text-danger pl-[2px]">File Required*</span>}
            </div>
        )
        
    }, [formData, docValidations])

    const stateDays = useMemo(() => {
        if (!task.events) return (<></>);

        console.log('state days');

        const status = stateCounter(task);

        console.log('status: ', status);

        if (status.assign !== '') {
            return (<div className="grid grid-cols-2 gap-5">
                <div className="border border-success text-success px-10 py-5">
                    <p className="text-12 font-normal leading-[18x] text-center">Assigned {status.assign}</p>
                </div>
                <div className="border border-danger text-danger px-10 py-5">
                    <p className="text-12 font-normal leading-[18x] text-center">Requested {status.request}</p>
                </div>
            </div>)
        } else {
            return (<div className="border border-danger text-danger px-10 py-5">
                <p className="text-12 font-normal leading-[18x] text-center">Requested {status.request}</p>
            </div>)
        }
    }, [task])

    const CommentList = useMemo(() => {
        if (!task || !task.events) return '';

        const comments = task.events
            .sort((a: any, b: any) => (a.date < b.date ? 1 : -1))
            .map((event: any) => {
                const avatar = event.user.substr(0, 2).toUpperCase();
                const author = event.user;
                const time = getTimeAgo(new Date(event.date))

                const fieldContents = event.changedFields.map((changedField: any) => {
                    if (changedField.fieldName === 'state') {
                        return 'Task state is ' + changedField.newValue;
                    } else {
                        return 'Task ' + changedField.fieldName + ' was updated';
                    }
                })

                const eventComment = event.comment;
                
                return {avatar, author, time, fieldContents, eventComment};
            })

        return (
            <div className='mt-15'>
                <div>{comments.length} replys</div>
                {comments.map((comment: any, index: Number) => (
                    <div className="p-10 border-l-[4px] border-[1px] border-primary my-[5px] rounded-[5px]">
                        <div className='flex'>
                            <div className="w-[32px] h-[32px] bg-primary p-10 rounded-full flex justify-center items-center">
                                <span className='font-bold text-white'>{comment.avatar}</span>
                            </div>
                            <div className="flex-auto ml-[10px]">
                                <div className='flex items-center'>
                                    <div className='text-[13px]'>{comment.author}</div>
                                    <div className='text-[11px] ml-[10px] text-light'>{comment.time}</div>
                                </div>

                                <div className='mt-[5px]'>
                                    {comment.fieldContents.map((fieldContent: any) => (
                                        <div className='text-primary underline font-bold text-[14px]'>{fieldContent}</div>
                                    ))}
                                    <div className='mt-[2px] font-bold text-[16px]'>{comment.eventComment}</div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>    
        )
    }, [task])

    const nearLink = (nearInfo: any) => {
        let url = '';
        if (nearInfo.networkId && nearInfo.contractAddress && nearInfo.tokenId) {
            let prefix = '';
            if (nearInfo.networkId === 'testnet') {
                prefix = 'testnet.';
            }
            url = `https://${prefix}nearblocks.io/nft-token/${nearInfo.contractAddress}/${nearInfo.tokenId}`;
        } 
        return (
            <div className="px-15 py-[6px] rounded-[20px]"  style={{backgroundColor: 'lightgray'}}>
                <a href={url} target="_blank" rel="noreferrer">
                    <img src="/assets/svg/nearblocksblack.svg" className="inline-block h-[25px]" alt="near" />
                </a>
            </div>
        )
    }


    return (
        <MainPageLayout>
            <BreadCrumbs menus={['Home', 'Certification', 'Approve a request']}/>

            <div className="container mx-auto">
                <div className="bg-white rounded-lg px-30 py-10">
                    <p className="text-primary text-16 font-bold leading-[18px]">Requested Module</p>
                </div>

                

                <div className="my-20 lg:flex">
                    <div className="bg-white rounded-lg p-30 lg:w-3/5 lg:mr-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-15 md:gap-20">
                            <div>
                                <label className="label">Task ID:</label>
                                <input type="text" className="input cursor-" value={task.taskId} readOnly/>
                            </div>
                            <div>
                                <label className="label">Type:</label>
                                <input type="text" className="input"  value={task.type} readOnly/>
                            </div>
                            <div>
                                <label className="label">Authority:</label>
                                <input type="text" className="input" value={task.authorityCompany} readOnly />
                            </div>
                            <div>
                                <label className="label">Requested by:</label>
                                <input type="text" className="input"  value={task.requestedBy} readOnly/>
                            </div>
                            <div>
                                <label className="label">Contractor:</label>
                                <input type="text" className="input"  value={task.contractorCompany} readOnly/>
                            </div>
                            <div>
                                <label className="label">Contractor's User:</label>
                                <input type="text" className="input"  value={task.contractorUser} readOnly/>
                            </div>
                            <div>
                                <label className="label">Assigned to:</label>
                                {task.state === 'requested' && user.companyType === 'authority' ? 
                                    (
                                        <SelectPicker data={users} valueKey="email" labelKey='email' className='w-[100%] assign' placeholder=""
                                                    onChange={(value, e) => handleAssignChange(value)}
                                        />
                                    ):(
                                        <input type="text" className="input"  value={task.assignedTo} readOnly/>
                                    )
                                }
                            </div>
                            <div>
                                <label className="label">Document Name:</label>
                                <input type="text" className="input"  value={task.documentName} readOnly/>
                            </div>
                        </div>

                        <div className="mt-15">
                            <label className="label">Description:</label>
                            <textarea className="input h-100"  value={task.description} readOnly/>
                        </div>
                        
                        <div className="mt-15">
                            <label className="label">Status:</label>
                            <SelectPicker 
                                data={statusOptions()} valueKey="key" labelKey='value' 
                                className={"w-[100%] " + getStateSelectClass()} 
                                placeholder={task.state}
                                onChange={(value, e) => handleStateChange(value)}
                                searchable={false}
                            />
                        </div>

                        {docForm}

                        { task && task.near && 
                            <div className='mb-30'>
                                <hr className="mt-15 text-secondary" />

                                <div className="mt-15 grid grid-cols-1 md:grid-cols-2 gap-15 md:gap-20">
                                    
                                    <div>
                                        <label className="label">Blockchain Name:</label>
                                        <input type="text" className="input" value={'Near ' + task.near.networkId}/>
                                    </div>
                                    <div>
                                        <label className="label">Deployment time:</label>
                                        <input type="text" className="input" value={getDateTimeString(new Date())}/>
                                    </div>
                                    {/* <div>
                                        <label className="label">Receiver’s Address:</label>
                                        <input type="text" className="input" />
                                    </div>
                                    <div>
                                        <label className="label">Sender’s Address:</label>
                                        <input type="text" className="input" />
                                    </div> */}
                                    <div>
                                        <label className="label">Contract Address:</label>
                                        <input type="text" className="input" value={task.near.contractAddress}/>
                                    </div>
                                    <div>
                                        <label className="label">Token Id:</label>
                                        <input type="text" className="input"  value={task.near.tokenId}/>
                                    </div>

                                    <div className='col-span-2'>
                                        <label className="label">Document Name:</label>
                                        <input type="text" className="input" value={task.documentName}/>
                                    </div>
                                    <div className='col-span-2'>
                                        <label className="label">Document Description:</label>
                                        <textarea className="input"  value={task.documentDescription}/>
                                    </div>
                                    <div className='col-span-2'>
                                        <label className="label">Document Comment:</label>
                                        <textarea className="input"  value={task.documentComment}/>
                                    </div>

                                    <div className='col-span-2'>
                                        <label className="label">Document Link:</label>
                                        <div className='flex'>
                                            <div className=''>{nearLink(task.near)}</div>
                                            <div className='ml-[5px]'>
                                                <div className="bg-primary-75 px-15 py-[6px] rounded-[20px]">
                                                    <a href={task.ipfsAddress} target="_blank" rel="noreferrer">
                                                        <img src="/assets/image/ipfs.png" className="inline-block h-[25px]" alt="near" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="mt-15">
                            <button className="btn btn-filled w-full" onClick={handleSubmit}>Send</button>
                        </div>
                        
                        <hr className="mt-15 text-secondary" />
                        
                        <div className="mt-15 bg-primary bg-opacity-10 p-15 rounded-md">
                            <div>
                                <textarea className="input bg-white h-100" placeholder="Comment" value={comment} onChange={(e: any) => setComment(e.target.value)}/>
                                <button className="btn btn-expired w-full" onClick={handlePostComment}>Post a Comment</button>
                            </div>


                            {CommentList}
                        </div>

                        

                        
                    </div>
                    <div className="lg:w-2/5">
                        <div className="bg-white rounded-lg p-30 ">
                            {stateDays}
                            <div className="mt-25">
                                <CertificateDiagram stage={getStatusNum(task.state)} task={task}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainPageLayout>
    )
}

export default ApproveRequest