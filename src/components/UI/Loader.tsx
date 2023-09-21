import { DotLoader } from "react-spinners";
import styles from "./Loader.module.css";
function Loader() {
  return (
    <div className={styles["loader-container"]}>
      <div className={styles.loader}>
        <DotLoader color="#36d7b7" size={200} />
      </div>
    </div>
  );
}

export default Loader;
