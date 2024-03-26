export function uniqueID() {
    if (localStorage.getItem('userID')) return localStorage.getItem('userID');

    let dt = Date.now() + performance.now();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    localStorage.setItem('userID', uuid);

    return uuid;
}
