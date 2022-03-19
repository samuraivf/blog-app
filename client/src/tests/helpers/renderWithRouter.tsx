import React from 'react'
import { MemoryRouter } from 'react-router-dom'

type PropTypes = {
    component: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    initialRoute?: string
}

export const RenderWithRouter: React.FC<PropTypes> = ({ component, initialRoute = '/' }) => {
    return (
        <MemoryRouter initialEntries={[initialRoute]}>
            {component}
        </MemoryRouter>
    )
}