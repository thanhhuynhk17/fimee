import React from 'react'

function Layout({className, children}) {
    return (
        <div className={`${className?className:''}`}>
            {children}
        </div>
    )
}

export default Layout