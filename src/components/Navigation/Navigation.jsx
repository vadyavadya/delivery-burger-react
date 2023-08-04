import classNames from 'classnames'
import { Container } from '../Container/Container'
import style from './Navigation.module.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCategory, fetchCategory } from '../../store/category/categorySlicer'
import { API_URL } from '../../const'

export const Navigation = () => {

    const { category, activeCategory } = useSelector((state) => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategory());
    }, [])

    return (
        <nav className={style.navigation}>
            <Container className={style.container}>
                <ul className={style.list}>
                    {
                        category.map((item, i) =>
                            <li key={item.title} className={style.item}>
                                <button
                                    className={classNames(style.button, activeCategory === i ? style.button_active : '')}
                                    style={{ backgroundImage: `url(${API_URL}/${item.image})` }}
                                    onClick={() => dispatch(changeCategory({ indexCategory: i }))}
                                >{item.rus}</button>
                            </li>
                        )
                    }
                </ul>
            </Container>
        </nav>
    )
}