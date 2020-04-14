import React from 'react';
import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom'

const DUMMY_PLACE = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'The most blblbalabala',
        imageUrl:
            'https://cropper.watch.aetnd.com/public-content-aetn.video.aetnd.com/video-thumbnails/AETN-History_VMS/21/202/tdih-may01-HD.jpg?w=1440',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878531
        },
        creatorId: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'The most blblbalabala',
        imageUrl:
            'https://cropper.watch.aetnd.com/public-content-aetn.video.aetnd.com/video-thumbnails/AETN-History_VMS/21/202/tdih-may01-HD.jpg?w=1440',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878531
        },
        creatorId: 'u2'
    }
];

const UserPlaces = () => {
    const userId = useParams().userId
    const loadedPlaces = DUMMY_PLACE.filter(place => place.creatorId === userId)
    return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
