export const calcTotal = (listGoods, type) => {
    if (type == 'count') {
        return listGoods.reduce((acc, item) => acc += item.count, 0)
    } else if (type == 'price') {
        return listGoods.reduce((acc, item) => acc += item.price * item.count, 0)
    } else {
        return 'не знаю что считать'
    }
}