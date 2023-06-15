import { useEffect } from "react";

interface DiagramProps {
    stage: any,
    task: any
}
const CertificateDiagram : React.FC<DiagramProps> = ({stage, task}) => {

    useEffect(() => {
        console.log('task: ', task);
    }, [stage, task])

    return (
        <div>
            <div>
                <div className="flex justify-center items-center">
                    <img src={
                        stage > 0 ? '/assets/svg/double-circle-enabled.svg' : '/assets/svg/double-circle-disabled.svg'}
                        alt="double circle" />
                </div>
                <div className="flex justify-center items-center mt-[-10px] relative">
                    <img src={
                        stage > 0 ? '/assets/svg/long-down-arrow-enabled.svg' : '/assets/svg/long-down-arrow-disabled.svg'}
                        alt="double circle" />
                    <span className={"w-120 py-[3px] text-12 font-normal leading-[18px] text-center rounded-full text-white absolute" + (stage > 0 ? " bg-success": " bg-secondary")}>Requested</span>
                </div>
            </div>

            <div>
                <div className="mt-5 flex justify-center items-center">
                    <img src={
                        stage > 1 ? '/assets/svg/double-circle-enabled.svg' : '/assets/svg/double-circle-disabled.svg'}
                        alt="double circle" />
                </div>
                <div className="flex justify-center items-center mt-[-10px] relative">
                    <img src={
                        stage > 1 ? '/assets/svg/long-down-arrow-enabled.svg' : '/assets/svg/long-down-arrow-disabled.svg'}
                        alt="double circle" />
                    <span className={"w-120 py-[3px] text-12 font-normal leading-[18px] text-center rounded-full text-white absolute" + (stage > 1 ? " bg-success": " bg-secondary")}>Assigned</span>
                </div>
            </div>
            
            <div>
            <div className="mt-5 flex justify-center items-center">
                    <img src={
                        stage > 2 ? '/assets/svg/double-circle-enabled.svg' : '/assets/svg/double-circle-disabled.svg'}
                        alt="double circle" />
                </div>
                <div className="flex justify-center items-center mt-[-10px] relative">
                    <img src={
                        stage > 2 ? '/assets/svg/long-down-arrow-enabled.svg' : '/assets/svg/long-down-arrow-disabled.svg'}
                        alt="double circle" />
                    <span className={"w-120 py-[3px] text-12 font-normal leading-[18px] text-center rounded-full text-white absolute" + (stage > 2 ? " bg-success": " bg-secondary")}>In Progress</span>
                </div>
            </div>
            
            <div className="grid grid-cols-3">
                <div className="relative">
                    <div className={"absolute border-t-2 top-0 left-[50%] right-0" + (stage === 5 ? " border-t-danger" : " border-t-secondary")} />
                    <div className="flex justify-center items-center relative">
                        <img src={
                            stage === 5 ? '/assets/svg/long-down-arrow-danger.svg' : '/assets/svg/long-down-arrow-disabled.svg'}
                            alt="double circle" className="h-[100px]"/>
                        <span className={"px-10 py-[3px] text-12 font-normal leading-[18px] text-center rounded-full text-white absolute" + (stage === 5 ? " bg-danger" : " bg-secondary")}>Rejected</span>
                    </div>
                    <div className="mt-5 flex justify-center items-center">
                        <img src={
                            stage === 5 ? '/assets/svg/double-circle-danger.svg' : '/assets/svg/double-circle-disabled.svg'}
                            alt="double circle" />
                    </div>
                </div>
                <div className="relative">
                    <div className={"absolute border-t-2 top-0 left-0 right-[50%]" + (stage === 5 ? " border-t-danger" : " border-t-secondary")} />
                    <div className={"absolute border-t-2 top-0 left-[50%] right-0" + (stage === 6 ? " border-t-danger" : " border-t-secondary")} />
                    <div className="flex justify-center items-center relative">
                        <img src={
                            stage === 4 ? '/assets/svg/long-down-arrow-enabled.svg' : '/assets/svg/long-down-arrow-disabled.svg'}
                            alt="double circle" className="h-[100px]" />
                        <span className={"px-10 py-[3px] text-12 font-normal leading-[18px] text-center rounded-full text-white absolute" + (stage === 4 ? " bg-success" : " bg-secondary")}>Approved and Deployed in Blockchain</span>
                    </div>
                    <div className="mt-5 flex justify-center items-center">
                        <img src={
                            stage === 4 ? '/assets/svg/double-circle-enabled.svg' : '/assets/svg/double-circle-disabled.svg'}
                            alt="double circle" />
                    </div>
                </div>
                <div className="relative">
                    <div className={"absolute border-t-2 top-0 left-0 right-[50%]" + (stage === 6 ? " border-t-danger" : " border-t-secondary")} />
                    <div className="flex justify-center items-center relative">
                        <img src={
                            stage === 6 ? '/assets/svg/long-down-arrow-danger.svg' : '/assets/svg/long-down-arrow-disabled.svg'}
                            alt="double circle" className="h-[100px]" />
                        <span className={"px-10 py-[3px] text-12 font-normal leading-[18px] text-center rounded-full text-white absolute" + (stage === 6 ? " bg-danger" : " bg-secondary")}>Cancelled</span>
                    </div>
                    <div className="mt-5 flex justify-center items-center">
                        <img src={
                            stage === 6 ? '/assets/svg/double-circle-danger.svg' : '/assets/svg/double-circle-disabled.svg'}
                            alt="double circle" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CertificateDiagram;