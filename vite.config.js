/// <reference types="vitest"/>
/// <reference types="vite/client"/>

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],

//   test:{
//     globals:true,
//     environment:"jsdom",
//     css:true
//   }
    
  
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   test: {
//     // 👋 add the line below to add jsdom to vite
//     environment: 'jsdom',
//     // hey! 👋 over here
//     globals: true,
//     setupFiles: './tests/setup.js', // assuming the test folder is in the root of our project
//   }
// })

// import { defineConfig,loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig(
  
//   {
//   plugins: [react()],
//   test: {
//     // 👋 add the line below to add jsdom to vite
//     environment: 'jsdom',
//     // hey! 👋 over here
//     globals: true,
//     setupFiles: './tests/setup.js', // assuming the test folder is in the root of our project
//   }
// })

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { json } from 'react-router-dom';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
     'process.env.FIREBASE_APIKEY' : JSON.stringify(env.FIREBASE_APIKEY),
     'process.env.FIREBASE_AUTHDOMAIN' : JSON.stringify(env.FIREBASE_AUTHDOMAIN),
     'process.env.FIREBASE_PROJECTID ' : JSON.stringify(env.FIREBASE_PROJECTID),
     'process.env.FIREBASE_STORAGEBUCKET' : JSON.stringify(env.FIREBASE_STORAGEBUCKET),
     'process.env.FIREBASE_MESSAGINGSENDERID' : JSON.stringify(env.FIREBASE_MESSAGINGSENDERID),
     'process.env.FIREBASE_APPID' : JSON.stringify(env.FIREBASE_APPID),
      'process.env.EMAIL_SERVICE': JSON.stringify(env.EMAIL_SERVICE),
       'process.env.EMAIL_TEMPLATE':JSON.stringify(env.EMAIL_TEMPLATE),
       'process.env.EMAIL_PUBLICKEY':JSON.stringify(env.EMAIL_PUBLICKEY),

    },
    plugins: [react()],
    
    test: {
          // 👋 add the line below to add jsdom to vite
          environment: 'jsdom',
          // hey! 👋 over here
          globals: true,
          setupFiles: './tests/setup.js', // assuming the test folder is in the root of our project
        }

  }
})