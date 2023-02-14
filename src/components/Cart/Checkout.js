import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
	const [formInputValidity, setFormInputValidity] = useState({
		name: true,
		phoneNumber: true,
	});

	const nameInputRef = useRef();
	const phoneNumberInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredPhoneNumber = phoneNumberInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredPhoneNumberIsValid = !isEmpty(enteredPhoneNumber);

		setFormInputValidity({
			name: enteredNameIsValid,
			phoneNumber: enteredPhoneNumberIsValid,
		});

		const formIsValid = enteredNameIsValid && enteredPhoneNumberIsValid;

		if (!formIsValid) {
			return;
		}
	};

	return (
		<form onSubmit={confirmHandler}>
			<div className={classes.control}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameInputRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor="phonenumber">Phone Number</label>
				<input type="text" id="phonenumber" ref={phoneNumberInputRef} />
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit} onClick={props.onConfirm}>
					Confirm
				</button>
			</div>
		</form>
	);
};

export default Checkout;
