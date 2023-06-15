export interface PropType {
    menus: string[]
}

const BreadCrumbs = (props: PropType) => {
    const { menus } = props;
    return (
        <div className="container mx-auto my-15">
            <div className="text-light text-12 font-normal leading-[18px]">
                <p className="text-right">{ menus.join(' > ') }</p>
            </div>
        </div>
    )
}

export default BreadCrumbs