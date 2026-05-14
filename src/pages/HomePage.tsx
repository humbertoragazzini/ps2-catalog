import { useState, useMemo } from "react";
import { useGameStore } from "../store/useGameStore";
import { AppShell } from "../components/templates/AppShell";
import { Header } from "../components/organisms/Header";
import { FilterBar } from "../components/molecules/FilterBar";
import { GameTable } from "../components/organisms/GameTable";
import { ImportExportPanel } from "../components/organisms/ImportExportPanel";
import type { Game } from "../types/game";

export const HomePage = () => {
  const { games, statuses, totalGames } = useGameStore();

  // Filter & Sort State
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [genreFilter, setGenreFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title-asc");

  // Unique Genres
  const genres = useMemo(() => {
    const set = new Set(games.map((g) => g.genre));
    return Array.from(set).sort();
  }, [games]);

  // Filtered & Sorted Games
  const filteredGames = useMemo(() => {
    let result = [...games];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) || g.company.toLowerCase().includes(q)
      );
    }

    // Status Filter
    if (statusFilter !== "all") {
      result = result.filter((g) => {
        const s = statuses[g.id] || "missing";
        return s === statusFilter;
      });
    }

    // Genre Filter
    if (genreFilter !== "all") {
      result = result.filter((g) => g.genre === genreFilter);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "year-asc":
          return a.year - b.year;
        case "year-desc":
          return b.year - a.year;
        case "company-asc":
          return a.company.localeCompare(b.company);
        case "company-desc":
          return b.company.localeCompare(a.company);
        default:
          return 0;
      }
    });

    return result;
  }, [games, statuses, search, statusFilter, genreFilter, sortBy]);

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setGenreFilter("all");
    setSortBy("title-asc");
  };

  return (
    <AppShell>
      <Header />
      
      <div className="space-y-8">
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary/60">
              Controls & Filtering
            </h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Showing <span className="text-white">{filteredGames.length}</span> of <span className="text-white">{totalGames}</span> games
            </p>
          </div>
          <FilterBar
            search={search}
            setSearch={setSearch}
            status={statusFilter}
            setStatus={setStatusFilter}
            genre={genreFilter}
            setGenre={setGenreFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            genres={genres}
            onReset={handleResetFilters}
          />
        </section>

        <section className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary/60 pl-1">
              Game Catalog
            </h2>
            <ImportExportPanel />
          </div>
          <GameTable games={filteredGames} />
        </section>
      </div>
    </AppShell>
  );
};
