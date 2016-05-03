/**
 * Created by youngs1 on 3/25/16.
 */
var writeLine = require('lei-stream').writeLine;
var inputFile = 'myfile.txt';
var input = writeLine(inputFile, {
    cacheLines: 100000
});
var counter = 0;
var startTime = Date.now();

function msToS (v) {
    return parseInt(v / 1000, 10);
}
function getSpentTime () {
    return Date.now() - startTime;
}

//input.write('content,date');
for (var i = 0; i < 1000000000; i++) {
    counter++;
    input.write('{"content":"ABC' + i+Date.now()+ ''+ i +'XYZ","state":"0"}');
    //input.write('{"content":"ABC' + i+Date.now()+'XYZ","date":"'+ Date.now() +'"}');
    if (counter % 10000 === 0) {
        printSpeedInfo();
    }
}
input.end(function () {
    console.log('done. total %s lines, spent %sS', counter, msToS(getSpentTime()));
    printMemoryUsage();
    process.exit();
});
// 打印进度
function printSpeedInfo () {
    var t = msToS(getSpentTime());
    var s = counter / t;
    if (!isFinite(s)) s = counter;
    console.log('write %s lines, speed: %sL/S', counter, s.toFixed(0));
}

// 打印内存占用情况
function printMemoryUsage () {
    var info = process.memoryUsage();
    function mb (v) {
        return (v / 1024 / 1024).toFixed(2) + 'MB';
    }
    console.log('rss=%s, heapTotal=%s, heapUsed=%s', mb(info.rss), mb(info.heapTotal), mb(info.heapUsed));
}
setInterval(printMemoryUsage, 1000);