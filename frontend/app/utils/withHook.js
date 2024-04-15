import React from 'react'

export const withHook = ( hook, Component ) => {
    return (props) => {
        return <Component {...hook(props)} />
    }
}