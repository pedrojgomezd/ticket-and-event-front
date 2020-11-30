import { useFormik } from "formik";
import { route } from "next/dist/next-server/server/router";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { clientHttp } from "../../services/clientHttp";

import Card from "../../src/Card";
import Button from "../../src/common/Button";
import IconElement from "../../src/common/IconElement";
import Input from "../../src/form/Input";
import Layouts from "../../src/Layouts";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  date: Yup.string().required("Date is required!"),
  place: Yup.string().required("Place is required!"),
  description: Yup.string().required("Description is required!"),
  quantity: Yup.number().required("Quantity is required!"),
});

const MeetupCreate = () => {
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const [file, setFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      coverFake: {},
      place: "",
      description: "",
      quantity: "",
    },
    onSubmit: (value) => {
      setLoading(true);
      const form = new FormData();
      for (let v in value) {
        form.append(v, value[v]);
      }

      form.append("cover", file);

      clientHttp
        .post("meetups", form)
        .then(({ data }) => route.push(`/meetups/${data.id}`))
        .catch(() => setLoading(false));
    },
    validationSchema,
  });
  return (
    <Layouts title="Create Customer">
      <div className="flex justify-between w-full items-center">
        <h3 className="text-2xl text-gray-700 font-semibold flex gap-2 items-center">
          <IconElement icon="Target" />
          Meetups create
        </h3>
        <div>
          <Link href="/meetups">
            <a>Back</a>
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <form onSubmit={formik.handleSubmit}>
          {/*'name-', 'cover', 'dat-e', 'place-', 'description-', 'quantity',*/}
          <Card className="p-6">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Cover"
                name="coverFake"
                type="file"
                onChange={(e) => {
                  formik.handleChange(e);
                  setFile(e.currentTarget.files[0]);
                }}
                value={formik.values.coverFake.name}
                touched={formik.touched.coverFake}
                error={formik.errors.coverFake}
              />
              <Input
                label="Name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                touched={formik.touched.name}
                error={formik.errors.name}
              />
              <Input
                label="place"
                name="place"
                onChange={formik.handleChange}
                value={formik.values.place}
                touched={formik.touched.place}
                error={formik.errors.place}
              />
              <Input
                label="Date meetup"
                name="date"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.date}
                touched={formik.touched.date}
                error={formik.errors.date}
              />
              <Input
                label="Description"
                name="description"
                type="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                touched={formik.touched.description}
                error={formik.errors.description}
              />
              <Input
                label="Quantity"
                name="quantity"
                onChange={formik.handleChange}
                value={formik.values.quantity}
                touched={formik.touched.quantity}
                error={formik.errors.quantity}
              />
            </div>
            <div className="flex justify-end">
              <Button
                label="Save"
                icon="Save"
                type="submit"
                variant="primary"
                {...{ loading }}
              />
            </div>
          </Card>
        </form>
      </div>
    </Layouts>
  );
};

export default MeetupCreate;
