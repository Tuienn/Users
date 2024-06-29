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

// input_child.addEventListener("mouseenter", function(){
//     subnav_viewFee.setAttribute('style', 'display: grid');
// })

// subnav_viewFee.addEventListener("mouseleave", function(){
//     subnav_viewFee.setAttribute('style', 'display: none');
// })

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
    if(parseInt(totalMoney.innerText) == 0){
        alert('Hãy hoàn tất bước 1');
    }   
    else{
        for(let index=0; index<arrayStudent.length; index++){
            console.log(arrayStudent[index]);
            if(arrayStudent[index].update != 0){
                console.log(arrayStudent[index].total);
                console.log(arrayStudent[index].paid);
                var formData ={
                    "paid": arrayStudent[index].paid + arrayStudent[index].update
                }
                updateTution(formData, arrayStudent[index].id, function(){
                    getStudentData(returnArrayStudent, renderStudentData_subnav);
                });
            }
        }
    }
})

// Xử lý API
var studentAPI = "http://localhost:3000/student";

var arrayStudent = [];
function start(){
    getStudentData(returnArrayStudent, renderStudentData_subnav);
}

start();

function getStudentData(callback1, callback2){
    fetch(studentAPI)
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
        return student = {
            id : data.id,
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
    var index=-1;
    var htmls = datas.map(function(data){
        ++index;
        return `<li>${data.name}</li>`
    })
    var html = htmls.join('');

    subnav_viewFee.innerHTML = html;

    setValueSelectedChild();
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

function updateTution(data, id, callback){
    var options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(studentAPI+'/'+id, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
        .catch(function(error){
            console.log(error);
        });
}


