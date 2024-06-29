console.log('student.js executed')
// function loadContent(mainDiv, file, scriptFile) {
//     fetch(file)
//         .then(response => response.text())
//         .then(data => {
//             mainDiv.innerHTML = data;
//             if (scriptFile) {
//                 loadScript(scriptFile);
//             }
//         })
//         .catch(error => {
//             mainDiv.innerHTML = '<p>Error loading content.</p>';
//             console.error('Error:', error);
//         });
//         console.log('loadContent calendar executed');
// }

// // Function to load and execute an external script file
// function loadScript(scriptFile) {
//     const script = document.createElement('script');
//     script.src = scriptFile;
//     script.onload = function() {
//         console.log(`${scriptFile} loaded successfully.`);
//     };
//     document.body.appendChild(script);
// }

// const mainDiv = document.querySelector('.calendar');
// loadContent(mainDiv,'/Users/vendors/calendar/calendar.html', '/Users/vendors/calendar/calendar.js');  
var daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

// Lấy ngày tháng năm hiện tại
var date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();


// storing full name of all months in array
var months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7",
              "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
function returnFomatDate(date, month, year){

    var year = year;
    var month = (month + 1).toString().padStart(2, '0');
    var day = date.toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
}

function renderCalendar() {
    // Lấy thứ đầu tiên của tháng với 0=T2, 1=T3, 2=T4...
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    // Lấy ngày cuối cùng của tháng (28/29/30/31)
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    // Lấy thứ cuối cùng của tháng
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); 
    // Lấy ngày cuối cùng của tháng
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); 

    var prevMonth=0, nextMonth=0, prevYear=0, nextYear=0;
    if(currMonth-1==-1){
        prevMonth = 11;
        prevYear = currYear-1;
    }
    else{
        prevMonth = currMonth-1;
        prevYear = currYear;
    }

    if(currMonth+1==12){
        nextMonth = 0;
        nextYear = currYear+1;

    }
    else{
        nextMonth = currMonth+1;
        nextYear = currYear;
    }
    let liTag = "";

    // Vòng for chạy từ thứ cuối cùng của tháng trở lại(set cho các con số mờ)
    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="day day_inactive" title= "${returnFomatDate(lastDateofLastMonth - i + 1, prevMonth, prevYear)}">${lastDateofLastMonth - i + 1}</li>`;
    }
    // Vòng lặp for set cho các thứ trong tháng hiện tại
    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // Ngày hiện tại thì có classNam là active, còn không className là day
        let isToday = (i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear()) ? "day day_now" : "day day_active";
        liTag += `<li class="${isToday}" title="${returnFomatDate(i, currMonth, currYear)}">${i}</li>`;
    }
    // Vòng for chạy từ thứ cuối cùng của tháng hiện tại đển thứ của tháng tiếp
    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="day day_inactive" title= "${returnFomatDate(i - lastDayofMonth + 1, nextMonth, nextYear)}">${i - lastDayofMonth + 1}</li>`;
    }
    currentDate.innerText = `${months[currMonth]} - ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;

    handleEventSelectDay();
}

renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => {
         // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth <= 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

var flag = false;

// Sự kiện chọn ngày
function handleEventSelectDay(){
    var group_day_selected = document.querySelectorAll('.day');

    var day_selected = document.querySelector('.calendar_day_selected_title');
    var day_work = document.querySelector('.calendar_day_selected_work');
    
    function selectDay(calendar_day_selected){
        day_selected.innerText = calendar_day_selected.title;
    }
    
    for(let i=0; i<group_day_selected.length; i++){
        group_day_selected[i].addEventListener("click", function(){
            if(flag==false){
                document.querySelector('.calendar_day:first-child').setAttribute("style", "display: none");
                document.querySelector('.calendar_day:last-child').setAttribute("style", "display: flex");

                flag=true;
                // Dùng flag để 2 function trên chỉ chạy 1 lần
            }
            selectDay(group_day_selected[i]);
        });
    }
}



