import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Info.css'
import products from '../../products.json'

class Info extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const product = products.find((item) => {
            if (this.props.match.params.id == item.id) {
                return item
            }
        })
        return (
            <div >
                <div className='info'>
                    <div title={product.title}>
                        <img className= 'infoImg' src={product.img} />
                        <div className=''>
                            <b className='count'>{`In stock ${product.count}`}</b>
                        </div>
                    </div>
                    <div className='description'>
                        {product.description}<br />
                        {product.price}
                    </div>
                </div>
            </div >)

    }
}

export default Info;