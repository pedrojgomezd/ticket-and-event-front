import { useCallback, useEffect, useState } from "react";
import { clientHttp } from "../../services/clientHttp";
import Button from "../../src/common/Button";
import Layouts from "../../src/Layouts";
import Modal from "../../src/Modal";
import Table from "../../src/Table";

import {
  columnsMeetup,
  columnsTicket,
} from "../../src/pages/meetups/tableStructure";
import withTicketSell from "../../hoc/withTicketSell";

const MeetupDetails = ({
  loading,
  setLoading,
  modalIsOpen,
  setModalIsOpen,
  id,
}) => {
  const [meetup, setMeetup] = useState([]);

  const handleAddTicket = (customer_id) => {
    clientHttp
      .post("tickets", {
        customer_id,
        meetup_id: id,
      })
      .then((data) => {
        fetchMeetup();
      })
      .catch((error) => console.log({ error }));
  };

  const fetchMeetup = useCallback(async () => {
    setLoading(true);
    const { data } = await clientHttp.get(`meetups/${id}`);
    setMeetup(data);
    setLoading(false);
    setModalIsOpen(false);
  }, [id]);

  useEffect(() => {
    if (id >= 1 && id !== undefined) {
      fetchMeetup();
    }
  }, [id]);

  return (
    <Layouts title="Customer" {...{ loading }}>
      <div>
        <h3 className="text-2xl text-gray-700 font-semibold">
          Meetup: {meetup.name}
        </h3>
      </div>
      <Table dataSource={[meetup]} columns={columnsMeetup} />
      <div>
        <div className="flex justify-between w-full items-center">
          <h3 className="text-2xl text-gray-700 font-semibold flex gap-2 items-center">
            Ticket sold
          </h3>
          <div>
            <Button
              label={meetup.available === 0 ? "No available" : "To sell"}
              icon="Plus"
              variant="primary"
              className={meetup.available === 0 && "bg-opacity-50"}
              onClick={() => setModalIsOpen(true)}
              disabled={meetup.available === 0}
            />
          </div>
        </div>
        {meetup?.tickets && (
          <Table dataSource={meetup.tickets} columns={columnsTicket} />
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        handleToggle={() => setModalIsOpen(false)}
        handleClick={handleAddTicket}
        dataSource="customers"
        title="Customers"
      />
    </Layouts>
  );
};

export default withTicketSell(MeetupDetails);
