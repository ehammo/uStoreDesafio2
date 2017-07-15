$(document).ready(function(){
    $('.btn').click(function(){
        json = generateJson();
        document.getElementById('os').innerHTML = json["os"]
        document.getElementById('osVersion').innerHTML = json["osVersion"]
        document.getElementById('browser').innerHTML = json["browser"]
        document.getElementById('browserVersion').innerHTML = json["browserVersion"]
        document.getElementById('requisitos').innerHTML = json["requirements"]

        document.getElementById('json').innerHTML = JSON.stringify(json, undefined, 2);
    
    });

});

function generateJson(){
    json = {}
    var uAgt = navigator.userAgent;
    // system
    var os = 'unknown';
    var clientStrings = [
        {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
        {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
        {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
        {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
        {s:'Windows Vista', r:/Windows NT 6.0/},
        {s:'Windows Server 2003', r:/Windows NT 5.2/},
        {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
        {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
        {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
        {s:'Windows 98', r:/(Windows 98|Win98)/},
        {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
        {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
        {s:'Windows CE', r:/Windows CE/},
        {s:'Windows 3.11', r:/Win16/},
        {s:'Android', r:/Android/},
        {s:'Open BSD', r:/OpenBSD/},
        {s:'Sun OS', r:/SunOS/},
        {s:'Linux', r:/(Linux|X11)/},
        {s:'iOS', r:/(iPhone|iPad|iPod)/},
        {s:'Mac OS X', r:/Mac OS X/},
        {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
        {s:'QNX', r:/QNX/},
        {s:'UNIX', r:/UNIX/},
        {s:'BeOS', r:/BeOS/},
        {s:'OS/2', r:/OS\/2/},
        {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
    ];
    for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(uAgt)) {
            os = cs.s;
            break;
        }
    }

    var osVersion = 'unknown';

    if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = 'Windows';
    }

    switch (os) {
        case 'Mac OS X':
            osVersion = /Mac OS X (10[\.\_\d]+)/.exec(uAgt)[1];
            break;

        case 'Android':
            osVersion = /Android ([\.\_\d]+)/.exec(uAgt)[1];
            break;

        case 'iOS':
            osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
            osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
            break;
    }
    
    json["os"]=os;
    json["osVersion"]=osVersion;

    var browser,browserVersion,nameOffset, verOffset, ix;
        // Opera
    if ((verOffset = uAgt.indexOf('Opera')) != -1) {
        browser = 'Opera';
        if ((verOffset = uAgt.indexOf('Version')) != -1) {
            browserVersion = uAgt.substring(verOffset + 8);
        }
    }
    // Opera Next
    else if ((verOffset = uAgt.indexOf('OPR')) != -1) {
        browser = 'Opera';
        browserVersion = uAgt.substring(verOffset + 4);
    }

    // Firefox
    else if ((verOffset = uAgt.indexOf('Firefox')) != -1) {
        browser = 'Firefox';
        browserVersion = uAgt.substring(verOffset + 8);
    }
    // MSIE
    else if ((verOffset = uAgt.indexOf('MSIE')) != -1) {
        browser = 'Microsoft Internet Explorer';
        browserVersion = uAgt.substring(verOffset + 5);
    }
    else if (uAgt.indexOf('Trident/') != -1) {
        browser = 'Microsoft Internet Explorer';
        browserVersion = uAgt.substring(uAgt.indexOf('rv:') + 3);
    }
    // Chrome
    else if ((verOffset = uAgt.indexOf('Chrome')) != -1) {
        browser = 'Chrome';
        browserVersion = uAgt.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset = uAgt.indexOf('Safari')) != -1) {
        browser = 'Safari';
        if ((verOffset = uAgt.indexOf('Version')) != -1) {
            browserVersion = uAgt.substring(verOffset + 8);
        }
    }

    json["browser"]=browser;
    json["browserVersion"]=browserVersion;
    tokens = browserVersion.split('.')
    if(browser===('Microsoft Internet Explorer')){
        if(tokens[0]>=11){
            json['requirements']="Atende os requisitos";
        }else{
            json['requirements']="Não atende os requisitos";
        } 

    }else if(browser===('Safari')){
        if(len(tokens)==3){
            if(tokens[0]>=9 && tokens[1]>=1 && tokens[2]>=2){
                json['requirements']="Atende os requisitos";    
            }else{
                json['requirements']="Não atende os requisitos";
            }
        }    
        
    }else if(browser===('Chrome')){
        if(tokens[0]>52){
            json['requirements']="Atende os requisitos";
        }else{
            json['requirements']="Não atende os requisitos";
        }  

    }else if(browser===('Opera')){
        json['requirements']="Não atende os requisitos";

    }else if(browser===('Firefox')){
        if(tokens[0]>=47){
            json['requirements']="Atende os requisitos";
        }else{
            json['requirements']="Não atende os requisitos";
        }
    }

    return json;
}