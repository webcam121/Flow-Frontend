import Footer from './footer'
import AuthHeader from './header/auth-header'
import { UnauthenticatedWrapper } from './auth-wrapper'

const AuthPageLayout = ({ children }: any) => {
  return (
      <UnauthenticatedWrapper>
        <AuthHeader/>
        <div id="container" className="flex-grow">
          {children}
        </div>
        <Footer/>
      </UnauthenticatedWrapper>
  )
}

export default AuthPageLayout
