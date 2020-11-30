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
  email: Yup.string().email().required("Email is required!"),
  document: Yup.string().required("Document is required!"),
});

const CustomerCreate = () => {
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      document: "",
      birth_day: "",
      email: "",
      phone: "",
    },
    onSubmit: (value) => {
      setLoading(true);
      clientHttp
        .post("customers", value)
        .then(({ data }) => route.push(`/customers/${data.id}`))
        .catch(() => setLoading(false));
    },
    validationSchema,
  });
  return (
    <Layouts title="Create Customer">
      <div className="flex justify-between w-full items-center">
        <h3 className="text-2xl text-gray-700 font-semibold flex gap-2 items-center">
          <IconElement icon="User" />
          Customers create
        </h3>
        <div>
          <Link href="/customers">
            <Button label="Back" icon="ArrowLeft" variant="default" />
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <form onSubmit={formik.handleSubmit}>
          <Card className="p-6">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                touched={formik.touched.name}
                error={formik.errors.name}
              />
              <Input
                label="Document"
                name="document"
                onChange={formik.handleChange}
                value={formik.values.document}
                touched={formik.touched.document}
                error={formik.errors.document}
              />
              <Input
                label="Birth day"
                name="birth_day"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.date}
                touched={formik.touched.date}
                error={formik.errors.date}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                touched={formik.touched.email}
                error={formik.errors.email}
              />
              <Input
                label="Phone"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                touched={formik.touched.phone}
                error={formik.errors.phone}
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

export default CustomerCreate;
