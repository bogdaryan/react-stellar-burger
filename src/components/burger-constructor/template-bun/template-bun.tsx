import styles from "./template-bun.module.css";

type Props = {
  type: string;
  bunClassName: string | null;
};

function TemplateBun({ type, bunClassName }: Props) {
  const classNameType = type === "top" ? styles.top : styles.bottom;

  return (
    <div className={`${classNameType} ${styles.element} ${bunClassName} ml-8`}>
      <p className="text text_type_main-default">Выберите булку</p>
    </div>
  );
}

export default TemplateBun;
