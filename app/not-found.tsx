"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button, Link as NextUILink } from "@nextui-org/react";

export const metadata = {
  title: "404 - Страница не найдена",
};

export default function Error() {
  const router = useRouter();

  return (
    <section className="mx-auto xl:w-[70%] lg:w-[80%] sm:w-[85%] w-[90%] py-6 min-h-[59vh]">
      <div className="my-10">
        <Link className="flex items-center gap-x-1" href="/">
          <Image priority src="/qadam.png" alt="Qadam Logotype" width={35} height={35} />
          <h1 className="font-bold text-inherit md:text-xl tracking-tighter">Qadam</h1>
        </Link>
      </div>
      <div>
        <h1 className="md:text-3xl sm:text-2xl text-xl font-bold">404 | Страница не найдена</h1>
        <p className="sm:text-xl text-lg font-normal text-left mt-6">
          К сожалению такой страницы не существует :{"("}
        </p>
        <p className="sm:text-xl text-lg font-normal text-left ">
          Проверьте верность введенного адреса или вернитесь назад
        </p>
        <div className="mt-6 flex sm:flex-row flex-col items-start justify-start gap-5">
          <Link href="/">
            <Button
              variant="flat"
              color="primary"
              style={{ backgroundColor: '#dd6031', color: 'white' }}
              as={NextUILink}
              href="/"
            >
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
