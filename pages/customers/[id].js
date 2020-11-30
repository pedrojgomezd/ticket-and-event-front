import { useCallback, useEffect, useState } from "react";
import { clientHttp } from "../../services/clientHttp";
import Button from "../../src/common/Button";
import Layouts from "../../src/Layouts";
import Modal from "../../src/Modal";
import Table from "../../src/Table";
import {
  columnsCustomer,
  columnsTicket,
} from "../../src/pages/customers/tableStructure";
import withTicketSell from "../../hoc/withTicketSell";

const CustomersDetails = ({
  loading,
  setLoading,
  modalIsOpen,
  setModalIsOpen,
  id,
}) => {
  const [customer, setCustomer] = useState([]);

  const handleAddTicket = (meetup_id) => {
    clientHttp
      .post("tickets", {
        customer_id: id,
        meetup_id,
      })
      .then((data) => {
        fetchCustomer();
      })
      .catch((error) => console.log({ error }));
  };
  const fetchCustomer = useCallback(async () => {
    setLoading(true);
    const { data } = await clientHttp.get(
      `customers/${id}?tickets?true&meetup=true`
    );
    setCustomer(data);
    setLoading(false);
    setModalIsOpen(false);
  }, [id]);

  useEffect(() => {
    if (id >= 1 && id !== undefined) {
      fetchCustomer();
    }

    return () => true;
  }, [id]);

  return (
    <Layouts title="Customer" {...{ loading }}>
      <div>
        <h3 className="text-2xl text-gray-700 font-semibold">
          Customer: {customer.name}
        </h3>
      </div>
      <Table dataSource={[customer]} columns={columnsCustomer} />
      <div>
        <div className="flex justify-between w-full items-center">
          <h3 className="text-2xl text-gray-700 font-semibold flex gap-2 items-center">
            Ticket sold
          </h3>
          <div>
            <Button
              label="To sell"
              icon="Plus"
              variant="primary"
              onClick={() => setModalIsOpen(true)}
            />
          </div>
        </div>
        {customer?.tickets && (
          <Table dataSource={customer.tickets} columns={columnsTicket} />
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        handleToggle={() => setModalIsOpen(false)}
        handleClick={handleAddTicket}
        dataSource="meetups"
        title="Meetups"
      />
    </Layouts>
  );
};

export default withTicketSell(CustomersDetails);
