import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../../firebase.init';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const emailRef=useRef();
    const [user,setUser]=useState(false);
    const [error,setError]=useState('');
    const navigate=useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        setUser(false)
        setError('');
        

        signInWithEmailAndPassword(auth, email, password)
        .then(result=>{
            console.log(result);
            if(!result.user.emailVerified){
                setError('Please verify your email first');
                
            }else{
              setUser(result.user);
              navigate('/');
            }
           
        })
        .catch(error=>{
            console.log('Error occured here',error);
            setError(error.message);
        })
        
    }
    const handlForgetPassword=()=>{
      const email=emailRef.current.value;
     
      if(!email){
        setError('Please enter email first');
        return;
      }else{
        sendPasswordResetEmail(auth,email)
        .then(()=>{
          alert('Password reset email sent successfully');
        })
      }

    }
    return (
        <div>
            
            <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' ref={emailRef} placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label onClick={handlForgetPassword} className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
        <p>New here? Please <Link to='/signup'>Sign Up</Link></p>
      </form>
      {
        user && <div className="card-body">
          <h2 className='text-green-600'>User logged in successfully</h2>
          
        </div>
      }
      {
        error && <div className="card-body">
          <h2 className='text-red-500'>{error}</h2>
         
        </div>
      }
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;