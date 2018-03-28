var countries = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbados', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chile', 'China', 'Colombia', 'Comoros', 'Costa Rica', "Cote d'Ivoire", 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea-Bissau', 'Guinea', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portrugal', 'Qatar', 'Republic of the Congo', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];
var questionCount = 0;
var score = 0;
var lengthOfQuiz = 20;
var countriesUsed = [];

var currentCountry = "";
var currentChoices = [];
var key = [];
var wrongAnswers = [];
var rightAnswers = [];

Array.prototype.shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function getCorrectAnswer(answer, choices){
    var correctAnswer =  choices.indexOf(answer);
    return correctAnswer;
}

function setChoices(answer){ 
    countries.shuffle();
    var choices = countries.slice(0, 3);
    
    if (choices.includes(answer) == true ){
        setChoices(answer);
    }

    else{
        choices.push(answer);
        choices.shuffle();
        currentChoices = choices;
    }
}

function setAnswer(idEl, choice) {
    var choiceEl = document.getElementById(idEl);
    choiceEl.innerHTML = choice;
}

function formatQuestionCount(questionCount){
    var formmatedCount = (questionCount + 1) + ". / " + lengthOfQuiz;
    return formmatedCount;
}

function showQuestion() {
    startTime()
    
    document.getElementById("questionNumber").innerHTML = formatQuestionCount(questionCount)

    var countryIndex = Math.floor((Math.random() * countries.length) + 0);
    currentCountry = countries[countryIndex];
    
    if (countriesUsed.includes(currentCountry) == true){
        showQuestion()
    }
    else{
        countriesUsed.push(currentCountry);
    }
    
    document.getElementById("image").src="flags-normal/"+currentCountry+".png";
    
    setChoices(currentCountry)
    setAnswer("answ1", currentChoices[0]);
    setAnswer("answ2", currentChoices[1]);
    setAnswer("answ3", currentChoices[2]);
    setAnswer("answ4", currentChoices[3]);    
}

function updateScore() {
    var rightAnswer = getCorrectAnswer(currentCountry, currentChoices);
    var chosenAnswer = document.getElementById("choice" + (rightAnswer + 1));
    var opts = [1,2,3,4];
    rightAnswers.push({"question": (questionCount + 1), "answer": (rightAnswer + 1)})

    if (chosenAnswer.checked) {
        score++;
    }

    else{
        var index = opts.indexOf((rightAnswer + 1));
        opts.splice(index,1);

        if(document.getElementById("choice"+opts[0]+"").checked){
            wrong_obj = {"question": (questionCount + 1), "answer": opts[0]};
            wrongAnswers.push(wrong_obj);

        }

        else if(document.getElementById("choice"+opts[1]+"").checked){
            wrong_obj = {"question": (questionCount + 1), "answer": opts[1]};
            wrongAnswers.push(wrong_obj);
        }

        else if(document.getElementById("choice"+opts[2]+"").checked){
            wrong_obj = {"question": (questionCount + 1), "answer": opts[2]};
            wrongAnswers.push(wrong_obj);
        }

    }
}

function highlightAnswers(answers, type){
    for (i=0; i<answers.length; i++){
        question = answers[i].question;
        answer = answers[i].answer;
        ansInd = ((question - 1) * 4) + answer;

        if(type == "right"){
            document.getElementById("answer"+ansInd+"").style.color = "#006400";
            document.getElementById("answer"+ansInd+"").style.fontWeight = "bold";
            document.getElementById("answer"+ansInd+"").style.fontSize = "18px";

        }
        else if(type="wrong"){
            document.getElementById("answer"+ansInd+"").style.color = "red";
            document.getElementById("answer"+ansInd+"").style.fontWeight = "bold";
            document.getElementById("answer"+ansInd+"").style.fontSize = "18px";
            document.getElementById("answerNumber"+question+"").style.color = "red";
        }
    }

}

function displayResults(){
    var count = 0;
    var country = "";
    var choices = [];

    for (i = 1; i < key.length + 1; i++){
        country = key[i-1].country;
        choices = key[i-1].choices;
        document.getElementById("country"+i+"").src="flags-normal/"+country+".png";
        document.getElementById("answerNumber"+i+"").innerHTML = formatQuestionCount(i-1).substr(0,3);

        setAnswer("answer"+(count + 1)+"", choices[0]);
        setAnswer("answer"+(count + 2)+"", choices[1]);
        setAnswer("answer"+(count + 3)+"", choices[2]);
        setAnswer("answer"+(count + 4)+"", choices[3]);

        count += 4
    }
}

function creatediv1(num){
    var img = document.createElement("img");
    img.setAttribute("id", "country"+num+"");
    img.setAttribute("src", "");

    var div1 = document.createElement("div");
    div1.appendChild(img);
    document.getElementById("answers").appendChild(div1); 
}

function creatediv2(num){
    var div2 = document.createElement("div");
    div2.setAttribute("id", "answerNumber"+num+"");
    div2.setAttribute("class", "answernum");
    document.getElementById("answers").appendChild(div2);     
}

function createlabel(num, opt){
    var strong = document.createElement("strong");
    var label = document.createElement("label");
    var br = document.createElement("br");
    label.setAttribute("id", "answer"+num+"");

    if (opt == "1"){
        strong.innerHTML = "a) ";
    }
    else if (opt == "2"){
        strong.innerHTML = "b) ";

    }

    else if (opt = "3"){
        strong.innerHTML = "c) ";
    }

    else if (opt = "4"){
        strong.innerHTML = "d) ";
    }
    document.getElementById("answers").appendChild(strong);
    document.getElementById("answers").appendChild(label);
    document.getElementById("answers").appendChild(br);
}

function showAnswers(){
    var final_time = document.getElementById('time').innerHTML
    var results = "Your score is " + score +"/" + lengthOfQuiz + " with a time of: " + final_time;
    document.getElementById("results").innerHTML = results
    document.getElementById("h1").innerHTML = "Flag Quiz Answers"    
    document.getElementById("answers").style.display = 'inline'
    document.getElementById("wholeQuiz").style.display = 'none'


    for (i=0; i<lengthOfQuiz; i++){
        creatediv2(i+1)
        creatediv1(i+1)

        createlabel((i * 4)+1, '1')
        createlabel((i * 4)+2, '2')
        createlabel((i * 4)+3, '3')
        createlabel((i * 4)+4, '4')  
    }

    displayResults()
    highlightAnswers(rightAnswers, "right")
    highlightAnswers(wrongAnswers, "wrong")
}

function startNewGame(){
    location.reload()
}

function showScore() {
    if (questionCount >= lengthOfQuiz) {
        stop()
        showAnswers()
    }
}

function nextQuestion() {
    var trackAns = {"country": currentCountry, "choices": currentChoices}
    key.push(trackAns)

    updateScore()
    questionCount++;
    showScore()

    if (questionCount < lengthOfQuiz){
        showQuestion()
    }
}

var clsStopwatch = function() {
        var startAt = 0;
        var lapTime = 0;

        var now = function() {
                return (new Date()).getTime();
            }; 
 
        this.start = function() {
                startAt = startAt ? startAt : now();
            };

        this.stop = function() {
                lapTime = startAt ? lapTime + now() - startAt : lapTime;
                startAt = 0;
            };

        this.reset = function() {
                lapTime = startAt = 0;
            };

        this.time = function() {
                return lapTime + (startAt ? now() - startAt : 0);
            };
    };

var x = new clsStopwatch();
var time;
var clocktimer;

function pad(num, size) {
    var s = "0000" + num;
    return s.substr(s.length - size);
}

function formatTime(time) {
    var h = m = s = ms = 0;
    var newTime = '';

    h = Math.floor( time / (60 * 60 * 1000) );
    time = time % (60 * 60 * 1000);
    m = Math.floor( time / (60 * 1000) );
    time = time % (60 * 1000);
    s = Math.floor( time / 1000 );
    ms = time % 1000;

    newTime = pad(m, 2) + ':' + pad(s, 2);
    return newTime;
}

function update() {
    time = document.getElementById('time');
    time.innerHTML = formatTime(x.time());
}

function startTime() {
    clocktimer = setInterval("update()", 1);
    x.start()
}

function stop() {
    x.stop()
    clearInterval(clocktimer)
}

