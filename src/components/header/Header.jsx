import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'


class Header extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        products: {

        }
    }

    render() {

        return (
            <div className='header'>
                <NavLink to='/'>
                    <img className='logo' src='https://static.rfstat.com/renderforest/images/v2/logo-homepage/flat_3.png' />
                </NavLink>
                <div className='search'>
                    <input className='searchInput' />
                    <button className='searchBtn' />
                </div>
                <div className='fvtBng'>
                    <div className='headerFvt'>
                        <NavLink to='favoriteProductList'>
                            <img className='favoriteButton' src='https://www.clker.com/cliparts/C/m/R/8/C/K/small-red-heart-with-transparent-background.svg' />
                        </NavLink>
                        <b>{this.props.favorite > 0 ? this.props.favorite : ''}</b>
                    </div>
                    <div className='headerBng'>
                        <NavLink to='buyingProductsList'>
                            <img className='selectedProduct' src='https://i.pinimg.com/originals/09/88/dc/0988dc27ab24d196b91d085c786c292d.png' />
                        </NavLink>
                        {this.props.productsCount > 0 && <b>{this.props.productsCount}</b>}
                    </div>
                    {/* <div className='order'>
                        <NavLink to='orderList'>
                            <img className='orderListIcon' src='https://image.flaticon.com/icons/png/512/51/51495.png' />
                        </NavLink>
                        {this.props.productsCount > 0 && <b>{this.props.productsCount}</b>}
                    </div> */}
                </div>
            </div >
        )

    }
}

export default Header;

