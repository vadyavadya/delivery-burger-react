import style from './OrderGoods.module.css'
import { Count } from "../Count/Count"
import { API_URL } from '../../const'


export const OrderGoods = ({ productId, name, weight, price, count, image }) => {
    return (
        <div className={style.item}>
            <img className={style.image} src={`${API_URL}/${image}`} alt={name} />

            <div className={style.goods}>
                <h3 className={style.title}>{name}</h3>

                <p className={style.weight}>{weight}г</p>

                <p className={style.price}>{price}
                    <span className="currency">&nbsp;₽</span>
                </p>
            </div>

            <Count quantity={count} productId={productId} />
        </div>
    )
}