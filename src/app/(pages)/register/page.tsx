import { Title } from "@/app/components/title/title";
import { Metadata } from "next";
import Image from "next/image";
import { FormRegister } from "./FormRegister";

export const metadata: Metadata = {
  title: "Trang đăng ký",
  description: "Nội dung trang đăng ký",
};

export default function RegisterPage() {
  return (
    <>
      <>
        <div className="mt-[60px] w-[500px] mx-auto">
          <Title text="Đăng Ký Tài Khoản" className="text-center" />
          <FormRegister/>
        </div >
      </>
    </>
  );
}
