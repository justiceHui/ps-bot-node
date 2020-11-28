module.exports.numberCut = function(n){
    let tmp = n.toString();
    let ret = '', cnt = 0;
    for(let i=tmp.length-1; i>=0; i--){
        ret += tmp[i];
        if(cnt % 3 === 2 && cnt+1 !== tmp.length) ret += ',';
        cnt++;
    }
    tmp = ret; ret = '';
    for(let i=tmp.length-1; i>=0; i--) ret += tmp[i];
    return ret;
}
module.exports.BLANK_CHAR = "\u220b";
module.exports.BLANK_CHAR_500 = "\u220b".repeat(500);