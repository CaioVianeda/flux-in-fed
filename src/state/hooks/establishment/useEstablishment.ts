import { useRecoilValue } from "recoil"
import { establishmentState } from "../../atom"

export const useEstablishment = () => {
    return useRecoilValue(establishmentState);
}

