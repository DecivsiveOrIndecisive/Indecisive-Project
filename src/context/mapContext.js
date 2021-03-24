import { createContext, useEffect, useState } from "react"
import { useHistory, useLocation, withRouter } from "react-router"


export const MapContext = createContext()
export const MapProvider = (props => {


    return (
        <MapContext.Provider>
            {props.children}
        </MapContext.Provider>
    )

})