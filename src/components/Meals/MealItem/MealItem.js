import classes from "./MealItem.module.css";

const MealItem = (props) => {
	return (
		<li className={classes["menu-item"]}>
			<div className={classes.content}>
				<button
					onClick={() => {
						props.onShow();
						props.itemData(props.item);
					}}
				>
					{" "}
					+{" "}
				</button>
				<div>
					<h3>{props.name}</h3>
					<div className={classes.category}>{props.category}</div>
				</div>
			</div>
			<div className={classes["img-holder"]}>
				<img src={props.thumbnail} alt="Product" />
			</div>
		</li>
	);
};
export default MealItem;
