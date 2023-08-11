import { useState } from 'react'
import style from './Count.module.css'
import { useDispatch } from 'react-redux'
import { addProduct, removeProduct } from '../../store/order/orderSlicer';

export const Count = ({ productId, quantity }) => {
    const dispatch = useDispatch();

    const increaseQuantity = () => {
        dispatch(addProduct(productId));
    }

    const decreaseQuantity = () => {
        dispatch(removeProduct(productId));
    }

    return (
        <div className={style.count}>
            <button className={style.minus} onClick={decreaseQuantity} >-</button>
            <p className={style.amount}>{quantity}</p>
            <button className={style.plus} onClick={increaseQuantity}>+</button>
        </div>
    )
}
