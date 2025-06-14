import Link from "next/link";

const Footer = () => {
  return (
    <main className="flex items-center justify-between bg-mBlue rounded-lg p-4 text-white text-xs">
      <div>UNHCR SO Aleppo Security Unit</div>
      <div>
        Developed by{" "}
        <Link href="mailto:makdessi@unhcr.org" className="hover:underline">
          Majd Makdessi
        </Link>
      </div>
    </main>
  );
};

export default Footer;
