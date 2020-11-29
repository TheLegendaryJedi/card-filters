// slick
document.addEventListener("DOMContentLoaded", function() {
    $('.video-carousel').slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });
});

// dummy data
let level = {
    "Beginner": "1",
    "Medium": "2",
    "Advanced": "3"
};

let technologies = {
    "ROS": "5",
    "MAVROS": "6",
    "MAVSDK": "7"
};

let cat_to_filter = [];
let cards_el = document.getElementsByClassName("card");
let debug = true;

let filter_cards = function (e) {
    jQuery('#cards .card').removeClass("visible_card");

    if(debug){
        console.log(e.target);
    }
    let el_to_change;
    
    if(e.target.className.includes('checkmark')){
        el_to_change = e.target.parentElement;
    } else {
        el_to_change = e.target;
    }
    var el_checkbox = el_to_change.querySelector('input');

    if(debug){
        console.log(el_checkbox);
        console.log(el_checkbox.checked);
    }

    if (el_checkbox.checked == false) {
        el_checkbox.checked = true;
    }
    else {
        if (el_checkbox.checked == true) {
            el_checkbox.checked = false;
        }
    }

    if (el_to_change.className.includes("clicked")) {
        el_to_change.classList.remove("clicked");
        cat_to_filter = remove(cat_to_filter, el_to_change.id);
    } else {
        el_to_change.classList.add("clicked");
        cat_to_filter.push(el_to_change.id);
    }

    if(debug){
        console.log(cat_to_filter);
    }

    if (cat_to_filter.length !== 0) {
        for (let i = 0; i < cards_el.length; i++) {
            let show = true;
            for (let j = 0; j < cat_to_filter.length; j++) {
                let pattern = new RegExp("(<=\\s|\\b)" + cat_to_filter[j] + "(?=[]\\b|\\s|$)");
                if (!pattern.test(cards_el[i].className)) {
                    show = false;
                }
            }
            if (show) {
                cards_el[i].style.display = "block";
                cards_el[i].classList.add("visible_card");
            } else {
                cards_el[i].style.display = "none";
                cards_el[i].classList.remove("visible_card");
            }
        }
    } else {
        for (let i = 0; i < cards_el.length; i++) {
            cards_el[i].style.display = "block";
            cards_el[i].classList.add("visible_card");
        }
    }
};


