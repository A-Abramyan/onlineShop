import { Component } from 'react';
import './FavoriteProductsList.css'
import allProducts from '../../../products.json'
class FavoriteProductsList extends Component {

    constructor(props) {
        super(props);
    }
    state = {

    }

    render() {
        const { product, deleteFvtProduct } = this.props
        return (
            <div className='fvtList'>
                <h1 className='head'>Favorite Product</h1>

                {this.props.product.map((item, index) => (
                    <div className='fvtPrdct'>
                        <div><img className='fvtProductImg' src={item.img} /></div>
                        <h3>{item.title}-{item.description} </h3>
                        <button className='dltBtn' onClick={() => { deleteFvtProduct(item, index) }}>X</button>
                    </div>
                ))}

            </div>
        )
    }
}

export default FavoriteProductsList