// ========================================
// = Houses Service: FE Houses CRUD       =
// ========================================

import { Houses } from "./houses.interface";
import { FireEmblemHouse } from "./house.interface";

// ** In-Memory Store
// ******************************************
const fireEmblemHouses: Houses = {
    1: {
        id: 1,
        name: 'Black Eagles',
        members: [],
        description: "Led by Edelgard, imperial princess and heir to the Adrestian throne.",
        images: ['https://www.google.com/search?q=fire+emblem+black+eagles&sxsrf=ALeKk020Oikud3Y-PSAMy2v4IyBxpcTu1A:1586142748056&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi_9L2Y6tLoAhXaQc0KHVxQA1AQ_AUoAXoECA4QAw&biw=919&bih=936#imgrc=DH3Cw1thBAyQ0M', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reddit.com%2Fr%2Ffireemblem%2Fcomments%2Fcdvual%2Fas_requested_if_the_black_eagles_had_a_minecraft%2F&psig=AOvVaw0HnRlrnOvEX9ChWXS7LpPk&ust=1586229150750000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNCcp53q0ugCFQAAAAAdAAAAABAH']
    },
    2: {
        id: 2,
        name: 'Blue Lions',
        members: [],
        description: "Commanded by Prince Dimitri of the Kingdom",
        images: ['https://www.google.com/search?q=fire+emblem+black+eagles&sxsrf=ALeKk020Oikud3Y-PSAMy2v4IyBxpcTu1A:1586142748056&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi_9L2Y6tLoAhXaQc0KHVxQA1AQ_AUoAXoECA4QAw&biw=919&bih=936#imgrc=DH3Cw1thBAyQ0M', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reddit.com%2Fr%2Ffireemblem%2Fcomments%2Fcdvual%2Fas_requested_if_the_black_eagles_had_a_minecraft%2F&psig=AOvVaw0HnRlrnOvEX9ChWXS7LpPk&ust=1586229150750000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNCcp53q0ugCFQAAAAAdAAAAABAH']
    },
    3: {
        id: 3,
        name: 'Golden Deer',
        members: [],
        description: "Led by Claude, heir to the Alliance's leading family.",
        images: ['https://www.google.com/search?q=fire+emblem+black+eagles&sxsrf=ALeKk020Oikud3Y-PSAMy2v4IyBxpcTu1A:1586142748056&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi_9L2Y6tLoAhXaQc0KHVxQA1AQ_AUoAXoECA4QAw&biw=919&bih=936#imgrc=DH3Cw1thBAyQ0M', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reddit.com%2Fr%2Ffireemblem%2Fcomments%2Fcdvual%2Fas_requested_if_the_black_eagles_had_a_minecraft%2F&psig=AOvVaw0HnRlrnOvEX9ChWXS7LpPk&ust=1586229150750000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNCcp53q0ugCFQAAAAAdAAAAABAH']
    }
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

