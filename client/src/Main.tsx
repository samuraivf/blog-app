import React, { Suspense } from 'react'

import LoadingPage from './components/additional/LoadingPage/LoadingPage'
import Routes from './routes/Router'

const Navbar = React.lazy(() => import('./components/Navbar/Navbar'))
const Links = React.lazy(() => import('./components/Links/Links'))

const Main: React.FC = () => {
    return (
        <Suspense fallback={<LoadingPage />}>
            <div className='background' data-testid='background'>
                <Navbar />
                <div className="main">
                    <div className='container'>
                        <Links />
                        <Routes />
                    </div>
                </div>
            </div>
        </Suspense>
    )
}

export default Main
