import { GoodsItem } from './GoodsItem'
import cn from 'clsx'
import styles from './GoodsList.module.scss'

// import cn from 'clsx'
//3 Функциональный компонент GoodsList для проверки входящих данных и дальнейшей отрисовки контента c пагинацией / вывода ошибки. Через props принимает массив со всеми пришедшими товарами, параметры пагинации, параметры обработки клика Добавить в корзину.
function GoodsList(props) {
	const {
		goods = [],
		cardPerPage,
		currentPage,
		paginate = Function.prototype,
		prevPage = Function.prototype,
		nextPage = Function.prototype,
		addToBasket = Function.prototype,
		isBasketShow = false
	} = props //goods, по умолчанию пустой массив
	//Если в props пусто:
	if (!goods.length) {
		return <h3>Nothing found!</h3>
	}

	//Пагинация:
	const lastCardIndex = currentPage * cardPerPage //Индекс последней карточки
	const firstCardIndex = lastCardIndex - cardPerPage //Индекс первой карточки
	const currentCard = goods.slice(firstCardIndex, lastCardIndex)
	const pageNumbers = [] //Номер текущей группы страниц

	for (let i = 1; i < Math.ceil(goods.length / cardPerPage); i++) {
		pageNumbers.push(i)
	}

	return (
		<div
			className={cn('row', styles.rowSectionMain, {
				[styles.show]: isBasketShow //Серый фильтр при открытой корзине
			})}
		>
			{currentCard.map(item => (
				<GoodsItem
					key={item.mainId}
					{...item}
					addToBasket={
						addToBasket /*Передача addToBasket ниже в GoodsItem как props*/
					}
				/>
			))}
			<ul className={cn('pagination', styles.pagination)}>
				{pageNumbers.map(number => (
					<li className={cn('page-item')} key={number}>
						<a
							href='#0'
							className={cn('page-link')}
							key={number}
							onClick={() => paginate(number)}
						>
							{number}
						</a>
					</li>
				))}
			</ul>
			<div className={cn(styles.pageControlWrap)}>
				<button
					className={cn('btn', 'btn-primary', styles.pageControlBtn)}
					onClick={prevPage}
				>
					Prev page
				</button>
				<button
					className={cn('btn', 'btn-primary', styles.pageControlBtn)}
					onClick={nextPage}
				>
					Next page
				</button>
			</div>
		</div>
	)
}

export { GoodsList }