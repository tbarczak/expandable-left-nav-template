var lastViewSetting = false; //default view for page


function viewSideNav(menuOpen) {
  if (menuOpen) {
    $("#side-navbar-container").removeClass("sidenav-compressed").addClass("sidenav-expanded");
    //$("#contentbody").removeClass("content-margins").addClass("content-margins-flex");

    setTimeout(function() {
      $(".sidenav-item-label").removeClass("set-display-hidden");

      if ($(window).height() > 840) {
        $("#sidenav-footer").removeClass("set-display-hidden");
      }
    }, 200);

  } else {
    $(".sidenav-item-label").addClass("set-display-hidden");
    $("#sidenav-footer").addClass("set-display-hidden");
    $("#side-navbar-container").removeClass("sidenav-expanded").addClass("sidenav-compressed");
    //$("#contentbody").removeClass("content-margins-flex").addClass("content-margins");
  }
  lastViewSetting = menuOpen;
}

function viewMobileSideNav() {
  if ($("#side-navbar-container").hasClass("d-none")) {
    $("#side-navbar-container").removeClass("d-none");
  } else {
    $("#side-navbar-container").addClass("d-none");
  }
}


$(document).ready(function() {

/* Manually set menu expanded (for testing):
  setTimeout(function() {
    viewSideNav(true);
  }, 1000);
*/

  $(window).resize(function(){
    if (lastViewSetting) {
      if ($(window).height() < 840) {
        $("#sidenav-footer").addClass("set-display-hidden");
      } else {
        $("#sidenav-footer").removeClass("set-display-hidden");
      }
    }
  });

  $(document).mouseup(function(e) {
    var container = $(".sidenav");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      viewSideNav(false);
    }
  });

  var sideNavExpandInterval, sideNavCompressInterval;
  $( ".sidenav" ).mouseenter(function() {
    clearInterval(sideNavCompressInterval);
    clearInterval(sideNavExpandInterval);
    sideNavExpandInterval = setInterval(function(){
      if ($('.sidenav:hover').length != 0) {
        viewSideNav(true);

        $( ".sidenav" ).mouseleave(function() {
          clearInterval(sideNavCompressInterval);
          clearInterval(sideNavExpandInterval);
          sideNavCompressInterval = setInterval(function(){
            viewSideNav(false);
          }, 500);
        });
      }
    }, 1500);
  });

});