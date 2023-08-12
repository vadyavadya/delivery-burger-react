import { useDispatch, useSelector } from "react-redux"
import { Count } from "../Count/Count"
import { Ingredients } from "../Ingredients/Ingredients"
import style from "./ModalProduct.module.css"
import { useEffect, useState } from "react"
import { closeModalProd, modalProductFetch } from "../../store/modalProduct/modalProduct"
import { API_URL } from "../../const"
import { addProduct, addProductCount } from "../../store/order/orderSlicer"


export const ModalProduct = () => {
    const { isOpen, data, status } = useSelector(state => state.productModal);
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);

    const plusQantity = () => {
        setQuantity(quantity + 1);
    }

    const minusQantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const closeMod = () => {
        dispatch(closeModalProd())
    }

    const addProd = () => {
        dispatch(addProductCount({ id: data.id, count: quantity }))
        setQuantity(1)
        dispatch(closeModalProd());
    }

    useEffect(() => {
        setQuantity(1)
    }, [data])

    return isOpen &&
        <div className={style.modal} onClick={({ target, currentTarget }) => {
            if (target === currentTarget) {
                closeMod();
            }
        }}>
            <div className={style.mproduct}>

                {
                    status === 'idle' ?
                        <div>Грузим</div> :
                        <div className={style.container}>
                            <h2 className={style.title}>{data.title}</h2>

                            <div className={style.content}>
                                <img src={`${API_URL}/${data.image}`} alt={data.title} className={style.image} />

                                <p className={style.description}>{data.description}</p>

                                <div className={style.ingredients}>
                                    <Ingredients ingredients={data.ingredients} weight={data.weight} calories={data.calories} />
                                </div>
                            </div>

                            <div className={style.footer}>
                                <div className={style.add}>
                                    <button className={style.btn}
                                        onClick={addProd}
                                    >Добавить</button>

                                    <div className={style.count}>
                                        <button className={style.minus} onClick={minusQantity} >-</button>
                                        <p className={style.amount}>{quantity}</p>
                                        <button className={style.plus} onClick={plusQantity} >+</button>
                                    </div>

                                    {/* <Count productId={data.id} quantity={1} /> */}
                                </div>

                                <p className={style.price}>{data.price * quantity}
                                    <span className="currency">₽</span>
                                </p>
                            </div>
                        </div>
                }

                <button className={style.modal__close} onClick={closeMod}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5.07422" y="5.28247" width="1" height="20" transform="rotate(-45 5.07422 5.28247)" />
                        <rect x="5.78125" y="19.4246" width="1" height="20" transform="rotate(-135 5.78125 19.4246)" />
                    </svg>
                </button>

            </div>
        </div>
}
