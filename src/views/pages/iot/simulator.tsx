import MainPageLayout from '../../layout/main-layout'
import BreadCrumbs from '../../../components/common/bread-crumbs'
import { useDispatch } from 'react-redux'
import { useToasts } from 'react-toast-notifications';
import { useState } from 'react';
import { isValidDateValue } from '@testing-library/user-event/dist/utils';
import { setLoading } from '../../../store/app';
import { createIotEvent } from '../../../api/iot';

const formInitialValues = {
    idSens: "",
    vendor: "",
    type: "",
    idEvent: "",
    buffer: "",
    criticality: "",
    coordinateLat: "",
    coordinateLong: "",
    payload: "",
    parameter1: "parameter1",
    parameter2: "parameter2",
    parameter3: "parameter3",
    parameter4: "parameter4",
    parameter5: "parameter5",
    parameter6: "parameter6",
}

const Simulator = () => {

    const dispatch = useDispatch();
    const { addToast } = useToasts();

    const [formData, setFormData] = useState<any>(formInitialValues);

    const [validations, setValidations] = useState({
        idSens: "",
        vendor: "",
        type: "",
        idEvent: "",
        buffer: "",
        criticality: "",
        coordinateLat: "",
        coordinateLong: "",
        payload: "",
    })

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

    const handleChange = (prop: any, value: any) => {
        setValidations((prevState) => ({ ...prevState, [prop]: "" }));
        setFormData((prevState: any) => ({ ...prevState, [prop]: value }));
    };

    const handleSubmit = () => {
        if (!checkvalidations()) return;

        dispatch(setLoading(true));

        const params = {
            ...formData,
            payload: [formData.payload]
        }


        createIotEvent(params)
            .then((doc: any) => {
                dispatch(setLoading(false));
                addToast('Event successfully added', {appearance: "success", autoDismiss: true});
                initializeForm();
            })
            .catch(err => {
                dispatch(setLoading(false));
                addToast('Event submit failed', {appearance: "error", autoDismiss: true});
                // initializeForm();
            })
    }

    const initializeForm = () => {
        setFormData(formInitialValues)

    }

    return (
        <MainPageLayout>
            <BreadCrumbs menus={['Home', 'Iot on Blockchain', 'Event Simulator']}/>

            <div className="container mx-auto">
                <div className="bg-white rounded-lg px-30 py-10">
                    <p className="text-primary text-16 font-bold leading-[18px]">Event Simulator</p>
                </div>

                <div className="my-20 grid grid-cols-1 lg:grid-cols-2 gap-15 lg:gap-30">
                    <div className="bg-white rounded-lg px-20 py-35">
                        <p className="text-primary text-16 font-bold leading-[18px]">Generate Event</p>
                        <div className="mt-15">
                            <input type="text" className="input" placeholder="Enter Sensor’s ID" onChange={(e) => handleChange("idSens", e.target.value)} value={formData.idSens}/>
                            {validations.idSens === "has-empty" && <span className="text-12 text-danger pl-[2px]">Id Sens Required*</span>}
                        </div>
                        <div className="mt-15">
                            <input type="text" className="input" placeholder="Enter Vendor’s Name" onChange={(e) => handleChange("vendor", e.target.value)} value={formData.vendor}/>
                            {validations.vendor === "has-empty" && <span className="text-12 text-danger pl-[2px]">Vendor Required*</span>}
                        </div>
                        <div className="mt-15">
                            <input type="text" className="input" placeholder="Enter Type" onChange={(e) => handleChange("type", e.target.value)} value={formData.type}/>
                            {validations.type === "has-empty" && <span className="text-12 text-danger pl-[2px]">Type Required*</span>}
                        </div>
                        <div className="mt-15">
                            <input type="number" className="input" placeholder="Enter ID" onChange={(e) => handleChange("idEvent", e.target.value)} value={formData.idEvent}/>
                            {validations.idEvent === "has-empty" && <span className="text-12 text-danger pl-[2px]">Event Id Required*</span>}
                        </div>
                        <div className="mt-15">
                            <input type="number" className="input" placeholder="Buffer Size" onChange={(e) => handleChange("buffer", e.target.value)} value={formData.buffer}/>
                            {validations.buffer === "has-empty" && <span className="text-12 text-danger pl-[2px]">Buffer Required*</span>}
                        </div>
                        <div className="mt-15">
                            <input type="number" className="input" placeholder="Criticality" onChange={(e) => handleChange("criticality", e.target.value)} value={formData.criticality}/>
                            {validations.criticality === "has-empty" && <span className="text-12 text-danger pl-[2px]">Criticality Required*</span>}
                        </div>
                        <div className="mt-15 flex items-center">
                            <div className='mr-15'>
                                <input type="number" className="input mr-15" placeholder="Latitude" onChange={(e) => handleChange("coordinateLat", e.target.value)} value={formData.coordinateLat}/>
                                {validations.coordinateLat === "has-empty" && <span className="text-12 text-danger pl-[2px]">Latitude Required*</span>}
                            </div>
                            <div>
                                <input type="number" className="input" placeholder="Longitude" onChange={(e) => handleChange("coordinateLong", e.target.value)} value={formData.coordinateLong}/>
                                {validations.coordinateLong === "has-empty" && <span className="text-12 text-danger pl-[2px]">Longitude Required*</span>}
                            </div>
                        </div>
                        <div className="mt-15">
                            <textarea className="input h-100" placeholder="Payload" onChange={(e) => handleChange("payload", e.target.value)} value={formData.payload}/>
                            {validations.payload === "has-empty" && <span className="text-12 text-danger pl-[2px]">Payload Required*</span>}
                        </div>
                        <div className="mt-15">
                            <button className="btn btn-filled w-full" onClick={handleSubmit}>Enter</button>
                        </div>
                        <div className="mt-35">
                            <textarea className="input h-100" placeholder="Production" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg flex items-center justify-center p-25">
                        <img src="/assets/image/simulator-product-example.png" alt="simulator product example" />
                    </div>
                </div>
            </div>
        </MainPageLayout>
    )
}

export default Simulator