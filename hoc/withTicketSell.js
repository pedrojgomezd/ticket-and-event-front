import { useRouter } from "next/router";
import React, { useState } from "react";

const withTicketSell = (Component) => {
  const NewComponent = (props) => {
    const route = useRouter();
    const { id } = route.query;
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return (
      <Component
        {...props}
        {...{ loading, setLoading, modalIsOpen, setModalIsOpen, id }}
      />
    );
  };

  return NewComponent;
};

export default withTicketSell;
