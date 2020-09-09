import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Navbar from './components/Navbar'
import Products from "./components/Products";
import Cart from "./components/Cart";
import Administration from "./components/administration";

export interface IMovie {
    id: number;
    name: string;
    description: string;
    price: number
    imageUrl: string;
    year: number;
    added: string;
    productCategory: [{
        categoryId: number;
        category: null;
    }]
}

export interface IMovieState {
    cart: IMovie[]
}

export default class App extends React.Component<any, IMovieState>{
    constructor(props: any) {
        super(props);
        this.state = {
            cart: []
        }
    }

    addToCart(movie: any) {
        let arr = this.state.cart;
        const found = this.state.cart.find((a:IMovie):boolean => a.id === movie.id);
        if (found){
            return;
        }
        else {
            arr.push(movie);
        }
        this.setState({cart: arr});
    };

    resetCart(){
        this.setState({
            cart:[]
        })
    }

  render() {
    return(
       
            <Router>
                <Navbar />
               
                <h2 className="totalOrder">Order item:{this.state.cart.length}</h2>
                
            
                <Switch>
                    <Route path="/cart">
                        <Cart productCart={this.state.cart} reset={this.resetCart.bind(this)}/>
                    </Route>
                    <Route path="/" exact>
                        <Products add={this.addToCart.bind(this)}/>
                    </Route>
                    <Route path="/administration">
                        <Administration />
                    </Route>

                </Switch>
            </Router>
        
    );
  }
};