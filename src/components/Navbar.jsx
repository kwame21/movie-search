import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>🎬 MovieApp</Link>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/favourites" className={styles.link}>❤️ Favourites</Link>
      </div>
    </nav>
  );
}

export default Navbar;