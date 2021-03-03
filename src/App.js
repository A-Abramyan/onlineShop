import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Catalog from './components/catalog/Catalog';
import BuyingProduct from './components/header/BuyinProduct/BuyingProduct';
import FavoriteProductsList from './components/header/FavoriteButton/FavoriteProductsList';
import Header from './components/header/Header';
import OrderList from './components/OrderList/OrderList';
import Info from './components/productInfo/Info';


class App extends Component {
  constructor(props) {
    super(props)
    this.buyProduct = this.buyProduct.bind(this);
    this.fvtProduct = this.fvtProduct.bind(this);
    this.deleteFvtProduct = this.deleteFvtProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.buyingList = this.buyingList.bind(this);


  }
  state = {
    myProducts: [],
    favorite: [],
    buyingList: []
  }


  fvtProduct(item, index) {
    let favorite = [...this.state.favorite]
    let favotiteProduct = this.state.favorite.findIndex((product) => product.id === item.id);
    if (favotiteProduct == -1) {
      favorite.push(
        item,
      )
    } else {
      favorite.splice(favotiteProduct, 1)
    }

    this.setState({
      favorite: favorite
    })
  }

  buyProduct(item) {
    const { myProducts } = this.state;
    const productsNew = [...myProducts];
    const productFound = myProducts.findIndex(product => product.id === item.id);

    if (productFound > -1) {
      productsNew[productFound] = {
        ...productsNew[productFound],
        id: item.id,
        stockCount: productsNew[productFound].count - productsNew[productFound].currentCount - item.currentCount,
        currentCount:   + parseInt(productsNew[productFound].currentCount),
        price: item.price,
        totalAmount: item.currentCount * parseInt(item.price),
        description: item.description,
        img: item.img,
        changingValue: item.currentCount,
        title: item.title

      }
    } else {
      productsNew.push({
        id: item.id,
        stockCount: item.count - item.currentCount,
        currentCount: item.currentCount,
        price: item.price,
        totalAmount: item.currentCount * parseInt(item.price),
        description: item.description,
        img: item.img,
        changingValue: item.currentCount,
        count: item.count,
        title: item.title
      })
    }

    this.setState({
      myProducts: productsNew
    })
  }

  deleteProduct(index) {
    const myProductsNew = [...this.state.myProducts];
    myProductsNew.splice(index, 1);
    this.setState({
      myProducts: myProductsNew
    });
  }

  deleteFvtProduct(item, index) {
    const newFvtList = [...this.state.favorite]
    const fCheck = this.state.favorite.findIndex(product => product.id == item.id)
    if (fCheck > -1) {
      newFvtList.splice(index, 1)
    }
    this.setState({ favorite: newFvtList })
  }


  buyingList(item) {

    this.setState({
      buyingList: item,
      myProducts: []
    })
  }

  render() {
    const { myProducts, favorite } = this.state;
    console.log('myP', this.state.myProducts)
    console.log('buyingList', this.state.buyingList)
    return (
      <BrowserRouter>
        <div className="onlineStore">
          <Header
            productsCount={myProducts.length}
            favorite={favorite.length}
          />
          <div className='content'>

            <Route exact path='/' render={
              (props) => <Catalog
                buyProduct={this.buyProduct}
                myProducts={this.state.myProducts}
                fvtProduct={this.fvtProduct}
                buyingList={this.state.buyingList}
              />} />

            <Route path='/info/:id' component={Info} />

            <Route exact path='/favoriteProductList' render={
              (props) => <FavoriteProductsList
                product={this.state.favorite}
                deleteFvtProduct={this.deleteFvtProduct}
              />} />

            <Route exact path='/buyingProductsList' render={
              (props) => <BuyingProduct
                buyProduct={this.buyProduct}
                product={this.state.myProducts}
                deleteProduct={this.deleteProduct}
                buyingList={this.buyingList}
              />} />

            <Route exact path='/orderList' render={
              (props) => <OrderList
                buyingList={this.state.buyingList}
              />} />
          </div>
        </div>

      </BrowserRouter>
    );
  }

}

export default App;
