"use client";

import { FormEventHandler, useState } from "react";
import { toast } from "sonner";
import { getCertificationCode } from "../../_lib/getCertificationCode";
import { getLostId } from "../../_lib/getLostId";
import Link from "next/link";

export default function FindIdPage() {
  const [email, setEmail] = useState("");
  const [certificationCode, setCertificationCode] = useState("");
  const [isCertificated, setIsCertificated] = useState(false);
  const [foundId, setFoundId] = useState("");
  const [isFound, setIsFound] = useState(false);
  // const router = useRouter();

  // 인증번호 받기
  const onCertificate: FormEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    setIsCertificated(true);

    // 로딩 시간이 길어질 수 있으므로 미리 알림
    toast.success("인증번호를 발급했습니다.");

    // 인증 코드 발급
    await getCertificationCode({
      purpose: "userid",
      email,
    }).then((res) => {
      // console.log(res);
      if (res.status === "fail") {
        toast.error(res.errorMessage);
        // return;
      }

      if (res.status === "success") {
        // toast.success(res.result.message);
      }
    });
  };

  // 아이디 찾기
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // console.log({ email, certificationCode });

    await getLostId({ email, certificationCode }).then((res) => {
      // console.log(res);
      if (res?.status === "fail") {
        setIsFound(false);
        toast.error(res.errorMessage);
        // return;
      }

      if (res?.status === "success") {
        toast.success("아이디 찾기 성공");
        const [successText, foundId] = res.result.message.split(" : ");
        setIsFound(true);
        setFoundId(foundId);
        // router.push("/auth/login");
      }
    });
  };

  return (
    <>
      <h1>아이디 찾기</h1>
      <div>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="button" onClick={onCertificate}>
            인증번호 받기
          </button>

          <label htmlFor="text">인증번호</label>
          <input
            id="text"
            type="text"
            value={certificationCode}
            onChange={(e) => setCertificationCode(e.target.value)}
          />

          <button type="submit" disabled={!isCertificated}>
            아이디 찾기
          </button>
        </form>

        {isFound && (
          <>
            <h2>
              아이디 찾기를 성공했습니다. <span>{foundId}</span>
            </h2>

            <Link href="/auth/login">로그인 페이지로 이동</Link>
          </>
        )}
      </div>
    </>
  );
}
