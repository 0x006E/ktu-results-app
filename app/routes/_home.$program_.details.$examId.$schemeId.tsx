import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { Form, useNavigation } from "@remix-run/react";

function Details() {
  const { state } = useNavigation();
  return (
    <Card>
      <CardBody>
        <Form
          className="flex flex-col w-full  gap-8"
          action="individualresult"
          method="post"
        >
          <Input
            type="text"
            name="registerNo"
            label="Register Number"
            placeholder="Eg: MES19CS043"
            pattern="L?[A-Z]{3}[0-9]{2}[A-Z]{2}[0-9]{3}"
            isRequired
          />
          <Input
            type="date"
            label="Date of Birth"
            name="dateOfBirth"
            placeholder="Enter your date of birth"
            isRequired
          />
          <Button
            type="submit"
            color="primary"
            isLoading={state === "loading" || state === "submitting"}
          >
            Get your results
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}

export default Details;
