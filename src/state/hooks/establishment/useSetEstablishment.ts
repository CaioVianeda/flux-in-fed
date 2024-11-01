import { useSetRecoilState } from "recoil"
import { IBarberShop as IEstablishment} from "../../../shared/interfaces/IBarberShop"
import { establishmentState } from "../../atom"

export const useSetEstablishment = () => {
    const setEstablishment = useSetRecoilState(establishmentState);
    return (establishment: IEstablishment) => { 
        setEstablishment(establishment);
    }
}