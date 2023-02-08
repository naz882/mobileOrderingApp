import { menuArray as data } from './data.js'

const orders = [];

document.addEventListener('click', (e) => {
	if (e.target.dataset.add) {
		makeOrder(e.target.dataset.add)
	} else if (e.target.id === 'pay') {
		document.getElementById("modal").style.display = 'inline';
	} else if (e.target.id === 'payToFinish') {
		const payForm = new FormData(document.getElementById('payForm'));
		const name = payForm.get('name');
		document.getElementById('order').innerHTML = `
		<div="outterThankToConfirm">
			<div class="thankToConfirm">
				<p>Thanks, ${name}! Your order is on its way!</p>
			</div>
		</div>`
		document.getElementById("modal").style.display = 'none';
	}
})




function makeOrder(id) {
	let orderLine = {};
	data.forEach((position) => {
		if (position.id === Number(id)) {
			orderLine['id'] = position.id;
			orderLine['name'] = position.name;
			orderLine['qty'] = 1;
			orderLine['price'] = position.price;
		}
	})
	const prevOrder = orders.filter((e) => e.id === Number(id));

	if (prevOrder.length === 0) {
		orders.push(orderLine)
	} else {
		prevOrder[0].qty += 1
	}

	render();


}

function renderOrder() {
	let makeOrder = '';
	let totalPrice = 0;
	makeOrder += `<div class="ticketText"><p>Your order</p></div>`

	orders.forEach((position) => {
		totalPrice += position.qty * position.price
		let price = position.qty * position.price
		makeOrder += `
		<div>
			<div class="order--line">
				<p class="order--name">${position.name}</p>
				<p class="remove">remove</p>
				<p>qty:${' ' + position.qty}</p>
				<p>$${position.price}</p>
				<p>$${price}</p>
			</div>

		</div>
		`
	})

	if (totalPrice > 0) {
		makeOrder += `
		<div class="order--total">
			<p>Total price</p>
			<p>$${totalPrice}</p>
		</div>
		<div class="pay--button">
			<a class="button" id="pay">Complete Payment</a>
		</div>
    	

	`

	}


	console.log(makeOrder);

	return makeOrder;

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