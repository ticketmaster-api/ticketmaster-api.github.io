export default class SelectorControls {

	constructor(root, selectorClass, selectorContent, attribute, update) {
		if (!root) return;
		this.SelectorRoot = root;
		this.SelectorClass = selectorClass;
		this.SelectorContent = selectorContent;
		this.SelectorContainer = document.createElement("div");
		this.SelectorContainer.classList.add(this.SelectorClass);
		this.SelectorContainer.innerHTML = this.SelectorContent;
		this.SelectorRoot.appendChild(this.SelectorContainer);

		this.selTitle = this.SelectorContainer.getElementsByTagName("span")[0];
		this.selContent = this.selTitle.nextElementSibling;

		this.selContent.addEventListener("click",function(e){
			if (e.target.classList.contains('selector-content') === false) {
				this.parentNode.getElementsByClassName('selector-title')[0].innerHTML = e.target.innerHTML;
				this.parentNode.getElementsByClassName('selector-title')[0].setAttribute("w-classificationid", e.target.getAttribute('w-classificationId'));
				this.parentNode.getElementsByClassName('selector-title')[0].classList.remove('open');
				this.parentNode.getElementsByClassName('selector-content')[0].classList.remove('show');
				if (attribute == 'period') this.parentNode.parentNode.parentNode.parentNode.setAttribute('w-period', e.target.getAttribute('w-period'));
				if (attribute == 'w-period') this.parentNode.parentNode.parentNode.parentNode.setAttribute('w-period-week', e.target.getAttribute('w-period-week'));
				if (attribute == 'classificationId') this.parentNode.parentNode.parentNode.parentNode.setAttribute('w-classificationId', e.target.getAttribute('w-classificationId'));

				/* Month fix by dates changing */
				if (this.parentNode.classList.contains('sliderLeftSelector') === true) {
					if (this.parentNode.nextElementSibling.querySelector('.selector-title').getAttribute('w-classificationid') != undefined) {
						if (this.parentNode.nextElementSibling.querySelector('.selector-title').getAttribute('w-classificationid') != this.parentNode.parentNode.parentNode.parentNode.getAttribute("w-classificationId")) {
							this.parentNode.parentNode.parentNode.parentNode.setAttribute("w-classificationId", this.parentNode.nextElementSibling.querySelector('.selector-title').getAttribute('w-classificationid'));
						}
					}
				}

				update();
			}
			else {
				console.log(this.classList);
				if (this.classList.contains("show")) {
					this.classList.remove("show");
					this.prevElementSibling.classList.remove("open");
				}
			}
		});

		this.selTitle.addEventListener("click",function(e){
			this.nextElementSibling.classList.add("show");
			if ( this.classList.contains("open") ) {
				this.classList.remove("open");
				this.nextElementSibling.classList.remove("show");
			}
			else {
				this.classList.add("open");
			}
			this.nextElementSibling.focus();
		},false);

		this.selContent.addEventListener("blur",function(e){
			var self = this;
			if (self.classList.contains("show")) {
				setTimeout(function () {
					self.classList.remove("show");
					self.previousElementSibling.classList.remove("open");
				}, 127);
			}
		},false);

	}

}
