import { useSetRecoilState } from "recoil"
import { IService } from "../../../shared/interfaces/IService"
import { servicesState } from "../../atom"

export const useSetServices = () => {
    const setServices = useSetRecoilState(servicesState);
    return (services: IService[]) => {  
        setServices(services);
    }
}