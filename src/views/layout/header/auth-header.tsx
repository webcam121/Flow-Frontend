const AuthHeader = () => {
    return (
        <>
            <div className="h-80 bg-primary">
                <div className="container h-full mx-auto flex justify-between">
                    <div className="h-full flex items-center">
                        <img src="/assets/svg/logo.svg" alt="logo" />
                    </div>
                    <div className="h-full hidden md:flex items-center ">
                        <div className="text-white mx-15 cursor-pointer">
                            <img src="/assets/svg/user.svg" alt="search" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthHeader