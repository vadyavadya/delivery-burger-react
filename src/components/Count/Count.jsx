import { useState } from 'react'
import style from './Count.module.css'

export const Count = (props) => {
    const [quantity, setQuantity] = useState(props.quantity);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <div className={style.count}>
            <button className={style.minus} onClick={decreaseQuantity} disabled={quantity === 1}>-</button>
            <p className={style.amount}>{quantity}</p>
            <button className={style.plus} onClick={increaseQuantity}>+</button>
        </div>
    )
}
