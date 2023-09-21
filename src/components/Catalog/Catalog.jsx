import { useDispatch, useSelector } from "react-redux";
import { CatalogProduct } from "../CatalogProduct/CatalogProduct";
import { Container } from "../Container/Container"
import { Order } from "../Order/Order"
import style from './Catalog.module.css'
import { useEffect } from "react";
import { productFetch } from "../../store/product/productSlicer";


export const Catalog = () => {
    const { category, activeCategory } = useSelector((state) => state.category);
    const { product, status } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        if (category.length) {
            dispatch(productFetch(category[activeCategory].title));
        }
    }, [category, activeCategory])




    return (
        <section className={style.catalog}>
            <Container className={style.container}>

                <Order />
                <div className={style.wrapper}>
                    <h2 className={style.title}>{category[activeCategory]?.rus}</h2>

                    <div className={style.wrap_list}>
                        {status == 'idle' || status == 'loading' && <div>Загрузка...</div>}

                        {status == 'succeeded' &&
                            (product.length ? (
                                <ul className={style.list}>
                                    {product.map(item =>
                                        <li key={item.id} className={style.item}>
                                            <CatalogProduct
                                                productId={item.id}
                                                title={item.title}
                                                image={item.image}
                                                weight={item.weight}
                                                price={item.price} />
                                        </li>
                                    )}
                                </ul>
                            ) : (
                                <div>Готовим...</div>
                            ))
                        }
                    </div>
                </div>
            </Container>
        </section>
    )
}


