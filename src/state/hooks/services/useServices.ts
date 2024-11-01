import { useRecoilValue } from "recoil"
import { servicesState } from "../../atom"

export const useServices = () => {
    return useRecoilValue(servicesState);
}