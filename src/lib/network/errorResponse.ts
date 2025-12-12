import { isAxiosError } from "axios";
import { NextResponse } from "next/server";

const errorResponse = (error: unknown) => {
  if (isAxiosError(error)) {
    const status = error.response?.status ?? 500;

    if (status === 400) {
      return NextResponse.json(error.response?.data, { status: 400 });
    }

    if (status === 401) {
      return NextResponse.json(
        { message: "인증이 필요합니다" },
        { status: 401 },
      );
    }
    return NextResponse.json(error.response?.data, {
      status: status,
    });
  }

  return NextResponse.json(
    {
      message: "서버 오류가 발생했습니다",
    },
    { status: 500 },
  );
};

export default errorResponse;
