$(document).ready(function(){
    buildPage(1);
});

function buildPage(days){
    var coin_symbol = (window.location.href).split('/').pop();
    url = 'http://coincap.io/history/' +days+ 'day/' + coin_symbol;
    console.log(url);
    $.getJSON(url, function(data){
        var dataset;
        if (days == 1){
            dataset = buildDataSetDaily(data.price);
        }else if(days == 7){
            dataset = buildDataSetWeekly(data.price);
        }else if(days == 30){
            dataset = buildDataSetMonthly(data.price);
        }
        var ctx = document.getElementById("myChart").getContext('2d');
        var times = [];
        var prices = [];
        for(var i= 0; i< dataset.length; i++){
            times.push(dataset[i].time);
            prices.push(dataset[i].open);
        }
        var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: times,
                    datasets: [{
                        label: 'price',
                        data: prices,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:false
                            }
                        }]
                    }
                }
        }); 
        
    });
    img = "static/images/coins/32x32/" + coin_symbol.toLowerCase() + ".png";
    url = "url ('" + img + "')" ; 
    //url = '"' + url + '"';
    console.log(url);
    $('body').css("background-image", url);
}

function buildDataSetDaily(data){
    var dataset = [];
    for(var i = 0; i < data.length; ++i){
        var date = new Date(data[i][0]);    
        if(dataset.length == 0 || dataset.slice(-1).pop().time != date.getHours()){
            dataset.push({'time':date.getHours(),'open':data[i][1]});
        }                
    }    
    return dataset;
}

function buildDataSetWeekly(data){
    var dataset = [];
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    for(var i =0; i < data.length; ++i){
        var date = new Date(data[i][0]);
        if(dataset.length == 0 || dataset.slice(-1).pop().time != days[date.getDay()]){
            dataset.push({'time':days[date.getDay()],'open':data[i][1]});
        }  
    }
    return dataset;
}

function buildDataSetMonthly(data){
    var dataset = [];
    var months = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for(var i =0; i < data.length; ++i){
        var date = new Date(data[i][0]);
        //console.log(date.getDate(),date.getMonth(), date.getHours())
        if(dataset.length == 0 || dataset.slice(-1).pop().time != months[date.getMonth()] + '-'+date.getDate()){
            dataset.push({'time':months[date.getMonth()] + '-' + date.getDate(),'open':data[i][1]});
        }  
    }
    return dataset;
}



