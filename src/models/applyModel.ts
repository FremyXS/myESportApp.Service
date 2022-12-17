export interface ApplyModel {
    apply_id: string;
    author_vk_id: number;
    description?: string;
    game: Game;
    created: Date;
    playing_time?: Date;
    my: TeamComposition;
    looking_for: TeamComposition;
}

export enum Game {
    "CS-GO",
    "Dota 2",
    "Brawl Stars",
    "Other"
}

export enum TeamComposition {
    "Соло",
    "Дует",
    "Трио",
    "Сквад",
    "5 человек",
    "6 человек",
    "Более 6 человек"
}