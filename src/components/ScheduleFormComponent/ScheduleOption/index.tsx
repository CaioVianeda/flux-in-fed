import styled from "styled-components"

const ScheduleOptionButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #000;
    border-radius: 10px;
    width: 50px;
    height: 30px;
    cursor: pointer;
`

interface ScheduleOptionProps {
    time: string,
    selectedTime: (time: string) => void
}

const ScheduleOption = ({time, selectedTime}: ScheduleOptionProps) => {
    return(
        <ScheduleOptionButton onClick={() => selectedTime(time)}>
            {time}
        </ScheduleOptionButton>
    );
}
export default ScheduleOption;
