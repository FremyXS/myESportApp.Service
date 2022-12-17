-- CreateTable
CREATE TABLE "Apply" (
    "apply_id" TEXT NOT NULL,
    "author_vk_id" INTEGER NOT NULL,
    "game_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "playing_time" TIMESTAMP(3),
    "my_time_vk_ids" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "enemies_vk_ids" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "join_my_team_requests_vk_ids" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "join_enemies_requests_vk_ids" INTEGER[] DEFAULT ARRAY[]::INTEGER[],

    CONSTRAINT "Apply_pkey" PRIMARY KEY ("apply_id")
);

-- CreateTable
CREATE TABLE "Game" (
    "game_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "recommended_players" INTEGER NOT NULL,
    "avatar_url" TEXT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("game_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Apply_apply_id_key" ON "Apply"("apply_id");

-- CreateIndex
CREATE UNIQUE INDEX "Game_game_id_key" ON "Game"("game_id");

-- AddForeignKey
ALTER TABLE "Apply" ADD CONSTRAINT "Apply_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("game_id") ON DELETE RESTRICT ON UPDATE CASCADE;
