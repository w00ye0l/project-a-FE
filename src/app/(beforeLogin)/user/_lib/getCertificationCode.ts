type Props = {
  purpose: string;
  email: string;
};

/**
 * 이메일로 인증번호를 발급합니다.
 *
 * @param purpose("userid" | "password")
 * @param email
 * @return error message | result
 */
export const getCertificationCode = async ({ purpose, email }: Props) => {
  const formData = new FormData();
  formData.append("purpose", purpose);
  formData.append("email", email);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/email/verification`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    const statusCode = result?.statusCode;

    // 공백 입력 시
    if (statusCode === 400) {
      // console.log({ result });
      // toast.error("인증번호를 이메일로 보내기 위해 이메일을 입력해주세요.");
      // throw new Error(result);
      return {
        status: "fail",
        errorMessage: "인증번호를 이메일로 보내기 위해 이메일을 입력해주세요.",
      };
    }

    // 존재하지 않는 이메일인 경우
    else if (statusCode === 404) {
      // console.log({ result });
      // toast.error("가입되지 않은 이메일입니다.");
      // throw new Error(result);
      return { status: "fail", errorMessage: "가입되지 않은 이메일입니다." };
    }

    // 이메일 찾기 성공
    return { status: "success", result };
  } catch (error) {
    // console.error(error);
    // toast.error("다시 시도해주세요.");
    return { status: "fail", errorMessage: "다시 시도해주세요." };
  }
};
