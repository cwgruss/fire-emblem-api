// ========================================
// = House: A Fire Emblem House / Group   =
// ========================================

import { Character } from "../characters/character.interface";

export interface FireEmblemHouse {
    id: number;
    name: string;
    members: Character[];
    description: string;
    image: string;
}