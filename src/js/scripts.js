
//Thông báo
var groupButton = document.querySelectorAll('.buttons button');
function displayNoti(content, value){

    var notifi = document.querySelector('section');
    notifi.setAttribute('style', 'display: flex');
    notifi.classList.add('active');
    var groupButton = document.querySelectorAll('.buttons button');

    if(value==1){
        notifi.querySelector('.success').style = 'display: flex';
        notifi.querySelector('.success').querySelector('h3').innerText = content;
    }
    else if(value==2){
        notifi.querySelector('.warning').style = 'display: flex';
        notifi.querySelector('.warning').querySelector('h3').innerText = content;
    }
    else{
        notifi.querySelector('.question').style = 'display: flex';
        notifi.querySelector('.question').querySelector('h3').innerText = content;
    }
}
function quit(){
    var notifi = document.querySelector('section');
    notifi.style = 'display: none'
    notifi.querySelector('.success').style = 'display: none';
    notifi.querySelector('.warning').style = 'display: none';
    notifi.querySelector('.question').style = 'display: none';
}
function reloadPage(){
    location.reload()
}

//Sự kiện đăng xuất
function goToHome(btn){
    btn.addEventListener("click", function(){
        document.querySelector('section').setAttribute('style', 'display: none');
        // window.location.href = 'https://www.facebook.com/'
    })
}
function quitNoti(btn){
    btn.addEventListener("click", quit)
}
var logout = document.getElementById('subnav_li_logout');
logout.addEventListener("click", function(){
    displayNoti("Bạn có chắc chắn muốn đăng xuất", 3)

    quitNoti(groupButton[2]);
    goToHome(groupButton[3])
})


//Cookie
// Cắt chuỗi để lấy cookie và lấy ra id và role
function extractIdAndRoleFromCookie(cookie) {
    // Split the cookie string by ';'
    const parts = cookie.split(';');

    let id = null;
    let role = null;

    // Iterate over each part to find "id=" and "role="
    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart.startsWith('id=')) {
            id = trimmedPart.split('=')[1].trim();
        } else if (trimmedPart.startsWith('role=')) {
            role = trimmedPart.split('=')[1].trim();
        }
    }

    // Return an array with id and role
    return { id, role };
}
var resultHandleCookie = extractIdAndRoleFromCookie(document.cookie);
// console.log(resultHandleCookie.id);
// console.log(resultHandleCookie.role);  

//Teacher
if(resultHandleCookie.role==1){
    document.getElementById('student_parent').style.display = 'none';
    document.getElementById('parent').style.display = 'none';
    document.getElementById('student').style.display = 'none';
    POSTAPI_user(1);
    setTimeout(() => loadContent(container_main_func, 'pages/teacher/teacher.html', 'pages/teacher/teacher.js'), 100);
}
//Student
else if(resultHandleCookie.role==2){
    document.getElementById('student_parent').style.display = 'none';
    document.getElementById('teacher').style.display = 'none';
    document.getElementById('parent').style.display = 'none';

    POSTAPI_user(2)
    // setTimeout(() => loadContent(container_main_func, 'pages/student/student.html', 'pages/student/student.js'), 100);
}
else if(resultHandleCookie.role==3){
    document.getElementById('teacher').style.display = 'none';
    document.getElementById('student').style.display = 'none';
    POSTAPI_user(3)
    setTimeout(() => loadContent(container_main_func, 'pages/parent/parent.html', 'pages/parent/parent.js'), 500);

}

// Mở giao diện thông tin cá nhân
var header_logo_user = document.querySelector('.header_logo_user');
var main_modal_information = document.querySelector('.main_modal_information');
header_logo_user.querySelector('#subnav_li_infor').addEventListener("click", function(){
    loadContent(main_modal_information, 'pages/modalInfor/modal.html', 'pages/modalInfor/modal.js')  
    
    setTimeout(() => loadInforAccount(), 500);
});

var container_main_func = document.querySelector('.container_main_function');

// var test = document.querySelector('#student').addEventListener("click", function(){ 
//     loadContent(container_main_func, 'pages/student/student.html', 'pages/student/student.js')  
// })

// // Mở giao diện thanh toán phụ huynh
// var nav_li_Content_pay = document.querySelector('#parent .nav_li_content');
// nav_li_Content_pay.addEventListener("click", function(){
//     loadContent(container_main_func, 'pages/parent/parent.html', 'pages/parent/parent.js')
// })
// // loadContent(container_main_func, 'pages/parent/parent.html', 'pages/parent/parent.js')
// // loadContent(container_main_func, 'pages/student/student.html', 'pages/student/student.js')
// // Mở giao diện lịch dạy
// var nav_li_Content_calendar = document.querySelector('#teacher .nav_li_content');
// nav_li_Content_calendar.addEventListener("click", function(){
//     loadContent(container_main_func, 'pages/teacher/teacher.html', 'pages/teacher/teacher.js')
// })

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
    // script.type = 'module'
    script.src = scriptFile;
    script.id = 'dynamic-script';
    script.onload = function() {
        console.log(`${scriptFile} loaded successfully.`);
    };
    document.getElementById('saveFullJS').appendChild(script);
}

//Load thông tin tài khoản
function loadInforAccount(){
    var UserGETAPI = 'https://localhost:7256/api/user/'+resultHandleCookie.id;

    getInforUser(UserGETAPI, displayInforUser)
}
function getInforUser(UserGETAPI, callback){
    fetch(UserGETAPI)
        .then(function(response){
            return response.json();
        })
        .then(callback)
        .catch(function(error){
            console.log(error);
        })
}

function displayInforUser(data){
    var group_infor = document.querySelectorAll('.infor_container_content .input_text');


    group_infor[0].value = data.name;
    group_infor[1].value = data.dob.split('T')[0];
    group_infor[2].value = data.mobile;
    group_infor[3].value = data.gender;
}
// Xử lý riêng cho thông tin của tài khoản gần nhất đươc chạy
function postAPI(data, API){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(API, options)
        .then(function(response){
            return response.json();
        })
        .catch(function(error){
            console.log(error);
        });
}
function POSTAPI_user(userFunc){
    var parentSpecialAPI = 'http://localhost:3000/specialAPIParent'
    var studentSpecialtAPI = 'https://localhost:7256/api/User/student/infiniteId'
    var teacherSpecialAPI = 'http://localhost:3000/specialAPITeacher'

    var data = {
        studentId : resultHandleCookie.id,
    }
    if(userFunc==1){
        postAPI(data, teacherSpecialAPI)
    }
    else if(userFunc==2){
        postAPI(data, studentSpecialtAPI )
    }
    else{
        postAPI(data, parentSpecialAPI)
    }

}


