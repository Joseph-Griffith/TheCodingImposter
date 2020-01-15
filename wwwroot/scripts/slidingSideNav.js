// Width of the side menu
var sectionWidth = 25

function collapseSideNav(element) {
    // Temporarily disable all css transitions
    var elementTransition = element.style.transition;
    element.style.transition = "";

    // On the next frame (as soon as the previous style change has taken effect),
    // explicitly set the side menu's width to 25rem, so we
    // aren't transitioning out of 'auto'
    requestAnimationFrame(function () {
        element.style.width = sectionWidth + "rem";
        element.style.transition = elementTransition;

        // On the next frame (as soon as the previous style change has taken effect),
        // have the side menu transition to width: 0
        requestAnimationFrame(function () {
            element.style.width = 0 + "rem";
        });
    });

    // Mark the section as "currently collapsed"
    element.setAttribute("collapsed", "true");
}

function expandSideNav(element) {
    // Have the menu transition to a width of 25rem
    element.style.width = sectionWidth + "rem";

    // When the next css transition finishes (which should be the one we just triggered)
    element.addEventListener("transitionend", function (e) {
        // Remove this event listener so it only gets triggered once
        element.removeEventListener("transitionend", arguments.callee);
    });

    // Mark the section as "currently not collapsed"
    element.setAttribute("collapsed", "false");
}

$(".hamburger-icon").on("click", function () {
    $(".sidenav").toggleClass("sidenav-hide");
    var section = document.querySelector(".sidenav__items");
    var isCollapsed = section.getAttribute("collapsed") === "true";

    if (isCollapsed) {
        expandSideNav(section);
        section.setAttribute("collapsed", "false");
    } else {
        collapseSideNav(section);
    }
});