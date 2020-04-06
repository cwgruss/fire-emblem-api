// ========================================
// = Houses Service: FE Houses CRUD       =
// ========================================

import { Houses } from "./houses.interface";
import { FireEmblemHouse } from "./house.interface";

// ** In-Memory Store
// ******************************************
const fireEmblemHouses: Houses = {

}

// ** Service Methods
// ******************************************

/**
 * FindAll: Returns the entire store of houses
 */
export const findAll = async(): Promise<Houses> => {
    return fireEmblemHouses;
};

/**
 * Find: Search for an individual house based on a 
 * house id.
 * @param id
 */
export const find = async(id: number): Promise<FireEmblemHouse> => {
    const feHouse: FireEmblemHouse = fireEmblemHouses[id];
    if (!feHouse) {
        throw new Error(`No house found with id ${id}`);
    }

    return feHouse;
}

/**
 * Create: 
 * @param house 
 */
export const create = async(house: FireEmblemHouse): Promise<Houses> => {
    const id = new Date().valueOf();
    fireEmblemHouses[id] = {
        id,
        ...house
    };

    return fireEmblemHouses;
};

/**
 * Update: Receives a FireEmblemHouse to use as a new value in the list of houses
 * @param updatedItem
 */
export const update = async(updatedItem: FireEmblemHouse): Promise<void> => {
    const id = updatedItem.id;
    let houseToUpdate = fireEmblemHouses[id];
    if (!houseToUpdate) {
        throw new Error(`No house found with id ${id}`);
    }

    fireEmblemHouses[id] = {
        ...houseToUpdate,
        ...updatedItem
    };
}

/**
 * Remove: Deletes a FireEmblemHouse item from the dictionary of houses
 * @param id 
 */
export const remove = async(id: number): Promise<FireEmblemHouse> => {
    const feHouse = fireEmblemHouses[id];
    if (!feHouse) {
        throw new Error(`No house found with id ${id}`);
    }

    delete fireEmblemHouses[id];
    return feHouse;
}

