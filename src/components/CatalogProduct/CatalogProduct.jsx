import { useDispatch } from 'react-redux'
import { API_URL } from '../../const'
import style from './CatalogProduct.module.css'
import { addProduct } from '../../store/order/orderSlicer';

export const CatalogProduct = ({ productId, title, image, weight, price }) => {
    const dispatch = useDispatch();

    const add = (id) => {
        console.log('id: ', id);

        dispatch(addProduct(id));
    }

    return (
        <article className={style.product}>
            <img src={`${API_URL}/${image}`} alt={title} className={style.image} />

            <p className={style.price}>{price}<span className="currency">₽</span></p>

            <h3 className={style.title}>
                <button className={style.detail}>{title}</button>
            </h3>

            <p className={style.weight}>{weight}г</p>

            <button
                className={style.add}
                type="button"
                onClick={()=>add(productId)}
            >Добавить</button>
        </article>
    )
}
