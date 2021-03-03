import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './BuyingProduct.css'
class BuyingProduct extends Component {

    constructor(props) {
        super(props);
        this.handleChangeValue = this.handleChangeValue.bind(this)
        this.buying = this.buying.bind(this)
    }
    state = {
        products: [...this.props.product],

    }

    handleChangeValue(product, index, event) {
        const newItems = this.state.products.map((item) => {
            if (item.id === product.id) {
                return {
                    ...item,
                    currentCount: event
                };
            }
            return item


        });
        this.setState({ products: newItems });
    };

    changePrice(item, index, price) {
        const newCount = this.state.products.length > 0 && this.state.products.find(i => i.id === item.id).changingValue
        return <h1>{newCount * price}</h1>
    }

    buying(item) {
        this.props.buyingList(item)

    }

    render() {
        const { product, deleteProduct, buyProduct, buyingList } = this.props

        return (
            <div className='bngList' >
                <h1 className='head'>Buying List</h1>
                {this.props.product.map((item, index) => (
                    <div className='bngPrdct'>
                        <div>
                            <img className='bngProductImg' src={item.img} />
                        </div>
                        <div>
                            <h1>-{item.description}</h1>
                        </div>
                        <input className='priceInput'
                            onChange={(event) => { this.handleChangeValue(item, index, event.target.value) }}
                            type='number'
                            defaultValue={item.currentCount}
                            min='0'
                            max={item.count}
                        />

                        <div className='totalAmount'>
                            <div> {this.changePrice(item, index, parseInt(item.price))}</div>
                        </div>
                        <div>
                            <button className='dltBtn' onClick={() => deleteProduct(index)} >X</button>

                        </div>
                    </div>
                ))}
                <NavLink to='/orderList'>
                    <button
                        onClick={() => this.buying(this.state.products)}
                        className='buyBtn'
                        type='submit'
                    >
                        Buy
                </button>
                </NavLink>
            </div >
        )
    }
}

export default BuyingProduct