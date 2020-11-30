import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye } from "react-feather";
import { clientHttp } from "../../services/clientHttp";
import Button from "../../src/common/Button";
import IconElement from "../../src/common/IconElement";
import Layouts from "../../src/Layouts";
import Table from "../../src/Table";

const columns = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    render: (value, { id }) => (
      <Link href={`/meetups/${id}`}>
        <a className="text-blue-600">{value}</a>
      </Link>
    ),
  },
  {
    key: "date",
    title: "Date",
    dataIndex: "date",
  },
  {
    key: "quantity",
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    key: "available",
    title: "Available",
    dataIndex: "available",
  },
  {
    key: "id",
    title: "",
    dataIndex: "id",
    render: (value) => (
      <Link href={`/meetups/${value}`}>
        <a className="text-blue-600">
          <Eye size={18} />
        </a>
      </Link>
    ),
  },
];

const Meetups = (props) => {
  const [loading, setLoading] = useState(true);
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    const fetchCustomer = async () => {
      const { data } = await clientHttp.get("meetups");
      setMeetups(data);
      setLoading(false);
    };
    fetchCustomer();
  }, []);

  return (
    <Layouts title="Customer" {...{ loading }}>
      <div className="flex justify-between w-full items-center">
        <h3 className="text-2xl text-gray-700 font-semibold flex gap-2 items-center">
          <IconElement icon="Target" />
          Meetups List
        </h3>
        <div>
          <Link href="/meetups/create">
            <Button label="Add" icon="Plus" variant="primary" />
          </Link>
        </div>
      </div>
      <Table dataSource={meetups} {...{ columns }} />
    </Layouts>
  );
};

export default Meetups;
