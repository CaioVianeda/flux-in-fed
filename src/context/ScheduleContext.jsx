import { ReactNode, createContext, useState } from "react";

// interface ScheduleContextType{
//     clientId: number | undefined,
//     setClientId: React.Dispatch<React.SetStateAction<number | undefined>>
//     selectedService: number | undefined, 
//     setSelectedService: React.Dispatch<React.SetStateAction<number | undefined>>,
//     selectedBarber: number | undefined, 
//     setSelectedBarber: React.Dispatch<React.SetStateAction<number | undefined>>,
//     selectedDateTime: string | undefined, 
//     setSelectedDateTime: React.Dispatch<React.SetStateAction<string | undefined>>,
// }

// interface ScheduleContextType{
//    schedule: ISchedule;
//    updateSchedule: (schedule:ISchedule) => void;
// }

// interface ISchedule{
//     clientId?: number;
//     selectedService?: number;   
//     selectedBarber?: number;  
//     selectedDateTime?: number;
// }

// type ScheduleContextProps = {
//     children: ReactNode
// }

export const ScheduleContext  = createContext();
ScheduleContext.displayName= "Schedule";



export default function ScheduleProvider({children}) {
    const [clientId, setClientId] = useState();
    const [selectedService, setSelectedService] = useState();
    const [selectedBarber, setSelectedBarber] = useState();
    const [selectedDateTime, setSelectedDateTime] = useState();

    return(
        <ScheduleContext.Provider value={{clientId, setClientId,selectedService,setSelectedService, selectedBarber, setSelectedBarber, selectedDateTime,setSelectedDateTime}}>
        {/* <ScheduleContext.Provider value={{...schedule, updateSchedule}}> */}
            {children}
        </ScheduleContext.Provider>
    )

}
