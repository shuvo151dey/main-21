import React from 'react';
import Genres from "./Components/genres.js";
import EventsContainer from "./Store/store.js";
import "../../Styles/events.sass";

const Events = () => {
    return (
        <div className="events-wrapper" id="events-wrapper">
            <EventsContainer.Provider>
                <Genres />
            </EventsContainer.Provider>
        </div>
    )
}

export default Events;