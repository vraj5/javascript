const complete_register_btn = document.getElementById("complete_register_btn");
const mailFormat = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{6,20}$/;
let skill = document.getElementById("skill");
let all_skill_main = document.getElementById("all_skill_main");
let delete_skill_box = document.getElementById("delete_skill_box");
let tbody = document.getElementById("tbody");
let update_btn = document.getElementById("update_btn");
let modal_footer = document.getElementById("modal-footer");

// ----------------------------- ALL INPUTS -----------------------------
let first_name = document.getElementById("first_name");
let last_name = document.getElementById("last_name");
let age = document.getElementById("age");
let email = document.getElementById("email");
let phone = document.getElementById("phone")
let password = document.getElementById("password");
let c_password = document.getElementById("c_password");
let male = document.getElementById("male");
let female = document.getElementById("female");
let countrySelect = document.getElementById("country");
let stateSelect = document.getElementById("state");
let citySelect = document.getElementById("city");
let about_user = document.getElementById("about_user");
let all = document.getElementById("all");
let programming = document.getElementById("programming");
let designing = document.getElementById("designing");
let dancing = document.getElementById("dancing");
let swimming = document.getElementById("swimming");
let image_src;
var gender;

// ----------------------------- Trashed Content -----------------------------
let trash_btn = document.getElementById("trash_btn");
let trash_tbody = document.getElementById("trash_tbody");

// ----------------------------- Select all checkboxes when select all -----------------------------
all.addEventListener("change", () => {
    if (!this.checked) {
        programming.checked = true;
        designing.checked = true;
        dancing.checked = true;
        swimming.checked = true;
    }
})
all.addEventListener("change", () => {
    if (this.checked) {
        programming.checked = false;
        designing.checked = false;
        dancing.checked = false;
        swimming.checked = false;
    }
})
// ----------------------------- Admin All Things -----------------------------
let displayAdmin = document.getElementById("displayAdmin");

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "500",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

// ----------------------------- VALIDATION MESSAGES -----------------------------
let successNote = "";
function validateSuccess() {
    $(function () {
        toastr.success(successNote)
    })
}
let errorNote = "";
function validateError() {
    $(function () {
        toastr.warning(errorNote)
    })
}

// ----------------------------- GET ERROR ELEMENTS -----------------------------
let all_err_main = document.getElementById("all_err_main")
let err_main = document.getElementById("err_main");
let errs = document.getElementById("errs");

// ----------------------------- Main All Users -----------------------------
if (localStorage.getItem("users") == null) {
    localStorage.setItem("users", '[]')
}
// ----------------------------- Admin Local -----------------------------
if (localStorage.getItem("admin") == null) {
    localStorage.setItem("admin", '[]')
}

// ----------------------------- CHECKBOX Tap All to select all  -----------------------------
if (all.checked) {
    programming.checked = true;
    designing.checked = true;
    dancing.checked = true;
    swimming.checked = true;
}

let allUsers = JSON.parse(localStorage.getItem("users"));

first_name.addEventListener("keypress", (e) => {
    if (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode < 65) || (e.keyCode > 90 && e.keyCode < 97) || e.keyCode > 122 || (e.keyCode >= 48 && e.keyCode <= 57)) {
        event.preventDefault();
        return false;
    };
});
last_name.addEventListener("keypress", (e) => {
    if (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode < 65) || (e.keyCode > 90 && e.keyCode < 97) || e.keyCode > 122 || (e.keyCode >= 48 && e.keyCode <= 57)) {
        event.preventDefault();
        return false;
    };
});

phone.addEventListener("keypress", (e) => {
    if (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode < 65) || (e.keyCode > 90 && e.keyCode < 97) || e.keyCode > 122 || (e.keyCode >= 97 && e.keyCode <= 122) || (e.keyCode >= 65 && e.keyCode <= 90)) {
        event.preventDefault();
        return false;
    };
    if (phone.value.length > 9) {
        event.preventDefault();
        return false;
    }
    // console.log(e.key , " --- ", e.keyCode);
});
skill.addEventListener("keypress", (e) => {
    if (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode < 65) || (e.keyCode > 90 && e.keyCode < 97) || e.keyCode > 122) {
        event.preventDefault();
        return false;
    };
});
about_user.addEventListener("keypress", (e) => {
    console.log('e.keyCode :', e.keyCode);
    if (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode < 65) || (e.keyCode > 90 && e.keyCode < 97) || e.keyCode > 122) {
        event.preventDefault();
        return false;
    };
});
email.addEventListener("keypress", (e) => {
    if (e.keyCode == 32) {
        event.preventDefault();
        return false;
    };
});
age.addEventListener("keypress", (e) => {
    if (e.keyCode == 101) {
        event.preventDefault();
        return false;
    };
    if (e.keyCode == 45 || e.keyCode == 46) {
        event.preventDefault();
        return false;
    };
    if (age.value.length > 1) {
        event.preventDefault();
        return false;
    }
});
pagination_row_inp.addEventListener("keypress", (e) => {
    if (e.keyCode == 101) {
        event.preventDefault();
        return false;
    };
    if (e.keyCode == 45 || e.keyCode == 46) {
        event.preventDefault();
        return false;
    };
    if (pagination_row_inp.value.length > 1) {
        event.preventDefault();
        return false;
    }
})

let imageUpload = document.getElementById("imageUpload");
function afterImageUpload(element){
    let file = element.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function(){
        console.log("reader.result", reader.result);
        image_src = reader.result;
        console.log('image_src :', image_src);
    }
};

// ----------------------------- Validations after submit -----------------------------
function complete_registration() {
    errorNote = "";
    if (first_name.value.length == "" || first_name.value.length >= 15) {
        errorNote += "Enter Valid First Name * <br/>"
    }
    if (last_name.value.length == "" || first_name.value.length >= 15) {
        errorNote += "Enter Valid Last Name * <br/>"
    }
    if (email.value.match(mailFormat)) {
    } else {
        errorNote += "Enter Valid Email * <br/>"
    }
    if (age.value <= 18 || age.value >= 100) {
        errorNote += "Enter Valid Age * <br/>"
    }
    if (phone.value.length != 10) {
        errorNote += "Enter Valid Mobile Number * <br/>"
    }
    if (!password.value.match(passwordFormat)) {
        errorNote += "Enter Valid Password * <br/>"
    }

    if (c_password.value != password.value) {
        errorNote += "Confirm Password Doesn't match* <br/>"
    }
    if (!male.checked) {
        if (!female.checked) {
            errorNote += "Please Select gender * <br/>"
        }
    }
    if (male.checked == true) {
        gender = male.value;
    } else if (female.checked == true) {
        gender = female.value
    }
    if (!countrySelect.value) {
        errorNote += "Please Select Country * <br/>"
    }
    if (!stateSelect.value) {
        errorNote += "Please Select State * <br/>"
    }
    if (!citySelect.value) {
        errorNote += "Please Select City * <br/>"
    }
    if (about_user.value.length <= 5) {
        errorNote += "Please Enter Valid Description * <br/>"
    }
    if (all_skill.length < 3) {
        errorNote += "Please Enter Atleast 3 Skills * <br/>"
    }
    if (!image_src) {
        errorNote += "Please Upload your Image * <br/>"
    }
    if (errorNote) {
        validateError();
    }

    allUsers.map((e) => {
        if (email == e.email) {
            errorNote += "Email Already Registered !! * <br/>"
        }
    });

    if (errorNote == "") {
        // -=-=-=-=-=-=-=-=-=-=-=- Selected Country
        let selectedCountry;
        let countryValue = countrySelect.value;
        country.filter(a => countryValue == a.c_id).map((e) => {
            selectedCountry = e.country;
        });
        // -=-=-=-=-=-=-=-=-=-=-=- Selected State
        let selectedState;
        let stateValue = stateSelect.value;
        state.filter(a => stateValue == a.s_id).map((e) => {
            selectedState = e.state;
        });
        // -=-=-=-=-=-=-=-=-=-=-=- Selected City
        let selectedCity;
        let cityValue = citySelect.value;
        city.filter(a => cityValue == a.ct_id).map((e) => {
            selectedCity = e.city;
        });

        let allHobbies = [];
        if (all.checked == true) {
            allHobbies.push("all")
            all.checked = false;
        } if (programming.checked == true) {
            allHobbies.push("programming");
            programming.checked = false;
        } if (designing.checked == true) {
            allHobbies.push("designing")
            designing.checked = false;
        } if (dancing.checked == true) {
            allHobbies.push("dancing")
            dancing.checked = false;
        } if (swimming.checked == true) {
            allHobbies.push("swimming")
            swimming.checked = false;
        }


        let skills = [];
        all_skill.forEach((e) => {
            skills.push(e)
        })

        let arr = [];
        allUsers.map((e)=>{
            arr.push(e.id);
        });

        for(i=0;i<arr.length;i++){
            for(j=i+1;j<arr.length;j++){
                if(arr[i] > arr[j]){
                    let a = arr[j];
                    arr[j] = arr[i];
                    arr[j] = a;
                }
            }
        }

        let lastIndexArr;
        for(i=0;i<arr.length;i++){
            lastIndexArr = arr[parseInt(i)];
        }
        if(lastIndexArr == undefined){
            lastIndexArr = -1
        }
        console.log('lastIndexArr :', lastIndexArr);
        console.log('arr :', arr);

        let userObj = {
            id: lastIndexArr + 1,
            first_name: first_name.value,
            last_name: last_name.value,
            age: age.value,
            email: email.value,
            phone: phone.value,
            password: password.value,
            gender: gender,
            hobbies: allHobbies,
            skill: skills,
            country: selectedCountry,
            state: selectedState,
            city: selectedCity,
            description: about_user.value,
            c_id: countryValue,
            s_id: stateValue,
            ct_id: cityValue,
            image_url : image_src
        }
        allUsers.push(userObj)
        localStorage.setItem("users", JSON.stringify(allUsers))
        displayOnTable();


        // -=-=-=-=-=-=-=-=-=-=-= Make Empty whole user input
        emptyInput();

        pagination();
        pageChange(1);
    }
};

// ----------------------------- Print Data on Table -----------------------------
displayOnTable();
// ----------------------------- Display data in Table -----------------------------
function displayOnTable() {
    let Tempdata = "";
    allUsers.forEach((e) => {
        Tempdata +=
            `
                <tr id="${e.id}" class="tr">
                    <td><button data-bs-toggle="modal" data-bs-target="#userDetailsModal" onclick="showUserInfo(${e.id})" style="margin:10px 10px;"><i class="fa-solid fa-circle-info"></i></button</td>
                    <td>${e.first_name}</td>
                    <td>${e.last_name}</td>
                    <td>${e.age}</td>
                    <td>${e.email}</td>
                    <td>${e.phone}</td>
                    <td>${e.password}</td>
                    <td>${e.gender}</td>
                    <td>${e.hobbies}</td>
                    <td>${e.skill}</td>
                    <td>${e.country}</td>
                    <td>${e.state}</td>
                    <td>${e.city}</td>
                    <td>${e.description}</td>
                    <td><button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="updateBtn" onclick="updateRow(${e.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                    <td><button class="closeBtn" onclick="deletePopup(${e.id})"><i class="fa-solid fa-trash"></i></button></td>
                </tr>`
    });
    tbody.innerHTML = Tempdata;

    // pagination();
    // pageChange(1);

}

// ----------------------------- Delete popup -----------------------------
let delete_popup = document.getElementById("delete_popup");
let delete_btns_main = document.getElementById("delete_btns_main");
function deletePopup(id){
    delete_btns_main.innerHTML = "";
    delete_popup.classList.remove("dn")
    delete_popup.classList.add("db")
    delete_btns_main.innerHTML =
    `<div class="cancle_btn"><button onclick="closeDeletePopup()">Cancle</button></div>
    <div class="delete_btn"><button onclick="deleteRow(${id})">Delete</button></div>`
}
// ----------------------------- Close Delete popup -----------------------------
function closeDeletePopup(){
    delete_popup.classList.remove("db")
    delete_popup.classList.add("dn")
}

// ----------------------------- Delete Row -----------------------------
if (localStorage.getItem("deleted_user") == null) {
    localStorage.setItem("deleted_user", '[]')
}
let deleted_user = JSON.parse(localStorage.getItem("deleted_user"))
function deleteRow(id) {
    let row = allUsers.findIndex((e) => e.id == id);
    let rowInner = allUsers[row]
    deleted_user.push(rowInner)
    localStorage.setItem("deleted_user", JSON.stringify(deleted_user));
    allUsers.splice(row, 1)
    localStorage.setItem("users", JSON.stringify(allUsers));
    displayOnTable()
    displayOnTrashTable()

    delete_popup.classList.remove("db")
    delete_popup.classList.add("dn")

    pagination();
    pageChange(1);
}
// ----------------------------- Show User Info --------------------------
function showUserInfo(id) {
    let row = allUsers.findIndex((e) => e.id == id);
    let obj = allUsers[row];

    let userInfoDisplay = document.getElementById("userInfoDisplay");

    userInfoDisplay.innerHTML =
        `
    <div class="col-10"><img src="${obj.image_url}" /></div>
    <div class="col-lg-5"><h5><p><i class="fa-solid fa-user"></i></p>First Name : <span>${obj.first_name}</span></h5></div>
    <div class="col-lg-5"><h5><p><i class="fa-solid fa-user"></i></p>Last Name : <span>${obj.last_name}</span></h5></div>
    <div class="col-lg-5"><h5><p><i class="fa-solid fa-person"></i></p>Age : <span>${obj.age}</span></h5></div>
    <div class="col-lg-5"><h5><p><i class="fa-solid fa-envelope"></i></p>Email : <span>${obj.email}</span></h5></div>
    <div class="col-lg-5"><h5><p><i class="fa-solid fa-phone"></i></p>Phone : <span>${obj.phone}</span></h5></div>
    <div class="col-lg-5"><h5><p><i class="fa-solid fa-lock"></i></p>Password : <span>${obj.password}</span></h5></div>
    <div class="col-lg-5"><h5><p><i class="fa-solid fa-users-viewfinder"></i></p>Gender : <span>${obj.gender}</span></h5></div>
    <div class="col-lg-5"><h5><p><i class="fa-solid fa-circle-plus"></i></p>Skill : <span>${obj.skill}</span></h5></div>
    <div class="col-lg-5"><h5><p><i class="fa-solid fa-heart"></i></p>Hobbies : <span>${obj.hobbies}</span></h5></div>
    <div class="col-lg-5"><h5><p><i class="fa-solid fa-location-dot"></i></p>Country : <span>${obj.country}</span></h5></div>
    <div class="col-lg-5"><h5><p><i class="fa-solid fa-location-dot"></i></p>State : <span>${obj.state}</span></h5></div>
    <div class="col-lg-5"><h5><p><i class="fa-solid fa-location-dot"></i></p>City : <span>${obj.city}</span></h5></div>
    <div class="col-11"><h5><p><i class="fa-solid fa-circle-info"></i></p>About : <span>${obj.description}</span></h5></div>`
}
// ----------------------------- Update Row --------------------------
let new_update_row;
function updateRow(id) {
    document.getElementById("complete_register_btn").classList.remove("db");
    document.getElementById("complete_register_btn").classList.add("dn");
    document.getElementById("update_btn").classList.add("db");
    document.getElementById("update_btn").classList.remove("dn");
    let row = allUsers.findIndex((e) => e.id == id);
    let obj = allUsers[row];
    let obj_skills = obj.skill;
    let genderNew = allUsers[row].gender;
    first_name.value = obj.first_name;
    last_name.value = obj.last_name;
    age.value = obj.age;
    email.value = obj.email;
    phone.value = obj.phone;
    password.value = obj.password;
    c_password.value = obj.c_password;
    about_user.value = obj.description;
    new_update_row = allUsers[row];

    if (genderNew == "male") {
        male.checked = true
    } else {
        female.checked = true
    }

    for (i = 0; i < obj.hobbies.length; i++) {
        let a = obj.hobbies[i];
        if (a == "all") {
            all.checked = true;
            programming.checked = true;
            designing.checked = true;
            dancing.checked = true;
            swimming.checked = true;

        } if (a == "programming") {
            programming.checked = true;
        } if (a == "designing") {
            designing.checked = true;
        } if (a == "dancing") {
            dancing.checked = true;
        } if (a == "swimming") {
            swimming.checked = true;
        }
    }

    obj_skills.forEach((e) => {
        all_skill_main.innerHTML +=
            `<div" class="skill_box">
        <span>${e}</span>
        <button onclick="delete_skill(this,'${e}')" id="delete_skill_box"><i class="fa-solid fa-trash delete_skill"></i></button>
        </div>`;
    });

    // countrySelect.innerHTML = ""
    stateSelect.innerHTML = ""
    citySelect.innerHTML = ""
    // === Country add Selected
    country.forEach((e) => {
        if (obj.c_id == e.c_id) {
            for (i = 0; i < countrySelect.length; i++) {
                let check_c_id = countrySelect[i].value;
                if (obj.c_id == check_c_id) {
                    countrySelect.selectedIndex = e.c_id
                };
            };
        };
    });
    state.forEach((e) => {
        if (obj.c_id == e.c_id) {
            stateSelect.innerHTML +=
                `<option id="${e.state}" value="${e.s_id}">${e.state}</option>`;
            if (obj.s_id == e.s_id) {
                for (let x in stateSelect.options) {
                    if (x == e.state) {
                        stateSelect.options[x].selected = 'selected';
                    }
                }
            }
        }
    })
    city.forEach((e) => {
        if (obj.s_id == e.s_id) {
            citySelect.innerHTML +=
                `<option id="${e.city}" value="${e.ct_id}">${e.city}</option>`
        }
    })
    if (obj.ct_id) {
        for (let x in citySelect.options) {
            if (x = obj.ct_id) {
            }
        }
        let a = obj.city
        for (i = 0; i < citySelect.options.length; i++) {
            if (citySelect.options[i].value == obj.ct_id) {
                citySelect.options[i].selected = 'selected';
            }
        }
    }
}



// ----------------------------- Update Form -----------------------------
function update_form() {
    let row = allUsers.findIndex((e) => e.id == new_update_row.id);;
    let obj = allUsers[row];
    console.log('new_update_row :', new_update_row);

    if (!male.checked) {
        if (!female.checked) {
            errorNote += "Please Select gender * <br/>"
        }
    }
    if (male.checked == true) {
        gender = male.value;
    } else if (female.checked == true) {
        gender = female.value
    }

    // -=-=-=-=-=-=-=-=-=-=-=- Selected Country
    let selectedCountry;
    let countryValue = countrySelect.value;
    country.filter(a => countryValue == a.c_id).map((e) => {
        selectedCountry = e.country;
    });
    new_update_row.country = selectedCountry;
    // -=-=-=-=-=-=-=-=-=-=-=- Selected State
    let selectedState;
    let stateValue = stateSelect.value;
    state.filter(a => stateValue == a.s_id).map((e) => {
        selectedState = e.state;
    });
    new_update_row.state = selectedState;
    // -=-=-=-=-=-=-=-=-=-=-=- Selected City
    let selectedCity;
    let cityValue = citySelect.value;
    city.filter(a => cityValue == a.ct_id).map((e) => {
        selectedCity = e.city;
    });
    new_update_row.city = selectedCity;

    new_update_row.first_name = first_name.value;

    new_update_row.last_name = last_name.value;

    new_update_row.age = age.value;

    new_update_row.email = email.value;

    new_update_row.phone = phone.value;

    new_update_row.password = password.value;

    new_update_row.gender = gender;

    if(image_src){
        new_update_row.image_url = image_src
    }


    all_skill.forEach((e) => {
        obj.skill.push(e)
    });

    new_update_row.skill = obj.skill;
    console.log('new_update_row.skill :', new_update_row.skill);

    new_update_row.description = about_user.value;


    let new_hobbies = [];
    if (all.checked == true) {
        new_hobbies.push("all")
    } if (programming.checked == true) {
        new_hobbies.push("programming");
    } if (designing.checked == true) {
        new_hobbies.push("designing")
    } if (dancing.checked == true) {
        new_hobbies.push("dancing")
    } if (swimming.checked == true) {
        new_hobbies.push("swimming")
    }

    new_update_row.hobbies = new_hobbies;

    console.log('obj :', obj);
    allUsers.splice(row, 1, obj);
    localStorage.setItem("users", JSON.stringify(allUsers));

    displayOnTable();
    emptyInput();

    pagination();
    pageChange(1);

}

// ----------------------------- Model Close Btn -----------------------------
function modelClose() {
    all.checked = false;
    programming.checked = false;
    designing.checked = false;
    dancing.checked = false;
    swimming.checked = false;
    emptyInput()
    all_skill_main.innerHTML = "";
}

// ----------------------------- For Adding new skill in the skill box -----------------------------
let all_skill = [];

function addSkill() {
    if (skill.value) {
        $(function () {
            toastr.success("Skill Added Successfully!!");
        });
        let new_skill = skill.value.trim();
        all_skill.push(new_skill)

        let added_skill = all_skill[all_skill.length - 1]

        all_skill_main.innerHTML +=
            `<div" class="skill_box">
        <span>${added_skill}</span>
        <button onclick="delete_skill(this,'${new_skill}')" id="delete_skill_box"><i class="fa-solid fa-trash delete_skill"></i></button>
    </div>`
        skill.value = "";
    } else {
        $(function () {
            toastr.error("Please Enter A Skill");
        });
        console.log("enter the value in skill box");
    }
}

// ========================================= Add Skill by Pressing Enter
skill.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        addSkill();
    };
});
// ========================================= Delete the added skill from SKill box
function delete_skill(ref, new_skill) {
    let parent = ref.parentNode.parentNode;
    parent.removeChild(ref.parentNode);
    let index = all_skill.indexOf(new_skill);
    all_skill.splice(index, 1)
}

// =========================================All Skill Clear wwith one button
function clear_all_skill() {
    for (i = all_skill_main.childElementCount; i > 0; i--) {
        let last = all_skill_main.lastElementChild;
        all_skill_main.removeChild(last);
        all_skill.pop();
    };
};

// ----------------------------- Submit to press enter on about      -----------------------------
about_user.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
        complete_registration();
    };
});

// ----------------------------- For Password hide/unhide -----------------------------
let after_show = document.getElementById("after_show_p");
let after_hide = document.getElementById("after_hide_p");
function pass() {
    if (password.type === "password") {
        password.type = "text";
        after_show.classList.add("db");
        after_show.classList.remove("dn");
        after_hide.classList.add("dn");
        after_hide.classList.remove("db");
    } else {
        password.type = "password";
        after_show.classList.add("dn");
        after_show.classList.remove("db");
        after_hide.classList.add("db");
        after_hide.classList.remove("dn");
    }
};

// ----------------------------- For Confirm Password hide/unhide -----------------------------
let after_show_cp = document.getElementById("after_show_cp");
let after_hide_cp = document.getElementById("after_hide_cp");
function c_pass() {
    if (c_password.type === "password") {
        c_password.type = "text";
        after_show_cp.classList.add("db");
        after_show_cp.classList.remove("dn");
        after_hide_cp.classList.add("dn");
        after_hide_cp.classList.remove("db");
    } else {
        c_password.type = "password";
        after_show_cp.classList.add("dn");
        after_show_cp.classList.remove("db");
        after_hide_cp.classList.add("db");
        after_hide_cp.classList.remove("dn");
    }
};
if (all.checked) {
    console.log("dsakjadfsyu");
}
// ----------------------------- Country State City Dropdown -----------------------------
let country = [
    { c_id: 1, country: "India" },
    { c_id: 2, country: "America" },
    { c_id: 3, country: "London" },
    { c_id: 4, country: "Australia" }
];
let state = [
    { c_id: 1, s_id: 1, state: "Gujarat" },
    { c_id: 1, s_id: 2, state: "Maharashtra" },
    { c_id: 2, s_id: 3, state: "California" },
    { c_id: 2, s_id: 4, state: "Hawaii" },
    { c_id: 3, s_id: 5, state: "England" },
    { c_id: 3, s_id: 6, state: "Paris" },
    { c_id: 4, s_id: 7, state: "Victoria" },
    { c_id: 4, s_id: 8, state: "Vales" },
];
let city = [
    { ct_id: 1, s_id: 1, city: "Surat" },
    { ct_id: 2, s_id: 1, city: "Ahmedabad" },
    { ct_id: 3, s_id: 1, city: "Vadodara" },
    { ct_id: 4, s_id: 1, city: "Gandhinagar" },
    { ct_id: 5, s_id: 1, city: "Thane" },
    { ct_id: 6, s_id: 2, city: "Mumbai" },
    { ct_id: 7, s_id: 2, city: "Raigad" },
    { ct_id: 8, s_id: 2, city: "Satara" },
    { ct_id: 9, s_id: 2, city: "Kolhaput" },
    { ct_id: 10, s_id: 3, city: "Ukiah" },
    { ct_id: 11, s_id: 3, city: "Redding" },
    { ct_id: 12, s_id: 3, city: "Palm Desert" },
    { ct_id: 13, s_id: 3, city: "Santa Cruz" },
    { ct_id: 14, s_id: 3, city: "Berkeley" },
    { ct_id: 15, s_id: 4, city: "Lahaina" },
    { ct_id: 16, s_id: 4, city: "Kailua" },
    { ct_id: 17, s_id: 4, city: "Pearl" },
    { ct_id: 18, s_id: 4, city: "Kapolei" },
    { ct_id: 19, s_id: 4, city: "Kihei" },
    { ct_id: 20, s_id: 5, city: "London" },
    { ct_id: 21, s_id: 5, city: "Liverpool" },
    { ct_id: 22, s_id: 6, city: "France" },
    { ct_id: 23, s_id: 6, city: "Rome" },
    { ct_id: 24, s_id: 7, city: "Melbourne" },
    { ct_id: 25, s_id: 7, city: "Horsham" },
    { ct_id: 26, s_id: 8, city: "witch" },
    { ct_id: 27, s_id: 8, city: "The high road" },
];
let allCountry = country.map((a) => {
    countrySelect.innerHTML +=
        `<option value='${a.c_id}'>${a.country}</option>`
})
function selectState(event) {
    stateSelect.innerHTML = ""
    if (event.target.value) {
        state.filter(x => x.c_id == event.target.value).map((a) => {
            stateSelect.innerHTML +=
                `<option value='${a.s_id}'>${a.state}</option>`
        })
    }
}

function selectCity(event) {
    citySelect.innerHTML = ""
    if (event.target.value) {
        city.filter(x => x.s_id == event.target.value).map((a) => {
            citySelect.innerHTML +=
                `<option value='${a.ct_id}'>${a.city}</option>`
        })
    }
}


// ----------------------------- Make Input Empty -----------------------------
function emptyInput() {
    first_name.value = "";
    last_name.value = "";
    age.value = "";
    email.value = "";
    phone.value = "";
    password.value = "";
    c_password.value = "";
    skill.value = "";
    male.checked = false;
    female.checked = false;
    about_user.value = "";
    citySelect.value = ""
    stateSelect.value = ""
    countrySelect.value = ""


    // ================== Clear all skill
    if (!all_skill[0])
        for (i = all_skill_main.childElementCount; i > 0; i--) {
            let last = all_skill_main.lastElementChild;
            all_skill_main.removeChild(last);
            all_skill.pop();
        };

    clear_all_skill();
}
// ----------------------------- find From Table -----------------------------
function findFromTable() {
    let search = document.getElementById("user_search");
    let search_value = search.value.toLowerCase();
    let allData = JSON.parse(localStorage.getItem('users'));
    let tempData = allData.filter((e) => Object.values(e).join(',').toLowerCase().includes(search_value))
    allUsers = tempData
    displayOnTable();
    if(search.value == ""){
        pagination();
        pageChange(1);
    }
};
// ----------------------------- Sorting with click -----------------------------
let fname_sort = document.getElementById("fname_sort");
let lname_sort = document.getElementById("lname_sort");
let age_sort = document.getElementById("age_sort");
let email_sort = document.getElementById("email_sort");
let phone_sort = document.getElementById("phone_sort");
let password_sort = document.getElementById("password_sort");
let gender_sort = document.getElementById("gender_sort");
let hobbies_sort = document.getElementById("hobbies_sort");
let skills_sort = document.getElementById("skills_sort");
let country_sort = document.getElementById("country_sort");
let state_sort = document.getElementById("state_sort");
let city_sort = document.getElementById("city_sort");
let about_sort = document.getElementById("about_sort");

// =========== First Name Sorting
fname_sort.addEventListener("click", () => {
    let fname_sort_obj = allUsers.sort((a, b) => a.first_name.localeCompare(b.first_name));
    let Tempdata = "";
    fname_sort_obj.forEach((e) => {
        let a = e;
        Tempdata +=
            `<tr id="${a.id}">
                <td><button data-bs-toggle="modal" data-bs-target="#userDetailsModal" onclick="showUserInfo(${e.id})" style="margin:10px 10px;"><i class="fa-solid fa-circle-info"><i class="fa-solid fa-circle-info><i class="fa-solid fa-circle-info"></i></button</td>
                <td>${a.first_name}</td>
                <td>${a.last_name}</td>
                <td>${a.age}</td>
                <td>${a.email}</td>
                <td>${a.phone}</td>
                <td>${a.password}</td>
                <td>${a.gender}</td>
                <td>${a.hobbies}</td>
                <td>${a.skill}</td>
                <td>${a.country}</td>
                <td>${a.state}</td>
                <td>${a.city}</td>
                <td>${a.description}</td>
                <td><button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="updateBtn" onclick="updateRow(${a.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button class="closeBtn" onclick="deletePopup(${a.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`
    });
    tbody.innerHTML = Tempdata;
});
// =========== Last Name Sorting
lname_sort.addEventListener("click", () => {
    let lname_sort_obj = allUsers.sort((a, b) => a.last_name.localeCompare(b.last_name));
    let Tempdata = "";
    lname_sort_obj.forEach((e) => {
        let a = e;
        Tempdata +=
            `<tr id="${a.id}">
                <td><button data-bs-toggle="modal" data-bs-target="#userDetailsModal" onclick="showUserInfo(${e.id})" style="margin:10px 10px;"><i class="fa-solid fa-circle-info"><i class="fa-solid fa-circle-info><i class="fa-solid fa-circle-info"></i></button</td>
                <td>${a.first_name}</td>
                <td>${a.last_name}</td>
                <td>${a.age}</td>
                <td>${a.email}</td>
                <td>${a.phone}</td>
                <td>${a.password}</td>
                <td>${a.gender}</td>
                <td>${a.hobbies}</td>
                <td>${a.skill}</td>
                <td>${a.country}</td>
                <td>${a.state}</td>
                <td>${a.city}</td>
                <td>${a.description}</td>
                <td><button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="updateBtn" onclick="updateRow(${a.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button class="closeBtn" onclick="deletePopup(${a.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`
    });
    tbody.innerHTML = Tempdata;
});
// =========== Age Sorting
age_sort.addEventListener("click", () => {
    let age_sort_obj = allUsers.sort((a, b) => a.age.localeCompare(b.age));
    let Tempdata = "";
    age_sort_obj.forEach((e) => {
        let a = e;
        Tempdata +=
            `<tr id="${a.id}">
                <td><button data-bs-toggle="modal" data-bs-target="#userDetailsModal" onclick="showUserInfo(${e.id})" style="margin:10px 10px;"><i class="fa-solid fa-circle-info"><i class="fa-solid fa-circle-info><i class="fa-solid fa-circle-info"></i></button</td>
                <td>${a.first_name}</td>
                <td>${a.last_name}</td>
                <td>${a.age}</td>
                <td>${a.email}</td>
                <td>${a.phone}</td>
                <td>${a.password}</td>
                <td>${a.gender}</td>
                <td>${a.hobbies}</td>
                <td>${a.skill}</td>
                <td>${a.country}</td>
                <td>${a.state}</td>
                <td>${a.city}</td>
                <td>${a.description}</td>
                <td><button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="updateBtn" onclick="updateRow(${a.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button class="closeBtn" onclick="deletePopup(${a.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`
    });
    tbody.innerHTML = Tempdata;
});
// =========== Email Sorting
email_sort.addEventListener("click", () => {
    let email_sort_obj = allUsers.sort((a, b) => a.email.localeCompare(b.email));
    let Tempdata = "";
    email_sort_obj.forEach((e) => {
        let a = e;
        Tempdata +=
            `<tr id="${a.id}">
                <td><button data-bs-toggle="modal" data-bs-target="#userDetailsModal" onclick="showUserInfo(${e.id})" style="margin:10px 10px;"><i class="fa-solid fa-circle-info"><i class="fa-solid fa-circle-info><i class="fa-solid fa-circle-info"></i></button</td>
                <td>${a.first_name}</td>
                <td>${a.last_name}</td>
                <td>${a.age}</td>
                <td>${a.email}</td>
                <td>${a.phone}</td>
                <td>${a.password}</td>
                <td>${a.gender}</td>
                <td>${a.hobbies}</td>
                <td>${a.skill}</td>
                <td>${a.country}</td>
                <td>${a.state}</td>
                <td>${a.city}</td>
                <td>${a.description}</td>
                <td><button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="updateBtn" onclick="updateRow(${a.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button class="closeBtn" onclick="deletePopup(${a.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`
    });
    tbody.innerHTML = Tempdata;
});
// =========== Phone Sorting
phone_sort.addEventListener("click", () => {
    let phone_sort_obj = allUsers.sort((a, b) => a.phone.localeCompare(b.phone));
    let Tempdata = "";
    phone_sort_obj.forEach((e) => {
        let a = e;
        Tempdata +=
            `<tr id="${a.id}">
                <td><button data-bs-toggle="modal" data-bs-target="#userDetailsModal" onclick="showUserInfo(${e.id})" style="margin:10px 10px;"><i class="fa-solid fa-circle-info"><i class="fa-solid fa-circle-info><i class="fa-solid fa-circle-info"></i></button</td>
                <td>${a.first_name}</td>
                <td>${a.last_name}</td>
                <td>${a.age}</td>
                <td>${a.email}</td>
                <td>${a.phone}</td>
                <td>${a.password}</td>
                <td>${a.gender}</td>
                <td>${a.hobbies}</td>
                <td>${a.skill}</td>
                <td>${a.country}</td>
                <td>${a.state}</td>
                <td>${a.city}</td>
                <td>${a.description}</td>
                <td><button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="updateBtn" onclick="updateRow(${a.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button class="closeBtn" onclick="deletePopup(${a.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`
    });
    tbody.innerHTML = Tempdata;
});
// =========== Password Sorting
password_sort.addEventListener("click", () => {
    let password_sort_obj = allUsers.sort((a, b) => a.password.localeCompare(b.password));
    let Tempdata = "";
    password_sort_obj.forEach((e) => {
        let a = e;
        Tempdata +=
            `<tr id="${a.id}">
                <td><button data-bs-toggle="modal" data-bs-target="#userDetailsModal" onclick="showUserInfo(${e.id})" style="margin:10px 10px;"><i class="fa-solid fa-circle-info"><i class="fa-solid fa-circle-info><i class="fa-solid fa-circle-info"></i></button</td>
                <td>${a.first_name}</td>
                <td>${a.last_name}</td>
                <td>${a.age}</td>
                <td>${a.email}</td>
                <td>${a.phone}</td>
                <td>${a.password}</td>
                <td>${a.gender}</td>
                <td>${a.hobbies}</td>
                <td>${a.skill}</td>
                <td>${a.country}</td>
                <td>${a.state}</td>
                <td>${a.city}</td>
                <td>${a.description}</td>
                <td><button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="updateBtn" onclick="updateRow(${a.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button class="closeBtn" onclick="deletePopup(${a.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`
    });
    tbody.innerHTML = Tempdata;
});
// =========== Hobbies Sorting
hobbies_sort.addEventListener("click", () => {
    let hobbies_sort_obj = allUsers.sort((a, b) => a.hobbies[0].localeCompare(b.hobbies[0]));

    let Tempdata = "";
    hobbies_sort_obj.forEach((e) => {
        let a = e;
        Tempdata +=
            `<tr id="${a.id}">
                <td><button data-bs-toggle="modal" data-bs-target="#userDetailsModal" onclick="showUserInfo(${e.id})" style="margin:10px 10px;"><i class="fa-solid fa-circle-info"><i class="fa-solid fa-circle-info><i class="fa-solid fa-circle-info"></i></button</td>
                <td>${a.first_name}</td>
                <td>${a.last_name}</td>
                <td>${a.age}</td>
                <td>${a.email}</td>
                <td>${a.phone}</td>
                <td>${a.password}</td>
                <td>${a.gender}</td>
                <td>${a.hobbies}</td>
                <td>${a.skill}</td>
                <td>${a.country}</td>
                <td>${a.state}</td>
                <td>${a.city}</td>
                <td>${a.description}</td>
                <td><button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="updateBtn" onclick="updateRow(${a.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button class="closeBtn" onclick="deletePopup(${a.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`
    });
    tbody.innerHTML = Tempdata;
})
// =========== Hobbies Sorting
skills_sort.addEventListener("click", () => {
    let skills_sort_obj = allUsers.sort((a, b) => a.skill[0].localeCompare(b.skill[0]));

    let Tempdata = "";
    skills_sort_obj.forEach((e) => {
        let a = e;
        Tempdata +=
            `<tr id="${a.id}">
                <td><button data-bs-toggle="modal" data-bs-target="#userDetailsModal" onclick="showUserInfo(${e.id})" style="margin:10px 10px;"><i class="fa-solid fa-circle-info"><i class="fa-solid fa-circle-info><i class="fa-solid fa-circle-info"></i></button</td>
                <td>${a.first_name}</td>
                <td>${a.last_name}</td>
                <td>${a.age}</td>
                <td>${a.email}</td>
                <td>${a.phone}</td>
                <td>${a.password}</td>
                <td>${a.gender}</td>
                <td>${a.hobbies}</td>
                <td>${a.skill}</td>
                <td>${a.country}</td>
                <td>${a.state}</td>
                <td>${a.city}</td>
                <td>${a.description}</td>
                <td><button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="updateBtn" onclick="updateRow(${a.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button class="closeBtn" onclick="deletePopup(${a.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`
    });
    tbody.innerHTML = Tempdata;
})
// =========== Gender Sorting
gender_sort.addEventListener("click", () => {
    let gender_sort_obj = allUsers.sort((a, b) => a.gender.localeCompare(b.gender));
    let Tempdata = "";
    gender_sort_obj.forEach((e) => {
        let a = e;
        Tempdata +=
            `<tr id="${a.id}">
                <td><button data-bs-toggle="modal" data-bs-target="#userDetailsModal" onclick="showUserInfo(${e.id})" style="margin:10px 10px;"><i class="fa-solid fa-circle-info"><i class="fa-solid fa-circle-info><i class="fa-solid fa-circle-info"></i></button</td>
                <td>${a.first_name}</td>
                <td>${a.last_name}</td>
                <td>${a.age}</td>
                <td>${a.email}</td>
                <td>${a.phone}</td>
                <td>${a.password}</td>
                <td>${a.gender}</td>
                <td>${a.hobbies}</td>
                <td>${a.skill}</td>
                <td>${a.country}</td>
                <td>${a.state}</td>
                <td>${a.city}</td>
                <td>${a.description}</td>
                <td><button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="updateBtn" onclick="updateRow(${a.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button class="closeBtn" onclick="deletePopup(${a.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`
    });
    tbody.innerHTML = Tempdata;

});
// =========== Country Sorting
country_sort.addEventListener("click", () => {
    let country_sort_obj = allUsers.sort((a, b) => a.country.localeCompare(b.country));
    let Tempdata = "";
    country_sort_obj.forEach((e) => {
        let a = e;
        Tempdata +=
            `<tr id="${a.id}">
                <td><button data-bs-toggle="modal" data-bs-target="#userDetailsModal" onclick="showUserInfo(${e.id})" style="margin:10px 10px;"><i class="fa-solid fa-circle-info"><i class="fa-solid fa-circle-info><i class="fa-solid fa-circle-info"></i></button</td>
                <td>${a.first_name}</td>
                <td>${a.last_name}</td>
                <td>${a.age}</td>
                <td>${a.email}</td>
                <td>${a.phone}</td>
                <td>${a.password}</td>
                <td>${a.gender}</td>
                <td>${a.hobbies}</td>
                <td>${a.skill}</td>
                <td>${a.country}</td>
                <td>${a.state}</td>
                <td>${a.city}</td>
                <td>${a.description}</td>
                <td><button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="updateBtn" onclick="updateRow(${a.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button class="closeBtn" onclick="deletePopup(${a.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`
    });
    tbody.innerHTML = Tempdata;
});
// =========== State Sorting
state_sort.addEventListener("click", () => {
    let state_sort_obj = allUsers.sort((a, b) => a.state.localeCompare(b.state));
    let Tempdata = "";
    state_sort_obj.forEach((e) => {
        let a = e;
        Tempdata +=
            `<tr id="${a.id}">
                <td><button data-bs-toggle="modal" data-bs-target="#userDetailsModal" onclick="showUserInfo(${e.id})" style="margin:10px 10px;"><i class="fa-solid fa-circle-info"><i class="fa-solid fa-circle-info><i class="fa-solid fa-circle-info"></i></button</td>
                <td>${a.first_name}</td>
                <td>${a.last_name}</td>
                <td>${a.age}</td>
                <td>${a.email}</td>
                <td>${a.phone}</td>
                <td>${a.password}</td>
                <td>${a.gender}</td>
                <td>${a.hobbies}</td>
                <td>${a.skill}</td>
                <td>${a.country}</td>
                <td>${a.state}</td>
                <td>${a.city}</td>
                <td>${a.description}</td>
                <td><button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="updateBtn" onclick="updateRow(${a.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button class="closeBtn" onclick="deletePopup(${a.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`
    });
    tbody.innerHTML = Tempdata;
});
// =========== City Sorting
city_sort.addEventListener("click", () => {
    let city_sort_obj = allUsers.sort((a, b) => a.city.localeCompare(b.city));
    let Tempdata = "";
    city_sort_obj.forEach((e) => {
        let a = e;
        Tempdata +=
            `<tr id="${a.id}">
                <td><button data-bs-toggle="modal" data-bs-target="#userDetailsModal" onclick="showUserInfo(${e.id})" style="margin:10px 10px;"><i class="fa-solid fa-circle-info"><i class="fa-solid fa-circle-info><i class="fa-solid fa-circle-info"></i></button</td>
                <td>${a.first_name}</td>
                <td>${a.last_name}</td>
                <td>${a.age}</td>
                <td>${a.email}</td>
                <td>${a.phone}</td>
                <td>${a.password}</td>
                <td>${a.gender}</td>
                <td>${a.hobbies}</td>
                <td>${a.skill}</td>
                <td>${a.country}</td>
                <td>${a.state}</td>
                <td>${a.city}</td>
                <td>${a.description}</td>
                <td><button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="updateBtn" onclick="updateRow(${a.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button class="closeBtn" onclick="deletePopup(${a.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`
    });
    tbody.innerHTML = Tempdata;
});
// =========== About Sorting
about_sort.addEventListener("click", () => {
    let about_sort_obj = allUsers.sort((a, b) => a.description.localeCompare(b.description));
    let Tempdata = "";
    about_sort_obj.forEach((e) => {
        let a = e;
        Tempdata +=
            `<tr id="${a.id}">
                <td><button data-bs-toggle="modal" data-bs-target="#userDetailsModal" onclick="showUserInfo(${e.id})" style="margin:10px 10px;"><i class="fa-solid fa-circle-info"><i class="fa-solid fa-circle-info><i class="fa-solid fa-circle-info"></i></button</td>
                <td>${a.first_name}</td>
                <td>${a.last_name}</td>
                <td>${a.age}</td>
                <td>${a.email}</td>
                <td>${a.phone}</td>
                <td>${a.password}</td>
                <td>${a.gender}</td>
                <td>${a.hobbies}</td>
                <td>${a.skill}</td>
                <td>${a.country}</td>
                <td>${a.state}</td>
                <td>${a.city}</td>
                <td>${a.description}</td>
                <td><button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="updateBtn" onclick="updateRow(${a.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button class="closeBtn" onclick="deletePopup(${a.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`
    });
    tbody.innerHTML = Tempdata;
});

// // // ----------------------------- Pagination on table -----------------------------
let next_page = document.getElementById("next_page")
let prev_page = document.getElementById("prev_page")
function pagination() {
    let pagination_row_inp = document.getElementById("pagination_row_inp");
    let n = pagination_row_inp.value;
    console.log('n :', n);
    let allPaginationBtn = document.getElementById("allPaginationBtn");

    allPaginationBtn.innerHTML = ""

    let btnLength = Math.ceil(allUsers.length / n);

    for (i = 1; i <= btnLength; i++) {
        allPaginationBtn.innerHTML +=
        `
        <button class="register_btn pagination_btn" id="${i}" onclick="pageChange(${i})">${i}</button>
        `
    }
    pageChange(1)
}
function pageChange(pageNo) {
    let pagination_row_inp = document.getElementById("pagination_row_inp");
    let tempallUsers = JSON.parse(localStorage.getItem("users"));
    let n = pagination_row_inp.value;
    let Tempdata = "";
    tempallUsers.splice((pageNo - 1) * n, n).forEach((e) => {
        Tempdata +=
            `
                <tr id="${e.id}">
                    <td><button data-bs-toggle="modal" data-bs-target="#userDetailsModal" onclick="showUserInfo(${e.id})" style="margin:10px 10px;"><i class="fa-solid fa-circle-info"><i class="fa-solid fa-circle-info"></i></button</td>
                    <td>${e.first_name}</td>
                    <td>${e.last_name}</td>
                    <td>${e.age}</td>
                    <td>${e.email}</td>
                    <td>${e.phone}</td>
                    <td>${e.password}</td>
                    <td>${e.gender}</td>
                    <td>${e.hobbies}</td>
                    <td>${e.skill}</td>
                    <td>${e.country}</td>
                    <td>${e.state}</td>
                    <td>${e.city}</td>
                    <td>${e.description}</td>
                    <td><button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="updateBtn" onclick="updateRow(${e.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                    <td><button class="closeBtn" onclick="deletePopup(${e.id})"><i class="fa-solid fa-trash"></i></button></td>
                    </tr>`
                });
                tbody.innerHTML = Tempdata;
            }
pagination();
pageChange(1);
pagination_row_inp.addEventListener("keypress", () => {
    pagination();
})
next_page.addEventListener("click",()=>{

})

console.log('allUsers :', allUsers);
// ----------------------------- Trash data  -----------------------------
displayOnTrashTable()
function displayOnTrashTable() {
    trash_tbody.innerHTML = ""
    let deletedTempData = "";
    deleted_user.forEach((e) => {
        deletedTempData +=
            `<tr id="${e.id}">
                <td>${e.first_name}</td>
                <td>${e.last_name}</td>
                <td>${e.age}</td>
                <td>${e.email}</td>
                <td>${e.phone}</td>
                <td>${e.password}</td>
                <td>${e.gender}</td>
                <td>${e.hobbies}</td>
                <td>${e.skill}</td>
                <td>${e.country}</td>
                <td>${e.state}</td>
                <td>${e.city}</td>
                <td>${e.description}</td>
                <td><button class="updateBtn" onclick="recoverTrashRow(${e.id})"><i class="fa-solid fa-rotate-right"></i></button></td>
                <td><button class="closeBtn" onclick="deleteTrashRow(${e.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`
    });
    trash_tbody.innerHTML += deletedTempData;

    pagination();
    pageChange(1);
};
function deleteTrashRow(id) {
    let row = deleted_user.findIndex((e) => e.id == id);
    console.log(row);
    deleted_user.splice(row, 1)
    localStorage.setItem("deleted_user", JSON.stringify(deleted_user));
    trash_tbody.innerHTML = ""
    displayOnTrashTable();
    pagination();
    pageChange(1);
}
function recoverTrashRow(id) {
    let allId = [];
    allUsers.map((e) => {
        allId.push(e.id);
    })
    for (i = 0; i < allId.length; i++) {
        for (j = i + 1; j < allId.length; j++) {
            let a = 0;
            if (allId[i] > allId[j]) {
                a = allId[i];
                allId[i] = allId[j];
                allId[j] = a;
            }
        }
    }
    console.log('allIdArr :', allId);
    let newId
    for (i = 0; i < allId.length; i++) {
        newId = allId[i] + 1;
    }
    if(newId === undefined){
        newId = 0;
    }
    //  = allUsers.length + 1;
    let rowCount = deleted_user.findIndex((e) => e.id == id);
    mainRow = deleted_user[rowCount];
    mainRow.id = newId
    allUsers.push(mainRow);
    localStorage.setItem("users", JSON.stringify(allUsers));
    deleted_user.splice(rowCount, 1);
    localStorage.setItem("deleted_user", JSON.stringify(deleted_user));
    displayOnTrashTable();
    displayOnTable();
    pagination();
    pageChange(1);
}
function delete_all_trash() {
    deleted_user = [];
    localStorage.setItem("deleted_user", JSON.stringify(deleted_user));
    displayOnTrashTable();
    pagination();
    pageChange(1);
}