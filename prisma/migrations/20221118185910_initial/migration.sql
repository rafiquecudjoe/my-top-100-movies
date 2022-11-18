-- CreateTable
CREATE TABLE "signup" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "full_name" VARCHAR(50) NOT NULL,
    "sex" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "signup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movies" (
    "id" SERIAL NOT NULL,
    "adult" BOOLEAN NOT NULL,
    "original_language" VARCHAR(500) NOT NULL,
    "original_title" VARCHAR(500) NOT NULL,
    "overview" VARCHAR(5000) NOT NULL,
    "release_date" DATE NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "signup_username_key" ON "signup"("username");

-- CreateIndex
CREATE UNIQUE INDEX "signup_email_key" ON "signup"("email");
