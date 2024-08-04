import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full h-screen text-off-white">
        <Image
            src={'/assets/images/taskd_main_logo.svg'}
            alt={"task main logo"}
            width={300}
        />
    </main>
  );
}
