import React from "react";
import axios from 'axios';
import { IMovie } from "./Products";


export interface ICart {
    companyId: number;
    created: string;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: number;
    orderRows:[{
        ProductId: number;
        OrderId: number;
        Amount: number;
    }]
}

export interface ICartState {
    cart: ICart[];
    orderSent:boolean;
}




export default class Cart extends React.Component<any, ICartState>{
    constructor(props:any) {
        super(props);
        this.state = {
            cart: [],
            orderSent:false
        }
    }

    componentDidMount() {
        this.setState({
            cart: [{
                companyId:555,
                created:"0001-01-01T00:00:00",
                createdBy:"Customer",
                paymentMethod:"MasterCard",
                totalPrice:0,
                status:2,
                orderRows: this.props.productCart.map((item: any) => {
                    return {
                        ProductId: item.id,
                        OrderId: item.price,
                        Amount: 1
                    }
                })
        }]})

    };

    handlePost() {
        axios.post('https://medieinstitutet-wie-products.azurewebsites.net/api/orders', JSON.stringify(this.state.cart[0]), {headers: {"Content-Type": "application/json"}})
            .then(res => {
                console.log(res);
                this.setState({cart:[]})
                this.props.reset()
            });
    };

    render() {
        return(
            (this.state.cart.length === 0)? <div className="cartMessage">Cart is empty</div>: 
            
             
            <div className='cart'>
                <button onClick={this.handlePost.bind(this)} className="postbtn">BUY</button>
                <ul className="itemInCart">
                    {this.props.productCart.map((item: any) => <li key={item.id}>
                        <p className="titleICart">{item.name}</p>
                        <img src={item.imageUrl} alt="Movie" height="200" width="150" />
                    </li>)}
                </ul>
            </div>
        );
    }
};