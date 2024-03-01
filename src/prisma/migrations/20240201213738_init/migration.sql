-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "login" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "organization" TEXT,
    "active" BOOLEAN,
    "confirmed" BOOLEAN,
    "email" VARCHAR(255) NOT NULL,
    "confirmation_code" VARCHAR(255),
    "confirmation_code_expires_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BitlySettings" (
    "id" SERIAL NOT NULL,
    "use_value" BOOLEAN DEFAULT false,
    "label" TEXT,
    "aria_label" TEXT,
    "tooltip" TEXT,
    "error" TEXT,
    "bitly_token" TEXT,
    "bitly_domain" TEXT,
    "bitly_addr" TEXT,
    "bitly_enabled" BOOLEAN DEFAULT false,
    "type" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "bitly_id" INTEGER NOT NULL,

    CONSTRAINT "BitlySettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UtmTarget" (
    "id" SERIAL NOT NULL,
    "use_value" BOOLEAN NOT NULL,
    "is_chooser" BOOLEAN NOT NULL,
    "show_name" BOOLEAN NOT NULL,
    "label" TEXT NOT NULL,
    "aria_label" TEXT NOT NULL,
    "tooltip" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "value" JSONB[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "target_id" INTEGER NOT NULL,

    CONSTRAINT "UtmTarget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UtmContent" (
    "id" SERIAL NOT NULL,
    "use_value" BOOLEAN NOT NULL,
    "is_chooser" BOOLEAN NOT NULL,
    "show_name" BOOLEAN NOT NULL,
    "label" TEXT NOT NULL,
    "aria_label" TEXT NOT NULL,
    "tooltip" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "value" JSONB[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "content_id" INTEGER NOT NULL,

    CONSTRAINT "UtmContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UtmMedium" (
    "id" SERIAL NOT NULL,
    "use_value" BOOLEAN NOT NULL,
    "is_chooser" BOOLEAN NOT NULL,
    "show_name" BOOLEAN NOT NULL,
    "label" TEXT NOT NULL,
    "aria_label" TEXT NOT NULL,
    "tooltip" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "value" JSONB[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "medium_id" INTEGER NOT NULL,

    CONSTRAINT "UtmMedium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UtmKeyword" (
    "id" SERIAL NOT NULL,
    "use_value" BOOLEAN NOT NULL,
    "is_chooser" BOOLEAN NOT NULL,
    "show_name" BOOLEAN NOT NULL,
    "label" TEXT NOT NULL,
    "aria_label" TEXT NOT NULL,
    "tooltip" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "value" JSONB[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "keyword_id" INTEGER NOT NULL,

    CONSTRAINT "UtmKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UtmCampaign" (
    "id" SERIAL NOT NULL,
    "use_value" BOOLEAN NOT NULL,
    "is_chooser" BOOLEAN NOT NULL,
    "show_name" BOOLEAN NOT NULL,
    "label" TEXT NOT NULL,
    "aria_label" TEXT NOT NULL,
    "tooltip" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "value" JSONB[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "campaign_id" INTEGER NOT NULL,

    CONSTRAINT "UtmCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UtmSource" (
    "id" SERIAL NOT NULL,
    "use_value" BOOLEAN NOT NULL,
    "is_chooser" BOOLEAN NOT NULL,
    "show_name" BOOLEAN NOT NULL,
    "label" TEXT NOT NULL,
    "aria_label" TEXT NOT NULL,
    "tooltip" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "value" JSONB[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "source_id" INTEGER NOT NULL,

    CONSTRAINT "UtmSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UtmTerm" (
    "id" SERIAL NOT NULL,
    "use_value" BOOLEAN NOT NULL,
    "is_chooser" BOOLEAN NOT NULL,
    "show_name" BOOLEAN NOT NULL,
    "label" TEXT NOT NULL,
    "aria_label" TEXT NOT NULL,
    "tooltip" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "value" JSONB[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "term_id" INTEGER NOT NULL,

    CONSTRAINT "UtmTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Licensing" (
    "id" SERIAL NOT NULL,
    "license_type" TEXT,
    "license_key" TEXT,
    "expire_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "license_id" INTEGER NOT NULL,

    CONSTRAINT "Licensing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MainSettings" (
    "id" SERIAL NOT NULL,
    "brand_image" TEXT,
    "brand_height" INTEGER,
    "brand_width" INTEGER,
    "brand_opacity" DOUBLE PRECISION,
    "form_type" TEXT,
    "sidebar" TEXT,
    "first_run" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "main_id" INTEGER NOT NULL,

    CONSTRAINT "MainSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BitlySettings_bitly_id_key" ON "BitlySettings"("bitly_id");

-- CreateIndex
CREATE UNIQUE INDEX "UtmTarget_target_id_key" ON "UtmTarget"("target_id");

-- CreateIndex
CREATE UNIQUE INDEX "UtmContent_content_id_key" ON "UtmContent"("content_id");

-- CreateIndex
CREATE UNIQUE INDEX "UtmMedium_medium_id_key" ON "UtmMedium"("medium_id");

-- CreateIndex
CREATE UNIQUE INDEX "UtmKeyword_keyword_id_key" ON "UtmKeyword"("keyword_id");

-- CreateIndex
CREATE UNIQUE INDEX "UtmCampaign_campaign_id_key" ON "UtmCampaign"("campaign_id");

-- CreateIndex
CREATE UNIQUE INDEX "UtmSource_source_id_key" ON "UtmSource"("source_id");

-- CreateIndex
CREATE UNIQUE INDEX "UtmTerm_term_id_key" ON "UtmTerm"("term_id");

-- CreateIndex
CREATE UNIQUE INDEX "Licensing_license_id_key" ON "Licensing"("license_id");

-- CreateIndex
CREATE UNIQUE INDEX "MainSettings_main_id_key" ON "MainSettings"("main_id");

-- AddForeignKey
ALTER TABLE "BitlySettings" ADD CONSTRAINT "BitlySettings_bitly_id_fkey" FOREIGN KEY ("bitly_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtmTarget" ADD CONSTRAINT "UtmTarget_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtmContent" ADD CONSTRAINT "UtmContent_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtmMedium" ADD CONSTRAINT "UtmMedium_medium_id_fkey" FOREIGN KEY ("medium_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtmKeyword" ADD CONSTRAINT "UtmKeyword_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtmCampaign" ADD CONSTRAINT "UtmCampaign_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtmSource" ADD CONSTRAINT "UtmSource_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtmTerm" ADD CONSTRAINT "UtmTerm_term_id_fkey" FOREIGN KEY ("term_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Licensing" ADD CONSTRAINT "Licensing_license_id_fkey" FOREIGN KEY ("license_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MainSettings" ADD CONSTRAINT "MainSettings_main_id_fkey" FOREIGN KEY ("main_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
