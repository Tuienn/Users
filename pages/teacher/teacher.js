
//Thông báo
var groupButton = document.querySelectorAll('.buttons button');
function displayNoti(content, value){

    var notifi = document.querySelector('section');
    notifi.setAttribute('style', 'display: flex');
    notifi.classList.add('active');
    var groupButton = document.querySelectorAll('.buttons button');

    if(value==1){
        notifi.querySelector('.success').style = 'display: flex'
        notifi.querySelector('.success').querySelector('h3').innerText = content;
    }
    else if(value==2){
        notifi.querySelector('.warning').style = 'display: flex'
        notifi.querySelector('.warning').querySelector('h3').innerText = content;
    }
    else{
        notifi.querySelector('.question').style = 'display: flex'
        notifi.querySelector('.question').querySelector('h3').innerText = content;
    }
}
function quit(){
    var notifi = document.querySelector('section');
    notifi.style='display: none'
    notifi.querySelector('.success').style = 'display: none';
    notifi.querySelector('.warning').style = 'display: none';
    notifi.querySelector('.question').style = 'display: none';
}
function reloadPage(){
    location.reload()
}
//Dùng cho cả quit thông báo question post data và warnning
function quitNoti(btn){
    btn.addEventListener("click", quit)
}
function notiPOSTAPI(btn){

    btn.onclick = function(){
        // console.log(arrayStudent1[subnav_classSelect]);
        var group_checkbox = document.querySelectorAll('input[type="checkbox"]');
        var group_attend = [];
        for(let index=0; index<group_checkbox.length; index++){
            var formData = {
                "userId": arrayStudent1[subnav_classSelect][index].id,
                "date": getFormattedDate(),
                "isPresent": arrayStudent1[subnav_classSelect][index].isPresent
            }
            group_attend.push(formData);
        }
        // console.log(group_attend);
        console.log(group_attend)
        postAttendance(group_attend);
        quit();
        displayNoti("Lưu danh sách thành công", 1);
        quitNoti(groupButton[0])
    }
}
//Set time now
var getFormattedDate = () => {
    var date = new Date();

    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  
// import displayNoti  from "../../src/js/scripts.js";
// displayNoti('Hello', 1);
//create event for input type checkbox whent click (change event)

function checkAttendance(index){
    var group_checkbox = document.querySelectorAll('input[type="checkbox"]');
    //create event for input type checkbox whent click (change event)
    for(let i=0; i<group_checkbox.length; i++){
        group_checkbox[i].addEventListener("change", function() {
            var parentOfCheckbox = group_checkbox[i].parentElement.parentElement;
            if(parentOfCheckbox.className != 'active-row'){
                parentOfCheckbox.classList.add('active-row');
                arrayStudent1[index][i].isPresent = true;
            }
            else{
                arrayStudent1[index][i].isPresent = false;
                parentOfCheckbox.classList.remove('active-row');
            }
        });
    }
}
document.querySelector('.attendance_today').innerText = getFormattedDate();

// Sự kiện chọn lớp subnav
var subnav_classSelect = -1;
function setDataToTable_subnav(){
    for(let index=0; index<arrayClass.length; index++){
        document.getElementById(index).addEventListener("click", function(){
            subnav_classSelect = index;
            renderData_table(arrayStudent1, index);
        });
    }
}


//Call API to get data
var classGETAPI = 'https://localhost:7256/api/user/teacher/9/classes'; 
var studentGETFollowClassAPI='https://localhost:7256/api/UserClass/class';
var attendancePOSTAPI = 'https://localhost:7256/api/StudentAttendance/class'

function startTeacher(){
    getClassData(returnArrayClass, renderClassData_subnav, returnArrayStudentByClass)
}

startTeacher();

function getClassData(callback1, callback2, callback3){
    fetch(classGETAPI)
        .then(function(response){
            return response.json();
        })
        .then(callback1)//Trả về mảng dữ liệu các lớp của giáo viên và Render vào subnav chọn lớp
        .then(callback2)//Render dữ liệu vào subnav
        .then(callback3)//Trả về mảng các học sinh theo lớp
        .catch(function(error){
            console.log(error);
        });
}
var arrayClass = [];
var arrayStudent1 = [];
function returnArrayClass(dataJson){
    // console.log(dataJson);
    var array = dataJson.map(function(dataClass){
        return {
            id : dataClass.id,
            className : dataClass.className
        }
    });
    arrayClass = arrayClass.concat(array);
    // renderClassData_subnav(array);
    // console.log(arrayClass);
    return array;
    // setDataToTable_subnav();
}
function returnArrayStudentByClass(arrayClass){
    // console.log(arrayClass)
    for(let index=0; index<arrayClass.length; index++){
        getStudentsByClass(index, returnArrayStudent)
    }
    // console.log(arrayStudent)
    // console.log(arrayStudent);
}
function getStudentsByClass(index, callback){
    // console.log(arrayClass[index].id);
    fetch(studentGETFollowClassAPI+'/'+arrayClass[index].id)
            .then(function(response){
                return response.json();
            })
            .then(callback)
            .catch(function(error){
                console.log(error);
            })
}
// ***Có data thì phải sửa lại hàm này, bỏ các id của lớp
// Chú ý chỗ dataStudent.students
function returnArrayStudent(dataStudent){   

    var array = dataStudent.map(function(dataStudent){
        return{
            id : dataStudent.id,
            name : dataStudent.name,
            gender: dataStudent.gender,
            isPresent: false
        }})
    arrayStudent1.push(array)
}
        
var subnav_classSelect = document.querySelector('#teacher .subnav')
function renderClassData_subnav(datas){
    // console.log(datas);
    var index=-1;
    var htmls = datas.map(function(data){
        ++index;
        return `<li id="${index}">${data.className}</li>`
    })
    var html = htmls.join('');
    
    subnav_classSelect.innerHTML = html;

    setDataToTable_subnav();
    return datas;
 }

 var table = document.querySelector('table tbody');
 function renderData_table(array, index){
    // console.log(array[index]);
    let i=0;
    // console.log(array[index]);
    var htmls = array[index].map(function(student){
        i++;
        var gender = (student.gender==1) ?"Nam":"Nữ";
        return `<tr>
                    <td>${i}</td>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${gender}</td>
                    <td>
                        <input type="checkbox" class="checkbox">
                    </td>
                </tr>`
    });
    var html = htmls.join('');
    table.innerHTML = html;


    // Sau khi render xong thì gọi hàm checkAttendance để thêm sự kiện cho checkbox
    checkAttendance(index);
 }
//  POST API cho nút click
var btnSaveAttendance = document.querySelector('.attendance_form_today .btn');
function postAttendance(data){
    // console.log(data);
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(attendancePOSTAPI, options)
        .then(function(response){
            return response.json();
        })
        .catch(function(error){
            console.log(error);
        });
}
function checkTableIsNull(){
    if(table.querySelectorAll('tr').length ==0){
        return true;
    }
    return false;
}
btnSaveAttendance.addEventListener("click", function(){
    var group_checkbox = document.querySelectorAll('input[type="checkbox"]');
    if(checkTableIsNull()){
        displayNoti("Bảng chưa có dữ liệu", 2)
        quitNoti(groupButton[1])
    }
    else{
        displayNoti("Bạn có chắc chắn muốn lưu danh sách", 3)
        quitNoti(groupButton[2])
        notiPOSTAPI(groupButton[3])
    }
})



// import {x} from "../../src/js/scripts.js";
// console.log(x);