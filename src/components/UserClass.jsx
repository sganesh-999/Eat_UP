import React from "react"
import UserContext from "../utils/UserContext"
class UserClass extends React.Component{

    constructor(props){
        super(props)

        this.state={
            userInfo:{
                name:"XXXX",
                location:"XXXX",
                login:"XXX@x"
            }
        }
    }

    async componentDidMount(){
        const data = await fetch(
            "https://api.github.com/users/sganesh-999"
        )
        const json = await data.json()

        this.setState({
            userInfo:json
        })
    }

    render(){

       const {name,location,login} = this.state.userInfo
       return(
        <div className=' m-10 p-10  font-bold  text-3xl text-center'>
            <h1>Name : {name}</h1>
            <h2>Location : {location}</h2>
            <h2>user name: {login}</h2>

            <h4>Logged in user: 
                <UserContext.Consumer>
                    {
                        ({loggedInUser})=><h1>{loggedInUser}</h1>
                    }
                </UserContext.Consumer>
            </h4>
        </div>
       );
    }
}

export default UserClass
