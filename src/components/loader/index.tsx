import Spinner from 'react-spinners/MoonLoader'

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 w-screen h-screen flex justify-center items-center bg-slate-500">
            <Spinner size={60} color="#000000" />
        </div>
    )
}

export default Loader;