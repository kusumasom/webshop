import React from "react";
import axios from 'axios';

export interface IOrder {
    id:number
    companyId: number;
    created: string;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: number;
    orderRows:IOrderRow[]
}
export interface IOrderRow{
    id:number
    productId: number;
    orderId: number;
    amount: number;
}
export interface IAdministrationState {
    orders: IOrder[];
}


export default class Administration extends React.Component<{},IAdministrationState>{
    constructor(props:any){
        super(props);
            this.state={
                orders:[]
            }
    }
    componentDidMount() {
            axios.get('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=555')
                .then(res => {
                    this.setState({orders: res.data});
                    console.log(this.state.orders)
                });
    };

    deleteOrder(id:number){
             axios.delete('https://medieinstitutet-wie-products.azurewebsites.net/api/orders/'+id)
                .then(res =>{
                    const updatedOrders = this.state.orders.filter(item => item.id !== id);
                    console.log(res);
                    this.setState({orders: updatedOrders})
                        
                                    
                });

    };
  
     
    render(){
        return(
            <div>

                {this.state.orders.map((order:IOrder) => <div key={order.id} className="creator">
                    <div>
                        <div className="customTableWrap">
                            
                            <div className="orderHeader"><h2>Created By:{order.createdBy} </h2>
                            <button className="delete" onClick={()=>this.deleteOrder(order.id)}>Delete</button>
                            </div>

                                
                            {order.orderRows.map((item)=> <div key={item.id} className="adminInfo">
                                    <div className="customTable">
                                        <p className="customerID">Customer Id:{item.orderId}</p>
                                        <p>Product Id:{item.productId}</p>
                                        <p>Amount:{item.amount}</p>
                                                                  
                                    </div>
                                    
                                </div>)}
                             
                                
                                
                        </div>    
                    </div>

                </div>)}
               
            </div>
        )
    }

}







