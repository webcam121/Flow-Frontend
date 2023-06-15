import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications"
import { Steps } from 'rsuite';

import { requestCertificate } from "../../../api/certificate"
import BreadCrumbs from "../../../components/common/bread-crumbs"
import { setLoading } from "../../../store/app"
import MainPageLayout from "../../layout/main-layout"

const formInitialValues = {
    type: 'ISO 9000',
    description: '',
}
const CertificateRequest = () => {

    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const navigate = useNavigate();

    const [newTask, setNewTask] = useState<any>({})
    const [formData, setFormData] = useState<any>(formInitialValues)
    const [step, setStep] = useState(0);

    const [validations, setValidations] = useState({
        type: '',
        description: '',
    })

    const handleChange = (prop: any, value: any) => {
        setValidations((prevState) => ({ ...prevState, [prop]: "" }));
        setFormData((prevState: any) => ({ ...prevState, [prop]: value }));
    };

    const checkvalidations = () => {
        let isValid = true;
        for (let key in validations) {
            if (!formData[key]) {
                setValidations((prevState) => ({ ...prevState, [key]: "has-empty" }));
                isValid = false;
            } else {
                setValidations((prevState) => ({ ...prevState, [key]: "" }));
            }
        }

        return isValid;
    };

    const handleSubmit = () => {
        

        dispatch(setLoading(true));

        requestCertificate(formData)
            .then((task: any) => {
                dispatch(setLoading(false));
                addToast('Rquested Certificate Successfully', {appearance: "success", autoDismiss: true});
                initializeForm();
                setNewTask(task)
                setStep(2);
            })
            .catch(err => {
                dispatch(setLoading(false));
                addToast('Request Certificate Failed', {appearance: "error", autoDismiss: true});
                // initializeForm();
            })
    }

    const handleNext = () => {
        if (!checkvalidations()) return;
        setStep(1);
    }

    const handleEdit = () => {
        setStep(0);
    }

    const handleClose = () => {
        navigate('/certificate');
    }

    const initializeForm = () => {
        setFormData(formInitialValues)
    }

    

    return (
        <MainPageLayout>
            <BreadCrumbs menus={['Home', 'Certification', 'Requested Certificates']}/>

            <div className="container mx-auto">
                <div className="bg-white rounded-lg px-30 py-20 mb-20">
                    <p className="text-primary text-16 font-bold leading-[18px]">Request a Certificate</p>

                    <Steps current={step} className="max-w-[700px] mx-auto mt-30">
                        <Steps.Item title="Insert your data" />
                        <Steps.Item title="Review your data" />
                        <Steps.Item title="Receipt" />
                    </Steps>

                    { step === 0 && 
                        <div>
                            <div className="mt-20">
                                <label className="text-[13px] pl-[3px]">Certificate Type</label>
                                <select className="input" value={formData.type} onChange={(e) => handleChange("type", e.target.value)} placeholder="">
                                    <option value="ISO 9000">ISO 9000</option>
                                    <option value="ISO 5000">ISO 5000</option>
                                    <option value="ISO xxxx">ISO xxxx</option>
                                </select>
                                {validations.type === "has-empty" && <span className="text-12 text-danger pl-[2px]">Type Required*</span>}
                            </div>

                            <div className="mt-20">
                                <label className="text-[13px] pl-[3px]">Certificate Description</label>
                                <textarea className="input h-100" placeholder="Description"  onChange={(e) => handleChange("description", e.target.value)} value={formData.description}/>
                                {validations.description === "has-empty" && <label className="text-12 text-danger pl-[2px]">Description Required*</label>}
                            </div>

                            <div className="mt-15">
                                    <button className="btn btn-filled w-full" onClick={handleNext}>Next</button>
                            </div>
                        </div>
                    }

                    { step === 1 && 
                        <div>
                            <div className="mt-20">
                                <label className="text-[13px] pl-[3px]">Certificate Type</label>
                                <input className="input" value={formData.type} readOnly/>
                                    
                            </div>

                            <div className="mt-20">
                                <label className="text-[13px] pl-[3px]">Certificate Description</label>
                                <textarea className="input h-100" placeholder="Description" value={formData.description} readOnly/>
                            </div>

                            <div className="mt-15 grid grid-cols-1 md:grid-cols-2 gap-15 md:gap-20">
                                <div>
                                    <button className="btn btn-filled w-full" onClick={handleSubmit}>Submit</button>
                                </div>
                                <div>
                                    <button className="btn w-full bg-white" onClick={handleEdit}>Edit</button>
                                </div>
                            </div>
                        </div>
                    }

                    { step ===2 && newTask.taskId && 
                        <div>
                            <div className="mt-20 bg-success/30 rounded-lg px-30 py-10 text-[16px] text-success-400">
                                <div className="mb-[4px] font-bold">Requested a Certificate</div>
                                <div>Task ID: <span className="ml-[10px]">{newTask.taskId}</span></div>
                                <div>Description: <span className="ml-[10px]">{newTask.description}</span></div>
                                <div>Requested By: <span className="ml-[10px]">{newTask.requestedBy}</span></div>
                                <div>Contractor User: <span className="ml-[10px]">{newTask.contractorUser}</span></div>
                                <div>Authority Company: <span className="ml-[10px]">{newTask.authorityCompany}</span></div>
                                <div>Contractor Company: <span className="ml-[10px]">{newTask.contractorCompany}</span></div>
                            </div>

                            <div className="mt-15">
                                <button className="btn w-full bg-white" onClick={handleClose}>Close</button>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </MainPageLayout>
    )
}

export default CertificateRequest