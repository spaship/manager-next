import { FunctionComponent } from "react";
import Header from "./header";

interface LinkProps {
    title: string,
    path: string
}
interface BodyProps {
    breadcrumbs?: LinkProps[],
    buttons?: LinkProps[],
    previous?: string,
    settings?: string,
    title?: string,
}
 
const Body: FunctionComponent<BodyProps> = ({children, ...props}) => {
    return ( 
        <>
            <Header {...props} />
            <div className="page-body">{children}</div>
        </>
     );
}
 
export default Body;