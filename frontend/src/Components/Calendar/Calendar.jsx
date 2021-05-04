import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import { useEffect, useState } from "react";
import axios from "axios";
const Calendar = ({token, refresh, openEventsOfTheDay, date}) => {
    
    const [events,setEvents] = useState([]);

    const fetchData = async () => {
        const eventsData = await axios.get("/api/user/events/", {
            headers: { Authorization: "Token " + token },
          });
        let allEvents = [];
        eventsData.data.map(e => {
            allEvents.push({title: " ", date:e.date});
        });
        const filtered = [...new Map(allEvents.map(item => [item["date"], item])).values()];

        setEvents(filtered);
      }
    
      useEffect(() => {
        fetchData();
      }, [refresh]);

    const  handleDateClick = (arg) => {
        date(arg.dateStr)
        openEventsOfTheDay(true);
    }

  return (
    <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin  ]}
        initialView="dayGridMonth"
        headerToolbar={ {
            left: 'title',
            center: '',
            right: 'prev,next'
          }}
        locale="cs"
        height="100vh"
        eventDisplay="list-view"
        events={events}
        dateClick={handleDateClick}
        
      />
  );
}

export default Calendar;