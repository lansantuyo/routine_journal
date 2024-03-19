import React from 'react'

interface Props {
    children: React.ReactNode
}

const Header = ({children}: Props) => {
    return (
        <div style={{position: "relative", display: "flex", alignItems: "center"}}>

            <div className='flex-item'>
                <h1>Calendar Here</h1>
            </div>

            <div className='flex-item'>
                <h2 style={{textAlign: "left"}}>
                    Journal of
                </h2>
                <h1 style={{textAlign: "left"}}>
                    {children}
                </h1>
            </div>

            <div className='flex-item'>
                <h1>Hamburger Here</h1>
            </div>

        </div>
    )
}

export default Header