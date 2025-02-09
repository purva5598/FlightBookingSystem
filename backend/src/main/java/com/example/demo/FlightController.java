package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "http://localhost:5173")
public class FlightController {
    @Autowired
    private FlightRepository flightRepository;

    @PostMapping("/book")
    public Flight bookTicket(@RequestBody Flight flight) {
        return flightRepository.save(flight);
    }

    @GetMapping("/recent")
    public List<Flight> getRecentBookings() {
        return flightRepository.findAll();
    }

    @GetMapping("/available")
    public List<String> getAvailableFlights() {
        return List.of("AI202", "6E305", "SG101", "UK752", "G8394");
    }

    @DeleteMapping("/cancel/{id}")
    public void cancelBooking(@PathVariable Long id) {
        flightRepository.deleteById(id);
    }

}
