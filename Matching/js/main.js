var memory_array = []
memory_array[0] = 'url(images/Venizia.jpg) no-repeat';
memory_array[1] = 'url(images/Venizia.jpg) no-repeat';
memory_array[2] = 'url(images/jacqui_florence.jpg) no-repeat';
memory_array[3] = 'url(images/jacqui_florence.jpg) no-repeat';
memory_array[4] = 'url(images/jacqui_michael.jpeg) no-repeat';
memory_array[5] = 'url(images/jacqui_michael.jpeg) no-repeat';
memory_array[6] = 'url(images/Paris.jpg) no-repeat';
memory_array[7] = 'url(images/Paris.jpg) no-repeat';
memory_array[8] = 'url(images/London.jpg) no-repeat';
memory_array[9] = 'url(images/London.jpg) no-repeat';
memory_array[10] = 'url(images/Statue.jpg) no-repeat';
memory_array[11] = 'url(images/Statue.jpg) no-repeat';
memory_array[12] = 'url(images/Vatican.jpg) no-repeat';
memory_array[13] = 'url(images/Vatican.jpg) no-repeat';
memory_array[14] = 'url(images/Roma.jpg) no-repeat';
memory_array[15] = 'url(images/Roma.jpg) no-repeat';
memory_array[16] = 'url(images/MichaelAngelo.jpg) no-repeat';
memory_array[17] = 'url(images/MichaelAngelo.jpg) no-repeat';
memory_array[18] = 'url(images/Firenze.jpg) no-repeat';
memory_array[19] = 'url(images/Firenze.jpg) no-repeat';
memory_array[20] = 'url(images/River.jpg) no-repeat';
memory_array[21] = 'url(images/River.jpg) no-repeat';
memory_array[22] = 'url(images/Dolemites.jpg) no-repeat';
memory_array[23] = 'url(images/Dolemites.jpg) no-repeat';

var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var clicks = 0;


document.getElementById('leader_1').innerHTML = "1: " + localStorage.getItem('leader_1');
document.getElementById('leader_2').innerHTML = "2: " + localStorage.getItem('leader_2');
document.getElementById('leader_3').innerHTML = "3: " + localStorage.getItem('leader_3');
document.getElementById('leader_4').innerHTML = "4: " + localStorage.getItem('leader_4');
document.getElementById('leader_5').innerHTML = "5: " + localStorage.getItem('leader_5');

Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

var h2 = document.getElementsByTagName('h2')[0],
    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;

        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    h2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

function clearboard() {
    h2.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}

function newBoard(){
	tiles_flipped = 0;
	var output = '';
    memory_array.memory_tile_shuffle();

	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
	}
	timer()
	document.getElementById('memory_board').innerHTML = output;
}

function winner(){
	console.log("test")
	alert("YOU WON!!!! You finished in " + h2.textContent.substring(3,8) + " with "+clicks+" flips ... generating new board");
	clicks = 0;
	clearboard()
	document.getElementById('memory_board').innerHTML = "";
	newBoard();
}

function convertTime(time){
	var min = parseInt(time.substring(0,2));
	var sec = parseInt(time.substring(3,5));
	var seconds = min * 60 + sec;
	return seconds;
}

function changeLeaderboard(time){
	seconds = convertTime(time);

	leader_1 = convertTime(localStorage.getItem('leader_1'));
	leader_2 = convertTime(localStorage.getItem('leader_2'));
	leader_3 = convertTime(localStorage.getItem('leader_3'));
	leader_4 = convertTime(localStorage.getItem('leader_4'));
	leader_5 = convertTime(localStorage.getItem('leader_5'));


	if(seconds < leader_1){
		localStorage.setItem('leader_5', localStorage.getItem('leader_4'));
		localStorage.setItem('leader_4', localStorage.getItem('leader_3'));
		localStorage.setItem('leader_3', localStorage.getItem('leader_2'));
		localStorage.setItem('leader_2', localStorage.getItem('leader_1')); 
		localStorage.setItem('leader_1', time);

		document.getElementById('leader_1').innerHTML = "1";
		document.getElementById('leader_1').innerHTML +=": " + localStorage.getItem('leader_1');

		document.getElementById('leader_2').innerHTML = "2";
		document.getElementById('leader_2').innerHTML +=": " + localStorage.getItem('leader_2');

		document.getElementById('leader_3').innerHTML = "3";
		document.getElementById('leader_3').innerHTML +=": " + localStorage.getItem('leader_3');

		document.getElementById('leader_4').innerHTML = "4";
		document.getElementById('leader_4').innerHTML +=": " + localStorage.getItem('leader_4');

		document.getElementById('leader_5').innerHTML = "5";
		document.getElementById('leader_5').innerHTML +=": " + localStorage.getItem('leader_5');

	}
	else if(seconds>=leader_1 && seconds<leader_2){
		localStorage.setItem('leader_5', localStorage.getItem('leader_4')); 
		localStorage.setItem('leader_4', localStorage.getItem('leader_3')); 
		localStorage.setItem('leader_3', localStorage.getItem('leader_2'));
		localStorage.setItem('leader_2', time);

		document.getElementById('leader_2').innerHTML = "2";
		document.getElementById('leader_2').innerHTML +=": " + localStorage.getItem('leader_2');

		document.getElementById('leader_3').innerHTML = "3";
		document.getElementById('leader_3').innerHTML +=": " + localStorage.getItem('leader_3');

		document.getElementById('leader_4').innerHTML = "4";
		document.getElementById('leader_4').innerHTML +=": " + localStorage.getItem('leader_4');

		document.getElementById('leader_5').innerHTML = "5";
		document.getElementById('leader_5').innerHTML +=": " + localStorage.getItem('leader_5');

	}
	else if(seconds>=leader_2 && seconds<leader_3){
		localStorage.setItem('leader_5', localStorage.getItem('leader_4')); 
		localStorage.setItem('leader_4', localStorage.getItem('leader_3'));
		localStorage.setItem('leader_3', time);

		document.getElementById('leader_3').innerHTML = "3";
		document.getElementById('leader_3').innerHTML +=": " + localStorage.getItem('leader_3');

		document.getElementById('leader_4').innerHTML = "4";
		document.getElementById('leader_4').innerHTML +=": " + localStorage.getItem('leader_4');

		document.getElementById('leader_5').innerHTML = "5";
		document.getElementById('leader_5').innerHTML +=": " + localStorage.getItem('leader_5');

	}
	else if(seconds>=leader_3 && seconds<leader_4){
		localStorage.setItem('leader_5', localStorage.getItem('leader_4'));
		localStorage.setItem('leader_4', time);
		document.getElementById('leader_4').innerHTML = "4";
		document.getElementById('leader_4').innerHTML +=": " + localStorage.getItem('leader_4');

		document.getElementById('leader_5').innerHTML = "5";
		document.getElementById('leader_5').innerHTML +=": " + localStorage.getItem('leader_5');

	}
	else if(seconds>=leader_4 && seconds<leader_5){
		localStorage.setItem('leader_5', time);
		document.getElementById('leader_5').innerHTML = "5";
		document.getElementById('leader_5').innerHTML +=": " + localStorage.getItem('leader_5');

	}				
}

function memoryFlipTile(tile,val){
	clicks += 1
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.background = val;
		tile.style.backgroundSize = 'cover';
		
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;
				memory_values = [];
            	memory_tile_ids = [];

				if(tiles_flipped == memory_array.length){
					winner()
					
				}

			} else {
				function flip2Back(){

				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.background = '#555';
				    tile_2.style.background = '#555';
            	    
            	    tile_1.innerHTML = "";
            	    tile_2.innerHTML = "";
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}
