import React from "react";

function MethodSelect() {
  const [selectedMethod, setSelectedMethod] = React.useState("get");
  return (
    <select
      value={selectedMethod}
      onChange={e => setSelectedMethod(e.target.value)}
    >
      <option value="get" style={{ color: "greenyellow" }}> GET </option>
      <option value="post" style={{ color: "orange" }}> POST </option>
      <option value="put" style={{ color: "orange" }}> PUT </option>
      <option value="patch" style={{ color: "plum" }}> PATCH </option>
      <option value="delete" style={{ color: "crimson" }}> DELETE </option>
    </select>
  )
}

function UrlRow() {
  return (
    <div className="url-row">
      <MethodSelect />
      <input type="text" placeholder="Enter URL" />
      <button>Send</button>
    </div>
  )
};

export default function RequestPanel() {
  return (
    <>
      <UrlRow />
    </>
  )
};