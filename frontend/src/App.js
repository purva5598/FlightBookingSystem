import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [flights, setFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [passport, setPassport] = useState("");
    const [numTickets, setNumTickets] = useState(1);
    const [bookedFlights, setBookedFlights] = useState([]);

    // Mock data to simulate API response
    const mockFlights = [
        { flightID: "F101", destination: "New York" },
        { flightID: "F102", destination: "London" },
        { flightID: "F103", destination: "Paris" }
    ];

    const fetchFlights = () => {
        // Simulate an API response
        setTimeout(() => {
            setFlights(mockFlights);
        }, 500); // Simulate network delay
    };

    const bookFlight = () => {
        if (!name || !age || !passport || !numTickets || !selectedFlight) {
            alert("Please fill in all fields.");
            return;
        }

        const date = new Date();
        const bookingTime = date.toLocaleString();

        const newBooking = {
            name,
            age,
            passport,
            numTickets,
            flight: flights.find((flight) => flight.flightID === selectedFlight),
            bookingTime
        };

        setBookedFlights((prevBooked) => [...prevBooked, newBooking]);
        setFlights((prevFlights) =>
            prevFlights.filter((flight) => flight.flightID !== selectedFlight)
        );

        // Clear the form
        setName("");
        setAge("");
        setPassport("");
        setNumTickets(1);
        setSelectedFlight("");
    };

    useEffect(() => {
        fetchFlights();
    }, []);

    return (
        <div className="app">
            <h1>Flight Booking System</h1>

            <div className="available-flights">
                <h2>Available Flights</h2>
                <ul>
                    {flights.map((flight) => (
                        <li key={flight.flightID}>
                            <strong>{flight.flightID}</strong> - {flight.destination}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="booking-form">
                <h2>Book a Flight</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        bookFlight();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Your Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Passport Number"
                        value={passport}
                        onChange={(e) => setPassport(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Number of Tickets"
                        value={numTickets}
                        onChange={(e) => setNumTickets(e.target.value)}
                        min="1"
                        required
                    />
                    <select
                        value={selectedFlight}
                        onChange={(e) => setSelectedFlight(e.target.value)}
                        required
                    >
                        <option value="">Select Flight</option>
                        {flights.map((flight) => (
                            <option key={flight.flightID} value={flight.flightID}>
                                {flight.flightID} - {flight.destination}
                            </option>
                        ))}
                    </select>
                    <button type="submit">Book Flight</button>
                </form>
            </div>

            <div className="booked-flights">
                <h2>Booked Flights</h2>
                {bookedFlights.length === 0 ? (
                    <p>No flights booked yet.</p>
                ) : (
                    <ul>
                        {bookedFlights.map((booking, index) => (
                            <li key={index}>
                                <strong>{booking.flight.flightID}</strong> - {booking.flight.destination}  
                                <br />
                                <strong>Passenger:</strong> {booking.name} ({booking.age} years old)  
                                <br />
                                <strong>Passport:</strong> {booking.passport}  
                                <br />
                                <strong>Tickets:</strong> {booking.numTickets}  
                                <br />
                                <strong>Booking Time:</strong> {booking.bookingTime}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default App;
