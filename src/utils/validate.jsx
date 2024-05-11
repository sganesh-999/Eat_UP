export const checkValidateData = (name,email,password, isSignInForm)=>{
    if(!isSignInForm){
        const isNameValid = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/.test(name)
        
        if(!isNameValid) return "Name is not valid"
    }
   
    const isEmailValid =/^([a-zA-Z0-9._%-]+@[a-zA-Z0-0,-]+\.[a-zA-Z]{2,})$/.test(email)
    const isPasswordValid =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
    if(!isEmailValid) return "Email Id is not valid"
    if(!isPasswordValid)return "Password is not valid"

    return null
}