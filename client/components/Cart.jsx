import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const propTypes = {
  cart: PropTypes.array,
  deleteFromCart: PropTypes.func,
  removeFromCart: PropTypes.func,
  addToCart: PropTypes.func,
  user: PropTypes.object,
  products: PropTypes.array
};

function mapStateToProps(state) {
  return {
    cart: state.cart.map(item => {
      const productIndex = _.findIndex(
        state.products,
        (product) => {
          return product.id === item.id;
        }
      );
      return {
        ...item,
        ...state.products[productIndex]
      };
    })
  };
}

export class Cart extends Component {
  render() {
    const { cart } = this.props;
    return (
      <div className='cart cart-empty'>
        <div className='cart-title'>
          <h2>My Cart</h2>
        </div>
        <div className='cart-list'>
          <div className='cart-list-row'>
            <div className='cart-list-item'>Item</div>
            <div className='cart-list-item'>Qty</div>
            <div className='cart-list-item'>Price</div>
            <div className='cart-list-item' />
          </div>
          { cart.map(item => (
            <div className='cart-list-row'>
              <div className='cart-list-item'>
                <div className='cart-list-product'>
                  <div className='cart-list-stock-photo'>
                    <img src={ `/images/products/${item.image}` }/>
                  </div>
                  <div className='cart-list-info'>
                    <div className='cart-list-info-name'>
                      { item.name }
                    </div>
                    <div className='cart-list-info-price'>
                      ${ (item.price || 0).toFixed(2) }
                    </div>
                  </div>
                </div>
              </div>
              <div className='cart-list-item'>
                <div
                  className='cart-count-up'
                  onClick={ () => this.props.addToCart(item.id) }
                  >
                  <img src='/images/cart/AddOneItem.png'/>
                </div>
                <div className='cart-count-count'>{ item.count }</div>
                <div
                  className='cart-count-down'
                  onClick={ () => this.props.removeFromCart(item.id) }
                  >
                  <img src='/images/cart/SubtractOneItem.png'/>
                </div>
              </div>
              <div className='cart-list-item'>
                ${ (item.price * item.count).toFixed(2) }
              </div>
              <div
                className='cart-list-item cart-delete-item'
                onClick={ () => this.props.deleteFromCart(item.id) }
                >
                <img src='/images/cart/DeleteItem.png' />
              </div>
            </div>
          ))}
          <div className='cart-list-row'>
            <div className='cart-list-item' />
            <div className='cart-list-item'>Total</div>
            <div className='cart-list-item'>
              {
                cart.reduce((total, item) => {
                  total += item.price * item.count;
                  return total;
                }, 0)
              }
            </div>
            <div className='cart-list-item' />
          </div>
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps)(Cart);

Cart.propTypes = propTypes;
