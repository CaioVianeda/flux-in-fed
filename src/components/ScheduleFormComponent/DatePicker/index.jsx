const DatePicker = ({selectedDate}) => {

  const handleDateChange = (event) => {
    selectedDate(event.target.value)
  };

  const monthsNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const weekNames = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];

  const getNextDays = (numberOfDays) => {
  
    const dates = [];
  
    for (let i = 0; i < numberOfDays; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = getNextDays(60);

  return (
      <select onChange={handleDateChange}>
        {dates.map((date, index) => (
          <option key={index} value={`${date.getFullYear()}-${ (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}` }>
            {`${
              date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
            } de ${monthsNames[date.getMonth()]} de ${date.getFullYear()} | ${
              weekNames[date.getDay()]
            }`}
          </option>
        ))}
      </select>
  );
};

export default DatePicker;