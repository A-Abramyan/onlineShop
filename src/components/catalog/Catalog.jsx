import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import allProducts from '../../products.json';
import './Catalog.css'

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.countSelectedProduct = this.countSelectedProduct.bind(this);
        this.buyValidation = this.buyValidation.bind(this);
        // this.nulifyInput = this.nulifyInput.bind(this);


    }
    state = {
        products: allProducts.map((item) => ({
            ...item,
            isButtonDisabled: true,
            currentCount: 0,
            errors: [],
            count: item.count,
            
        })),
    }

    countSelectedProduct(event, index) {
        const { products } = this.state;
        const productsNew = [...products];


        productsNew[index] = {
            ...productsNew[index],
            currentCount: event.currentTarget.value
        }
        this.setState({
            products: productsNew
        })
    }

    buyValidation(item, index) {
        let isValid = true;
        const productsNew = [...this.state.products]
        const product = this.props.myProducts.find((product) => product.id === item.id);
        console.log(productsNew[index])
        if (product) {
            if (parseInt(productsNew[index].currentCount) + parseInt(product.currentCount) > product.count) {
                productsNew[index] = {
                    ...productsNew[index],
                    errors: [`${item.count - product.currentCount} units left in the  stock,but you want to buy  
                    ${(parseInt(productsNew[index].currentCount))}`],
                    stock: product.stockCount

                }

                isValid = false;
            }
        } else {
            if (productsNew[index]?.currentCount > item.count) {
                productsNew[index] = {
                    ...productsNew[index],
                    errors: ['the product is out of stock']
                }
                isValid = false;
            }
        }
        this.setState({
            products: productsNew
        });
        return isValid && {
            index,
            product: productsNew[index],
        }
    }

    countStock(item) {
        const stock = this.props.myProducts.find(product => product.id === item.id)
        if (stock) {
            return stock.stockCount
        } else {
            return item.count
        }

    }

    async handleBuyProduct(item, index) {
        const checkFunction = await this.buyValidation(item, index)
        if (checkFunction) {
            const productsNew = [...this.state.products];
            productsNew[checkFunction.index] = {
                ...productsNew[checkFunction.index],
                currentCount: 0

            }
            console.log('checkFunction.product', checkFunction)
            this.setState({ products: productsNew })
            this.props.buyProduct(checkFunction.product)
        }
    }

    render() {
        const { myProducts, buyProduct, fvtProduct, } = this.props

        return (
            <div className='catalog'>

                {this.state.products.map((item, index) => (
                    <div className='product'>
                        <NavLink to={`/info/${item.id}`}>
                            <img className='productImg' src={item.img} />
                        </NavLink>
                        <h4 className='error'>{this.state.products.find(product => (product.id === item.id)).errors}</h4>
                        <div>
                            <b className='porductPrice'>{item.price}</b>
                            <b className='productCcount'>In Stock {this.countStock(item)} </b>
                            <div className='productInfo'>
                                <input
                                    id={item.id}
                                    className='count'
                                    value={item.currentCount}
                                    type='number'
                                    onChange={(e) => this.countSelectedProduct(e, index)}
                                    min='0'
                                />

                                <button disabled={item.currentCount === 0} className='buyBtn' type='submit' onClick={(a) => { this.handleBuyProduct(item, index, a) }}>Buy</button>
                                <button className='fvtBtn' onClick={() => { this.props.fvtProduct(item, index) }}>
                                    <img className='fvtImg' src='https://www.clker.com/cliparts/C/m/R/8/C/K/small-red-heart-with-transparent-background.svg' />
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div >
        )
    }
}

export default Catalog;

