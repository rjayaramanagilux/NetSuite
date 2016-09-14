/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       05 May 2015     Rey Jayaraman 
 *
 */




var regularfields =[], addregularfields=[], deleteregularfields=[];

var recordfields={'custpage_main_sortorder_line':'custrecord_main_sortorder',
'custpage_optional_sortorder_line':'custrecord_optional_sort_order',
'custpage_additional_charge_line':'custrecord_additional_charge',
'custpage_service_description_line':'custrecord_ss_service_description',
'custpage_range_start_line':'custrecord_ss_range_start',
'custpage_range_end_line':'custrecord_ss_range_end',
'custpage_price_line':'custrecord_ss_price',
'custpage_sales_unit_type_line':'custrecord_ss_sales_unit_type',
'custpage_master_study_quantity_line':'custrecord_master_study_quantity',
'custpage_sales_unit_description_line':'custrecord_ss_unit_description',
'custpage_optional_service_description_line':'custrecord_ss_optional_service_decriptio'
};




function resetSublist(){
	if(nlapiGetContext().getEnvironment()=='SANDBOX'){
	window.open(SANDBOX_SUITELET_URL), '_self';
	}
	else{
		window.open(PROD_SUITELET_URL), '_self';
	}
}


function AddStyle(cssLink, pos) 
{ 
    var tag = document.getElementsByTagName(pos)[0]; 
    var addLink = document.createElement('link'); 
    addLink.setAttribute('type', 'text/css'); 
    addLink.setAttribute('rel', 'stylesheet'); 
    addLink.setAttribute('href', cssLink); 
    tag.appendChild(addLink); 
}
	

function lineInit(type){
	
	AddJavascript('body');
	
	if(nlapiGetContext().getEnvironment()=='SANDBOX'){
	//AddStyle('https://system.sandbox.netsuite.com/core/media/media.nl?id=141481&c=3921476&h=36ce45f0b596524bcb1a&_xt=.css','head');//popup.css
	AddStyle('https://system.sandbox.netsuite.com/core/media/media.nl?id=175177&c=3921476&h=dc8101a772fcad65a50c&_xt=.css','head');//popup.css
	
	} else{
		AddStyle('https://system.na1.netsuite.com/core/media/media.nl?id=175177&c=3921476&h=dc8101a772fcad65a50c&_xt=.css','head');//popup.css
	}
	

	var arrClick=['custpage_updatepricing','custpage_addpricing','custpage_deletepricing','custpage_template'];
	
	
	for(var ij=0;ij<arrClick.length;ij++){
	
	jQuery('#'+arrClick[ij]+'txt').click(function(){
		var id = jQuery(this).attr('id');
		var arrValue={'custpage_updatepricingtxt':'update','custpage_addpricingtxt':'add','custpage_deletepricingtxt':'delete','custpage_templatetxt':'template'};
		if(arrValue[id]=='update'){
			jQuery("input[name$='submitter']").val("Update Pricing");
			//jQuery( "button, input[type='button']" ).val("Update Pricing");	
		}else if(arrValue[id]=='add'){
			jQuery("input[name$='submitter']").val("Add Pricing");
			//jQuery( "button, input[type='button']" ).val("Add Pricing");	
		}else if(arrValue[id]=='delete'){
			jQuery("input[name$='submitter']").val("Delete Pricing");
			//jQuery( "button, input[type='button']" ).val("Delete Pricing");	
		}
		else if(arrValue[id]=='template'){
			jQuery("input[name$='submitter']").val("Apply Template");
		
		}
		
	nlapiSetFieldValue('custpage_view',arrValue[id]);
	
});
}
	
	if(nlapiGetFieldValue('custpage_view')=='update'){
		if (NS.form.isInited() && NS.form.isValid()) {ShowTab("custpage_updatepricing",true);
		//jQuery( "button, input[type='button']" ).val("Update Pricing");
		jQuery("input[name$='submitter']").val("Update Pricing");
		
		}
		//jQuery('#custpage_studytaskfr_splits').focus();
	}
	else if(nlapiGetFieldValue('custpage_view')=='add'){
		if (NS.form.isInited() && NS.form.isValid()) {ShowTab("custpage_addpricing",true);
		//jQuery( "button, input[type='button']" ).val("Add Pricing");
		jQuery("input[name$='submitter']").val("Add Pricing");
		
		}
		//jQuery('#custpage_studytaskfr_splits').focus();
	}
	else if(nlapiGetFieldValue('custpage_view')=='delete'){
		if (NS.form.isInited() && NS.form.isValid()) {ShowTab("custpage_deletepricing",true);
		//jQuery( "button, input[type='button']" ).val("Delete Pricing");
		jQuery("input[name$='submitter']").val("Delete Pricing");
		
		}
		//jQuery('#custpage_studytaskfr_splits').focus();
	}
	else if(nlapiGetFieldValue('custpage_view')=='template'){
		if (NS.form.isInited() && NS.form.isValid()) {ShowTab("custpage_template",true);
		jQuery("input[name$='submitter']").val("Apply Template");
		
		}
		
	}
		
		
	
	
	var billingrole=nlapiGetFieldValue('custpage_billingrole');
	billingrole=(billingrole.indexOf(",")>0) ? billingrole.split(","): billingrole;
	var role=nlapiGetRole().toString();
	var dept=nlapiGetDepartment();
	var bool=jQuery.inArray( role, billingrole );
	var arr1=[];
		var itemCount = nlapiGetLineItemCount('custpage_pricing'); 
		for ( var i = 1; i <= itemCount; i++) 
		{   
			//alert(role);
			//verify whether the item is manual pricing 
			if(bool >=0 || role==billingrole){
			nlapiSetLineItemDisabled('custpage_pricing','custpage_range_start_line',false,i);
			nlapiSetLineItemDisabled('custpage_pricing','custpage_range_end_line',false,i);
			nlapiSetLineItemDisabled('custpage_pricing','custpage_price_line',false,i);
			nlapiSetLineItemDisabled('custpage_pricing','custpage_sales_unit_type_line',false,i);
			
			}
			//alert(nlapiGetLineItemValue('custpage_pricing','custpage_additional_charge_line',i));
			if(nlapiGetLineItemValue('custpage_pricing','custpage_additional_charge_line',i) !=3){
				//nlapiSetLineItemDisabled('custpage_pricing','custpage_optional_service_description_line',false,i);
				jQuery('textarea[name="custpage_optional_service_description_line'+ i+'"]').hide();
			}
			
			jQuery( 'textarea[name="custpage_service_description_line'+ i+'"]' ).keypress(function() {
				    // If the user has pressed enter
				    if (window.event.keyCode === 13) {
				        this.value =this.value + "\n";
				        return true;
				    }
				    else {
				        return true;
				    }
				});
			jQuery( 'textarea[name="custpage_optional_service_description_line'+ i+'"]' ).keypress(function() {
			    // If the user has pressed enter
			    if (window.event.keyCode === 13) {
			        this.value =this.value + "\n";
			        return true;
			    }
			    else {
			        return true;
			    }
			});
		
		        
		}
	

}

function buttonPress_updatecompound(recID){
	if(nlapiLookupField('projecttask',recID, 'custevent_study_task_line_mgr_approved')=='T'){
		 alert('Record is locked');
		 
	 }
	else{
		var w =626;
		var h = 536;
		//var left = (window.screen.width/4)-(w/4);
		//var top = (window.screen.height/2)-(h/2);
		if(nlapiGetContext().getEnvironment()=='SANDBOX'){
		var url='https://system.sandbox.netsuite.com/app/site/hosting/scriptlet.nl?script=183&deploy=1&recID=' + recID;
		}
		else if(nlapiGetContext().getEnvironment()=='BETA'){
		var url='https://system.beta.netsuite.com/app/site/hosting/scriptlet.nl?script=183&deploy=1&recID=' + recID;
		}
		else{
			var url='https://system.na1.netsuite.com/app/site/hosting/scriptlet.nl?script=183&deploy=1&recID=' + recID;
				
		}
		var win =window.open(url,'_blank','width=526,height=436');
		win.moveTo(800, 200);
	}
}

function buttonPress_deleteRecord(recID){
	
		var msg= confirm("Are you sure you want to delete this record?");
		if(msg== true){
		
			nlapiDeleteRecord('customrecord_study_specific_pricing',recID);
			window.location.href= document.URL;
		}
		else{
			alert("Record is not deleted!");
		}
}


function buttonPress_Close(){
	self.close();
	if (window.opener && !window.opener.closed){window.opener.location.href=window.opener.location.href;} 

}



function buttonPress_deleteTemplateRecord(recID){
	
	var msg= confirm("Are you sure you want to delete this record?");
	if(msg== true){
	     //Delete Subrecods
		
		//alert(recID);
		var filters = [];
		filters.push(new nlobjSearchFilter( "custrecord_study_pricing_template_id",null,'is',recID));	
		
		var columns = [];
		columns.push(new nlobjSearchColumn("internalid",null,null));
			
		var results = nlapiSearchRecord('customrecord_study_pricing_template_list', null, filters, columns);
		
		for(var i=0;i<results.length;i++){
			nlapiDeleteRecord('customrecord_study_pricing_template_list',results[i].getId());
		}
		
		
		nlapiDeleteRecord('customrecord_study_pricing_template',recID);
	
		
		
		
		var url;
	 	var bool =false;
	 	if(nlapiGetContext().getEnvironment()=='SANDBOX'){
	 		//	alert(JSON.stringify(tasktypefields) );
	 			 url='https://system.sandbox.netsuite.com/app/site/hosting/scriptlet.nl?script=313&deploy=1';
	 		}
		else if(nlapiGetContext().getEnvironment()=='BETA'){
	 		//	alert(JSON.stringify(tasktypefields) );
	 			 url='https://system.beta.netsuite.com/app/site/hosting/scriptlet.nl?script=313&deploy=1';
	 		}else{
	 			 url='https://system.na1.netsuite.com/app/site/hosting/scriptlet.nl?script=313&deploy=1';
	 			
	 		}	
	 	
	 	
	 	for(var j=0;j<filterFields.length;j++){
	 		var fieldValue = nlapiGetFieldValue(filterFields[j]);
	 		if( filterFields[j]=='custpage_temp_recid'){
	 			url +=	'&recid=' + fieldValue;
	 			bool=true;
	 			
	 		}
	 		else if( filterFields[j]=='custpage_temp_rectype'){
	 			url +=	'&rectype=' + fieldValue;
	 			bool=true;
	 		}
	 		else if (fieldValue != '' && fieldValue != null &&  fieldValue != 0) {
	 			url +=	'&'  + filterFields[j] + '=' + fieldValue;
	 			bool=true;
	 		}
	 	
	 	}
	 	
	 	if(bool==true){
	 		window.open(url, '_self','');
	 		
	 	}
	 	
	}
	else{
		alert("Record is not deleted!");
	}
}


function buttonPress_deleteRecordsublist(recid){
	
	if(recid != undefined && recid !='' && recid != null){
		
			try{
				
					var msg= confirm("Are you sure you want to delete the record(s)?");
					if(msg== true){
				var itemCount = nlapiGetLineItemCount('custpage_taskdelete'); 
				var count =0;
				for ( var i = 1; i <= itemCount; i++) 
				{  
					if(nlapiGetLineItemValue('custpage_taskdelete', 'custpage_updatecheckbox_line', i)=='T'){
						if(nlapiGetLineItemValue('custpage_taskdelete', 'custpage_task_type_linemanager_line', i)=='T'){
							 alert('Cannot Delete this Record,'+ nlapiGetLineItemValue('custpage_taskdelete', 'custpage_tasktype_line', i) +'  Record is locked');
						}
						else{
							nlapiDeleteRecord('projecttask',nlapiGetLineItemValue('custpage_taskdelete', 'custpage_internalid_line',i));
						}
					}
					
				}//End of For Line count
				
				window.location.href=window.location.href;
				
					}
					else{
						alert("Record(s) not deleted!");
					}
				
			}
			catch(err){
				alert(err.message);
				nlapiLogExecution('DEBUG', 'err',err.message);
			}
	}
}


function handleResponse(response)
{
	window.location.href= document.URL;
}

function findSortOrder(recid){
	var filters = [];
	filters.push(new nlobjSearchFilter('company', null, 'is', recid));//studyid filter
	
	
	var columns=[];
	columns[0] = new nlobjSearchColumn('id',null,'max');
	
	var results = nlapiSearchRecord('projecttask', null, filters, columns);
	if(results != null){
	return results[0].getValue(columns[0]);
	}
	
}
function getStudyAssociatedCompounds(recid){
	var filters = [];
	filters.push(new nlobjSearchFilter('custrecord_compound_study', null, 'is', recid));//studyid filter
	
	var searchCompound = nlapiLoadSearch('customrecord_associated_study_compound', 'customsearch_associated_compound');
	var columns=[];
	
	columns=searchCompound.getColumns();
	
	var results = nlapiSearchRecord('customrecord_associated_study_compound', null, filters, columns);
	var retresults=[];
	var i=0;
	for (result in results){
	retresults[i]=results[result].getValue(columns[1])	;
	i +=1;
	}
	return retresults;
	
}

/**
 * 
 * @param type
 * @param name
 * @param linenum
 */
function fieldChanged_RefreshSublist(type, name, linenum){
var str='' ;
var view=nlapiGetFieldValue('custpage_view');
	
	if(view =='' || view=='update'){

		if (name.indexOf('_line') ) {
				var lineCount = nlapiGetLineItemCount('custpage_pricing');
				if (lineCount != '' && lineCount != null) {
					nlapiSetLineItemValue('custpage_pricing', 'custpage_updatecheckbox_line', linenum, 'T');
					if(nlapiGetFieldValue( 'custpage_regularfields') != null){
						
						if(name=='custpage_service_description_line'){
							//alert(jQuery( 'textarea[name="custpage_service_description_line'+ linenum+'"]' ).val());
							regularfields.push({uifieldname:name,fieldname:recordfields[name],value:jQuery( 'textarea[name="custpage_service_description_line'+ linenum+'"]' ).val(),id:nlapiGetLineItemValue(type, 'custpage_internalid_line', linenum)});
							
						}
						else{
							regularfields.push({uifieldname:name,fieldname:recordfields[name],value:nlapiGetLineItemValue(type, name, linenum),id:nlapiGetLineItemValue(type, 'custpage_internalid_line', linenum)});
								
						}
						nlapiSetFieldValue('custpage_regularfields', JSON.stringify(regularfields));
						
						
					}
					
					jQuery('textarea[name="custpage_optional_service_description_line'+ linenum+'"]').hide();
					
					if(nlapiGetLineItemValue('custpage_pricing','custpage_additional_charge_line',linenum) ==3){//Additional charge Both
						//nlapiSetLineItemDisabled('custpage_pricing','custpage_optional_service_description_line',false,i);
						jQuery('textarea[name="custpage_optional_service_description_line'+ linenum+'"]').show();
					}
					else if(nlapiGetLineItemValue('custpage_pricing','custpage_optional_service_description_line',linenum) !=' ' &&  nlapiGetLineItemValue('custpage_pricing','custpage_optional_service_description_line',linenum) != null && nlapiGetLineItemValue('custpage_pricing','custpage_optional_service_description_line',linenum) !=''){
						alert(nlapiGetLineItemValue('custpage_pricing','custpage_optional_service_description_line',linenum));
						
						jQuery('textarea[name="custpage_optional_service_description_line'+ linenum+'"]').val('');
						nlapiSetLineItemValue('custpage_pricing', 'custpage_updatecheckbox_line', linenum, 'T');
						if(nlapiGetFieldValue( 'custpage_regularfields') != null && nlapiGetLineItemValue('custpage_pricing','custpage_optional_service_description_line',linenum) !=''){
							regularfields.push({uifieldname:'custpage_optional_service_description_line',fieldname:recordfields['custpage_optional_service_description_line'],value:'',id:nlapiGetLineItemValue(type, 'custpage_internalid_line', linenum)});
							nlapiSetFieldValue('custpage_regularfields', JSON.stringify(regularfields));
							
						}
					
						jQuery('textarea[name="custpage_optional_service_description_line'+ linenum+'"]').hide();
					}
				       
				}
				
				
			}
			
		if(name=='custpage_master_study_quantity_line' || name=='custpage_sales_unit_type_line'|| name=='custpage_range_start_line'||name=='custpage_range_end_line' || 
				name=='custpage_price_line' ){
			
			//Do the Extended Price Calculation
			var extendedPrice = getValue(nlapiGetLineItemValue('custpage_pricing', 'custpage_master_study_quantity_line', linenum)) + getValue(nlapiGetLineItemValue('custpage_task', 'custpage_urine_quantity_line', linenum))  + getValue(nlapiGetLineItemValue('custpage_task', 'custpage_df_quantity_line', linenum))
			+ getValue(nlapiGetLineItemValue('custpage_task', 'custpage_tissue_quantity_line', linenum))  + getValue(nlapiGetLineItemValue('custpage_task', 'custpage_other_quantity_line', linenum)) ;
			
			if(extendedPrice != null && extendedPrice !='' && extendedPrice != undefined){
			nlapiSetLineItemValue('custpage_pricing', 'custpage_extended_price_line', linenum,extendedPrice);
			}
		}
		
		
	
	}
	
	if(name=='custpage_serviceline_add' ){ //||  name=='custpage_species_rga_sda'
		//refreshSublist(name);
		//populate Species 

		var clientid= nlapiLookupField('job',nlapiGetFieldValue('custpage_temp_recid'),'custentity_study_company_name' );
		
		var search =  getSpeciesCount(nlapiGetFieldValue(name),clientid);//nlapiSearchRecord('customrecord_department_specific_code', null, [new nlobjSearchFilter('custrecord_dept_spec_code_service_line', null, 'is', parameters[0])], [new nlobjSearchColumn('internalid'),new nlobjSearchColumn('name')]);
		
		if(search == null || search =='' || search == undefined ){
        	  alert("Client Pricing is not available, Please roll down the client pricing for " + nlapiGetFieldText(name) + " before continue this process!");
         }
		
		
	}
	
	
}

function getSpeciesCount(serviceline,client) {
	var filters = [];

	if (serviceline != null && serviceline != '') {
		filters.push(new nlobjSearchFilter('custrecord_cs_pricing_service_line', null, 'is',serviceline));
		
	}
	
	if (client!= null && client != '') {
		filters.push(new nlobjSearchFilter('custrecord_client', null, 'is',client));
		
	}
	
	var columns = [];
		
			columns.push(new nlobjSearchColumn('custrecord_cs_pricg_species_rga_sda',null,'group'));
		

	// Columns used for the sublist
		var results = nlapiSearchRecord('customrecord_client_specific_pricing', null, filters, columns);

	return results;

}

 function getValue(qty){
	if(qty !='' && qty != null && qty != undefined ){   
	return parseInt(qty);
	}
	else{
		return 0;	
	}
	
	}
 var filterFields=[ 'custpage_temp_recid','custpage_temp_rectype','custpage_serviceline_add',
                   'custpage_species_rga_sda',
                  'custpage_view','custpage_sort'];


 function clearAll(){
		
		var url;
		
		if(nlapiGetContext().getEnvironment()=='SANDBOX'){
	 		//	alert(JSON.stringify(tasktypefields) );
	 			 url='https://system.sandbox.netsuite.com/app/site/hosting/scriptlet.nl?script=313&deploy=1';
	 		}
	 	else if(nlapiGetContext().getEnvironment()=='BETA'){
	 		//	alert(JSON.stringify(tasktypefields) );
	 			 url='https://system.beta.netsuite.com/app/site/hosting/scriptlet.nl?script=313&deploy=1';
	 		}
	    else{
	 			 url='https://system.na1.netsuite.com/app/site/hosting/scriptlet.nl?script=313&deploy=1';
	 			
	 		}	
	 	
		
		var fieldValue = nlapiGetFieldValue('custpage_view');
		var recId= nlapiGetFieldValue('custpage_temp_recid');
		 var recType= nlapiGetFieldValue('custpage_temp_rectype');
		 if(recId != null && recId !=''){url +=	'&recid=' + recId;}
		 if(recType != null && recType !=''){
 			url +=	'&rectype=' + recType;
 		}
		if (fieldValue != '' && fieldValue != null ) {
			url +=	'&custpage_view' + '=' + fieldValue;
			
		}
		
		
		window.location.href=url;
		//window.open(url), '_self';
	}

 
 function refreshSublist(name) {
 	
 	var url;
 	var bool =false;
 	if(nlapiGetContext().getEnvironment()=='SANDBOX'){
 		//	alert(JSON.stringify(tasktypefields) );
 			 url='https://system.sandbox.netsuite.com/app/site/hosting/scriptlet.nl?script=313&deploy=1';
 		}
	 else if(nlapiGetContext().getEnvironment()=='BETA'){
 		//	alert(JSON.stringify(tasktypefields) );
 			 url='https://system.beta.netsuite.com/app/site/hosting/scriptlet.nl?script=313&deploy=1';
 		}
	 else{
 			 url='https://system.na1.netsuite.com/app/site/hosting/scriptlet.nl?script=313&deploy=1';
 			
 		}	
 	
 	for(var j=0;j<filterFields.length;j++){
 		var fieldValue = nlapiGetFieldValue(filterFields[j]);
 		if( filterFields[j]=='custpage_temp_recid'){
 			url +=	'&recid=' + fieldValue;
 			bool=true;
 			
 		}
 		else if( filterFields[j]=='custpage_temp_rectype'){
 			url +=	'&rectype=' + fieldValue;
 			bool=true;
 		}
 		else if (fieldValue != '' && fieldValue != null &&  fieldValue != 0) {
 			url +=	'&'  + filterFields[j] + '=' + fieldValue;
 			bool=true;
 		}
 	
 	}
 	
 	if(bool==true){
 		window.open(url, '_self','true');
 		
 	}
 	else{
 		alert("Please enter the criteria to search!");
 	}
 	
 }
 
 function sortSublist(name) {
	 	
	 	var url;
	 	var bool =false;
	 	if(nlapiGetContext().getEnvironment()=='SANDBOX'){
	 		//	alert(JSON.stringify(tasktypefields) );
	 			 url='https://system.sandbox.netsuite.com/app/site/hosting/scriptlet.nl?script=313&deploy=1';
	 		}
	    else if(nlapiGetContext().getEnvironment()=='BETA'){
	 		//	alert(JSON.stringify(tasktypefields) );
	 			 url='https://system.beta.netsuite.com/app/site/hosting/scriptlet.nl?script=313&deploy=1';
	 		}
	      else{
	 			 url='https://system.na1.netsuite.com/app/site/hosting/scriptlet.nl?script=313&deploy=1';
	 			
	 		}	
	 	
	 	nlapiSetFieldValue("custpage_sort",'sort');
	
	 	for(var j=0;j<filterFields.length;j++){
	 		var fieldValue = nlapiGetFieldValue(filterFields[j]);
	 		if( filterFields[j]=='custpage_temp_recid'){
	 			url +=	'&recid=' + fieldValue;
	 			bool=true;
	 			
	 		}
	 		else if( filterFields[j]=='custpage_temp_rectype'){
	 			url +=	'&rectype=' + fieldValue;
	 			bool=true;
	 		}
	 		else if (fieldValue != '' && fieldValue != null &&  fieldValue != 0) {
	 			url +=	'&'  + filterFields[j] + '=' + fieldValue;
	 			bool=true;
	 		}
	 	
	 	}
	 	
	 	if(bool==true){
	 		window.open(url, '_self','');
	 		
	 	}
	 	else{
	 		alert("Please enter the criteria to search!");
	 	}
	 	
	 }


/**
 * 
 * @param name
 */
 

/* 
function refreshSublist(name) {
	var currentUrl = document.URL;
	// Refresh window with updated sublist
	var fieldValue = nlapiGetFieldValue(name);
	if (fieldValue != '' && fieldValue != null) {
		// Check if it's already in the url
		var param=getParameterFromUrl(name);
		if ( param== null){
			//window.onbeforeunload = null;
			 window.addEventListener('beforeunload',null, false);
			 window.addEventListener('unload', null, false);
			   
			window.open(currentUrl + '&' + name + '=' + fieldValue, '_self');
		}
		else {
			var updatedUrl = currentUrl.replace(name + '=' + param, name + '=' +fieldValue);
			window.open(updatedUrl, '_self');
		}
	}
}

/**
 * Function is used to get the value of the get parameter
 * @param val
 * @returns {String}
 */
function getParameterFromUrl(val) {
	var result = null, tmp = [];
	location.search.substr(1).split("&").forEach(function(item) {
		tmp = item.split("=");
		if (tmp[0] === val)
			result = decodeURIComponent(tmp[1]);
	});
	return result;
}


function AddJavascript(pos) 
{ 
    var tag = document.getElementsByTagName(pos)[0]; 
    var addScript = document.createElement('script'); 
    addScript.setAttribute('type', 'text/javascript'); 
    addScript.innerHTML = "window.onbeforeunload = function() {}";
    tag.appendChild(addScript); 
} 

function createTemplate(name) {
	
	 jQuery("body").addClass("loading");
    
	 var url;
	 	var bool =false;
	 	
	 	//AGX_SSU_Edit_Study Pricing Suitelet REfresh the current page
	 	
	 	if(nlapiGetContext().getEnvironment()=='SANDBOX'){
	 		//	alert(JSON.stringify(tasktypefields) );
	 			 url='https://system.sandbox.netsuite.com/app/site/hosting/scriptlet.nl?script=313&deploy=1';
	 		}
	     else if(nlapiGetContext().getEnvironment()=='BETA'){
	 		//	alert(JSON.stringify(tasktypefields) );
	 			 url='https://system.beta.netsuite.com/app/site/hosting/scriptlet.nl?script=313&deploy=1';
	 		}
	else{
	 			 url='https://system.na1.netsuite.com/app/site/hosting/scriptlet.nl?script=313&deploy=1';
	 			
	 		}	
	 	
	 	
	 	var recId= nlapiGetFieldValue('custpage_temp_recid');
	     templatename=	jQuery('#templatename').val();
	    
	    // alert(templatename);
	    
	     if(templatename ==''){
	    	alert('Please enter a valid template name');
	    }
	    else{
	    	//create template
	    	alert("Creating Template " + templatename);
	    
	    	var url2=nlapiResolveURL('RESTLET','customscript_agx_rest_createtemplate_pri','customdeploy_agx_rest_createtemplate_pri');
	    var response = nlapiRequestURL(url2+ '&templatename='+templatename + "&recid=" +recId );
	    }
	 	
	    for(var j=0;j<filterFields.length;j++){
	 		var fieldValue = nlapiGetFieldValue(filterFields[j]);
	 		if( filterFields[j]=='custpage_temp_recid'){
	 			url +=	'&recid=' + fieldValue;
	 			bool=true;
	 			
	 		}
	 		else if( filterFields[j]=='custpage_temp_rectype'){
	 			url +=	'&rectype=' + fieldValue;
	 			bool=true;
	 		}
	 		else if (fieldValue != '' && fieldValue != null &&  fieldValue != 0) {
	 			url +=	'&'  + filterFields[j] + '=' + fieldValue;
	 			bool=true;
	 		}
	 	
	 	}
	 	
	 	if(bool==true){
	 		window.open(url, '_self','');
	 		
	 	}
	 	else{
	 		alert("Please enter the criteria to search!");
	 	}
	
	 	jQuery("body").removeClass("loading");
	 }



