import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./tabs.module.css";

type Props = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

function Tabs({ activeTab, setActiveTab }: Props) {
  return (
    <div className={`${styles.tabs} mb-10`}>
      <Tab value="bun" active={activeTab === "bun"} onClick={setActiveTab}>
        Булки
      </Tab>
      <Tab value="sauce" active={activeTab === "sauce"} onClick={setActiveTab}>
        Соусы
      </Tab>
      <Tab value="main" active={activeTab === "main"} onClick={setActiveTab}>
        Начинки
      </Tab>
    </div>
  );
}

export default Tabs;
