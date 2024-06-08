import {createContext, useState } from "react";


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
