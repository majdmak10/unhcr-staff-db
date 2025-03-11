interface EmptyStateProps {
  noColumnsMessage?: string;
  noResultsMessage?: string;
  searchValue?: string;
  visibleColumnsCount: number;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  noColumnsMessage = "No columns to display. Please select columns to show.",
  noResultsMessage = "No results found. Please refine your search or clear filters.",
  searchValue,
  visibleColumnsCount,
}) => (
  <div className="flex justify-center items-center py-8">
    <p className="text-gray-500 text-center">
      {visibleColumnsCount === 0
        ? noColumnsMessage
        : searchValue
        ? `${noResultsMessage} (Search term: "${searchValue}")`
        : noResultsMessage}
    </p>
  </div>
);

export default EmptyState;
