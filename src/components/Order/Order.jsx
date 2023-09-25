import style from './Order.module.css'
import { OrderGoods } from '../OrderGoods/OrderGoods';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { requestOrderGoods } from '../../store/order/orderSlicer';
import { openModal } from '../../store/modalDelivery/modalDelivery';
import classNames from 'classnames';


export const Order = () => {
    const { totalCount, totalPrice, orderList, listGoods } = useSelector((state) => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestOrderGoods())
    }, [orderList.length])

    const freeDelivery = 599;
    const [orderOpen, setOrderOpen] = useState(false);


    const clickOpenModal = () => {
        dispatch(openModal());
    }

    const openOrder = () => {
        if (document.body.clientWidth < 1024) {
            if (!orderOpen) {
                setOrderOpen(true);
            }
        } else {
            setOrderOpen(false);
        }
    }

    const closeOrder = () => {
        setOrderOpen(false);
    }

    return (
        <div className={orderOpen ? classNames(style.order, style.order_open) : style.order} onClick={openOrder}>
            <section className={style.wrapper}>
                <div className={style.header} tabIndex="0" role="button">
                    <h2 className={style.title}>Корзина</h2>

                    <span className={style.count}>{totalCount}</span>
                </div>

                <div className={style.wrap_list}>
                    <ul className={style.list}>
                        {listGoods.map(item =>
                            <li key={item.id}>
                                <OrderGoods
                                    productId={item.id}
                                    name={item.title}
                                    weight={item.weight}
                                    price={item.price}
                                    count={item.count}
                                    image={item.image}
                                />
                            </li>
                        )}
                    </ul>

                    <div className={style.total}>
                        <p>Итого</p>
                        <p>
                            <span className={style.amount}>{totalPrice}</span>
                            <span className="currency">&nbsp;₽</span>
                        </p>
                    </div>

                    <button
                        className={style.submit}
                        disabled={listGoods.length === 0}
                        onClick={clickOpenModal}
                    >Оформить заказ</button>

                    <div className={style.apeal}>
                        <p className={style.text} >
                            <span
                                style={totalPrice < freeDelivery ? { textDecoration: 'line-through' } : {}}
                            >
                                Бесплатная доставка
                            </span>

                            {totalPrice < freeDelivery && `\u00A0От ${freeDelivery}\u00A0₽`}
                        </p>

                        <button className={style.close} onClick={closeOrder}>Свернуть</button>
                    </div>
                </div>
            </section>
        </div >
    )
}