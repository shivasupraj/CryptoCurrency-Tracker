$(document).ready (function(){
   buildPage();
});
function buildPage(){
    $.getJSON('http://coincap.io/front', function(data){
        body = $('body');  
        var table = '<table class="table table-striped table-bordered" id="coin_table"><thead class="thead-dark"><th scope="col">#</th><th scope="col">Name</th><th>Market Cap</th><th scope="col">Price</th></thead></table>';
        body.append(table);
        table = $('#coin_table');
        data = data;
        t = data
        for (var i = 0; i<data.length; ++i){
            image = data[i].long.split(' ').join('-');
            row = '';
            row += '<tr>';
            img = '<img src="static/images/coins/32x32/' + image.toLowerCase() + '.png"> ';
            row += '<td>'+ (i+1) +'</td>';
            row += '<td> <a href="' +data[i].short+ '" > ' + img + data[i].long +'</a></td>';
            row += '<td>' + (Math.trunc(data[i].mktcap)).toLocaleString() + '</td>';
            row += '<td>'+  data[i].price +'</td>';
            row += '</tr>';
            table.append(row);
            
//            row = '';
//            row += '<tr id = chart_'+ data[i].short +'>';
//            row += '<td colspan="4"> <div> <canvas id="myChart" width="400" height="400"></canvas> </div> </td>';
//            row += '</tr>';
//            table.append(row);
//            
//            $('#chart_' + data[i].short).hide();  
            //break;
        }
        $("table").on('click', 'tr', function() { 
            $(this).find('form').submit();
            //$(this).next('tr').toggle();    
        });
    });
    
}

$(".dropdown-menu a").click( function() {
    var currency = $(this).text();
    $("#navbarDropdown").text(currency);
    changeCurrency(currency);
});

function changeCurrency(currency){
    var map = {};
    console.log('change currency');
    var prices = {};
    for(var i=0; i<17; ++i){
        $.getJSON('https://api.coinmarketcap.com/v2/ticker/?start='+(i *100 + i) + '&convert=' + currency + '&limit=100', function(data){
            t = data;
            data = data.data;
            for(var key in data){
                //console.log(key);
                //console.log(data[key].symbol, data[key].quotes[currency].price);
                prices[data[key].symbol] = data[key].quotes[currency].price;
                //console.log(data[key].symbol, data[key].quotes[currency].price);
            }
            table = $("#coin_table").children();
            for(var i =1; i<table.length; ++i){
                anchor = table[i].children[1].children[0].href.split('/').slice(-1).pop();
                if(prices.hasOwnProperty(anchor)){
                    table[i].children[3].textContent = prices[anchor];
                }else{
                    table[i].children[3].textContent = 'N/A';
                }
            }
        });  
    }
    
//    $.getJSON('https://api.coinmarketcap.com/v2/ticker/?convert=EUR&limit=10', function(data){
//        alert();
//        data = data.data;
//        for(var i=0; i<data.length; ++i){
//            map[data[i].symbol] = data[i].id;
//        }
//        
//        
//        
//        table = $("#coin_table").children();
//        for(var i=0; i<table.length; ++i){
//            var href = (table[i].find('a').href).split('/').slice(-1).pop();
//            var url = 'https://api.coinmarketcap.com/v2/ticker/'+ map[href] +'/?convert=' + currency;
//            console.log(url);
//            $.getJSON(url, function(data){
//               data = data.data;
//               quote = data.quotes[currency].price;
//               anchors[i].closest('tr')
//            });
//        }
//         
//        
//    }); 
}

function search_by_name(){
    var input = document.getElementById("coin_name");
    filter = input.value.toUpperCase();
    table = document.getElementById("coin_table");
    tr = table.getElementsByTagName("tr");
    for (var i = 1; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
}

function changeMode(){
    $('table').toggleClass('table-dark');
    if ($('.btn-dark').text() == 'Dark Mode'){
        $('.btn-dark').text('Light Mode');
    }else{
        $('.btn-dark').text('Dark Mode');
    }
}

