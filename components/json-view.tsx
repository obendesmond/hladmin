import { CSSProperties } from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactJson with SSR disabled
const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-700 h-32 rounded-md" />
});

interface Props {
  jsonObj: object;
  style?: CSSProperties | undefined;
  collapsed?: boolean;
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

export default dynamic(() => Promise.resolve(JsonView), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-700 h-32 rounded-md" />
});