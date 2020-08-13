//Modal Popup Controller
function toggle_visibility(id){    
    if(document.getElementById("user-popup").style.display == 'block'){
        document.getElementById("user-popup").style.display = 'none';
    } else { 
        document.getElementById("user-popup").style.display = 'block';
    }
}

$(document).ready(function(){       
    $('form#saveuser').submit(function(){
        var uname = $('#uname').val();
        // var uemail = $('#uemail').val();
        console.log('requested Data === ', uname);
        $.ajax({
            url: "/saveuser",
            type: "POST",
            data: {'uname' : uname},
            dataType: "json",
            cache: false,
            async:false,
            success: function(res){
                console.log('saveuser success === ', res);
                if(res.data.userdata != '' || res.data.userdata != undefined ){
                    window.location.href="/lobby";
                }
            },
            error: function(res) {
                console.log('saveuser error === ', res);
                alert(res);
            }
          });
        return false;
    });    
});

function savenoofclicks(){
    var noofclicks = $('#noofclicks').text();
    console.log('requested Data noofclicks === ', noofclicks);
    $.ajax({
        url: "/saveuserclick",
        type: "POST",
        data: {'noofclicks' : noofclicks},
        dataType: "json",
        cache: false,
        async:false,
        success: function(res){
            console.log('saveuser success === ', res);
            if(res.data.userdata != '' || res.data.userdata != undefined ){
                setTimeout(function(){
                    window.location.href="/scoreboard";
                },2000);                
            }
        },
        error: function(res) {
            console.log('saveuser error === ', res);
            alert(res);
        }
    });        
}

var i = 0;
function addmyclicks(){
    $('#noofclicks').text(i++);
}







