import React, { Fragment, useState } from "react";

import AvailableMeals from "./AvailableMeals";
import MealFinder from "./MealFinder";
import MealsSummary from "./MealsSummary";
const DUMMY_MEALS = [
	{
		id: "m1",
		name: "Red Tea Ahmed Tea",
		stock: 6,
		category: "Tea",
		options: [
			{
				name: "Milk",
				isAvailable: true,
				optionList: ["full", "skimmed"],
			},
			{
				name: "Sugar",
				isAvailable: true,
				optionList: ["1", "2"],
			},
		],
		cover_img:
			"https://upload.wikimedia.org/wikipedia/commons/c/c6/Latte_art_3.jpg",
	},
	{
		id: "m2",
		name: "Redbull",
		stock: 6,
		category: "Energy Drinks",
		options: [],
		cover_img:
			"https://cdn.gourmetegypt.com/media/catalog/product/cache/2b4d21b90ad5abb98380bc0a709a4ac8/9/0/90162602.jpg",
	},
	{
		id: "m3",
		name: "Green Cola Lemon Flavor",
		stock: 6,
		category: "Fizzy Drinks",
		options: [],
		cover_img:
			"https://upload.wikimedia.org/wikipedia/commons/c/c6/Latte_art_3.jpg",
	},
	{
		id: "m4",
		name: "Green Cola Cherry Flavor",
		stock: 6,
		category: "Fizzy Drinks",
		options: [],
		cover_img:
			"https://upload.wikimedia.org/wikipedia/commons/c/c6/Latte_art_3.jpg",
	},
	{
		id: "m5",
		name: "Cafe Latte",
		stock: 64,
		category: "Coffee",
		options: [
			{
				name: "Milk",
				isAvailable: true,
				optionList: ["Full", "Skimmed"],
			},
		],
		cover_img:
			"https://upload.wikimedia.org/wikipedia/commons/c/c6/Latte_art_3.jpg",
	},
];

const Meals = (props) => {
	const [items, setItems] = useState(DUMMY_MEALS);

	const getItemsHandler = (item) => {
		setItems(item);
	};

	return (
		<Fragment>
			<MealsSummary />
			<MealFinder items={items} onGetItems={getItemsHandler} />
			<AvailableMeals
				onGetItemData={props.onGetItemData}
				onShow={props.onShow}
				items={items}
			/>
		</Fragment>
	);
};

export default Meals;
