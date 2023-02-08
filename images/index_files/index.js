import { menuArray as data } from './data.js'

const orders = [];

document.addEventListener('click', (e) => {
	if (e.target.dataset.add) {
		makeOrder(e.target.dataset.add)
	}
})

function makeOrder(id) {
	let orderLine = {};
	console.log(id);
	data.forEach((position) => {
		console.log(id)
		console.log(position.id)
		console.log(position.id === id);
		if (position.id === id) {

			orderLine['id'] = position.id;
			orderLine['name'] = position.name;
			orderLine['qty'] = 1;
			orderLine['price'] = position.price;
		}
	})
	console.log(orderLine);
	const prevOrder = orders.filter((e) => e.id === id);
	if (prevOrder.length === 0) {
		orders.push(orderLine)
	} else {
		prevOrder[0].qty += 1
	}


}

function renderOrder() {
	let makeOrder = '';
	let totalPrice = 0;
	if (makeOrder.length === 0) {
		return ''
	}
	orders.forEach((position) => {
		makeOrder += `
		<div class="order">
			<p>Your order</p>
			<div class="order--line">
				<p>${position.name}</p>
				<p>remove</p>
				<p>qty:${position.qty}</p>
				<p>$${position.price}</p>
				<p>${position.sum}</p>
			</div>
			<div class="order--total">
				<p>Total price</p>
				<p>$${totalPrice}</p>
			</div>

		</div>
		`
	})

}


function getMenu() {

	let mainMenu = ``;

	data.forEach((menu) => {
		mainMenu += `
        <div class="position">
            <p class="menu-pic">${menu.emoji}</p>
            <div>
                <p class="menu-name menu-m">${menu.name}</p>
                <p class="menu-ingredients menu-m">${menu.ingredients}</p>
                <p class="menu-price menu-m">$${menu.price}</p>
            </div>
            <img src="./images/add-btn.png" data-add="${menu.id}">
        </div>
        `
	})
	return mainMenu;

}




function render() {
	document.getElementById('menu').innerHTML = getMenu();
	document.getElementById('order').innerHTML = renderOrder();
}

render();