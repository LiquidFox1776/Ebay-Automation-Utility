/* 
***********************************
		SETUP CONTEXT MENU 
***********************************
*/


var parent = chrome.contextMenus.create({"title": "Fill Form(Ctrl+Shift+W)", "contexts":["page"],
                                       "onclick": formFill});
									   
var parent = chrome.contextMenus.create({"title": "Set", "contexts":["page"]});
									   
 var tmpChild = chrome.contextMenus.create(
  {"title": "Employee ID", contexts:["page"], "parentId": parent, "onclick": setEmployeeId}); 
  
  var tmpChild = chrome.contextMenus.create(
  {"title": "Item Location", contexts:["page"], "parentId": parent, "onclick": setItemLocation});
  
//Create Set Menu

  
 var parent = chrome.contextMenus.create(
 {"title": "Set As", 
 contexts:["selection"]}); 
 
 var tmpChild = chrome.contextMenus.create(
  {"title": "Brand", contexts:["selection"], "parentId": parent, onclick: function(info, tab) {
      Brand = info.selectionText ;
  } });
  
  var tmpChild = chrome.contextMenus.create(
  {"title": "MPN", contexts:["selection"], "parentId": parent, onclick: function(info, tab) {
      MPN = info.selectionText ;
  } });
  
  var tmpChild = chrome.contextMenus.create(
  {"title": "Bullet Items", contexts:["selection"], "parentId": parent,onclick: function(info, tab) {
      Bullet_Items = info.selectionText ;
  } });
  
   
   //******************************************
   //Custom Label Menu
   //******************************************
   var parent = chrome.contextMenus.create(
 {"title": "Custom Label", 
 contexts:["selection"]}); 
 
  var tmpChild = chrome.contextMenus.create(
  {"title": "Set Custom Label", contexts:["selection"], "parentId": parent, onclick: function(info, tab) {
      customLabel = info.selectionText ;
	  setCustomLabel(info, tab);
  } });
  
  var tmpChild = chrome.contextMenus.create(
  {"title": "Set/Print Custom Label", contexts:["selection"],  "parentId": parent, "onclick": setPrintCustomLabel });

 
 //*********************************************
 //END CUSTOM LABEL MENU
 //*********************************************


 //Create Search menu
  function sendSearch(selectedText) {
 var serviceCall = 'http://www.amazon.com/s/?url=field-keywords=' + selectedText;
 chrome.tabs.create({url: serviceCall});

var serviceCall = 'http://www.ebay.com/sch/' + selectedText;
 chrome.tabs.create({url: serviceCall});
}

chrome.contextMenus.create(
 {
  title: "Find '%s' on Amazon and Ebay", 
  contexts:["selection"], 
  onclick: function(info, tab) {
      sendSearch(info.selectionText);
  }
 });