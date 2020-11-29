"use strict";

// slick
document.addEventListener("DOMContentLoaded", function () {
  $('.video-carousel').slick({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3
  });
}); // dummy data

var level = {
  "Beginner": "1",
  "Medium": "2",
  "Advanced": "3"
};
var technologies = {
  "ROS": "5",
  "MAVROS": "6",
  "MAVSDK": "7"
};
var cat_to_filter = [];
var cards_el = document.getElementsByClassName("card");
var debug = true;

var filter_cards = function filter_cards(e) {
  jQuery('#cards .card').removeClass("visible_card");

  if (debug) {
    console.log(e.target);
  }

  var el_to_change;

  if (e.target.className.includes('checkmark')) {
    el_to_change = e.target.parentElement;
  } else {
    el_to_change = e.target;
  }

  var el_checkbox = el_to_change.querySelector('input');

  if (debug) {
    console.log(el_checkbox);
    console.log(el_checkbox.checked);
  }

  if (el_checkbox.checked == false) {
    el_checkbox.checked = true;
  } else {
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

  if (debug) {
    console.log(cat_to_filter);
  }

  if (cat_to_filter.length !== 0) {
    for (var i = 0; i < cards_el.length; i++) {
      var show = true;

      for (var j = 0; j < cat_to_filter.length; j++) {
        var pattern = new RegExp("(<=\\s|\\b)" + cat_to_filter[j] + "(?=[]\\b|\\s|$)");

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
    for (var _i = 0; _i < cards_el.length; _i++) {
      cards_el[_i].style.display = "block";

      cards_el[_i].classList.add("visible_card");
    }
  }
};