import { AppBar, Toolbar } from "@mui/material";
import logo from "../../assests/logo.png";
import styles from "./header.module.css";
const Header = () => {
	return (
		<AppBar position='static' color='inherit' className={styles.header}>
			<Toolbar className={styles.headerToolBar}>
				<img src={logo} alt='logo' />
			</Toolbar>
		</AppBar>
	);
};

export default Header;
