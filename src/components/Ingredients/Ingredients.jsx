import style from "./Ingredients.css"

export const Ingredients = ({ ingredients = [], weight, calories }) => {
    return (
        <div>
            <h3 className={style.title}>Состав:</h3>

            <ul className={style.list}>
                {
                    ingredients.length > 0 &&
                    ingredients.map(item =>
                        <li key={item} className={style.item}>{item}</li>
                    )
                }
            </ul>

            <p className={style.calories}>{weight}г, ккал {calories}</p>
        </div>
    )
}
