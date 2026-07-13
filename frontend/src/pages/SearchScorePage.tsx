import { useState } from "react";
import Search from "@/components/common/Search";
import "./SearchScorePage.css";

export default function SearchScorePage() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [lastSearched, setLastSearched] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    if (!query) return;
    setRegistrationNumber(query);
    setLastSearched(query);
  };

  return (
    <div className="search-scores">
      <div className="search-scores__user-registration">
        <h1 className="search-scores__user-registration__header">
          User Registration
        </h1>
        <Search
          label="User Registration"
          query={registrationNumber}
          placeholder="Enter registration number"
          onSearch={handleSearch}
        />
      </div>

      <div className="search-scores__detailed">
        <h1 className="search-scores__detailed__header">Detailed Scores</h1>
        <div className="search-scores__detailed__body">
          {lastSearched ? (
            <p>Kết quả cho số báo danh: {lastSearched}</p>
          ) : (
            <p>Detailed view of search scores here!</p>
          )}
        </div>
      </div>
    </div>
  );
}