import link from "../data/link";
import Linkitem from "./linkitem";

function Links() {
  return (
    <>
      {link.map((project) => (
        <Linkitem
          key={project.title}
          title={project.title}
          url={project.url}
          desc={project.desc}
        />
      ))}
    </>
  );
}
export default Links;
