import {
  IndividualResultResponse,
  ProgramResponse,
  ResultAnnouncementResponse,
} from "types";
import axiosClient from "utils/axios";

export async function getPrograms() {
  try {
    const body = new FormData();
    body.append("data", "programs");
    const res = await axiosClient.post<ProgramResponse>("/masterData", body);
    const data = res.data;
    if (!!!data.program) return [];
    return data.program;
  } catch (error) {
    console.log("Something went wrong", error);
    return [];
  }
}

export async function getResultAnnoucements(programId: number) {
  if (!programId) return [];
  try {
    const res = await axiosClient.post<ResultAnnouncementResponse[]>(
      "/result",
      JSON.stringify({ program: programId }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = res.data;
    if (!!!data) return [];
    return data;
  } catch (error) {
    console.log("Something went wrong", error);
    return [];
  }
}

export async function getIndividualResult(
  examDefId: number,
  schemeId: number,
  dateOfBirth: Date,
  registerNumber: string
) {
  try {
    const res = await axiosClient.post<IndividualResultResponse>(
      "/individualresult",
      JSON.stringify({
        registerNo: registerNumber,
        dateOfBirth: new Intl.DateTimeFormat("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(dateOfBirth),
        examDefId: examDefId,
        schemeId: schemeId,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = res.data;
    if (!!!data) return { message: "Record not found..." };
    return data;
  } catch (error) {
    console.log("Something went wrong", error);
    return { message: "Record not found..." };
  }
}
