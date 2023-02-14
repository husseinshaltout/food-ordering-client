import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);

	const cartCtx = useContext(CartContext);

	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, qty: 1 });
	};

	const confirmOrderHandler = async (userData) => {
		const order = {
			userName: userData.name,
			phoneNumber: userData.phoneNumber,
			itemList: { ...cartCtx.items },
		};

		console.log(`Order: ${JSON.stringify(order)}`);

		const response = await fetch(
			"https://react-http-c56f5-default-rtdb.firebaseio.com/orders.json",
			{
				method: "POST",
				body: JSON.stringify(order),
				headers: { "Content-Type": "application/json" },
			}
		);

		const data = await response.json();
	};

	const orderHandler = () => {
		setIsCheckout(true);
	};
	const cartItems = (
		<ul className={classes["cart-items"]}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.itemID}
					item={item}
					qty={item.qty}
					onRemove={cartItemRemoveHandler.bind(null, item.itemID)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes["button--alt"]} onClick={props.onClose}>
				Close
			</button>
			{hasItems && (
				<button onClick={orderHandler} className={classes.button}>
					Order
				</button>
			)}
		</div>
	);

	return (
		<Modal onClose={props.onClose}>
			{cartItems}
			{!hasItems && (
				<div className={classes.total}>
					<span>Empty Cart</span>
				</div>
			)}
			{isCheckout && (
				<Checkout
					onConfirm={confirmOrderHandler}
					onCancel={props.onClose}
				/>
			)}
			{!isCheckout && modalActions}
		</Modal>
	);
};

export default Cart;
