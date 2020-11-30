import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye } from "react-feather";
import { clientHttp } from "../../services/clientHttp";
import Button from "../../src/common/Button";
import IconElement from "../../src/common/IconElement";
import Layouts from "../../src/Layouts";
import Table from "../../src/Table";

export const columns = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    render: (value, { id }) => (
      <Link href={`/customers/${id}`}>
        <a className="text-blue-500">{value}</a>
      </Link>
    ),
  },
  {
    key: "document",
    title: "Document",
    dataIndex: "document",
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
  },
  {
    key: "phone",
    title: "Phone",
    dataIndex: "phone",
  },
  {
    key: "id",
    title: "",
    dataIndex: "id",
    render: (value) => (
      <Link href={`/customers/${value}`}>
        <a className="text-blue-600">
          <Eye size={18} />
        </a>
      </Link>
    ),
  },
];

const Customers = (props) => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomer = async () => {
      const { data } = await clientHttp.get("customers");
      setCustomers(data);
      setLoading(false);
    };
    fetchCustomer();
  }, []);

  return (
    <Layouts title="Customer" {...{ loading }}>
      <div className="flex justify-between w-full items-center">
        <h3 className="text-2xl text-gray-700 font-semibold flex gap-2 items-center">
          <IconElement icon="User" />
          Customers List
        </h3>
        <div>
          <Link href="/customers/create">
            <Button label="Add" icon="Plus" variant="primary" />
          </Link>
        </div>
      </div>
      <Table dataSource={customers} {...{ columns }} />
    </Layouts>
  );
};

export default Customers;
