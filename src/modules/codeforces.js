const TIME_ZONE = +9;

module.exports = {
    getRound(body){
        let json = JSON.parse(body);
        if(json.status !== 'OK') return 'error!';
        const arr = json.result;
        let contests = [];
        for(let i=0; i<arr.length; i++){
            if(arr[i].phase !== 'BEFORE') break;
            contests.push(arr[i]);
        }
        contests.reverse();
        let ret = '[[ Upcoming Rounds ]]\n';
        for(let i=0; i<contests.length; i++){
            const d = new Date((contests[i].startTimeSeconds + TIME_ZONE*60*60) * 1000);
            ret += contests[i].name + ' : '
                + (d.getMonth() + 1) + '/'
                + d.getDate() + ' '
                + d.getHours() + ':'
                + d.getMinutes() + '\n';
        }
        return ret;
    },
    getUser(handle, body){
        let json = JSON.parse(body);
        try{
            if(json.status !== 'OK') return `[[${handle}]]\n존재하지 않는 유저`;
            json = json.result[0];
            let ret = `[[${json.handle}]]\n`;
            if(!json.hasOwnProperty('rating')) return ret + "라운드에 참가하지 않음";
            if(json.hasOwnProperty('rating') && json.hasOwnProperty('rank')){
                ret += `Rating : ${json.rating} (${json.rank})\n`;
            }
            if(json.hasOwnProperty('maxRating') && json.hasOwnProperty('maxRank')){
                ret += `Max Rating : ${json.maxRating} (${json.maxRank})`;
            }
            return ret;
        } catch(e) {
            return `[[${handle}]]\n존재하지 않는 유저`;
        }
    }
};