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
    document.body.appendChild(script);
}

// Mở giao diện thông tin cá nhân
var header_logo_user = document.querySelector('.header_logo_user');
var main_modal_information = document.querySelector('.main_modal_information');
header_logo_user.addEventListener("click", function(){
    loadContent(main_modal_information, '/Users/pages/modalInfor/modal.html', '/Users/pages/modalInfor/modal.js')  
});

//create event for input type checkbox whent click (change event)
var group_checkbox = document.querySelectorAll('input[type="checkbox"]');


function checkAttendance(){
    //create event for input type checkbox whent click (change event)
    var group_checkbox = document.querySelectorAll('input[type="checkbox"]');
    for(let index=0; index<5; index++){
        group_checkbox[index].addEventListener("change", function() {
            var parentOfCheckbox = group_checkbox[index].parentElement.parentElement;
            if(parentOfCheckbox.className != 'active-row')
                parentOfCheckbox.classList.add('active-row');
            else
                parentOfCheckbox.classList.remove('active-row');
        });
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
  
document.querySelector('.attendance_today').innerText = getFormattedDate();

// Sự kiện chọn lớp subnav
function setDataToTable_subnav(){
    for(let index=0; index<arrayClass.length; index++){
        document.getElementById(index).addEventListener("click", function(){
            // console.log(index)
            renderData_table(arrayClass, index);
        });
    }
}


//Call API to get data
var classAPI = 'http://localhost:3000/class';
function start(){
    getStudentData(returnArrayClass, renderClassData_subnav)
}

start();

function getStudentData(callback1, callback2){
    fetch(classAPI)
        .then(function(response){
            return response.json();
        })
        .then(callback1)//Trả về mảng dữ liệu các lớp của giáo viên và Render vào subnav chọn lớp
        .then(callback2)//Return ra mảng thông tin học sinh
        .catch(function(error){
            console.log(error);
        });
}
var arrayClass = [];

function returnArrayClass(dataJson){
    // console.log(dataJson);
    var array = dataJson.map(function(dataClass){
        return {
            id : dataClass.id,
            className : dataClass.className,
            students: dataClass.students.map(function(student){
                return {
                    id: student.id,
                    name: student.name,
                    gender: student.gender,
                    isPresent: 0
                }
            })
        }
    });
    arrayClass = arrayClass.concat(array);
    // console.log(arrayClass);
    return array;
    // setDataToTable_subnav();
}

var subnav_classSelect = document.querySelector('#nav .subnav')
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
 }

 function renderData_table(array, index){
    var table = document.querySelector('table tbody');
    let i=0;
    var htmls = array[index].students.map(function(student){
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
    checkAttendance();
 }


