import React from "react";
import { CardInfo } from "../../types";
import { CardsProps } from "../Cards";
import "./Tooltip.css";

type TooltipProps = {
  children: React.ReactNode;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
} & Pick<CardsProps, "removeCard"> &
  Pick<CardInfo, "id">;

const Tooltip: React.FC<TooltipProps> = React.memo(({ children, id, removeCard, setIsEditable }) => {
  const [isShow, setIsShow] = React.useState(false);
  const tooltipElement = React.useRef<HTMLDivElement>(null);
  const clickOutside = React.useCallback(
    (e: MouseEvent) => {
      if (tooltipElement.current && !tooltipElement.current.contains(e.target as Node)) {
        setIsShow(false);
        setIsEditable(false);
      }
    },
    [tooltipElement]
  );
  React.useEffect(() => {
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [clickOutside]);
  return (
    <div className="tooltip-container" ref={tooltipElement}>
      <div onClick={() => setIsShow(!isShow)}>{children}</div>
      {isShow && (
        <div className="tooltip">
          <ul>
            <li>
              <span>Edit</span>
              <i className="fas fa-edit"></i>
            </li>
            <li onClick={() => removeCard(id)}>
              <span>Delete</span>
              <i className="fas fa-trash"></i>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
});

export default Tooltip;
