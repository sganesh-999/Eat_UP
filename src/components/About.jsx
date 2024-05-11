import React from 'react'
import User from './User'
import UserClass from './UserClass'

function About() {
  return (
    <div className=' bg-slate-300 w-90
    m-10 p-10 rounded-lg'>
    <h1 className=' m-5 text-center font-extrabold text-5xl'>About</h1>
    <UserClass/>
    </div>
  )
}

export default About
