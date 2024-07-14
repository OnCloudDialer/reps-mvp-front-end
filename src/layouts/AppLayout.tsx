import React from 'react'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full flex items-center justify-center h-screen">
            {children}
        </div>
    )
}

export default AppLayout