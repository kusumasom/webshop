import React from "react";
import axios from 'axios';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export interface IMovie {
    id: number;
    name: string;
    price: number
    imageUrl: string;
}

export interface IMovieState {
    movies: IMovie[]
    isLoading: boolean
}

export default class Products extends React.Component<any, IMovieState>{
    constructor(props: IMovieState) {
        super(props);
        this.state = {
            movies: [],
            isLoading: false
        }
   
    }

    componentDidMount() {
        
        this.setState({isLoading:true})
        axios.get('http://medieinstitutet-wie-products.azurewebsites.net/api/products')
            .then(res => {
                this.setState({movies: res.data, isLoading:false});
        
            });
    };

    handleBuy(movie: IMovie) {
        this.props.add(movie);
    };

  render() {
    const spinner =<FontAwesomeIcon icon={faSpinner} className="fa-spin"/>
      return(
      (this.state.isLoading)? <div className='spin'>{spinner}</div> : 

        <div>
              
                  {this.state.movies.map((movie: IMovie) => <div key={movie.id} className="wrapItem">
                  
                      <div className = "wrapPro">
                        
                        <div className="imageItem">
                            <img src={movie.imageUrl} alt="Movie"  className="picture" />
                           
                            
                        </div>
                        <div>
                          
                             <button className='buy' onClick={() => this.handleBuy(movie)}>Buy {movie.price}kr</button> 
                        </div>
                      
                      </div>
                     
                  </div>)}
              </div>
      
          );
        
  }
};