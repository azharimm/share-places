import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Azhari',
            image:
                'https://www.greenscene.co.id/wp-content/uploads/2019/09/Zoro-One-Piece.jpg',
            places: 3
        }
    ];
    return <UsersList items={USERS} />;
};

export default Users;
