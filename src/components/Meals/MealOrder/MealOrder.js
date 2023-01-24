import Modal from "../../UI/Modal";
import classes from "./MealOrder.module.css";
const MealOrder = (props) => {
	const item = {
		id: "m5",
		name: "Latte",
		stock: 64,
		category: { name: "Beverage", description: "Coffee" },
		options: [
			{
				name: "Milk",
				isAvailable: true,
				optionList: ["Full", "Skimmed"],
			},
			{
				name: "Sugar",
				isAvailable: true,
				optionList: ["1", "2"],
			},
		],
		cover_img:
			"https://upload.wikimedia.org/wikipedia/commons/c/c6/Latte_art_3.jpg",
	};
	const isOptionsAvailable = item.options.length > 0;

	const listOptions = item.options.map(
		(option) =>
			option.isAvailable && (
				<div>
					<label>
						<input type="radio" />
						{option.name}
					</label>
					<select>
						{option.optionList.map((selection) => (
							<option>{selection}</option>
						))}
					</select>
				</div>
			)
	);
	const orderItem = (
		<ul className={classes["order-item"]}>
			<li>
				<label>Options: </label>
				{isOptionsAvailable ? (
					<label>{listOptions}</label>
				) : (
					"No Options Available"
				)}
			</li>
		</ul>
	);

	return (
		<Modal onClose={props.onClose}>
			<div className={classes["item-thumbnail"]}>
				<img src={item.cover_img} alt={item.name} />
			</div>
			<span className={classes["item-name"]}> {item.name}</span>
			{orderItem}
			<div className={classes.actions}>
				<button
					className={classes["button--alt"]}
					onClick={props.onClose}
				>
					Cancel
				</button>
				<button className={classes.button}>+ Add</button>
			</div>
		</Modal>
	);
};

export default MealOrder;
