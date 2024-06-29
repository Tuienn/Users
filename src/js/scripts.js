// Mở giao diện thông tin cá nhân
var header_logo_user = document.querySelector('.header_logo_user');
var main_modal_information = document.querySelector('.main_modal_information');
header_logo_user.addEventListener("click", function(){
    loadContent(main_modal_information, '/Users/pages/modalInfor/modal.html', '/Users/pages/modalInfor/modal.js')  
});
//Mở giao diện học sinh
var container_main_func = document.querySelector('.container_main_function');

var group_nav_subnav_liSelect = document.querySelectorAll('.nav_subnav_liSelect');
for(let i=0; i<2; i++){
    group_nav_subnav_liSelect[i].addEventListener("click", function(){
        container_main_func.setAttribute('style', 'display: flex');
        loadContent(container_main_func, '/Users/pages/student/student.html', '/Users/pages/student/student.js');
    });
}

// Mở giao diện thanh toán
var nav_li_Content_pay = document.querySelector('.nav_li_content_pay');
nav_li_Content_pay.addEventListener("click", function(){
    loadContent(container_main_func, '/Users/pages/parent/parent.html', '/Users/pages/parent/parent.js')
})

// C3: CLean code theo chatGPT
// Khi click vào ô input thì ô đó sẽ về trạng thái bình thường(có tác dụng khi ô đó đang có hiện lỗi và sau đó nhập dữ liệu)

// modal_input_text.forEach((input, index) => {
//     input.addEventListener("input", function() {
//         groupInput[index].querySelector('.input_text_error').innerText = '';
//         groupInput[index].querySelector('.input_text').style.border = 'solid 1px black';
//     });
// });


// //Fake route
// // Get references to the navBar options and main

// Function to load content from an external file


function loadContent(mainDiv, file, scriptFile) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            mainDiv.innerHTML = data;

            // Remove existing script if any
            const existingScript = document.getElementById('dynamic-script');
            if (existingScript) {
                console.log('Removing existing script');
                existingScript.remove();
            }

            // Load and execute new script if provided
            if (scriptFile) {
                setTimeout(() => loadScript(scriptFile), 0);
            }
        })
        .catch(error => {
            mainDiv.innerHTML = '<p>Error loading content.</p>';
            console.error('Error:', error);
        });
}

// Function to load and execute an external script file
function loadScript(scriptFile) {
    const script = document.createElement('script');
    script.src = scriptFile;
    script.id = 'dynamic-script';
    script.onload = function() {
        console.log(`${scriptFile} loaded successfully.`);
    };
    document.getElementById('saveFullJS').appendChild(script);
}

//Xử lý API
// var calendarAPI = "http://localhost:3000/calendar/HS1";

// function start(){
//     getCalendarData(renderCalendar);
// }

// start();

// function getCalendarData(callback){
//     fetch(calendarAPI)
//         .then(function(response){
//             return response.json();
//         })
//         .then(callback)
//         .catch(function(error){
//             console.log(error);
//         });
// }

// function renderCalendar(dates){
//     var listDate = document.querySelector('.test_API');

//     var htmls = dates.listDate.map(function(date){
//         return `
//         <li>
//             <h4>${date.date}</h4>
//             <p>${date.shift}</p>
//             <p>${date.status}</p>
//         </li>`;
//     });  
//     var html = htmls.join('');
//     listDate.innerHTML = html;
// }

// function renderCourses(courses){
//     var listCourses = document.querySelector('.test_API');
//     console.log(listCourses);
//     var htmls = courses.map(function(course){
//         return `
//         <li>
//             <h4>${course.id}</h4>
//             <p>${course.name}</p>
//         </li>`;
//     });  
//     var html = htmls.join('');
//     listCourses.innerHTML = html;
// }



