import { TextInput } from "../atoms/TextInput";
import { Select } from "../atoms/Select";
import { Button } from "../atoms/Button";
import { FiSearch, FiXCircle } from "react-icons/fi";

interface FilterBarProps {
  search: string;
  setSearch: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
  genre: string;
  setGenre: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  genres: string[];
  onReset: () => void;
}

export const FilterBar = ({
  search,
  setSearch,
  status,
  setStatus,
  genre,
  setGenre,
  sortBy,
  setSortBy,
  genres,
  onReset,
}: FilterBarProps) => {
  return (
    <div className="glass-card p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
      <div className="lg:col-span-1">
        <TextInput
          label="Search Games"
          placeholder="Title or company..."
          icon={<FiSearch />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        options={[
          { value: "all", label: "All Statuses" },
          { value: "acquired", label: "Acquired" },
          { value: "missing", label: "Missing" },
          { value: "not_interested", label: "Not Interested" },
        ]}
      />

      <Select
        label="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        options={[
          { value: "all", label: "All Genres" },
          ...genres.map((g) => ({ value: g, label: g })),
        ]}
      />

      <Select
        label="Sort By"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        options={[
          { value: "title-asc", label: "Title A-Z" },
          { value: "title-desc", label: "Title Z-A" },
          { value: "year-asc", label: "Year Oldest" },
          { value: "year-desc", label: "Year Newest" },
          { value: "company-asc", label: "Company A-Z" },
          { value: "company-desc", label: "Company Z-A" },
        ]}
      />

      <Button
        variant="secondary"
        onClick={onReset}
        className="w-full flex items-center space-x-2"
      >
        <FiXCircle />
        <span>Reset Filters</span>
      </Button>
    </div>
  );
};
