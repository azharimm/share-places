import React, { useState, useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import {useHttpClient} from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpiner from '../../shared/components/UIElements/LoadingSpinner'

import './PlaceItem.css';

const PlaceItem = (props) => {
    const auth = useContext(AuthContext);
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient()

    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);
    const showDeleteWarningHandler = () => setShowConfirmModal(true)
    const hideDeleteWarningHandler = () => setShowConfirmModal(false);
    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(
                `http://localhost:5000/api/places/${props.id}`,
                'DELETE'
            )
            props.onDelete(props.id)
        }catch(e) {}
    };
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-contents"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>Cancel</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal>
            <Modal
                show={showConfirmModal}
                onCancel={hideDeleteWarningHandler}
                header="Are you sure ?"
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={hideDeleteWarningHandler}>
                            CANCEL
                        </Button>
                        <Button danger onClick={confirmDeleteHandler}>
                            DELETE
                        </Button>
                    </React.Fragment>
                }
            >
                <p>Do you really want to delete this?</p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    {isLoading && <LoadingSpiner asOverlay />}
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button onClick={openMapHandler} inverse>
                            VIEW ON MAP
                        </Button>
                        {auth.userId === props.creatorId && (
                            <Button to={`/places/${props.id}`}>EDIT</Button>
                        )}
                        {auth.userId === props.creatorId && (
                            <Button danger onClick={showDeleteWarningHandler}>
                                DELETE
                            </Button>
                        )}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PlaceItem;
