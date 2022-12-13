export const formatFollowers = (count: number) => {
    if(count === 0) return '0 Followers';
    else if(count === 1) return '1 Follower';
    else if(count >=2 && count < 1000) return `${count} Followers`;
    else {
        let subcount = count/1000;
        return `${subcount}k Followers`;
    }
}