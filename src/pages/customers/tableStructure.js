import Link from "next/link";
import React from "react";

export const columnsCustomer = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
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
    key: "birt_day",
    title: "Birth day",
    dataIndex: "birth_day",
  },
];

export const columnsTicket = [
  {
    key: "meetup",
    title: "Meetup",
    dataIndex: "meetup",
    render: (value) => (
      <Link href={`/meetups/${value.id}`}>
        <a className="text-blue-600">{value.name}</a>
      </Link>
    ),
  },
  {
    key: "code",
    title: "Code",
    dataIndex: "code",
    redner: (value) => {
      alert(value);
    },
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
