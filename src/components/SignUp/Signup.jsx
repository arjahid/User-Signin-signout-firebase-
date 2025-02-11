import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../../firebase.init';
import { Link } from 'react-router-dom';

const Signup = () => {
  
    const [user,setUser]=useState(false);
    const [error,setError]=useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        setError('');
        setUser(false)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
                if(!passwordRegex.test(password)){
                    setError('Password should contain minimum six characters, at least one uppercase letter, one lowercase letter and one number')
                    return;
                }

        createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            console.log(result);
            setUser(result.user);
            sendEmailVerification(auth.currentUser)
            .then(()=>{
                console.log('Email sent successfully');
            })
        })
        .catch(error=>{
            console.log('Error occured here',error);
            setError(error.message);
        })
        
    }
   
    return (
        <div>
            <h2>Please sign UP</h2>
            <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">SignUp now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email'  placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label  className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
        <p>Already signUp? Please <Link to='/signin'>Login</Link></p>
      </form>
      
      {
        user && <div className="card-body">
          <p className='text-green-400'>Account created successfully</p>
          <p><small className='text-green-400'>Check your email to veryfy</small></p>
      
        </div>
      }
      
      {
        error && <div className="card-body">
            <p className='text-red-500'>{error}</p>
        </div>
      }
    </div>
  </div>
</div>
        </div>
    );
};

export default Signup;