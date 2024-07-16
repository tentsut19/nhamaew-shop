document.addEventListener('DOMContentLoaded', function () {
    initializeLiff();
});

var roomNumber;
var profile;

async function initializeLiff() {
    try {
        document.getElementById("overlay").style.display = "block";

        console.log('--- initializeLiff ---')
        await liff.init({ liffId: LIFF_ID });

        const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "");
        const params = new URLSearchParams(queryString);
        const userId = params.get('userId');
        if (userId != null && userId != '') {
            console.log(userId);
        }

        if (!liff.isLoggedIn() && PROD) {
            const destinationUrl = window.location.href;
            liff.login({redirectUri: destinationUrl});
            return;
        }

        if (PROD) {
            friendship = await liff.getFriendship();
            console.log(friendship);
            if(!friendship.friendFlag){
                Swal.fire({
                    //   title: 'ยืนยันการส่งข้อมูลใช่ไหม?',
                    //   text: "เมื่อกดยืนยัน คุณจะได้รับเลขนัดปรึกษาสัตวแพทย์ทางไลน์ หากไม่ได้รับกรุณาติดต่อแอดมิน",
                    html: "<b style='font-size: 24px;'>ร้านค้าโดยสัตวแพทย์<br>เฉพาะผู้ที่เป็นเพื่อนกับ LINE<br>หน้าแมวเพ็ทเอไอ (Nhamaew Pet Ai) เท่านั้น</b><br><br><label style='font-size: 20px;'></label>",
                    icon: 'warning',
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonColor: '#06c755',
                    confirmButtonText: 'เพิ่มเพื่อน Nhamaew Ai'
                }).then((result) => {
                    console.log(result);
                    window.location.href = "https://lin.ee/ZHdJ99P";
                })
            }
        }

        countViewPet();
    } catch (error) {
        document.getElementById("overlay").style.display = "none";
        alert('เกิดข้อผิดพลาด');
        // alert(error);
        console.error('API Error:', error);
    }
}

async function countViewPet(){
    try {
        if (!liff.isLoggedIn() && PROD) {
            const destinationUrl = window.location.href;
            liff.login({redirectUri: destinationUrl});
            return;
        }

        var profile
        if (PROD) {
            profile = await liff.getProfile();
        }else{
            profile = profileTest;
        }

        var url = URL_COUNT_VIEW_SHOP;
        var data = {
            lineUserId: profile.userId,
            displayName: profile.displayName,
            statusMessage: profile.statusMessage,
            pictureUrl: profile.pictureUrl
        };
        
        postData(url, data, function(error, response) {
            document.getElementById("overlay").style.display = "none";
            if (error) {
                console.error("Error:", error);
            } else {
                console.log("Success:", response);

                var viewMoya = document.getElementById("viewMoya");
                viewMoya.innerHTML = response.viewMOYA;
                var viewNCHAM = document.getElementById("viewNCHAM");
                viewNCHAM.innerHTML = response.viewNCHAM;

                var joinMoya = document.getElementById("joinMoya");
                joinMoya.innerHTML = response.joinMOYA;
                var joinNCHAM = document.getElementById("joinNCHAM");
                joinNCHAM.innerHTML = response.joinNCHAM;
                
                var viewPettinee = document.getElementById("div-item-pettinee");
                var divSOPet = document.getElementById("div-item-sopet");
                // console.log(response.id % 2);
                // if(response.id % 2 == 0){
                //     divSOPet.setAttribute("class", "item active");
                //     // viewPettinee.classList.remove("active");
                // }else{
                //     viewPettinee.setAttribute("class", "item active");
                //     // divSOPet.classList.remove("active");
                // }

                var idxMax = $('#myCarousel .item').length;
                // console.log(idxMax);
                var titlePages = document.getElementById("titlePages");
                titlePages.innerHTML = 'ร้านที่ '+(idx+1)+' จาก '+idxMax;

            }
        });

    } catch (error) {
        document.getElementById("overlay").style.display = "none";
        console.error('API Error:', error);
    }
}

async function updateViewPet(partner){
    try {
        if (!liff.isLoggedIn() && PROD) {
            const destinationUrl = window.location.href;
            liff.login({redirectUri: destinationUrl});
            return;
        }

        var profile
        if (PROD) {
            profile = await liff.getProfile();
        }else{
            profile = profileTest;
        }

        var url = URL_UPDATE_VIEW_SHOP;
        var data = {
            lineUserId: profile.userId,
            displayName: profile.displayName,
            statusMessage: profile.statusMessage,
            pictureUrl: profile.pictureUrl,
            state: "CLICK",
            partner: partner
        };

        document.getElementById("overlay").style.display = "block";

        postData(url, data, function(error, response) {
            document.getElementById("overlay").style.display = "none";
            if (error) {
                console.error("Error:", error);
                swalError('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง','');
            } else {
                console.log("Success:", response);
                if('MOYA'==partner){
                    liff.openWindow({
                        url: 'https://crm-thailand.getcode.dev/shop/1156/shopping',
                        external: false
                    });
                }else if('N_CHAM'==partner){
                    liff.openWindow({
                        url: 'https://s.shopee.co.th/6pfzKcIDNt',
                        external: true
                    });
                }
            }
        });

    } catch (error) {
        document.getElementById("overlay").style.display = "none";
        swalError('เกิดข้อผิดพลาด','กรุณาลองใหม่อีกครั้ง');
        console.error('API Error:', error);
    }
}

function postData(url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callback(null, JSON.parse(xhr.responseText));
            } else {
                callback(xhr.statusText, null);
            }
        }
    };

    xhr.send(JSON.stringify(data));
}

function swalError(title,text){
    Swal.fire({
        title: title,
        text: text,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ตกลง'
      }).then((result) => {
        
      })
}