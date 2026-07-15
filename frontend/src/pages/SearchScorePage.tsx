import { useState } from "react";
import Search from "@/components/common/Search";
import "./SearchScorePage.css";
import { studentApi } from "@/api/student.api";
import Student from "@/components/common/Student";
import type { StudentProps } from "@/types/StudentProps";

export default function SearchScorePage() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [lastSearched, setLastSearched] = useState<string | null>(null);
  const [student, setStudent] = useState<StudentProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setRegistrationNumber(query);
    setLastSearched(query);
    setError(null);
    setStudent(null);
    setLoading(true);

    try {
      const response = await studentApi.getBySbd(query) as StudentProps | string | null;
      console.log(response)
      if (response && typeof response !== 'string') {
        setStudent(response);
      } else {
        setError("Không tìm thấy thí sinh có số báo danh này.");
      }
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra trong quá trình tra cứu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-scores">
      <div className="search-scores__user-registration">
        <h1 className="search-scores__user-registration__header">
          Mã số báo danh
        </h1>
        <Search
          label="Mã số báo danh thí sinh"
          query={registrationNumber}
          placeholder="Nhập Mã số báo danh..."
          onSearch={handleSearch}
        />
      </div>

      <div className="search-scores__detailed">
        <h1 className="search-scores__detailed__header">Điểm số thí sinh từng môn</h1>
        <div className="search-scores__detailed__body">
          {loading && <p className="search-scores__status">Đang tải dữ liệu...</p>}

          {error && <p className="search-scores__error text-red-600 font-medium">{error}</p>}

          {student && !loading && (
            <div className="search-scores__result">
              <p className="mb-4 text-gray-600">Kết quả cho số báo danh: <strong>{lastSearched}</strong></p>
              <Student {...student} />
            </div>
          )}

          {!lastSearched && !loading && (
            <p className="text-gray-400">Kết quả điểm thí sinh sẽ hiển thị ở đây!</p>
          )}
        </div>
      </div>
    </div>
  );
}