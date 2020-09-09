import React from 'react'
import {Link} from 'react-router-dom'


export default class Navbar extends React.Component{
    render(){
        return(
            
            <nav className="navbar navbar-expand-sm navbar-dark px-sm-5" >
                <Link to= '/cart'className ="nav-link" >
                    <i className="fas fa-cart-plus"></i>
                            Cart
                </Link>  
                <ul className = "navbar-nav align-items-center">
                    <li className ="nav-item ml-5">
                        <Link to= '/'className ="nav-link" >
                            Home
                        </Link>                        
                    </li>
                    <li className ="ml-auto">
                        <Link to= '/administration'className ="nav-link" >
                            Administration
                        </Link>                        
                    </li>
                </ul>
               
                                      
            </nav>
           
        )
    }
}

