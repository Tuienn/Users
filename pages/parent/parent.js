function all(resultHandleCookie){
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
        notifi.style = 'display: none';
        notifi.querySelector('.success').style = 'display: none';
        notifi.querySelector('.warning').style = 'display: none';
        notifi.querySelector('.question').style = 'display: none';
    }
    function reloadPage(){
        location.reload()
    }
    function quitNoti(btn){
        btn.addEventListener("click", quit)
    }
    function quitNotiAndReload(btn){
        btn.addEventListener("click",function(){
            quit()
            reloadPage()
        });
        
    }
    //
    function notiPOSTAPI(btn){
        btn.addEventListener("click", function(){
            for(let index=0; index<arrayStudent.length; index++){
                // console.log(arrayStudent[index]);
                if(arrayStudent[index].update != 0){
                    // console.log(arrayStudent[index].total);
                    // console.log(arrayStudent[index].paid);
                    var formData ={
                        "studentId": arrayStudent[index].id,
                        "amount": arrayStudent[index].update,
                        "date": getFormattedDate()
                    }
                    postAPI(formData, studentPOSTAPI);
                    // Gửi dữ liệu học phí
                }
            }
            quit();
            displayNoti("Thanh toán thành công học phí. Nhấn OKAY để reload", 1)
            quitNotiAndReload(groupButton[0]);
            // quitNoti(groupButton[0])
        })
    }

    //Mở giao diện học sinh
    var container_main_func = document.querySelector('.container_main_function'); 
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
    // let flagAPI = false;
    var container = document.getElementById('container_payment');
    var registerBtn = document.getElementById('register');
    var loginBtn = document.getElementById('login');

    registerBtn.addEventListener('click', () => {
        container.classList.add("active");

        group_infor_bank[3].querySelector('.input_text').value = totalMoney.innerText;
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });

    var input_child = document.querySelector('.viewFee-container-content-select-child .input_text');
    var subnav_viewFee = document.querySelector('.viewFee-container-content-select-child .subnav');

    input_child.addEventListener("click", function(){
        subnav_viewFee.setAttribute('style', 'display: grid');

    })

    document.addEventListener("click", function(e){
        if(e.target != input_child){
            subnav_viewFee.setAttribute('style', 'display: none');
        }
    })


    function setValueSelectedChild(){
        var selectedChild = subnav_viewFee.querySelectorAll('li');

        for(let i=0; i<selectedChild.length; i++){
            selectedChild[i].addEventListener("click", function(){
                input_child.value = selectedChild[i].innerText;
                subnav_viewFee.setAttribute('style', 'display: none');

                setContentTution(arrayStudent[i].total, arrayStudent[i].paid);
                subnav_viewFee.id=i; 
                // console.log(viewFee_container_fee_input_money.querySelector('.input_text').value);
                if(viewFee_container_fee_input_money.querySelector('.input_text').value != ""){
                    viewFee_container_fee_input_money.querySelector('.input_text').value = arrayStudent[i].update;
                }
            });
        }
    }

    // Sự kiện nhấn nút xác nhận
    var viewFee_container_fee_input_money = document.querySelector('.viewFee-container-fee-input-money');
    var btn_viewFee = viewFee_container_fee_input_money.querySelector('.btn');
    var textError_viewFee = viewFee_container_fee_input_money.querySelector('.input_text_error');

    btn_viewFee.addEventListener("click", function(){
        if(!checkErrorInput(viewFee_container_fee_input_money)){
            increaseTotalMoney();
            arrayStudent[subnav_viewFee.id].update = parseInt(totalMoney.innerText);
        }
    })

    //Set time now
    var getFormattedDate = () => {
        var date = new Date();

        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var day = date.getDate().toString().padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }

    function checkErrorInput(input){
        var textError = input.querySelector('.input_text_error');
        var inputMoney = input.querySelector('.input_text').value;

        if(inputMoney == ''){
            textError.innerText = '(*)Vui lòng nhập';
            return true;
        }
        else if(isNaN(inputMoney) && input!=group_selectBank[2]){
            textError.innerText = '(*)Nhập sai định dạng';
            return true;
        }
        else{
            textError.innerText = '';
            return false;
        }
    }

    var totalMoney = viewFee_container_fee_input_money.querySelector('.total_money .total_money_result');
    function increaseTotalMoney(){
        var inputMoney = viewFee_container_fee_input_money.querySelector('.input_text').value;

        var inputMoney_number = parseInt(inputMoney);
        var totalMoney_number = parseInt(totalMoney.innerText);

        totalMoney_number += inputMoney_number;

        var fomatVND = totalMoney_number.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        totalMoney.innerText= fomatVND;
    }

    var group_selectBank = document.querySelectorAll('.information-pay-selectBank img');
    //create event click for each group-selectBank (2 elements), when click add style border: 2px solid blue;
    for (let i = 0; i < 2; i++) {
        group_selectBank[i].addEventListener("click", function() {
            group_selectBank[i].setAttribute("style", "border: 2px solid blue");
            group_selectBank[1-i].setAttribute("style", "border: 1px solid var(--black-color)");
        });
    }

    // Check số tài khoản ngân hàng
    var btnPay = document.querySelector('.pay-container-content .btn');
    var group_infor_bank = document.querySelectorAll('.infomation-pay');

    btnPay.addEventListener("click", function(){
        checkErrorInput(group_infor_bank[1]);
        checkErrorInput(group_infor_bank[2]);
    })
    // Nhấn nút thanh toán
    btnPay.addEventListener("click", function(){
        // console.log(money);
        //Số tiền bằng 0
        if(parseInt(totalMoney.innerText) == 0){
            displayNoti("Chưa nhập số tiên để thanh toán",2);
            quitNoti(groupButton[1]);
        }   
        else{
            if(group_infor_bank[1].querySelector('.input_text_error').innerText==""&&
            group_infor_bank[2].querySelector('.input_text_error').innerText==""){
                displayNoti(`Bạn có chắc chắn muốn thanh toán ${totalMoney.innerText}`, 3)
                quitNoti(groupButton[2])
                notiPOSTAPI(groupButton[3])
            }
        }
    })

    // Xử lý API
    var studentGETAPI = "https://localhost:7256/api/StudentParent/payment/"+resultHandleCookie;
    var studentPOSTAPI = "https://localhost:7256/api/StudentParent/payment/"+resultHandleCookie;
    var studentSpecialAPI = 'http://localhost:3000/specialAPIStudent'

    var arrayStudent = [];
    function startParent(){
        //Xử lý cho thanh toán
        getStudentData(returnArrayStudent, renderStudentData_subnav);
        //Xử lý để đẩy dữ liệu lên subnav chọn con trong điểm danh
    }

    startParent();

    function getStudentData(callback1, callback2){
        fetch(studentGETAPI)
            .then(function(response){
                return response.json();
            })
            .then(callback1)
            .then(callback2)
            .catch(function(error){
                console.log(error);
            });
    }

    function returnArrayStudent(dataJson){
        var array = dataJson.map(function(data){
            return {
                id : data.studentId,
                name : data.name,
                total : data.total,
                paid : data.paid,
                update: 0
            }
        });
        arrayStudent = arrayStudent.concat(array);
        return array;
    }
    function renderStudentData_subnav(datas){
        var htmls = datas.map(function(data){
            return `<li>${data.name}</li>`
        })
        var html = htmls.join('');
        document.querySelector('#student_parent .subnav').innerHTML = html;
        subnav_viewFee.innerHTML = html;

        setValueSelectedChild();
        postAPIStudent_special();
        console.log(arrayStudent)
    }

    function setContentTution(total, paid){
        var group_information_fee = document.querySelectorAll('.information-fee');
        var debt = total-paid;
        var surplus = -debt;

        if(debt<=0){
            debt=0;
        }
        if(surplus<=0){
            surplus=0;
        }
        group_information_fee[0].querySelector('.result_tution').innerText = total.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        group_information_fee[1].querySelector('.result_tution').innerText = paid.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        group_information_fee[2].querySelector('.result_tution').innerText = debt.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        group_information_fee[3].querySelector('.result_tution').innerText = surplus.toLocaleString('vi', {style : 'currency', currency : 'VND'});
    }

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

    //Xử lý sự kiện chọn con trên subnav
    function postAPIStudent_special(){
        var subnav_selectChildSchedule = document.querySelectorAll('#student_parent li')
        // console.log(arrayStudent)
        for(let i=0; i<subnav_selectChildSchedule.length; i++){
            subnav_selectChildSchedule[i].addEventListener("click", function(){

                var formData = {
                    userId: arrayStudent[i].id
                }
                
                postAPI(formData, studentSpecialAPI);
                loadContent(container_main_func, 'pages/student/student.html', 'pages/student/student.js')
            })
        }
    }
}

var parentSpecialAPI = 'http://localhost:3000/specialAPIParent'
function setDataAll(callback1, callback2){
    fetch(parentSpecialAPI)
        .then(function(response){
            return response.json();
        })
        .then(callback1)
        .then(callback2)
        .catch(function(error){
            console.log(error);
        })
}
function findIDNearest(datas){
    var id = datas[datas.length-1].userId;
    return id;
}
function start(){
    setDataAll(findIDNearest, all)
}
start();


