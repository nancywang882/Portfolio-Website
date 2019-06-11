const nav = $('.nav');

setChild = (ele) => {
	ele.siblings().removeClass('active');
	ele.addClass('active');
}

const threshhold = 50;					// +/- the section boundaries
const scrollSpeed = 350;

let isScrolling = false;

let windowHeight = $(window).height();

let homeEnd = windowHeight;				// End of Home section
let aboutEnd = windowHeight * 2;		// End of About section
let projectsEnd = windowHeight * 3;	    // End of Projects section
let contactEnd = windowHeight * 4;		// End of Contact section

let section = 0;						// What section screen is on
let prevScroll = 0;						// Previous scroll location to detect scroll direction


$(window).resize( () => {

	windowHeight = $(window).height();

	homeEnd = windowHeight;				// End of Home section
	aboutEnd = windowHeight * 2;		// End of About section
	projectsEnd = windowHeight * 3;		// End of Portfolio section
	contactEnd = windowHeight * 4;		// End of Contact section
})

$(window).scroll(event => {

	if(isScrolling === false) {

		let currentScroll = $(document).scrollTop();
		let scrollVal = currentScroll;
		let scrollDown = currentScroll - prevScroll > 0 ? true : false;			// Calculating Direction

		if (currentScroll > threshhold && currentScroll < (homeEnd - threshhold)) {
			if(scrollDown === true){
				scrollVal = homeEnd;
				setChild(nav.children('.about'));
			} else {
				scrollVal = 0;
				setChild(nav.children('.home'));
			}
		} else if (currentScroll > (homeEnd + threshhold) && currentScroll < (aboutEnd - threshhold)) {
			if(scrollDown === true) {
				scrollVal = aboutEnd;
				setChild(nav.children('.projects'));
			} else {
				scrollVal = homeEnd;
				setChild(nav.children('.about'));
			}
		}
		else if (currentScroll > (aboutEnd + threshhold) && currentScroll < (projectsEnd - threshhold)) {
			if(scrollDown === true) {
				scrollVal = projectsEnd;
				setChild(nav.children('.contact'));
			} else {
				scrollVal = aboutEnd;
				setChild(nav.children('.projects'));
			}
		}

		if(scrollVal !== currentScroll) {
			isScrolling = true;
			$('html, body').animate({scrollTop: scrollVal}, scrollSpeed, () => isScrolling = false);
		}

		prevScroll = currentScroll;
		
	}

});


$(document).ready((event) => {

	$(document).scrollTop(0);

	$('.nav p').on('click', (event) => {
		let ele = $(event.target);

		isScrolling = true;

		if(ele.hasClass('home')) {
			$('html, body').animate({scrollTop: 0}, scrollSpeed, () => isScrolling = false);
			setChild(nav.children('.home'));
		} else if (ele.hasClass('about')) {
			$('html, body').animate({scrollTop: homeEnd}, scrollSpeed, () => isScrolling = false);
			setChild(nav.children('.about'));
		}
		else if (ele.hasClass('projects')) {
			$('html, body').animate({scrollTop: aboutEnd}, scrollSpeed, () => isScrolling = false);
			setChild(nav.children('.projects'));
		} else {
			$('html, body').animate({scrollTop: projectsEnd}, scrollSpeed, () => isScrolling = false);
			setChild(nav.children('.contact'));
		}
	});
});