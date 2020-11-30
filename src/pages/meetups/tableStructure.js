import Link from "next/link";
import React from "react";

export const columnsMeetup = [
  {
    key: "description",
    title: "Description",
    dataIndex: "description",
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
];

export const columnsTicket = [
  {
    key: "code",
    title: "Code",
    dataIndex: "code",
    redner: (value) => {
      alert(value);
    },
  },
  {
    key: "customer",
    title: "Customer",
    dataIndex: "customer",
    render: (value) => (
      <Link href={`/customers/${value.id}`}>
        <a className="text-blue-600">{value.name}</a>
      </Link>
    ),
  },
  {
    key: "is_used",
    title: "Status",
    dataIndex: "is_used",
    render: (value) => (
      <div
        className={`p-1 rounded w-16 text-center ${
          value ? "bg-red-300 text-red-500" : "bg-green-200 text-green-500"
        }`}
      >
        {value ? "Used" : "No used"}
      </div>
    ),
  },
];
