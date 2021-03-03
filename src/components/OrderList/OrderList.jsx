import { Component } from 'react';
import './OrderList.css'



class OrderList extends Component {

    constructor(props) {
        super(props);
        this.countTotal = this.countTotal.bind(this)
        this.handleUserInput = this.handleUserInput.bind(this);
        this.payFoo = this.payFoo.bind(this);


    }
    state = {
        order: '',
        firstName: '',
        lastName: '',
        address: '',
        paymentMethod: '',
        deliveryMethod: ''
    }
    handleUserInput(event) {

        const name = event.target.name;
        const value = event.target.value
        this.setState({ [name]: value },
        )

    }

    payFoo(e) {
        e.preventDefault();
        console.log('ssssssssssss', this.state)
        const { firstName, address } = this.state
        alert(`name: ${firstName}, ${address}`)
    }

    countTotal(item) {
        // const orderNew = [...this.state.order]
        // for (let i = 0; i < this.props.buyingList.length; i++) {

        //     orderNew.push(this.props.buyingList[i].totalAmount)
        // }
        const result = this.props.buyingList.reduce((sum, current) => sum + current.totalAmount, 0)
        console.log('buyinglist', result)

    }


    render() {
        const { buyingList } = this.props
        console.log('s', this.state)
        return (
            <div className='orderList'>
                <h1 className='head'>Order List</h1>
                <div className='order'>
                    <form className='registrationForm'>

                        <label className='headingLabel'>
                            FirstName:
                        <input
                                className='formInp'
                                name='firstName'
                                placeholder='Write your FirstName'
                                title='FirstName'
                                type='text'
                                onChange={(event) => { this.handleUserInput(event) }}
                            />
                        </label>

                        <label className='headingLabel'>
                            LastName:
                        <input
                                className='formInp'
                                name='lastName'
                                type='text'
                                placeholder='Write your LastName'
                                title='LastName'
                                onChange={(event) => { this.handleUserInput(event) }}
                            />
                        </label>
                        <label className='headingLabel'>
                            Address:
                        <input
                                className='formInp'
                                name='address'
                                type='text'
                                placeholder='Write your Address'
                                title='Address'
                                onChange={(event) => { this.handleUserInput(event) }}
                            />
                        </label>
                        <label className='headingLabel'>
                            Payment method:
                        <select name='paymentMethod' className='paymentMethod' title='paymentMethod' onChange={(event) => { this.handleUserInput(event) }} >
                                <option selected hidden>Payment method</option>
                                <option title='Cash'>Cash</option>
                                <option title='Online'>Online</option>
                            </select>
                        </label>
                        <label className='headingLabel'>
                            Delivery method:
                        <select name='deliveryMethod' className='deliveryMethod' title='paymentMdeliveryMethodethod' onChange={(event) => { this.handleUserInput(event) }} >
                                <option selected hidden> Delivery method</option>
                                <option title='Post office'>Post office</option>
                                <option title='Home'>Home</option>
                            </select>
                        </label>
                        <div className='payDiv'>
                            <button className='payBtn' onClick={this.payFoo}>PaY</button>
                        </div>
                    </form>
                    <div className='purchases'>
                        <div className='orderHead'>Purchases list</div>

                        <table >
                            <thead>
                                <tr>
                                    <th className='heading'>Name</th>
                                    <th className='heading'>Description</th>
                                    <th className='heading'>Price</th>
                                    <th className='heading'>Count</th>
                                    <th className='heading'>TotalAmount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {buyingList.map((item, index) => (

                                    <tr className='itemRow'>
                                        <td className='itemName'>{item.title}</td>
                                        <td className='itemName'>{item.description}</td>
                                        <td className='itemName'>{item.price}</td>
                                        <td className='itemName'>{item.currentCount}</td>
                                        <td className='itemName'>{item.totalAmount}</td>

                                    </tr>

                                ))}
                            </tbody>
                        </table>
                        <div className='total'><h2>{this.countTotal(this.props.buyingList.map(i => i))}$</h2></div>
                    </div>
                </div>
            </div>)

    }
}
export default OrderList