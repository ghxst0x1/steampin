import styles from "../styles/Home.module.css";

function Linkitem(element: { title: string; url: string; desc: string }) {
  return (
    <a href={element.url} className={styles.card}>
      <h2>{element.title} &rarr;</h2>
      <p>{element.desc}</p>
    </a>
  );
}
export default Linkitem;
