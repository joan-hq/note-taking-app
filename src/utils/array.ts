export const findById = <Item extends{id:string}>(
    list: Item[],
    id:string
): Item | undefined => {
    return list.find((item) => item.id === id)
}

export const updateById = <Item extends{id:string}>(
    list: Item[],
    id:string,
    changes: Partial<Item>
): Item[] => {
return list.map((item)=> item.id === id ? {...item,...changes} : item)
}

export const removeById = <Item extends{id: string}>(
    list: Item[],
    id:string
) : Item[] => {
    return list.filter((item)=>item.id !== id)
};


/* this function is use tags' id to get all tag's object
    return tags' info 
*/
export const findManyObjectsByIds = <Item extends {id: string}>(
    ids: string[],
    list: Item[],
):Item[] => {
    const findObjects = ids.map((eachId) => list.find((item) => item.id === eachId)  )
    return findObjects.filter((object) : object is Item  => object !== undefined)
}


// check if empty array
export const isEmptyArray = (arr: unknown[]) :boolean=> {
    return !Array.isArray(arr) || arr.length === 0;
};

// check if array has Item
export const hasItems = (arr:unknown[]):boolean => {
    return Array.isArray(arr) && arr.length > 0;
}