import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [availableFlights, setAvailableFlights] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState("");
  const [passengerName, setPassengerName] = useState("");

  useEffect(() => {
    fetchAvailableFlights();
    fetchRecentBookings();
  }, []);

  const fetchAvailableFlights = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/flights/available");
      setAvailableFlights(response.data);
    } catch (error) {
      console.error("Error fetching available flights:", error);
    }
  };

  const fetchRecentBookings = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/flights/recent");
      setRecentBookings(response.data);
    } catch (error) {
      console.error("Error fetching recent bookings:", error);
    }
  };

  const bookTicket = async () => {
    if (!passengerName || !selectedFlight) {
      alert("Please enter a passenger name and select a flight.");
      return;
    }
    try {
      const newFlight = { passengerName, flightNumber: selectedFlight };
      await axios.post("http://localhost:8080/api/flights/book", newFlight);
      setPassengerName("");
      setSelectedFlight("");
      fetchRecentBookings();
      setAvailableFlights(availableFlights.filter(flight => flight !== selectedFlight));
    } catch (error) {
      console.error("Error booking ticket:", error);
    }
  };

  const cancelBooking = async (id, flightNumber) => {
    try {
      await axios.delete(`http://localhost:8080/api/flights/cancel/${id}`);
      fetchRecentBookings();
      setAvailableFlights([...availableFlights, flightNumber]);
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  return (
    <div className="container">
      <h1>Flight Booking System</h1>
      <div>
        <input
          type="text"
          placeholder="Passenger Name"
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
        />
        <select
          value={selectedFlight}
          onChange={(e) => setSelectedFlight(e.target.value)}
        >
          <option value="">Select a Flight</option>
          {availableFlights.map((flight) => (
            <option key={flight} value={flight}>
              {flight}
            </option>
          ))}
        </select>
        <button onClick={bookTicket}>Book Ticket</button>
      </div>
      <h2>Recent Bookings</h2>
      <ul>
        {recentBookings.map((flight) => (
          <li key={flight.id}>
            {flight.passengerName} - {flight.flightNumber}
            <button
              className="cancel-button"
              onClick={() => cancelBooking(flight.id, flight.flightNumber)}
            >
              Cancel
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
