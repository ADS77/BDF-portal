export class DonorSearchService {
    static async searchDonors(searchRequest) {
        try {
            const response = await fetch(`http://localhost:8088/api/search/eligible-donors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchRequest)
            });

            if (!response.ok) {
                throw new Error('Search failed');
            }

            const result = await response.json();
            console.log("Search Response : ", result);

            return {
                success: true,
                data: result.data.data,
                count: result.data.count,
                message: 'Search successful'
            };
        } catch (error) {
            console.error('Donor search error:', error);
            return {
                success: false,
                error: error.message,
                message: error.message || 'Network error. Please try again.',
                data: [],
                count: 0
            };
        }
    }


    static getBloodGroupInfo(bloodGroupEnum) {
        const bloodGroupMap = {
            'A_POSITIVE': {
                display: 'A+',
                canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
                canDonateTo: ['A+', 'AB+']
            },
            'A_NEGATIVE': {
                display: 'A-',
                canReceiveFrom: ['A-', 'O-'],
                canDonateTo: ['A+', 'A-', 'AB+', 'AB-']
            },
            'B_POSITIVE': {
                display: 'B+',
                canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
                canDonateTo: ['B+', 'AB+']
            },
            'B_NEGATIVE': {
                display: 'B-',
                canReceiveFrom: ['B-', 'O-'],
                canDonateTo: ['B+', 'B-', 'AB+', 'AB-']
            },
            'AB_POSITIVE': {
                display: 'AB+',
                canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
                canDonateTo: ['AB+']
            },
            'AB_NEGATIVE': {
                display: 'AB-',
                canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'],
                canDonateTo: ['AB+', 'AB-']
            },
            'O_POSITIVE': {
                display: 'O+',
                canReceiveFrom: ['O+', 'O-'],
                canDonateTo: ['A+', 'B+', 'AB+', 'O+']
            },
            'O_NEGATIVE': {
                display: 'O-',
                canReceiveFrom: ['O-'],
                canDonateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
            }
        };
        return bloodGroupMap[bloodGroupEnum] || null;
    }
    static calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    static toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
}