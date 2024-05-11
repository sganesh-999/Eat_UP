import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { EMAIL_PUBLICKEY, EMAIL_SERVICE, EMAIL_TEMPLATE } from '../utils/constants';

function Contact() {
    const form = useRef();
    const name = useRef(null)
    const mail = useRef(null)
    const message = useRef(null)
   
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs
          .sendForm(EMAIL_SERVICE, EMAIL_TEMPLATE, form.current, {
            publicKey: EMAIL_PUBLICKEY,
          })
          .then(
            () => {
                toast.success('Submitted successfully!', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            
              name.current.value=null
              mail.current.value=null
              message.current.value=null
            },
            (error) => {
                toast.error('Error Occurred!', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            console.log('FAILED...', error.text);
            },
          );
      };
  

    
  return (
  
   <div className='bg-white m-1 w-full'>

<div className="relative flex items-top justify-center min-h-screen bg-white sm:items-center sm:pt-0">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
            <div className="mt-1 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6 mr-2 bg-gray-100 sm:rounded-lg">
                        <h1 className="text-4xl sm:text-5xl text-gray-800  font-bold tracking-tight">
                            Get in touch
                        </h1>
                        <p className="text-normal text-lg sm:text-2xl font-medium text-gray-600  mt-2">
                            Fill in the form to start a conversation
                        </p>

                        <div className="flex items-center mt-8 text-gray-600 ">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                Acme Inc, Street, State,
                                Postal Code
                            </div>
                        </div>

                        <div className="flex items-center mt-4 text-gray-600">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                            </svg>
                            <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                +44 1234567890
                            </div>
                        </div>

                        <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                info@acme.org
                            </div>
                        </div>
                    </div>

                    <form ref={form} onSubmit={sendEmail} className="p-6 flex flex-col justify-center">
                        <div className="flex flex-col">
                            
                            <input required ref={name} type="name" name="from_name" id="name" placeholder="Full Name" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-600 font-semibold focus:border-indigo-500 focus:outline-none"/>
                        </div>

                        <div className="flex flex-col mt-2">
                           
                            <input required ref={mail} type="email" name="from_email" id="email" placeholder="Email" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-600 font-semibold focus:border-indigo-500 focus:outline-none"/>
                        </div>

                        <div className="flex flex-col mt-2">
                            
                            <input required ref={message} type="textarea" name="message" id="tel" placeholder="Message" className=" w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-600 font-semibold focus:border-indigo-500 focus:outline-none"/>
                        </div>
                        <input type="submit" value="Send"  className="md:w-32 cursor-pointer bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300"/>
                       
                        <ToastContainer/>
                    </form>
                </div>
            </div>
        </div>
    </div>
   </div>
  )
}

export default Contact
