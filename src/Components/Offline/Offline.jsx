import useIsOnline from "../../hooks/Isonline/Isonline"
export default function Offline({ children }) {
    let isOnline = useIsOnline()
    if (isOnline) return children
    if (!isOnline) return <>
        <div className="w-24 h-24 flex justify-center items-center fixed top-24 rounded-md left-10 z-[999999]">
            <div id="wifi-loader">
                <svg class="circle-outer" viewBox="0 0 86 86">
                    <circle class="back" cx="43" cy="43" r="40"></circle>
                    <circle class="front" cx="43" cy="43" r="40"></circle>
                    <circle class="new" cx="43" cy="43" r="40"></circle>
                </svg>
                <svg class="circle-middle" viewBox="0 0 60 60">
                    <circle class="back" cx="30" cy="30" r="27"></circle>
                    <circle class="front" cx="30" cy="30" r="27"></circle>
                </svg>
                <svg class="circle-inner" viewBox="0 0 34 34">
                    <circle class="back" cx="17" cy="17" r="14"></circle>
                    <circle class="front" cx="17" cy="17" r="14"></circle>
                </svg>
                <div class="text" data-text="Searching"></div>
            </div>
        </div>
        {children}
    </>
}