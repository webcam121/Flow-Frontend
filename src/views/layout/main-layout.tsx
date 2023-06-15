import Header from './header'
import Footer from './footer'
import { AuthenticatedWrapper } from './auth-wrapper'

const MainPageLayout = ({ children }: any) => {
  return (
      <AuthenticatedWrapper>
        <Header/>
        <div id="container" className="flex-grow">
          {children}
        </div>
        <Footer/>
      </AuthenticatedWrapper>
  )
}

export default MainPageLayout
