import { GlobalUserType } from "../utils/types";

export const handleCheck = (feedId: string, type: 'like' | 'save', dataMap: any, userId: string) => {
    if(type === 'save') {
        return Object.keys(dataMap).length !== 0 && dataMap[feedId].includes(userId)
    } else {
        return Object.keys(dataMap).length !== 0 && dataMap[feedId].includes(userId)
    }
}

export const gtCounts = (feedId: string, type: 'like' | 'save', dataMap: any) => {
    if(type === 'save') {
        return Object.keys(dataMap).length !== 0 && dataMap[feedId].length
    } else {
        return Object.keys(dataMap).length !== 0 && dataMap[feedId].length
    }
}