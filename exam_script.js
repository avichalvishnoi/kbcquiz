
let examPaper = JSON.parse(window.localStorage.getItem('paper'));


let min = examPaper.length-1;     // for setTime()
let sec = 59;   // for setTime()

var index = -1;      // for setQuestion()


function setTime() 
 {                 
        var zero = '';
        if(sec <10)
        {
            zero = '0';
        }
        document.getElementById('time').innerHTML = 'Time Left: 0'+min+' : '+zero+sec;  
        sec--;
        if(sec<0)
        {
            min--;
            sec = 59;
        }

    if(min>=0 && sec>=0) 
    {
          setTimeout(setTime, 999)  
    }
    else
    {
           finish();            
           buttonsSetting(examPaper.length);
    }
}

//....................................................................................................................................
  function setQuestion(changeIndex, sound)
  {

    index += changeIndex;
    var userOption = document.getElementsByName("option");

    if(changeIndex === 1)
    {
        getAns(index, userOption, sound);
    }
        buttonsSetting(index);

    if(index>=0 && index < examPaper.length)
    {
        for(var i=0; i<userOption.length; i++)
        {
            if(userOption[i].checked )
            {   // to uncheck a option before switching on another question
                userOption[i].checked = false;   
            }       
        }

        
        switch(examPaper[index].User_Ans)
        {       // te check the user choice on revisit 
            case "A" :  userOption[0].checked = true;
                        break;
            case "B" :  userOption[1].checked = true;
                        break;
            case "C" :  userOption[2].checked = true;
                        break;
            case "D" :  userOption[3].checked = true;
                        break;
            default  :  break;
        }
  
        document.getElementById("ques").innerHTML = 'Q. ' +(index+1)+ '  ' + examPaper[index].ques;
        document.getElementById("a").innerHTML = examPaper[index].A;
        document.getElementById("b").innerHTML = examPaper[index].B;
        document.getElementById("c").innerHTML = examPaper[index].C;
        document.getElementById("d").innerHTML = examPaper[index].D;
    }
}

function  getAns(index, userOption, sound) 
{ 
    if(index >=1 && index<= examPaper.length)   
    {
        for(var i=0; i<userOption.length; i++)
        {
            if(userOption[i].checked )
            {
                examPaper[index-1].User_Ans = userOption[i].value;               
                break;
            }  
        }
    }
    if(index< examPaper.length)
    {
        setSound(sound);
    }
}

//.................................................................................................................................
function finish() 
{
    setSound('Huter.mp3');
    document.getElementById("ques").innerHTML = 'Your score is '+calScore();
    document.getElementById("a").innerHTML = '';
    document.getElementById("b").innerHTML = '';
    document.getElementById("c").innerHTML = '';
    document.getElementById("d").innerHTML = '';
}

function calScore() 
{
    var score = 0;
    for(var i=0; i<examPaper.length; i++)
    {
        if(examPaper[i].User_Ans === examPaper[i].Corr_Ans)
        {
            score++;
        }
    }

    return score;
}

//..................................................................................................................................
function setSound(sound)
{
    var audio = new Audio(sound);
    audio.play();
}

function buttonsSetting(index) 
{

    // for fisrt question back button will be disabled 
    (index <= 0) ? document.getElementById("back-button").disabled = true : document.getElementById("back-button").disabled = false;

    (index >= (examPaper.length-1)) ?  document.getElementById("next-button").innerHTML = "Submit"   :  document.getElementById("next-button").innerHTML = 'Next <svg xmlns="http:\/\/www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/></svg>';

    if(index >= examPaper.length)
    {
        // If user is going to submit the exam
        min = 0;
        sec = 0;
        document.getElementById("back-button").disabled = true;
        document.getElementById("next-button").disabled = true;        
    }
}

// ----------------------------For Admin Section ------------------------------------------

function addQuestion() 
{
    if(checkEmpty())
    {
    var newQues = {};   // new Array member Class
    var adminOption = document.getElementsByName("corr-option");  // array of options for getting correct ans
    newQues.ques = document.getElementById("new-ques").value;   
    newQues.A = document.getElementById("new-A").value;
    newQues.B = document.getElementById("new-B").value;
    newQues.C = document.getElementById("new-C").value;
    newQues.D = document.getElementById("new-D").value;
    newQues.User_Ans = '';
    
    for(var i=0; i<adminOption.length; i++)
    { 
        if(adminOption[i].checked)
        {
            newQues.Corr_Ans = adminOption[i].value;
            adminOption[i].checked = false;
            break;
        }      
    }

    document.getElementById("new-ques").value = '';
    document.getElementById("new-A").value = '';
    document.getElementById("new-B").value = '';
    document.getElementById("new-C").value = '';
    document.getElementById("new-D").value = '';
    examPaper.push(newQues); 
    printQuestions();
    }

    else
    {
        alert("Please Fill All the required fields");
    }
}


var idArr =[];  // ids of all rows of Question table
var printedQuestions = 0;   // for no. of printed questions
function printQuestions() 
{  
    document.getElementById("ques-label").innerHTML = 'Q'+(examPaper.length+1)+'.'; 

    for(var i=printedQuestions; i<examPaper.length; i++, printedQuestions++)
    {
        var newRow = document.createElement("tr");
        document.getElementById("allQuestions").appendChild(newRow);
        newRow.style.height = "50px";
        newRow.setAttribute('id', 'tr'+i);
        newRow.setAttribute('class', 'tableRow');
        idArr.push('tr'+i);

        var sNo = document.createElement("td");
        document.getElementById('tr'+i).appendChild(sNo);
        sNo.appendChild(document.createTextNode(i+1));             // Create a text node
        sNo.style.width= "100px";

        var quest = document.createElement("td");
        document.getElementById('tr'+i).appendChild(quest);
        quest.appendChild(document.createTextNode(examPaper[i].ques));             // Create a text node
        quest.style.width = "400px";
        
        var ans1 = document.createElement("td");
        document.getElementById('tr'+i).appendChild(ans1);
        ans1.appendChild(document.createTextNode(examPaper[i].A));    
        ans1.style.width = "200px";

        var ans2 = document.createElement("td");
        document.getElementById('tr'+i).appendChild(ans2);
        ans2.appendChild(document.createTextNode(examPaper[i].B));    
        ans2.style.width = "200px";

        var ans3 = document.createElement("td");
        document.getElementById('tr'+i).appendChild(ans3);
        ans3.appendChild(document.createTextNode(examPaper[i].C));   
        ans3.style.width = "200px";

        var ans4 = document.createElement("td");
        document.getElementById('tr'+i).appendChild(ans4);
        ans4.appendChild(document.createTextNode(examPaper[i].D));   
        ans4.style.width = "200px";
        
        var ans = document.createElement("td");
        document.getElementById('tr'+i).appendChild(ans);
        ans.appendChild(document.createTextNode(examPaper[i].Corr_Ans));   
        ans.style.width = "100px";

        var edit = document.createElement("button");
        document.getElementById('tr'+i).appendChild(edit);
        edit.appendChild(document.createTextNode("Edit"));        
        edit.setAttribute('id', i);
        edit.setAttribute('class', 'btn btn-info btn-block btn-xs');
        edit.setAttribute('onclick', 'editQues(i)');
        // edit.style.width = "80px";
        // edit.style.height= "10px";
        edit.setAttribute("style", "margin: auto");

        var remove = document.createElement("button");
        document.getElementById('tr'+i).appendChild(remove);
        remove.appendChild(document.createTextNode("Remove"));        
        remove.setAttribute('id', i);
        remove.setAttribute('class', 'btn btn-danger btn-block btn-xs');
        remove.setAttribute('onclick', 'removeQues(id)');
        // remove.style.width = "80px";
        // remove.style.height= "10px";
        remove.setAttribute("style", "margin: auto");
    }
}

function editQues(i)
{
    var index = parseInt(i);
    document.getElementById("ques-label").innerHTML = 'Q'+(index+1)+'.'; 
}

function removeQues(index)
{
    examPaper.splice(index,1);
    printedQuestions =0;
    clearTable(idArr);
    printQuestions();
    writeFile();
}

function writeFile() 
{
    window.localStorage.setItem('paper',JSON.stringify(examPaper));
}

function clearTable(Arr)
{
    for(var i=0; i<Arr.length; i++)
    {
        document.getElementById(Arr[i]).innerHTML = '';
    }
}

function checkEmpty()
{
    var allInputIds = ['new-ques', 'new-A', 'new-B', 'new-C', 'new-D'];
    var status = true;

    for(var i=0; i<allInputIds.length; i++)
    {
        if(!document.getElementById(allInputIds[i]).value)
        {
            status = false;
        }
    }
    
    
    let flag = 0; 
    
    for(var i=0; i<4; i++)
    {
        if(document.getElementsByName('corr-option')[i].checked)
        {
            flag++;
            break;
        }
    }
    console.log(flag);
    if(flag===0)
    {
        status = false;
    }
    return status;
}