import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ActionFunctionArgs } from "@remix-run/node";
import { useActionData, useLocation, useNavigate } from "@remix-run/react";
import { getIndividualResult } from "lib/api";
import { useEffect } from "react";

export async function action({ params, request }: ActionFunctionArgs) {
  const { examId, schemeId } = params;
  if (!examId || !schemeId)
    return { message: "Exam details cannot be found in request" };
  const formData = await request.formData();
  const registerNo = formData.get("registerNo") as string;
  const dateOfBirth = formData.get("dateOfBirth") as string;
  if (!registerNo || !dateOfBirth)
    return { message: "Candidate details cannot be found in request" };
  return await getIndividualResult(
    parseInt(examId),
    parseInt(schemeId),
    new Date(dateOfBirth),
    registerNo
  );
}

export async function loader() {
  return null;
}

function IndividualResult() {
  const data = useActionData<typeof action>();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (!!!data) {
      let path = pathname;
      const segments = path.split("/");
      segments.pop();
      path = segments.join("/");
      console.log(path + "/");
      return navigate(path);
    }
  }, []);

  const items = [
    { label: "NAME", key: "fullName" },
    { label: "COLLEGE", key: "institutionName" },
    { label: "REGISTER NO", key: "registerNo" },
    { label: "SEMESTER", key: "semesterName" },
    { label: "BRANCH", key: "branchName" },
    { label: "EXAM", key: "examYearAndMonth" },
  ] as const;

  return (
    data && (
      <Card>
        <CardHeader className="text-center font-bold">
          {"message" in data ? data.message : data.resultName}
        </CardHeader>
        {!("message" in data) && (
          <CardBody>
            <Table hideHeader aria-label="Student details" removeWrapper>
              <TableHeader>
                <TableColumn>ITEM</TableColumn>
                <TableColumn>VALUE</TableColumn>
              </TableHeader>
              <TableBody items={items}>
                {(item) => (
                  <TableRow key={item.key}>
                    <TableCell>{item.label}</TableCell>
                    <TableCell>{data[item.key]}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <Divider />
            <Table aria-label="Grade details" removeWrapper>
              <TableHeader>
                <TableColumn>COURSE</TableColumn>
                <TableColumn>GRADE</TableColumn>
                <TableColumn>CREDIT</TableColumn>
              </TableHeader>
              <TableBody items={data.resultDetails}>
                {(item) => (
                  <TableRow key={item.courseName}>
                    <TableCell>{item.courseName}</TableCell>
                    <TableCell>{item.gradeObtained}</TableCell>
                    <TableCell>{item.credits}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardBody>
        )}
      </Card>
    )
  );
}

export default IndividualResult;
