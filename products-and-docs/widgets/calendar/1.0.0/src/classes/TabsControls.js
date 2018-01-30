const ACTIVE_CLASS_NAME = 'active';
const TAB_SELECTOR = '.tb';
const TAB_PANEL_SELECTOR = '.tab';
const TABS_CONTAINER_SELECTOR = '.tabs';

export default class TabsControls {
	static toggleActiveClass({ tab, panel}, isActive) {
		const method = isActive ? 'add' : 'remove';
		tab.classList[method](ACTIVE_CLASS_NAME);
		panel.classList[method](ACTIVE_CLASS_NAME);
	}

	setActiveTab(index) {
		TabsControls.toggleActiveClass(this.tabsElements[this.activeTabIndex], false);
		TabsControls.toggleActiveClass(this.tabsElements[index], true);
		this.activeTabIndex = index;
	}

	addEventListenerForTabIndex(eventName, tabIndex, listener) {
		this.tabsElements[tabIndex].tab.addEventListener(eventName, listener);
	}

	constructor(rootElement) {
		const tabs = rootElement.querySelectorAll(TAB_SELECTOR);
		const tabPanels = rootElement.querySelectorAll(TAB_PANEL_SELECTOR);

		this.activeTabIndex = 0;
		this.tabsElements = Array.prototype.map.call(tabs, ((tab, idx) => ({ tab, panel: tabPanels[idx] })) );
		this.tabsContainer = rootElement.querySelectorAll(TABS_CONTAINER_SELECTOR);

		this.tabsElements.forEach((tabElements, idx) => {
			if (idx === this.activeTabIndex) TabsControls.toggleActiveClass(tabElements, true);

			tabElements.tab.addEventListener('click', (e) => {
				let index = Array.prototype.indexOf.call(this.tabsElements.map(tabElements => tabElements.tab), e.target);
				this.setActiveTab(index);
			});
		});
	}
}
