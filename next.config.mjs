/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next.js에서 외부 이미지를 사용할 때 허용할 도메인을 설정
    domains: ["master-car-application.s3.ap-northeast-2.amazonaws.com"],
  },
};

export default nextConfig;
