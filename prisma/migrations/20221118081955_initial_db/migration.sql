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

-- CreateIndex
CREATE UNIQUE INDEX "signup_username_key" ON "signup"("username");

-- CreateIndex
CREATE UNIQUE INDEX "signup_email_key" ON "signup"("email");
