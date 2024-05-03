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
const ScheduleOption = (props) => {
    return(
        <ScheduleOptionButton onClick={() => props.selectedTime(props.time)}>
            {props.time}
        </ScheduleOptionButton>
    );
}
export default ScheduleOption;
