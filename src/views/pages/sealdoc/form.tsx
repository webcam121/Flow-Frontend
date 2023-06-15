import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { TiDocument } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { submitSealdoc } from "../../../api/sealdoc";
import { setLoading } from "../../../store/app";


interface FormProps {
    setDocumentCreated: (val: any) => void
}
type FormDataType = {
    name: string,
    description: string,
    comment: string,
    file: any
}
type newDocumentType = {
    ipfsAddress: string
}

const SealDocumentForm: React.FC<FormProps> = ({setDocumentCreated}) => {

    const dispatch = useDispatch()
    const { addToast } = useToasts();

    const [newDocument, setNewDocument] = useState<newDocumentType>({
        ipfsAddress: ''
    })

    const [formData, setFormData] = useState<FormDataType>({
        name: '',
        description: '',
        comment: '',
        file: null
    })

    const [validations, setValidations] = useState({
        name: '',
        description: '',
        comment: '',
        file: ''
    })

    const handleChange = (prop: any, value: any) => {
        setValidations((prevState) => ({ ...prevState, [prop]: "" }));
        setFormData((prevState) => ({ ...prevState, [prop]: value }));
    };

    const checkvalidations = () => {
        if (formData.name === '') {
            setValidations({ name: 'has-empty', description: '', comment: '', file: ''});
            return false;
        } else if (formData.description === '') {
            setValidations({ name: '', description: 'has-empty', comment: '', file: ''});
            return false;
        } else if (formData.comment === '') {
            setValidations({ name: '', description: '', comment: 'has-empty', file: ''});
            return false;
        } else if (!formData.file) {
            setValidations({ name: '', description: '', comment: '', file: 'has-empty'});
            return false;
        } else {
            setValidations({ name: '', description: '', comment: '', file: ''});
        }
    
        return true;
    };

    const handleSubmit = () => {
        if (!checkvalidations()) return;

        setDocumentCreated(false);
        dispatch(setLoading(true));
        addToast("Please wait ... It might takes some time", { appearance: "warning", autoDismiss: true });

        let _formData = new FormData();
            _formData.append('file', formData.file);
            _formData.append('name', formData.name);
            _formData.append('description', formData.description);
            _formData.append('comment', formData.comment);


        submitSealdoc(_formData)
            .then((doc: any) => {
                dispatch(setLoading(false));
                addToast('Document successfully submited', {appearance: "success", autoDismiss: true});
                setNewDocument({ipfsAddress: doc.ipfsAddress});
                initializeForm();
                setDocumentCreated(true);
            })
            .catch(err => {
                dispatch(setLoading(false));
                addToast('Document submit failed', {appearance: "error", autoDismiss: true});
                // initializeForm();
            })
    }

    const handleAcceptedFiles = (files: any) => {
        if(files.length) {
            setFormData((prev: any) => ({...prev, file: files[0]}));
        }
    };

    const initializeForm = () => {
        setFormData({
            name: '',
            description: '',
            comment: '',
            file: null
        })
        setNewDocument({ipfsAddress: ''})

    }

    return (
        <div>
            <p className="text-16 font-bold leading-[24px] text-primary">New Document</p>

            {newDocument.ipfsAddress && 
                <div className="bg-success/30 rounded-lg px-30 py-10 mt-10 text-[16px] text-success-400">
                    <div>New Document Submited</div>
                    <div>IPFS Address: {newDocument.ipfsAddress}</div>
                </div>
            }

            <div className="mt-30">
                <input type="text" className="input" placeholder="Document Name" onChange={(e) => handleChange("name", e.target.value)} value={formData.name}/>
                {validations.name === "has-empty" && <span className="text-12 text-danger pl-[2px]">Document Name Required*</span>}
            </div>

            <div className="mt-30">
                <textarea className="input h-100" placeholder="Description"  onChange={(e) => handleChange("description", e.target.value)} value={formData.description}/>
                {validations.description === "has-empty" && <span className="text-12 text-danger pl-[2px]">Document Description Required*</span>}
            </div>

            <div className="mt-30">
                <textarea className="input h-100" placeholder="Comment"  onChange={(e) => handleChange("comment", e.target.value)} value={formData.comment}/>
                {validations.comment === "has-empty" && <span className="text-12 text-danger pl-[2px]">Document Comment Required*</span>}
            </div>

            <div className="mt-30 rounded-sm border border-primary border-dashed h-190 flex flex-col justify-center items-center cursor-pointer">
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
                            <img src="assets/image/upload-document.png" alt="upload" className="inline-block"/>
                            <p className="text-16 font-bold leading-[24px] text-primary">Drop a file or click to upload</p>
                            <h5>{formData.file && (<span className="text-[25px]"><TiDocument className="inline-block"/>  {formData.file.name}</span>)}</h5>
                        </div>
                        
                        </div>
                    </div>
                    )}
                </Dropzone>
            </div>
            {validations.file === "has-empty" && <span className="text-12 text-danger pl-[2px]">File Required*</span>}

            <div className="mt-30">
                <button className="btn btn-filled w-full" onClick={handleSubmit}>Send</button>
            </div>
        </div>
    )
}

export default SealDocumentForm;