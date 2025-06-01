import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { searchData } from "@/utils/searchUtils";
import { notFound } from "next/navigation";
import { highlightText } from "@/utils/highlightText";

interface SearchParams {
  searchParams: Promise<{
    q?: string;
  }>;
}

const SearchResultsPage = async ({ searchParams }: SearchParams) => {
  const { q } = await searchParams;
  const query = q?.trim() || "";

  if (!query) return notFound();

  const results = await searchData(query);

  return (
    <main className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between bg-white rounded-lg shadow">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Search", href: "/" },
          ]}
          className="shadow-none"
        />
      </div>

      <div className="flex flex-col bg-white rounded-lg p-4 shadow">
        <h1 className="text-md font-semibold mb-4">
          Search results for:{" "}
          <span className="text-mBlue">&quot;{query}&quot;</span>
        </h1>

        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <ul className="space-y-4 text-sm">
            {results.map((item, index) => (
              <li key={index} className="border-b border-gray-200 pb-2">
                <a
                  href={item.href}
                  className="text-mBlue hover:underline font-medium"
                >
                  {highlightText(item.title, query)}
                </a>
                <p className="text-mtext mt-2 mb-2">
                  {highlightText(item.description, query)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default SearchResultsPage;
