"use server";

const validateUserId = (userId: string) => {
  const regex = /^[a-zA-Z0-9]{4,20}$/;
  return regex.test(userId);
};

const validatePassword = (password: string) => {
  const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,20}$/;
  return regex.test(password);
};

const onSubmit = async (prevState: any, rawFormData: FormData) => {
  if (
    !rawFormData.get("userId") ||
    !(rawFormData.get("userId") as string)?.trim()
  ) {
    return { message: "NO_USER_ID" };
  }
  if (validateUserId(rawFormData.get("userId") as string) === false) {
    return { message: "INVALID_USER_ID" };
  }
  if (
    !rawFormData.get("password") ||
    !(rawFormData.get("password") as string)?.trim()
  ) {
    return { message: "NO_PASSWORD" };
  }
  if (validatePassword(rawFormData.get("password") as string) === false) {
    return { message: "INVALID_PASSWORD" };
  }
  if (
    !rawFormData.get("passwordCheck") ||
    !(rawFormData.get("passwordCheck") as string)?.trim()
  ) {
    return { message: "NO_PASSWORD_CHECK" };
  }
  if (rawFormData.get("password") !== rawFormData.get("passwordCheck")) {
    return { message: "PASSWORD_MISMATCH" };
  }
  if (
    !rawFormData.get("emailId") ||
    !(rawFormData.get("emailId") as string)?.trim()
  ) {
    return { message: "NO_EMAIL_ID" };
  }
  if (
    !rawFormData.get("emailAddress") ||
    !(rawFormData.get("emailAddress") as string)?.trim()
  ) {
    return { message: "NO_EMAIL_ADDRESS" };
  }

  const formData = new FormData();
  formData.append("userId", rawFormData.get("userId") as string);
  formData.append("password", rawFormData.get("password") as string);
  formData.append(
    "email",
    `${rawFormData.get("emailId")}@${rawFormData.get("emailAddress")}` as string
  );
  formData.append(
    "marketingOne",
    rawFormData.get("marketingOne") ? "true" : "false"
  );
  formData.append(
    "marketingTwo",
    rawFormData.get("marketingTwo") ? "true" : "false"
  );
  formData.append(
    "marketingThree",
    rawFormData.get("marketingThree") ? "true" : "false"
  );

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/register`,
      {
        method: "POST",
        body: formData,
        // 쿠키 포함: 이미 로그인한 경우 회원가입 불가능
        credentials: "include",
      }
    );

    console.log(response.status);

    const result = await response.json();

    console.log(result);

    if (result.statusCode === 201) {
      console.log("회원가입 성공");
      return { message: "SUCCESS" };
    } else if (result.statusCode === 404) {
      console.log("이미 존재하는 유저입니다.");
      return { message: "USER_ALREADY_EXISTS" };
    } else if (result.statusCode === 400) {
      console.log("회원가입에 실패했습니다.");
      return { message: "INVALID_DATA" };
    }
  } catch (error) {
    console.error(error);
    return { message: "INVALID_DATA" };
  }
  return null;
};

export default onSubmit;
