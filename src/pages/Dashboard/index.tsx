import { useEffect, useState } from "react";
import { IBarber } from "../../shared/interfaces/IBarber";
import api from "../../service/api";
import { ISchedule } from "../../shared/interfaces/ISchedule";
import "./style.css";
import Header from "./Header";
import NavBar from "./NavBar";
import FilterMenu from "./FilterMenu";
import ServiceCard from "./ServiceCard";
import ServiceList from "./ServiceList";

const Dashboard = () => {

  const [barber, setBarber] = useState<IBarber>();
  const [filter, setFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<Date>(new Date());

  
  function showSchedulingTime(date: Date) {
    return `${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }h`;
  }

  return (
    <main className="container-main">
      <NavBar />
      <div className="main">
        <Header barber="Igor" barberShop="Silva's" pageName="Agenda" />
        <div id="container">
          <div id="container__services">
            <div id="container__services__header">
              <p> 04 - Junho (Sexta-Feira) </p>
              <input type="text" />
            </div>
            <div id="container__services__card">
              <ServiceList filter={filter} dateFilter={dateFilter}/>
            </div>
          </div>
          <FilterMenu
            filter={filter}
            setFilter={setFilter}
            setDateFilter={setDateFilter}
          />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
