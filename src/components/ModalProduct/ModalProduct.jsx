import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../../store/modalAboutProduct/modalAboutProductSlice"
import style from "./ModalProduct.module.css"
import { API_URL } from "../../const"
import { addProduct, addProductCount, removeProduct } from "../../store/order/orderSlicer"
import { useEffect, useState } from "react"

export const ModalProduct = () => {
    const { isOpen, product } = useSelector(state => state.modalAboutProduct);
    const { orderList } = useSelector(state => state.order);

    const dispatch = useDispatch();

    const add = () => {
        dispatch(addProductCount({ id: product.id, count: quantity }));
        dispatch(closeModal());
    }

    const [quantity, setQuantity] = useState(1);
    const [orderCount, setOrderCount] = useState(0);


    useEffect(() => {
        if (Object.keys(product).length) {
            let productOrder = orderList.find((item) => item.id === product.id);
            if (productOrder) {
                setQuantity(productOrder.count);
                setOrderCount(productOrder.count);
            } else {
                setQuantity(1);
                setOrderCount(0);
            }
        }
    }, [product, orderList])

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decreaseQuantity = () => {
        if (quantity) {
            setQuantity(quantity - 1);
        }
    }


    return isOpen && (
        <div className={style.modal}
            onClick={({ target, currentTarget }) => {
                if (target == currentTarget) dispatch(closeModal());
            }}
        >
            <div className={style.mproduct}>
                <div className={style.container}>
                    <h2 className={style.title}>{product.title}</h2>

                    <div className={style.content}>
                        <img src={`${API_URL}/${product.image}`} alt={product.title} className={style.image} />

                        <p className={style.description}>{product.description}</p>

                        <div className={style.ingredients}>
                            <h3 className={style.subtitle}>Состав:</h3>

                            <ul className={style.list}>
                                {product.ingredients.map((item) =>
                                    <li key={item} className={style.item}>{item}</li>
                                )}
                            </ul>

                            <p className={style.calories}>{product.width}г, ккал {product.calories}</p>
                        </div>
                    </div>

                    <div className={style.footer}>
                        <div className={style.add}>
                            <button className={style.btn} onClick={add} disabled={orderCount === quantity}>
                                {orderCount === 0 ? "Добавить" : quantity === 0 ? "Удалить" : "Изменить"}
                            </button>

                            <div className={style.count}>
                                <button className={style.minus} onClick={decreaseQuantity} >-</button>
                                <p className={style.amount}>{quantity}</p>
                                <button className={style.plus} onClick={increaseQuantity}>+</button>
                            </div>
                        </div>

                        <p className={style.price}>{product.price}
                            <span className={style.currency}>&nbsp;₽</span>
                        </p>
                    </div>
                </div>

                <button className={style.modal__close} onClick={() => { dispatch(closeModal()) }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5.07422" y="5.28247" width="1" height="20" transform="rotate(-45 5.07422 5.28247)" />
                        <rect x="5.78125" y="19.4246" width="1" height="20" transform="rotate(-135 5.78125 19.4246)" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

