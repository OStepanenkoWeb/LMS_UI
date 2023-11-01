import {ReactNode} from "react";
import {Provider} from "react-redux";
import {store} from "@/redux/store";


interface IProvider {
    children: ReactNode
}

export function Providers({children}: IProvider){
    return <Provider store={store}>{children}</Provider>
}