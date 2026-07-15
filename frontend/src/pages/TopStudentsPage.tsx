import { useEffect, useState } from "react"
import "./TopStudentsPage.css";
import { studentApi } from "@/api/student.api";
import Student from "@/components/common/Student"
import type { StudentProps } from "@/types/StudentProps";

export default function TopStudentsPage() {
    const [students, setStudents] = useState<StudentProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTopStudents = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await studentApi.getTopGroupA() as Array<StudentProps> | string | null;
                console.log(response);
                if (response && typeof response !== 'string') {
                    setStudents(response);
                } else {
                    setError("Không tìm thấy thí sinh nào.");
                }
            } catch (err: any) {
                setError(err.message || "Có lỗi xảy ra trong quá trình tra cứu.");
            } finally {
                setLoading(false);
            }
        }

        fetchTopStudents();
    }, [])

    return (
        <div className="top-group-a">
            <h1 className="top-group-a__header">Top 10 Thí sinh có điểm khối A cao nhất</h1>
            {loading && <p className="top-group-a__status">Đang tải dữ liệu...</p>}
            {error && <p className="top-group-a__error text-red-600 font-medium">{error}</p>}
            <div className="top-group-a__body">
                {students?.map((student, index) => (
                    <Student key={student.sbd} {...student} topScoreGroupA rank = {index + 1} />
                ))}
            </div>
        </div>
    )
}