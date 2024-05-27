type Props = {
  email: string;
  certificationCode: string;
};

/**
 * 이메일과 인증번호로 아이디를 찾습니다.
 *
 * @param email
 * @param verificationCode
 * @returns error message | result
 */
export const getLostId = async ({ email, certificationCode }: Props) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("verificationCode", certificationCode);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/id-lost`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    const statusCode = result.statusCode;
    const errorCode = result.errorCode;

    // console.log({ result });
    // 성공
    // {
    //   result: {
    //     message: '아이디 찾기를 성공했습니다 : test1'
    //   }
    // }

    // 실패
    // {
    //   result: {
    //     statusCode: 400,
    //     errorMessage: '인증 번호가 일치하지 않습니다',
    //     errorCode: 'VERIFICATION_UNMATCHED'
    //   }
    // }

    if (statusCode === 400) {
      if (errorCode === "NOT_BLANK_ERROR") {
        return {
          status: "fail",
          errorMessage: "이메일과 인증 번호를 입력해주세요.",
        };
      }

      if (errorCode === "WRONG_INPUT") {
        return {
          status: "fail",
          errorMessage: "이메일 형식이 올바르지 않습니다.",
        };
      }

      if (errorCode === "VERIFICATION_UNMATCHED") {
        return {
          status: "fail",
          errorMessage: "인증 번호가 일치하지 않습니다.",
        };
      }

      if (errorCode === "EMAIL_AUTH_NUMBER_EXPIRED_OR_CODE_NOT_FOUND") {
        return {
          status: "fail",
          errorMessage: "이메일과 인증 번호를 다시 확인해주세요.",
        };
      }
    }

    return { status: "success", result };
  } catch (error) {
    return { status: "fail", errorMessage: "다시 시도해주세요." };
  }
};
