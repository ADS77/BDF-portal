import React, { useState } from 'react';
import { Search, MapPin, Droplet, Star, Calendar, User, Send } from 'lucide-react';

export const mockDonors = [
    {
        id: 1,
        name: "Ahmed Hassan",
        bloodGroup: "A+",
        location: "Dhanmondi, Dhaka",
        address: "House 12, Road 5, Dhanmondi",
        rating: 4.8,
        lastDonation: "2024-09-15",
        totalDonations: 12,
        available: true,
        phone: "+880 1712-345678",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed"
    },
    {
        id: 2,
        name: "Fatima Rahman",
        bloodGroup: "A+",
        location: "Gulshan, Dhaka",
        address: "Plot 45, Gulshan Avenue",
        rating: 4.9,
        lastDonation: "2024-10-01",
        totalDonations: 8,
        available: true,
        phone: "+880 1823-456789",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima"
    },
    {
        id: 3,
        name: "Karim Abdullah",
        bloodGroup: "A+",
        location: "Mirpur, Dhaka",
        address: "Section 10, Mirpur",
        rating: 4.7,
        lastDonation: "2024-08-20",
        totalDonations: 15,
        available: true,
        phone: "+880 1934-567890",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim"
    },
    {
        id: 4,
        name: "Nadia Islam",
        bloodGroup: "A+",
        location: "Uttara, Dhaka",
        address: "Sector 7, Uttara",
        rating: 5.0,
        lastDonation: "2024-09-28",
        totalDonations: 6,
        available: true,
        phone: "+880 1645-678901",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nadia"
    },
    {
        id: 5,
        name: "Rahim Uddin",
        bloodGroup: "B+",
        location: "Banani, Dhaka",
        address: "Road 11, Banani",
        rating: 4.6,
        lastDonation: "2024-09-10",
        totalDonations: 10,
        available: true,
        phone: "+880 1756-789012",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahim"
    }
];