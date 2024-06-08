import styled from "styled-components"

const TimeButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #000;
    border-radius: 10px;
    width: 50px;
    height: 30px;
    cursor: pointer;
`

interface TimeProps {
    time: string,
    selectedTime: (time: string) => void
}

const TimePicker = ({time, selectedTime}: TimeProps) => {
    return(
        <TimeButton onClick={() => selectedTime(time)}>
            {time}
        </TimeButton>
    );
}
export default TimePicker;
