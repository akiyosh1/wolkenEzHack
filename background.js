//refresh the page every minutes

//wolken-button-md wolken-icon-button-square mat-icon-button mat-button-base mat-primary ng-star-inserted


//Submenu
// Parent item
// Create the custom context menu item
browser.menus.create({
    id: "vmware-kb-search",
    title: "Search VMware KB",
    contexts: ["selection"]
});

// Handle clicks on the custom menu item
browser.menus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "vmware-kb-search") {
        const searchText = info.selectionText;
        const searchUrl = `https://ikb.vmware.com/s/global-search/%40uri#q=${encodeURIComponent(searchText)}&sort=relevancy`;
        browser.tabs.create({ url: searchUrl });
    }
});