// check if string empty
export const isEmptyString = (str: string) : boolean => {
    return str.trim().length === 0
}
// modify string to lowercase
export const normalize = (str: string) : string =>{
    return str.toLowerCase();
}

// truncate(str, length) => content too long, use "..." instead
export const truncateString = (
    str: string, 
    maxLength:number, 
    ending: string='...'):string => {
    if(str.length <= maxLength){
        return str;
    }

    const truncateLength = maxLength - ending.length;

    const safeLength = truncateLength > 0 ? truncateLength : 0;
    
    return str.slice(0,safeLength) + ending;
}
// generateSlug(str)=>URL modify,eg: dashnote/my-first-note
export const generateSlug = (str: string, maxLength: number = 50): string => {
    const slug = str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

    if (slug.length <= maxLength) return slug;

    return slug.slice(0, maxLength).replace(/-+$/, '');
};

export const generateUniqueSlug = (title: string, id: string) => {
    const slug = generateSlug(title, 50);
    const shortId = id.slice(0, 8); 
    return `${slug}-${shortId}`;
};