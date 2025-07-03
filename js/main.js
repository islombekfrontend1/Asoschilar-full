document.addEventListener('DOMContentLoaded', function () {
	new Splide('.splide', {
		type: 'loop',
		perPage: 2,
		perMove: 1,
		autoplay: false,
		interval: 3000, // 3 seconds
		pauseOnHover: false,
		breakpoints: {
			1024: {
				perPage: 2,
			},
			640: {
				perPage: 1,
			},
		},
	}).mount();
});

function loadMoreTestimonials() {
	// Simulate loading more testimonials
	const button = document.querySelector('.show-more-btn');
	const originalText = button.innerHTML;

	button.innerHTML = 'Yuklanmoqda...';
	button.disabled = true;

	setTimeout(() => {
		// Here you would typically load more testimonials from an API
		alert("Ko'proq fikrlar yuklanmoqda...");
		button.innerHTML = originalText;
		button.disabled = false;
	}, 1500);
}

// Add scroll animation
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('animate-in');
		}
	});
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
	const cards = document.querySelectorAll('.testimonial-card');
	cards.forEach(card => {
		observer.observe(card);
	});
});

document.addEventListener('DOMContentLoaded', function () {
	const phoneInput = document.getElementById('phone');

	// Telefon raqam inputiga boshlang'ich qiymat va stil berish
	phoneInput.value = '+998 ';
	phoneInput.classList.add('phone-input-default');

	// Input fokus bo'lganda kursorni oxiriga qo'yish
	phoneInput.addEventListener('focus', function (e) {
		if (this.value.length <= 5) {
			this.value = '+998 ';
		}
		// Kursorni oxiriga qo'yish
		setTimeout(() => {
			this.selectionStart = this.selectionEnd = this.value.length;
		}, 0);
	});

	// Faqat raqam kiritish va formatlash
	phoneInput.addEventListener('input', function (e) {
		// Joriy pozitsiyani saqlash
		const cursorPosition = this.selectionStart;

		// Faqat raqamlarni qoldirish (+ belgisi bilan)
		let value = this.value.replace(/[^\d+]/g, '');

		// +998 prefiksini saqlash
		if (!value.startsWith('+998')) {
			value = '+998' + value.substring(value.startsWith('+') ? 1 : 0);
		}

		// Raqamni formatlash: +998 XX XXX XX XX
		let formattedValue = '';
		for (let i = 0; i < value.length; i++) {
			if (i === 0) formattedValue += value[i]; // +
			else if (i === 1) formattedValue += value[i]; // 9
			else if (i === 2) formattedValue += value[i]; // 9
			else if (i === 3) formattedValue += value[i]; // 8
			else if (i === 4) formattedValue += ' ' + value[i]; // bo'sh joy + XX
			else if (i === 6) formattedValue += ' ' + value[i]; // bo'sh joy + XXX
			else if (i === 9) formattedValue += ' ' + value[i]; // bo'sh joy + XX
			else if (i === 11) formattedValue += ' ' + value[i]; // bo'sh joy + XX
			else formattedValue += value[i];
		}

		// Maksimal uzunlikni tekshirish (formatlangan holda +998 XX XXX XX XX = 17 belgi)
		if (formattedValue.length > 17) {
			formattedValue = formattedValue.substring(0, 17);
		}

		// Yangi qiymatni o'rnatish
		this.value = formattedValue;

		// Rang o'zgartirish: agar faqat +998 bo'lsa kulrang, aks holda qora
		if (formattedValue.length > 5) {
			this.classList.remove('phone-input-default');
			this.classList.add('phone-input-filled');
		} else {
			this.classList.remove('phone-input-filled');
			this.classList.add('phone-input-default');
		}

		// Kursorni to'g'ri pozitsiyaga qaytarish
		// Bo'sh joy qo'shilganda kursorni bir pozitsiya oldinga surish
		const addedSpaces = formattedValue.substring(0, cursorPosition).split(' ').length - 1;
		const originalSpaces = value.substring(0, cursorPosition).split(' ').length - 1;
		const spaceDiff = addedSpaces - originalSpaces;

		this.selectionStart = this.selectionEnd = Math.min(cursorPosition + spaceDiff, formattedValue.length);
	});

	// Backspace va Delete tugmalarini to'g'ri ishlashi
	phoneInput.addEventListener('keydown', function (e) {
		// Backspace tugmasi bosilganda
		if (e.key === 'Backspace') {
			const cursorPosition = this.selectionStart;

			// +998 prefiksini o'chirmaslik
			if (cursorPosition <= 5) {
				e.preventDefault();
				this.selectionStart = this.selectionEnd = 5;
			}

			// Bo'sh joy oldida turgan bo'lsa, ikkita belgi o'chirish (bo'sh joy va raqam)
			else if (this.value.charAt(cursorPosition - 1) === ' ') {
				e.preventDefault();
				const newValue = this.value.substring(0, cursorPosition - 2) + this.value.substring(cursorPosition);
				this.value = newValue;
				this.selectionStart = this.selectionEnd = cursorPosition - 2;

				// Rang o'zgartirish: agar faqat +998 bo'lsa kulrang, aks holda qora
				if (newValue.length <= 5) {
					this.classList.remove('phone-input-filled');
					this.classList.add('phone-input-default');
				}
			}
		}
	});

	// Formani yuborishdan oldin validatsiya
	const form = document.querySelector('form');
	form.addEventListener('submit', function (e) {
		// Telefon raqam to'liq kiritilganligini tekshirish
		if (phoneInput.value.length < 17) {
			e.preventDefault();
			alert("Iltimos, to'liq telefon raqamni kiriting");
			phoneInput.focus();
		}
	});
});
