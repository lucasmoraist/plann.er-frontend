import { useRouteError } from "react-router-dom"

export function ErrorPage(){
    const useError = useRouteError();
    console.log(useError);
    
    return(
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>{ useError instanceof Error ? useError.message : "Unknown error occurred" }</p>
        </div>
    )
}