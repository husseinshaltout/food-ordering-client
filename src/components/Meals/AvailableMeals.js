import React, { useCallback, useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = (props) => {
	const [itemsList, setItemsList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchItemsListHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch("http://127.0.0.1:5000/api/item/", {
				crossorigin: true,
				method: "GET",
			});

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const itemsList = await response.json();
			setItemsList(itemsList.item);
		} catch (error) {
			setError(error.message);
		}

		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchItemsListHandler();
	}, [fetchItemsListHandler]);

	const mealsList = itemsList.map((meal) => (
		<MealItem
			id={meal._id}
			key={meal._id}
			name={meal.name}
			stock={meal.stock}
			category={meal.category}
			options={meal.options}
			thumbnail={meal.cover_img}
			onShow={props.onShow}
			item={meal}
			onGetItemData={props.onGetItemData}
		/>
	));
	let content = <p>No Items Found</p>;

	if (itemsList.length > 0) content = <ul>{mealsList}</ul>;

	if (error) content = <p>{error}</p>;

	if (isLoading) content = <p>Loading...</p>;

	return (
		<section className={classes.meals}>
			<Card>{content}</Card>
		</section>
	);
};

export default AvailableMeals;
