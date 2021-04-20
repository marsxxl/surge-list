(async () => {
  let params = getUrlParams($request.url);
  let info = await getUserInfo(params.url);
  console.log('info:' + info)
  let usage = getDataUsage(info);
  let used = bytesToSize(usage.download + usage.upload);
  let total = bytesToSize(usage.total);
  let expire = usage.expire == undefined ? '' : '|' + formatTimestamp(usage.expire * 1000)
  let body = `${used} - ${total}${expire}  = ss, 1.2.3.4, 1234, encrypt-method=aes-128-gcm,password=1234`;
    $done({response: {body}});
})();

function getUrlParams(url) {
  return Object.fromEntries(url.slice(url.indexOf('?') + 1).split('&').map(item => ihttps://github.com/marsxxl/surge-list/blob/master/sub_info.jstem.split("=")).map(([k, v]) => [k, decodeURIComponent(v)]));   
}

function getUserInfo(url) {
  let headers = {"User-Agent" :"Quantumult X"}
  let request = {headers, url}
  return new Promise(resolve => $httpClient.head(request, (err, resp) => 
    resolve(resp.headers["subscription-userinfo"] || resp.headers["Subscription-userinfo"] || resp.headers["Subscription-Userinfo"])));
}

function getDataUsage(info) {
  return Object.fromEntries(info.match(/\w+=\d+/g).map(item => item.split("=")).map(([k, v]) => [k,parseInt(v)]));
}

function bytesToSize(bytes) {
    if (bytes === 0) return '0B';
    var k = 1024;
    sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + sizes[i];
}

function formatTimestamp( timestamp ) {
    var dateObj = new Date( timestamp );
    var year = dateObj.getYear() + 1900;
    var month = dateObj.getMonth() + 1;
    month = month < 10 ? '0' + month : month
    var day = dateObj.getDate();
    return year +"-"+ month +"-" + day;      
}
