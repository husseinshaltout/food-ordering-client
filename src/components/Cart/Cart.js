import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmit, setIsSubmit] = useState(false);
	const [error, setError] = useState(null);

	const cartCtx = useContext(CartContext);

	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, qty: 1 });
	};

	const confirmOrderHandler = async (userData) => {
		setIsSubmitting(true);
		setError(null);
		const order = {
			userName: userData.name,
			phoneNumber: userData.phoneNumber,
			itemList: { ...cartCtx.items },
		};

		try {
			const response = await fetch("http://127.0.0.1:5000/api/order/", {
				method: "POST",
				body: JSON.stringify(order),
				headers: { "Content-Type": "application/json" },
			});

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const data = await response.json();
			console.log(data);
		} catch (error) {
			setError(error.message);
		}

		setIsSubmitting(false);
		setIsSubmit(true);
		cartCtx.clearCart();
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

	const cartModalContent = (
		<React.Fragment>
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
		</React.Fragment>
	);

	const isSubmittingModalContent = <p>Sending Order Data...</p>;

	const isSubmitModalContent = (
		<React.Fragment>
			<p>Successfully Sent the Order!</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onClose}>
					Close
				</button>
			</div>
		</React.Fragment>
	);

	return (
		<Modal onClose={props.onClose}>
			{!isSubmitting && !isSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!error && !isSubmitting && isSubmit && isSubmitModalContent}
			{error && <p>{error}</p>}
		</Modal>
	);
};

export default Cart;
