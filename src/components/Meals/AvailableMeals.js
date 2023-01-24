import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
	{
		id: "m1",
		name: "Sushi",
		description: "Finest fish and veggies",
		stock: 6,
		price: 22.99,
	},
	{
		id: "m2",
		name: "Schnitzel",
		description: "A german specialty!",
		stock: 6,
		price: 16.5,
	},
	{
		id: "m3",
		name: "Barbecue Burger",
		description: "American, raw, meaty",
		stock: 6,
		price: 12.99,
	},
	{
		id: "m4",
		name: "Green Bowl",
		description: "Healthy...and green...",
		stock: 6,
		price: 18.99,
	},
	{
		id: "m5",
		name: "Item 1",
		description: "Healthy...and green...",
		stock: 64,
		price: 18.99,
		category: "636794f32006a934d7a095a2",
		options: [
			{
				name: "milk",
				isAvailable: true,
				optionList: ["full", "skimmed"],
			},
		],
		slug: "item-1"
	},
];

const AvailableMeals = () => {
	const mealsList = DUMMY_MEALS.map((meal) => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
			stock={meal.stock}
		/>
	));
	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
