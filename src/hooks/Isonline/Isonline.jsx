import { useState } from "react"
export default function useIsOnline() {
    //? My variables 
    const [online, setOnline] = useState(true)
    //! Check internet connection ====>
    window.addEventListener("offline", function () {
        setOnline(false)
    })
    window.addEventListener("online", function () {
        setOnline(true)
    })
    return online
}