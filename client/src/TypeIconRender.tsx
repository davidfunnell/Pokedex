import typeIcons from "./styles/pokemon-types.module.css";

interface Props {
  type1Icon: string;
  type2Icon: string | null;
}

const TypeIconRender: any = ({ type1Icon, type2Icon }: Props) => {
  if (type2Icon != null) {
    return (
      <>
        <div
          className={`${typeIcons["type-icon"]} ${typeIcons[type1Icon]}`}
        ></div>
        <div
          className={`${typeIcons["type-icon"]} ${typeIcons[type2Icon]}`}
        ></div>
      </>
    );
  } else {
    return (
      <div
        className={`${typeIcons["type-icon"]} ${typeIcons[type1Icon]}`}
      ></div>
    );
  }
};
export default TypeIconRender;
