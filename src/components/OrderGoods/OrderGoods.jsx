import style from './OrderGoods.module.css'
import { Count } from "../Count/Count"


export const OrderGoods = ({ name }) => {
    return (
        <div className={style.item}>
            <img className={style.image} src="img/burger_1.jpg" alt={name} />

            <div className={style.goods}>
                <h3 className={style.title}>{name}</h3>

                <p className={style.weight}>512г</p>

                <p className={style.price}>1279
                    <span className="currency">₽</span>
                </p>
            </div>

            <Count quantity={2} />
        </div>
    )
}