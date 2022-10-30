import { CircularProgress } from "@mui/material";
import styles from "../loader/loader.module.css";

const Loader = () => {
	return (
		<div className={styles.loader}>
			<CircularProgress color='inherit' />
		</div>
	);
};
export default Loader;
