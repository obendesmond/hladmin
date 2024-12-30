import { CSSProperties } from "react";
import ReactJson from "react-json-view";

interface Props {
  jsonObj: object;
  style?: CSSProperties | undefined;
  collapsed?:boolean
}
const JsonView = ({ jsonObj = {}, style, collapsed = true }: Props) => {
  return (
    <ReactJson
      src={jsonObj}
      theme="monokai"
      collapsed={collapsed}
      enableClipboard={true}
      displayDataTypes={false}
      style={style}
    />
  );
};

export default JsonView;
