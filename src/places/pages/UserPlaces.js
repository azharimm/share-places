import React, {useState, useEffect} from 'react';
import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpiner from '../../shared/components/UIElements/LoadingSpinner'


const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState([])
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const userId = useParams().userId

    useEffect(() => {
        const fetchPlaces = async() => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/places/user/${userId}`,
                )
                setLoadedPlaces(responseData.places)
            }catch(e) {}
        }
        fetchPlaces()
    }, [sendRequest, userId]);

    const placeDeletedHandler = (deletedPlaceId) => {
        setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId))
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}  />
            {isLoading && <LoadingSpiner asOverlay />}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDelete={placeDeletedHandler} />}
        </React.Fragment>
    );
};

export default UserPlaces;
