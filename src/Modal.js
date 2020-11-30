import React, { useEffect, useState } from "react";
import { clientHttp } from "../services/clientHttp";
import Card from "./Card";
import Button from "./common/Button";
import IconElement from "./common/IconElement";

const Modal = ({
  title,
  dataSource,
  handleClick,
  isOpen,
  handleToggle,
  loading,
}) => {
  const [selectValue, setSelectValue] = useState(null);
  const [data, setData] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await clientHttp.get(dataSource);
      setData(data);
      setFetchLoading(false);
    };

    fetchData();
  }, [dataSource]);

  if (!isOpen) {
    return null;
  }
  return (
    <div className="absolute left-0 top-0 bg-gray-600 bg-opacity-75 w-full h-screen flex items-center justify-center">
      <Card className="w-80">
        <div className="text-xl text-gray-800 font-semibold p-2 ">
          {title ? title : "Modal"}
        </div>
        <div className="mt-4">
          {fetchLoading ? (
            <IconElement icon="Loader" className="animate-spin" />
          ) : (
            <select
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              className=" border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>Select {title}</option>
              {data.map(({ id, name, ...props }) => (
                <option key={id} value={id} disabled={props?.available === 0}>
                  {name} {props?.available === 0 && "- No available -"}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="mt-4 flex space-x-2 flex-row-reverse space-x-reverse">
          <Button
            variant="primary"
            label="Save"
            icon="Plus"
            onClick={() => handleClick(selectValue)}
          />
          <Button variant="default" label="Cancel" onClick={handleToggle} />
        </div>
      </Card>
    </div>
  );
};

export default Modal;
