import appUrl from "../../constants/appUrl.ts";
import Header from "../../components/Header.tsx";

export default function CreateTicket(){
    return (
        <>
            {Boolean(window.location.href === `${appUrl}/create-ticket`) && (
                <Header />
            )}
            <h1>Create ticket form.</h1>
        </>
    )
}