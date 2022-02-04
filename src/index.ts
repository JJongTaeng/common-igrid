import Column, { ColumnConstructorProps } from "./component/grid/Column";
import Row from "./component/grid/Row";

export const row = () => {
  return new Row();
}

export const column = (props: ColumnConstructorProps) => {
  return new Column(props);
}

export {
  Row, Column, ColumnConstructorProps
}