import { searchData } from "@/utils/searchUtils";
import { notFound } from "next/navigation";

const SearchResultsPage = async ({
  searchParams,
}: {
  searchParams: { q?: string };
}) => {
  const query = searchParams.q?.trim();

  if (!query) return notFound();

  const results = await searchData(query);

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Search results for: &quot;{query}&quot;
      </h1>

      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((item, index) => (
            <li key={index} className="border-b pb-2">
              <a href={item.href} className="text-blue-600 hover:underline">
                {item.title}
              </a>
              <p className="text-sm text-gray-600">{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default SearchResultsPage;
