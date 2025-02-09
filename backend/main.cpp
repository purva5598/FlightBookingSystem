#include <iostream>
#include <vector>
#include <string>

struct Flight {
    std::string flightID;
    std::string destination;
    bool isBooked;
};

std::vector<Flight> flights = {
    {"F101", "New York", false},
    {"F102", "London", false},
    {"F103", "Paris", false},
    {"F104", "Tokyo", false},
    {"F105", "Dubai", false}
};

// Output available flights as a JSON-like string
void fetchAvailableFlights() {
    std::cout << "[";
    bool first = true;
    for (const auto& flight : flights) {
        if (!flight.isBooked) {
            if (!first) std::cout << ",";
            std::cout << "{\"flightID\":\"" << flight.flightID << "\",\"destination\":\"" << flight.destination << "\"}";
            first = false;
        }
    }
    std::cout << "]\n";
}

// Book a flight
void bookFlight(const std::string& flightID) {
    for (auto& flight : flights) {
        if (flight.flightID == flightID) {
            if (!flight.isBooked) {
                flight.isBooked = true;
                std::cout << "Booking confirmed for Flight " << flightID << "\n";
            } else {
                std::cout << "Error: Flight " << flightID << " is already booked!\n";
            }
            return;
        }
    }
    std::cout << "Error: Flight not found!\n";
}

int main() {
    std::string command;
    while (true) {
        std::cin >> command;

        if (command == "FETCH") {
            fetchAvailableFlights();
        } else if (command == "BOOK") {
            std::string flightID;
            std::cin >> flightID;
            bookFlight(flightID);
        } else if (command == "EXIT") {
            break;
        } else {
            std::cout << "Invalid Command\n";
        }
    }
    return 0;
}
