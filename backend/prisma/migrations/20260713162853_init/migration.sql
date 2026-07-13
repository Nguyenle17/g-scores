-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "sbd" TEXT NOT NULL,
    "toan" DOUBLE PRECISION,
    "ngu_van" DOUBLE PRECISION,
    "ngoai_ngu" DOUBLE PRECISION,
    "vat_li" DOUBLE PRECISION,
    "hoa_hoc" DOUBLE PRECISION,
    "sinh_hoc" DOUBLE PRECISION,
    "lich_su" DOUBLE PRECISION,
    "dia_li" DOUBLE PRECISION,
    "gdcd" DOUBLE PRECISION,
    "ma_ngoai_ngu" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_sbd_key" ON "Student"("sbd");

-- CreateIndex
CREATE INDEX "Student_toan_vat_li_hoa_hoc_idx" ON "Student"("toan", "vat_li", "hoa_hoc");
