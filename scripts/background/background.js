
var Bullet_Items = '';
var Brand = '';
var MPN = '';
var employeeID = '';
var itemLocation = '';
var customLabel = '';

function formFill(info, tab) {

chrome.tabs.query({
        "active": true,
        "currentWindow": true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            "functiontoInvoke": "formFill",
			"Bullet_Items": Bullet_Items, 
			"Brand": Brand, 
			"MPN": MPN, 
			"employeeID": employeeID,
			"itemLocation": itemLocation
        });
    });

}

function setCustomLabel(info, tab) {

chrome.tabs.query({
        "active": true,
        "currentWindow": true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id , {
            "functiontoInvoke": "setCustomLabel", "data": customLabel
        });
    });

}

function setPrintCustomLabel(info, tab) {

chrome.tabs.query({
        "active": true,
        "currentWindow": true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            "functiontoInvoke": "setPrintCustomLabel"
        });
    });

}

									  
function setItemLocation(info,tab) {
var tmpInput = prompt("Enter your items location", "Enter your items location");
	if(tmpInput != null){
		itemLocation = tmpInput;
	}	
}

function setEmployeeId(info,tab) {
	var tmpInput = prompt("Enter your employee ID", "Enter your employee ID");
	if(tmpInput != null){
		employeeID = tmpInput;
	}
}



chrome.commands.onCommand.addListener(function(command) {
        if(command === "EXEC_formFill")
        {
            formFill();
        }
            
      });
