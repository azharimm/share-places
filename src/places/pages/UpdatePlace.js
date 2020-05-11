import React, { useEffect, useState } from 'react';
import './Placeform.css';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/form-hook'

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
        title: 'Emp State Building',
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

const UpdatePlace = () => {
    const placeId = useParams().placeId;
    const [isLoading, setIsLoading] = useState(true)

    
    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false)
    
    const identifiedPlace = DUMMY_PLACE.find((p) => p.id === placeId);
    useEffect(() => {
        if(identifiedPlace) {
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                },
                description: {
                    value: identifiedPlace.description,
                    isValid: true
                }
            }, true)
            setIsLoading(false)
        }
    }, [setFormData, identifiedPlace])

    const placeUpdateSubmitHandler = e => {
        e.preventDefault()
        console.log(formState.inputs)
    }

    if (!identifiedPlace) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        );
    }

    if(isLoading) {
        return (
            <div className="center">
                <h2>Loading. . .</h2>
            </div>
        )
    }

    return (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
            <Input
                id="description"
                element="textarea"
                type="text"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (min 5 characters)."
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>Update Place</Button>
        </form>
    );
};

export default UpdatePlace;
