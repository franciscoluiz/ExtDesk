-/*
This file is part of ExtDesk

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

*/
/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.Modules.Wizard.Client.Wizard', {			// 1.- Steep One define the name of the module
    extend: 'Ext.ux.desktop.Module',
    id:'wizard-win',												// 2.- Define the id of window of the module
    init : function(){
        var me = this;
        
        this.launcher = {
            text: 'Wizard',									// 3.- The name of the shortcut aka launcher/
            iconCls:'icon-wizard',									// 4.- Changes the icon of the module
            handler : this.createWindow,
            scope: this
        };	
        															// 14.-Define de Model to use 
		//Ext.regModel('ImageEx', {
		 if (! Ext.ClassManager.isCreated('ImageWizard')) {
			Ext.define('ImageWizard', {
				extend: 'Ext.data.Model',
				fields: [
					{
					name : 'id',
					type : 'string'
				},
				{
					name : 'src',
					type : 'string'
				},
				{
					name : 'title',
					type : 'string'
				},
				{
					name : 'caption',
					type : 'string'
				}
			]
			});
		}
		// 15.-We create a store to load the images

    	me.store=Ext.create('Ext.data.Store', {
			id:'imagesStoreWizard',
			model: 'ImageWizard',
			data: [
				{id : 'wizard1opc', src:'modules/Wizard/Client/Resources/images/template1_48x48.png', 	title : "Template 1",	caption : "Simple Module1"},
				{id : 'wizard2opc', src:'modules/Wizard/Client/Resources/images/template2_48x48.png', 	title : "Template 2",	caption : "A module with 'X' Tabs"},
				{id : 'wizard3opc', src:'modules/Wizard/Client/Resources/images/template3_48x48.png', 	title : "Template 3",	caption : "Accordion Example"},
				{id : 'wizard4opc', src:'modules/Wizard/Client/Resources/images/template4_48x48.png', 	title : "Template 4",	caption : "Notepad Example"},
				{id : 'wizard5opc', src:'modules/Wizard/Client/Resources/images/template5_48x48.png', 	title : "Template 5",	caption : "Grid Example"},
				{id : 'wizard6opc', src:'modules/Wizard/Client/Resources/images/template6_48x48.png', 	title : "Template 6",	caption : "System Status Example"},
				{id : 'wizard7opc', src:'modules/Wizard/Client/Resources/images/template7_48x48.png', 	title : "Template 7",	caption : "Tab Example"},
				]
		});
		
		// template
        me.imageTpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div id="{id}" class="thumb-wrap-ed-wizard">',
            '<img src="{src}" />',
            '<span class="title">{title}</span><br/>',
            '<span class="caption">{caption}</span>',
            '</div>',
            '</tpl><br/>'
            );															//16.-We create a template to use
        
    },

    createWindow : function(){
        var me = this;
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('wizard-win');				// 5.- We obtain the id of win,
        if(!win){
            win = desktop.createWindow({							
                id: 'wizard-win',									// 6.- if the win don't exist, we create this
                title:'Wizard',							// 7.- the title of win
                width:540,											// 8.- the win's width
                height:380,											// 9.- the win's height
                iconCls: 'icon-wizard',							//10.- the win's icon
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
               //html : 'We Second Module'							//11.-  the module body
   
                items:{												//17.- create a tab panel
	                id:'wizardTabPanel',
					xtype: 'tabpanel',				
	                activeTab:0,
	                //bodyStyle: 'padding: 5px;',
	                layout:'border',				
					//html: 'text'
					items :[		
						{				
							id : 'wizardTab0',					//18.- create the menu panel and set the title
							title: "Please Select a Template",
							header:false,
							border:false,
							layout:'fit',
							items :
								Ext.create('Ext.view.View', {		//19.- create dataview
									//xtype:'dataview',
									store: me.store,				
									tpl: me.imageTpl,
									itemSelector: 'div.thumb-wrap-ed-wizard',
									emptyText: 'No images available',
									overClass: 'x-view-over',
									singleSelect: true,
									listeners: {
										itemclick:function(view,record,item,index,e,options){
											
											//alert(index);
											switch(index) {
												case 0 : me.openOption1(index);
														break;
												case 1 : me.openOption2(index);
														break;											
												case 2 : me.openOption3(index);												
														break;
												case 3 : me.openOption4(index);
														break;
												case 4 : me.openOption5(index);
														break;
												case 5 : me.openOption6(index);
														break;
												case 6 : me.openOption7(index);
														break;

											}				
										}
									}		
								})	 
						}
					]
				}
			})
        }
        win.show();
        return win;
    },

    openOption1 : function(opt){
		var me = this;
		var tab1=Ext.getCmp('wizardTab1');
		if (tab1==undefined){
			me.tab1= Ext.create('Ext.form.Panel', {
					id : 'wizardTab1',
					title : 'Template 1',
					closable:true,
					html:'<img src="modules/Wizard/Server/templates/template1/screenshot.png">',
		            dockedItems: [
		                {
		                    xtype: 'toolbar',
		                    dock: 'top',
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            id:'t1_name',
		                            fieldLabel: 'Module Name',
		                            value : 'Template1'                       	
		                        },
								{
                            		xtype: 'checkboxfield',
                            		id : 't1_install',
                            		fieldLabel: '',
                            		boxLabel: 'Install'
                        		},
		                        {
		                            xtype: 'button',
		                            text: 'Create',
		                        	scope:this,
		                        	handler:me.makeTemplate1
		                        }
		                    ]
		                }
		            ]
			}); 
			var tab0 = Ext.getCmp('wizardTabPanel');
			var tab1 = Ext.getCmp('wizardTab1');		
			tab0.add(tab1);
		}
		tab1.show();
    },

    openOption2 : function(opt){
		var me = this;
		var tab2=Ext.getCmp('wizardTab2');
		if (tab2==undefined){
			me.tab2= Ext.create('Ext.form.Panel', {
					id : 'wizardTab2',
					title : 'Template 2',
					closable:true,
		            html:'<img src="modules/Wizard/Server/templates/template2/screenshot.png">',
		            dockedItems: [
		                {
		                    xtype: 'toolbar',
		                    dock: 'top',
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            labelWidth:40,
		                            width:150,
		                            id:'t2_name',
		                            fieldLabel: 'Name',
		                            value : 'Template2'
		                        },
		                        {
		                            xtype: 'textfield',
		                            width:100,
		                            labelWidth:35,
		                            id:'t2_tabs',
		                            fieldLabel: 'Tabs'
		                        },

								{
                            		xtype: 'checkboxfield',
                            		id : 't2_install',
                            		fieldLabel: '',
                            		boxLabel: 'Install'
                        		},
		                        {
		                            xtype: 'button',
		                            text: 'Create',
		                        	scope:this,
		                        	handler:me.makeTemplate2
		                        }
		                    ]
		                }
		            ]
					
					
					
					//html:'This is Tab 2'
			}); 
			var tab0 = Ext.getCmp('wizardTabPanel');
			var tab2 = Ext.getCmp('wizardTab2');		
			tab0.add(tab2);
		}
		tab2.show();
    },

	openOption3 : function(opt){
		var me = this;
		var tab3=Ext.getCmp('wizardTab3');
		if (tab3==undefined){
			me.tab1= Ext.create('Ext.form.Panel', {
					id : 'wizardTab3',
					title : 'Template 3',
					closable:true,
					html:'<img src="modules/Wizard/Server/templates/template3/screenshot.png">',
		            dockedItems: [
		                {
		                    xtype: 'toolbar',
		                    dock: 'top',
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            id:'t3_name',
		                            fieldLabel: 'Module Name',
		                        	value: 'AccordionExample'
		                        },
								{
                            		xtype: 'checkboxfield',
                            		id : 't3_install',
                            		fieldLabel: '',
                            		boxLabel: 'Install'
                        		},
		                        {
		                            xtype: 'button',
		                            text: 'Create',
		                        	scope:this,
		                        	handler:me.makeTemplate3
		                        }
		                    ]
		                }
		            ]
			}); 
			var tab0 = Ext.getCmp('wizardTabPanel');
			var tab3 = Ext.getCmp('wizardTab3');		
			tab0.add(tab3);
		}
		tab3.show();

    },

	openOption4 : function(opt){
		var me = this;
		var tab4=Ext.getCmp('wizardTab4');
		if (tab4==undefined){
			me.tab4= Ext.create('Ext.form.Panel', {
					id : 'wizardTab4',
					title : 'Template 4',
					closable:true,
					html:'<img src="modules/Wizard/Server/templates/template4/screenshot.png">',
		            dockedItems: [
		                {
		                    xtype: 'toolbar',
		                    dock: 'top',
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            id:'t4_name',
		                            fieldLabel: 'Module Name',
		                        	value: 'NotepadExample'
		                        },
								{
                            		xtype: 'checkboxfield',
                            		id : 't4_install',
                            		fieldLabel: '',
                            		boxLabel: 'Install'
                        		},
		                        {
		                            xtype: 'button',
		                            text: 'Create',
		                        	scope:this,
		                        	handler:me.makeTemplate4
		                        }
		                    ]
		                }
		            ]
			}); 
			var tab0 = Ext.getCmp('wizardTabPanel');
			var tab4 = Ext.getCmp('wizardTab4');		
			tab0.add(tab4);
		}		
		tab4.show();
    },

	openOption5 : function(opt){
		var me = this;
		var tab5=Ext.getCmp('wizardTab5');
		if (tab5==undefined){
			me.tab5= Ext.create('Ext.form.Panel', {
					id : 'wizardTab5',
					title : 'Template 5',
					closable:true,
					html:'<img src="modules/Wizard/Server/templates/template5/screenshot.png">',
		            dockedItems: [
		                {
		                    xtype: 'toolbar',
		                    dock: 'top',
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            id:'t5_name',
		                            fieldLabel: 'Module Name',
		                        	value: 'GridExample'
		                        },
								{
                            		xtype: 'checkboxfield',
                            		id : 't5_install',
                            		fieldLabel: '',
                            		boxLabel: 'Install'
                        		},
		                        {
		                            xtype: 'button',
		                            text: 'Create',
		                        	scope:this,
		                        	handler:me.makeTemplate5
		                        }
		                    ]
		                }
		            ]
			}); 
			var tab0 = Ext.getCmp('wizardTabPanel');
			var tab5 = Ext.getCmp('wizardTab5');		
			tab0.add(tab5);
		}		
		tab5.show();
    },

	openOption6 : function(opt){
		var me = this;
		var tab6=Ext.getCmp('wizardTab6');
		if (tab6==undefined){
			me.tab5= Ext.create('Ext.form.Panel', {
					id : 'wizardTab6',
					title : 'Template 6',
					closable:true,
					html:'<img src="modules/Wizard/Server/templates/template6/screenshot.png">',
		            dockedItems: [
		                {
		                    xtype: 'toolbar',
		                    dock: 'top',
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            id:'t6_name',
		                            fieldLabel: 'Module Name',
		                        	value: 'SystemStatusExample'
		                        },
								{
                            		xtype: 'checkboxfield',
                            		id : 't6_install',
                            		fieldLabel: '',
                            		boxLabel: 'Install'
                        		},
		                        {
		                            xtype: 'button',
		                            text: 'Create',
		                        	scope:this,
		                        	handler:me.makeTemplate6
		                        }
		                    ]
		                }
		            ]
			}); 
			var tab0 = Ext.getCmp('wizardTabPanel');
			var tab6 = Ext.getCmp('wizardTab6');		
			tab0.add(tab6);
		}		
		tab6.show();
    },

	openOption7 : function(opt){
		var me = this;
		var tab7=Ext.getCmp('wizardTab7');
		if (tab7==undefined){
			me.tab5= Ext.create('Ext.form.Panel', {
					id : 'wizardTab7',
					title : 'Template 7',
					closable:true,
					html:'<img src="modules/Wizard/Server/templates/template7/screenshot.png">',
		            dockedItems: [
		                {
		                    xtype: 'toolbar',
		                    dock: 'top',
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            id:'t7_name',
		                            fieldLabel: 'Module Name',
		                        	value: 'TabsExample'
		                        },
								{
                            		xtype: 'checkboxfield',
                            		id : 't7_install',
                            		fieldLabel: '',
                            		boxLabel: 'Install'
                        		},
		                        {
		                            xtype: 'button',
		                            text: 'Create',
		                        	scope:this,
		                        	handler:me.makeTemplate7
		                        }
		                    ]
		                }
		            ]
			}); 
			var tab0 = Ext.getCmp('wizardTabPanel');
			var tab7 = Ext.getCmp('wizardTab7');		
			tab0.add(tab7);
		}		
		tab7.show();
    },




	makeTemplate1: function(){
		var me=this;
		
		var module_name = Ext.getCmp('t1_name').getValue();
		var module_install=Ext.getCmp('t1_install').getValue();

		
		if(module_name!=""){
			Ext.MessageBox.show({msg: "Making module...",progressText : "please wait",	width:300,wait:true,waitConfig: {interval:50},modal:true});
			
			Ext.Ajax.request({
			    url: 'ExtDesk.php',
				    method:'GET',
				    params: {
				    	Module : 'Wizard',
				    	option : 'Module',
				    	action : 'Make',
				    	template : 'Template1',
				    	newModule : module_name,
				    	installModule : module_install
				    },
				    success: function(response){
				    	var text = response.responseText;
				    	if (text!=""){
				    		Ext.MessageBox.hide();
				    		var resp=Ext.decode(text);
				    		if(resp.success){				        	
				        		Ext.Msg.alert("Wizard ",resp.msg+'</b>')
				        	}else{
				        		Ext.Msg.alert("Wizard Error",resp.msg+'</b>')
				        	}
				    	}else{
				    		Ext.Msg.alert("Wizard Error",'En el lado del servidor')
				    	}
				    }
			});
		}else{
			Ext.Msg.alert("Error : ","debe escribir un nombre")
		}
		
	},

	makeTemplate2: function(){
		var me=this;
		
		var module_name = Ext.getCmp('t2_name').getValue();
		var module_install=Ext.getCmp('t2_install').getValue();
		var module_tabs=Ext.getCmp('t2_tabs').getValue();
		
		if(module_name!="" && module_tabs!=""){
			Ext.MessageBox.show({msg: "Making module...",progressText : "please wait",	width:300,wait:true,waitConfig: {interval:50},modal:true});
			
			Ext.Ajax.request({
			    url: 'ExtDesk.php',
				    method:'GET',
				    params: {
				    	Module : 'Wizard',
				    	option : 'Module',
				    	action : 'Make',
				    	template : 'Template2',
				    	newModule : module_name,
				    	installModule : module_install,
				    	p1 : module_tabs
				    },
				    success: function(response){
				    	var text = response.responseText;
				    	if (text!=""){
				    		Ext.MessageBox.hide();
				    		var resp=Ext.decode(text);
				    		if(resp.success){				        	
				        		Ext.Msg.alert("Wizard ",resp.msg+'</b>')
				        	}else{
				        		Ext.Msg.alert("Wizard Error",resp.msg+'</b>')
				        	}
				    	}else{
				    		Ext.Msg.alert("Wizard Error",'En el lado del servidor')
				    	}
				    }
			});
		}else{
			Ext.Msg.alert("Wizard Error : ","Debe llenar todos los parametros.")
		}
		
	},
	
	makeTemplate3: function(){
		var me=this;
		
		var module_name = Ext.getCmp('t3_name').getValue();
		var module_install=Ext.getCmp('t3_install').getValue();

		
		if(module_name!=""){
			Ext.MessageBox.show({msg: "Making module...",progressText : "please wait",	width:300,wait:true,waitConfig: {interval:50},modal:true});
			
			Ext.Ajax.request({
			    url: 'ExtDesk.php',
				    method:'GET',
				    params: {
				    	Module : 'Wizard',
				    	option : 'Module',
				    	action : 'Make',
				    	template : 'Template3',
				    	newModule : module_name,
				    	installModule : module_install
				    },
				    success: function(response){
				    	var text = response.responseText;
				    	if (text!=""){
				    		Ext.MessageBox.hide();
				    		var resp=Ext.decode(text);
				    		if(resp.success){				        	
				        		Ext.Msg.alert("Wizard ",resp.msg+'</b>')
				        	}else{
				        		Ext.Msg.alert("Wizard Error",resp.msg+'</b>')
				        	}
				    	}else{
				    		Ext.Msg.alert("Wizard Error",'En el lado del servidor')
				    	}
				    }
			});
		}else{
			Ext.Msg.alert("Error : ","debe escribir un nombre")
		}
		
	},
	
	makeTemplate4: function(){
		var me=this;
		
		var module_name = Ext.getCmp('t4_name').getValue();
		var module_install=Ext.getCmp('t4_install').getValue();

		
		if(module_name!=""){
			Ext.MessageBox.show({msg: "Making module...",progressText : "please wait",	width:300,wait:true,waitConfig: {interval:50},modal:true});
			
			Ext.Ajax.request({
			    url: 'ExtDesk.php',
				    method:'GET',
				    params: {
				    	Module : 'Wizard',
				    	option : 'Module',
				    	action : 'Make',
				    	template : 'Template4',
				    	newModule : module_name,
				    	installModule : module_install
				    },
				    success: function(response){
				    	var text = response.responseText;
				    	if (text!=""){
				    		Ext.MessageBox.hide();
				    		var resp=Ext.decode(text);
				    		if(resp.success){				        	
				        		Ext.Msg.alert("Wizard ",resp.msg+'</b>')
				        	}else{
				        		Ext.Msg.alert("Wizard Error",resp.msg+'</b>')
				        	}
				    	}else{
				    		Ext.Msg.alert("Wizard Error",'En el lado del servidor')
				    	}
				    }
			});
		}else{
			Ext.Msg.alert("Error : ","debe escribir un nombre")
		}

	},
	
	makeTemplate5: function(){
		var me=this;
		
		var module_name = Ext.getCmp('t5_name').getValue();
		var module_install=Ext.getCmp('t5_install').getValue();
		
		if(module_name!=""){
			Ext.MessageBox.show({msg: "Making module...",progressText : "please wait",	width:300,wait:true,waitConfig: {interval:50},modal:true});
			
			Ext.Ajax.request({
			    url: 'ExtDesk.php',
				    method:'GET',
				    params: {
				    	Module : 'Wizard',
				    	option : 'Module',
				    	action : 'Make',
				    	template : 'Template5',
				    	newModule : module_name,
				    	installModule : module_install
				    },
				    success: function(response){
				    	var text = response.responseText;
				    	if (text!=""){
				    		Ext.MessageBox.hide();
				    		var resp=Ext.decode(text);
				    		if(resp.success){				        	
				        		Ext.Msg.alert("Wizard ",resp.msg+'</b>')
				        	}else{
				        		Ext.Msg.alert("Wizard Error",resp.msg+'</b>')
				        	}
				    	}else{
				    		Ext.Msg.alert("Wizard Error",'En el lado del servidor')
				    	}
				    }
			});
		}else{
			Ext.Msg.alert("Error : ","debe escribir un nombre")
		}
	},
	
	makeTemplate6: function(){
		var me=this;
		
		var module_name = Ext.getCmp('t6_name').getValue();
		var module_install=Ext.getCmp('t6_install').getValue();
		
		if(module_name!=""){
			Ext.MessageBox.show({msg: "Making module...",progressText : "please wait",	width:300,wait:true,waitConfig: {interval:50},modal:true});
			
			Ext.Ajax.request({
			    url: 'ExtDesk.php',
				    method:'GET',
				    params: {
				    	Module : 'Wizard',
				    	option : 'Module',
				    	action : 'Make',
				    	template : 'Template6',
				    	newModule : module_name,
				    	installModule : module_install
				    },
				    success: function(response){
				    	var text = response.responseText;
				    	if (text!=""){
				    		Ext.MessageBox.hide();
				    		var resp=Ext.decode(text);
				    		if(resp.success){				        	
				        		Ext.Msg.alert("Wizard ",resp.msg+'</b>')
				        	}else{
				        		Ext.Msg.alert("Wizard Error",resp.msg+'</b>')
				        	}
				    	}else{
				    		Ext.Msg.alert("Wizard Error",'En el lado del servidor')
				    	}
				    }
			});
		}else{
			Ext.Msg.alert("Error : ","debe escribir un nombre")
		}
	},

	makeTemplate7: function(){
		var me=this;
		
		var module_name = Ext.getCmp('t7_name').getValue();
		var module_install=Ext.getCmp('t7_install').getValue();
		
		if(module_name!=""){
			Ext.MessageBox.show({msg: "Making module...",progressText : "please wait",	width:300,wait:true,waitConfig: {interval:50},modal:true});
			
			Ext.Ajax.request({
			    url: 'ExtDesk.php',
				    method:'GET',
				    params: {
				    	Module : 'Wizard',
				    	option : 'Module',
				    	action : 'Make',
				    	template : 'Template7',
				    	newModule : module_name,
				    	installModule : module_install
				    },
				    success: function(response){
				    	var text = response.responseText;
				    	if (text!=""){
				    		Ext.MessageBox.hide();
				    		var resp=Ext.decode(text);
				    		if(resp.success){				        	
				        		Ext.Msg.alert("Wizard ",resp.msg+'</b>')
				        	}else{
				        		Ext.Msg.alert("Wizard Error",resp.msg+'</b>')
				        	}
				    	}else{
				    		Ext.Msg.alert("Wizard Error",'En el lado del servidor')
				    	}
				    }
			});
		}else{
			Ext.Msg.alert("Error : ","debe escribir un nombre")
		}
	}

	


});


