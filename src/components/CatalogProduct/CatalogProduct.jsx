import { useDispatch } from 'react-redux'
import { API_URL } from '../../const'
import style from './CatalogProduct.module.css'
import { addProduct } from '../../store/order/orderSlicer';
import { openModal } from '../../store/modalAboutProduct/modalAboutProductSlice';

export const CatalogProduct = ({ product }) => {
    const dispatch = useDispatch();

    const add = () => {
        dispatch(addProduct(product.id));
    }

    const openInfo = () => {
        dispatch(openModal(product));
    }

    return (
        <article className={style.product}>
            <img src={`${API_URL}/${product.image}`} alt={product.title} className={style.image} />

            <p className={style.price}>{product.price}<span className="currency">₽</span></p>

            <h3 className={style.title}>
                <button
                    onClick={() => openInfo()}
                    className={style.detail}
                >
                    {product.title}
                </button>
            </h3>

            <p className={style.weight}>{product.weight}г</p>

            <button
                className={style.add}
                type="button"
                onClick={add}
            >
                Добавить
            </button>
        </article>
    )
}
