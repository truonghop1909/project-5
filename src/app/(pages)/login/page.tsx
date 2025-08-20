import { Title } from "@/app/components/title/title";
import { Metadata } from "next";
import Image from "next/image";
import { FormLogin } from "./FormLogin";

export const metadata: Metadata = {
  title: "Trang đăng nhập",
  description: "Nội dung trang đăng nhập",
};

export default function LoginPage() {
  return (
    <>
      <div className="mt-[60px] w-[500px] mx-auto">
        <Title text="Đăng Nhập Tài Khoản" className="text-center" />
        <FormLogin/>
      </div >
    </>
  );
}
