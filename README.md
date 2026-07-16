# G-Scores

G-Scores là ứng dụng tra cứu và thống kê điểm thi THPT Quốc gia 2024.

## Công nghệ sử dụng

### Frontend
- React
- TypeScript
- Vite
- React Router
- Recharts

### Backend
- NestJS
- Prisma ORM
- PostgreSQL

### DevOps
- Docker
- Docker Compose

---

## Yêu cầu

Cài đặt:

- Docker Desktop

---

## Hướng dẫn chạy

### 1. Clone repository

```bash
git clone <repository-url>
cd g-scores
```

### 2. Khởi động ứng dụng
Tạo file `.env` trong thư mục `frontend` và `backend` (Sao chép từ `.env.EXAMPLE`)
```bash
docker compose up --build
```

Lần chạy đầu tiên, Docker sẽ tự động:

- Khởi tạo PostgreSQL.
- Chạy Prisma Migration.
- Seed tự động import dữ liệu từ file CSV vào PostgreSQL nếu cơ sở dữ liệu chưa có dữ liệu.
- Khởi động Backend.
- Khởi động Frontend.

Những lần chạy tiếp theo:

- Migration chỉ chạy nếu có migration mới.
- Seed sẽ tự động bỏ qua nếu dữ liệu đã tồn tại.

---

## Truy cập ứng dụng

Frontend

```
http://localhost:5173
```

Backend API

```
http://localhost:3000
```

---

## Cấu trúc project

```
g-scores
├── backend
│   ├── prisma
│   ├── src
│   ├── Dockerfile
│   └── .env.example
│
├── frontend
│   ├── src
│   ├── public
│   ├── Dockerfile
│   └── .env.example
│
└── docker-compose.yml
```

---

## Biến môi trường

### Backend

Tạo file `backend/.env`

```env
CLIENT_URL=http://localhost:5173
PORT=3000
```

> `DATABASE_URL` được Docker Compose tự cấu hình để kết nối tới PostgreSQL container.

### Frontend

Tạo file `frontend/.env`

```env
VITE_API_URL=http://localhost:3000/api/v1
```

---

## Các chức năng

- Tra cứu điểm theo số báo danh.
- Top 10 thí sinh có tổng điểm khối A cao nhất.
- Biểu đồ phân bố điểm theo từng môn.
- Dashboard 
    Thống kê số lượng thí sinh.
    Thống kê điểm trung bình của các môn.
    Thống kê số lượng điểm tuyệt đối (10 điểm).

---

## API chính

| Method | Endpoint | Mô tả |
|---------|----------|-------|
| GET | `/api/v1/students/:sbd` | Tra cứu điểm theo số báo danh |
| GET | `/api/v1/students/top-group-a` | Top 10 thí sinh khối A |
| GET | `/api/v1/students/total-students` | Tổng số thí sinh |
| GET | `/api/v1/subjects/report` | Thống kê điểm thi từng môn |
| GET | `/api/v1/subjects/avg-score` | Điểm thi trung bình từng môn |
| GET | `/api/v1/subjects/perfect-score` | Điểm 10 từng môn |

---

## Dừng ứng dụng

```bash
docker compose down
```

Để xóa luôn dữ liệu PostgreSQL:

```bash
docker compose down -v
```