function sendData(subid, quizid){
$(document).ready(function(){
    $.post("/getAns", {quizid: quizid, subid: subid}, function(result){
        result = JSON.parse(result)
        if (result['available']){
           const data = result['data']
            for (var key in data) {
                var arr = []
                for (var key2 in data[key]){
                    arr.push([data[key][key2],key2])
                }
                console.log(arr)
                const div = document.getElementById(key)
                arr =arr.sort(function(a,b) {
    					return b[0]-a[0]});
               	var str = '<h3>Answers:</h3><br>'
                for (var i=0;i<arr.length;i++){
                    str= str+`${arr[i][1]}:${arr[i][0]}</br>`
                 }
           		div.innerHTML = str
                 }
        }
    })
})
}

function renderHeader()
{
    var div = document.getElementById('header')
    div.innerHTML = `<h3>Report Bug on telegram at: @Anms1920 </h3>
  <p><a href ="https://randomguy1920.github.io/jshost/xxtn.zip">Download chrome extension </a></p>
  <p><a href ="https://randomguy1920.github.io/jshost/xxtn.pdf">Instructions to install</a></p>
<p><a href ="https://randomguy1920.github.io/jshost/disclaimer.html">Important Info</a></p>
  <h4>Beta v 1.1</h4>`
}
