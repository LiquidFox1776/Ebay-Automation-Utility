var formFill = function (Bullet_Items, Brand, MPN, employeeID, itemLocation) {

// Fill the form *************************************************************************************************
if(document.getElementById('upc') != null)
    document.getElementById('upc').value = "Does Not Apply";

setTimeout( function() { setItemSpecifics(["Brand"], Brand); },50);
setTimeout( function() { setItemSpecifics(["MPN","Manufacturer Part Number"], MPN); },50);
setTimeout( function() { setDescription(Bullet_Items, employeeID, itemLocation,MPN, Brand); }, 50); //The timeout is necessary for the asynchronous call	
openPictureDialog();

}
//******************************************************************************************************************

function setCustomLabel (d)
	{
		if(d){
e = document.getElementById("editpane_skuNumber");
if(e){


labelXml = '<?xml version="1.0" encoding="utf-8"?>\
<ContinuousLabel Version="8.0" Units="twips">\
	<PaperOrientation>Landscape</PaperOrientation>\
	<Id>Tape12mm</Id>\
	<PaperName>12mm</PaperName>\
	<LengthMode>Auto</LengthMode>\
	<LabelLength>0</LabelLength>\
	<RootCell>\
		<TextObject>\
			<Name>TEXT</Name>\
			<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
			<BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
			<LinkedObjectName />\
			<Rotation>Rotation0</Rotation>\
			<IsMirrored>False</IsMirrored>\
			<IsVariable>True</IsVariable>\
			<GroupID>-1</GroupID>\
			<IsOutlined>False</IsOutlined>\
			<HorizontalAlignment>Left</HorizontalAlignment>\
			<VerticalAlignment>Middle</VerticalAlignment>\
			<TextFitMode>ShrinkToFit</TextFitMode>\
			<UseFullFontHeight>True</UseFullFontHeight>\
			<Verticalized>False</Verticalized>\
			<StyledText>\
				<Element>\
					<String xml:space="preserve">Text</String>\
					<Attributes>\
						<Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" />\
						<ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />\
					</Attributes>\
				</Element>\
			</StyledText>\
		</TextObject>\
		<Length>0</Length>\
		<LengthMode>Auto</LengthMode>\
		<BorderWidth>0</BorderWidth>\
		<BorderStyle>Solid</BorderStyle>\
		<BorderColor Alpha="255" Red="0" Green="0" Blue="0" />\
	</RootCell>\
</ContinuousLabel>';


var label = dymo.label.framework.openLabelXml(labelXml);
label.setObjectText("TEXT", d);

var printers = dymo.label.framework.getPrinters();
if (printers.length == 0)
    throw "No DYMO printers are installed. Install DYMO printers.";

var printerName = "";
for (var i = 0; i < printers.length; ++i)
{
    var printer = printers[i];
    
    
        printerName = printer.name;
       
    
}

e = document.getElementById("editpane_skuNumber");
e.value = d;

label.print(printerName);


}
		}
	}
	
function setPrintCustomLabel()
	{
	}
	
	
var tmpitemCondition = '';
//Get the item condition
var getItemCondition = function(){
var e;
var r;

e = document.getElementById("itemCondition");
r = e.options[e.selectedIndex].text.toLowerCase();

if(r == "new other (see details)")
{
	r = "new"
}
else if(r=="for parts or not working")
{
r = "for parts";	
}

return r;
}


var openPictureDialog = function(){
	var e;
e = document.getElementById('upl-fileInp');	
if(e != null)
{
	e.click();
}
}

var setItemSpecifics = function(ID_Name, Info){
	for(i=0;i<ID_Name.length;++i)
	{
	e = document.getElementById("Listing.Item.ItemSpecific[" + ID_Name[i] +"]"); // Ebay does not have a consistent format, element could follow this form or "_st_" + ID_Name[i]
	if(e != null)
	{
		e.value = Info;
	}
	
	e = document.getElementById("_st_" + ID_Name[i]); 
	if(e != null)
	{
		e.value = Info
	}
	}
}

chrome.extension.onMessage.addListener(function (message, sender, callback) {
    if (message.functiontoInvoke == "formFill") {
        formFill(message.Bullet_Items, message.Brand, message.MPN, message.employeeID, message.itemLocation);
    }
    if (message.functiontoInvoke == "RemoveLinks") {
        removeLinks();
    }
	
	if (message.functiontoInvoke == "setCustomLabel") {
		if(message.data)
		{
        setCustomLabel(message.data);
		}
    }
	
	if (message.functiontoInvoke == "setPrintCustomLabel") {
		
    }
});

/*
Set bullet items
*/
var setBullets = function(Bullet_Items){
	var tmpBullet_Items = Bullet_Items.split("\n");
	var i=0;
	var blist ='';
	
if(Bullet_Items)
{
blist = "<ul>";
for(i = 0; i<tmpBullet_Items.length;++i)
{
blist = blist + "<li>" + newLine(tmpBullet_Items[i]) + "</li>";	
}	

blist = blist + "</ul>";
}

return blist;
}


function getLabel(tmpMPN, tmpBrand){
	var tmpLabel = '';
	
	if(tmpMPN != null && tmpBrand != null)
	{
		tmpLabel = tmpBrand + tmpMPN;
		return tmpLabel.replace(/\s/g,'-');
	}
	else{
	return ' ';
	}
}

/*
Attempts to find and set the description text for a listing
*/

var setDescription = function(Bullet_Items, employeeID, itemLocation, MPN, Brand){
	
var legal = getLegal();


var itm = document.getElementsByClassName('ifrmc'); // Find the iframe for the description area
var itm2 = itm[0].childNodes; // get child nodes
doc = document.getElementById(itm2[0].getAttribute('id')); //set doc as the description text area
var item_title = getTitle();

if(doc.title === "Standard" ){ // if true then we have found the ebay description text area
doc.contentDocument.body.innerHTML = '<meta name="viewport" content="width=device-width, initial-scale=1.0">' + newLine(itemLocation + "-" + employeeID + "-" + getLabel(MPN, Brand)) + "<br>" + newLine("The item you are bidding on is a " + item_title) + newLine("The item is " + getItemCondition() + " in an opened package. Package is damaged, this does not affect the item.") + '<br></font></div>' + setBullets(Bullet_Items) + '<br>' + legal;

}
}

//creates a new line in ebays text editor
var newLine=function(t){
var tmpB = "<div><font face =\"Arial\" size=\"2\">"; //begin text
var tmpE = "</font></div>";//end text

return tmpB + t + tmpE;
}


//gets the items title
function getTitle(){
	if(document.getElementById('editpane_title').value)
		return document.getElementById('editpane_title').value;
	else
		return '';
}

//returns the legal text
function getLegal(){
	return `TERMS AND CONDITIONS PLACEHOLDER TEXT`;
}
