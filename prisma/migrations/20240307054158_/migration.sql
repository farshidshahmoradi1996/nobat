-- CreateTable
CREATE TABLE "clinics" (
    "id" SERIAL NOT NULL,
    "cityId" INTEGER NOT NULL,
    "name" VARCHAR(255),
    "address" TEXT,
    "telphone" VARCHAR(30),
    "lat" INTEGER,
    "lng" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "clinics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clinics_cityId_key" ON "clinics"("cityId");

-- AddForeignKey
ALTER TABLE "clinics" ADD CONSTRAINT "clinics_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
