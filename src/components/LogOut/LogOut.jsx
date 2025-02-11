import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.init';

const LogOut = () => {
    const navigate=useNavigate();
    useEffect(()=>{
        signOut(auth)
        .then(()=>{
            navigate('/signin');
        }).catch(error=>{
            console.log('Error occured here',error);
        })
    },[navigate])
    return (
        <div>
            <h2>Logging Out</h2>
        </div>
    );
};

export default LogOut;