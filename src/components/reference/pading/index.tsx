import * as React from "react";
import Button from "@material-ui/core/Button";
import LeftIcon from "@material-ui/icons/ChevronLeft";
import RightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles } from "@material-ui/styles";
import classnames from "classnames";

const useStyles = makeStyles(theme => ({
  container: {
    listStyleType: "none",
    paddingLeft: 0,
    margin: "10px 0",
    display: "flex",
    alignItem: "center"
  },
  btn: {
    margin: "0 5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    color: "rgba(0,0,0,0.65)",
    border: "1px solid #d9d9d9",
    borderRadius: 4,
    cursor: "pointer",
    userSelect: "none",
    backgroundColor: "white"
  },
  disabled: {
    cursor: "not-allowed !important",
    color: "rgba(0,0,0,0.25) !important"
  },
  on: {
    borderColor: "#1890ff!important",
    color: "#1890ff!important"
  },
  header: {
    display: "flex",
    marginLeft: "auto",
    alignItems: "center",
    marginRight: 10
  }
}));

interface PaginationProps {
  total: number;
  current: number;
  onChange: (pageNumber: number) => void;
  header?: React.ReactNode | string;
  className?: string;
  style?: object;
  hideOnSinglePage?: boolean;
}

function calcPageList(current, total) {
  const list = new Array(total).fill(1).map((v, i) => i + 1);

  if (list.length < 5) {
    return list;
  }

  if (total - current < 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }

  if (current > 3) {
    return [1, "...", ...list.slice(current - 2, current + 1), "...", total];
  }

  return [1, 2, 3, 4, 5, "...", total];
}

export function Pagination(props: PaginationProps) {
  const classes = useStyles();
  const {
    current,
    total,
    header,
    className,
    onChange,
    style,
    hideOnSinglePage = true
  } = props;

  function next() {
    if (current + 1 <= total) {
      onChange(current + 1);
    }
  }

  function prev() {
    if (current - 1 >= 1) {
      onChange(current - 1);
    }
  }

  function change(item: number) {
    if (item !== current) {
      onChange(item);
    }
  }

  if (hideOnSinglePage && total <= 1) {
    return null;
  }

  return (
    <ul
      className={classnames({ [className]: className }, classes.container)}
  style={style ? style : {}}
  >
  {header && <div className={classes.header}>{header}</div>}
    <li
  onClick={prev}
  style={{ marginLeft: !!header ? 0 : "auto" }}
  className={classnames(classes.btn, {
    [classes.disabled]: current === 1
  })}
>
  <LeftIcon />
  </li>
  {calcPageList(current, total).map((item, index) => {
    if (item === "...") {
      return (
        <li
          className={classnames(classes.disabled, classnames.btn)}
      key={item}
        >
        {item}
        </li>
    );
    } else {
      return (
        <li
          className={classnames(
            { [classes.on]: current === item },
      classes.btn
    )}
      key={item}
      onClick={() => change(item as number)}
    >
      {item}
      </li>
    );
    }
  })}
  <li
    onClick={next}
  className={classnames(classes.btn, {
    [classes.disabled]: current === total
  })}
>
  <RightIcon />
  </li>
  </ul>
);
}

