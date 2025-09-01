import "./cicles.css";
import {
  BiBot,
  BiBowlHot,
  BiCalendar,
  BiCoffeeTogo,
  BiDice5,
} from "react-icons/bi";

export const Cicles = () => {
  return (
    <ul className="circles">
      <li>
        <BiBot />
      </li>
      <li>
        <BiBowlHot />
      </li>
      <li>
        <BiCalendar />
      </li>
      <li>
        <BiCoffeeTogo />
      </li>
      <li>
        <BiBot />
      </li>
      <li>
        <BiDice5 />
      </li>
      <li>
        <BiBowlHot />
      </li>
      <li>
        <BiCalendar />
      </li>
      <li>
        <BiDice5 />
      </li>
      <li>
        <BiCoffeeTogo />
      </li>
    </ul>
  );
};
