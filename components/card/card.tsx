import CardStyle from "./card.module.scss";

const Card: React.FC = (props) => (
    <div className={CardStyle.Card}>{props.children}</div>
);

export default Card;
