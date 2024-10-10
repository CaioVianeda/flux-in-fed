import { useRecoilState, useRecoilValue } from "recoil"
import { clientsState } from "../../atom"

export const useClientsList = () => {
    return useRecoilValue(clientsState);
}