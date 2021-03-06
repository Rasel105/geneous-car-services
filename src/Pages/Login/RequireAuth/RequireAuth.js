import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const RequireAuth = ({ children }) => {
     const [user, loading] = useAuthState(auth);
     const location = useLocation();
     const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);
     if (loading) {
          return <Loading />
     }
     if (!user) {
          return <Navigate to='/login' state={{ from: location }} replace></Navigate>
     }

     if (!user.emailVerified) {
          return <div className='text-center mt-5'>
               <h3 className='text-danger'>Your email is not varified!</h3>
               <h5 className='text-success'>Please Varify your email address</h5>
               <button
                    className='btn btn-primary'
                    onClick={async () => {
                         await sendEmailVerification();
                         toast('Sent email');
                    }}
               >
                    Verify varification email again

               </button>
               <ToastContainer />
          </div>

     }

     return children;
};

export default RequireAuth;