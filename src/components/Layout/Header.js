import React, { Fragment } from "react";

import heroImage from "../../assets/hero-bg.jpg"
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
	return (
		<Fragment>
			<header className={classes.header}>
				<h1>OfficeOrdering</h1>
				<HeaderCartButton />
			</header>
			<div className={classes["main-image"]}>
				<img src={heroImage} alt="A desk with coffee and keyboard on it" />
			</div>
		</Fragment>
	);
};

export default Header;
