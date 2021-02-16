const paginate = (followers) => {
    const itemsperpage = 9;
    const pages = Math.ceil(followers.length/itemsperpage);
    const newfollowers = Array.from({length:pages},(_,index)=>{
        const start = index*itemsperpage;
        return followers.slice(start,start+itemsperpage);
    })
    return newfollowers;
}

export default paginate
