export const buildSearchRequest = (data) => {
    return {
        bloodGroup: data.bloodGroup || '',
        geoLocation: {
            address: data.address || '',
            city: data.city || '',
            district: data.district || '',
            latitude: data.latitude || null,
            longitude: data.longitude || null,
            zipcode: data.zipcode || ''
        },
        radius: data.radius || 10,
        receiverEmail: data.receiverEmail || '',
        receiverPhone: data.receiverPhone || '',
        emergencyLevel: data.emergencyLevel || 'NORMAL',
        requestDescription: data.requestDescription || '',
        hospitalName: data.hospitalName || ''
    };
};

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    reject(error);
                }
            );
        } else {
            reject(new Error("Geolocation not supported"));
        }
    });
};