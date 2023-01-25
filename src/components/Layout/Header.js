import React, { Fragment } from "react";

import heroImage from "../../assets/hero-bg.jpg";
import logo from "../../assets/Logos/solutions.png";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
	return (
		<Fragment>
			<header className={classes.header}>
				<img src={logo} alt="Eden Solutions Logo" />

				<HeaderCartButton onClick={props.onShowCart} />
			</header>
			<div className={classes["main-image"]}>
				<img
					src={heroImage}
					alt="A person holding black mug filled with black liquid"
				/>
			</div>
		</Fragment>
	);
};

export default Header;
