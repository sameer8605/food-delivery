import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';


const HeaderCartButton = (props) => {
  const [isbuttonhighlighted,setisbuttonhighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
const btnClasses = `${classes.button} ${isbuttonhighlighted?classes.bump:''}`;
const {items} = cartCtx;
useEffect(()=>{
  if(items.length === 0){
    return;
  }
setisbuttonhighlighted(true);
const timer =setTimeout(()=>{
  setisbuttonhighlighted(false);
  return ()=>{
    clearTimeout(timer);
  }
},300) // after each click class will set to fall again and it will again bump in each click. if donot use timeout
        // then the bumper won't work each time because dependencies will change once.
},[items])
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
