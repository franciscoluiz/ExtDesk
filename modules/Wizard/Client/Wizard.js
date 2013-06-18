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
            text: 'Wizard Fenix',									// 3.- The name of the shortcut aka launcher/
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
			id:'imagesStore',
			model: 'ImageWizard',
			data: [
				{id : 'wizard1opc', src:'modules/Wizard/Client/Resources/images/template1_48x48.png', 	title : "Template 1",	caption : "Simple Module1"},
				{id : 'wizard2ooc', src:'modules/Wizard/Client/Resources/images/template2_48x48.png', 	title : "Template 2",	caption : "A module with 'X' Tabs"},
				]
		});
		
		// template
        me.imageTpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div id="{id}" class="thumb-wrap">',
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
							layout:'anchor',
							items :
								Ext.create('Ext.view.View', {		//19.- create dataview
									//xtype:'dataview',
									store: me.store,				
									tpl: me.imageTpl,
									itemSelector: 'div.thumb-wrap',
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
		                            fieldLabel: 'Module Name'
		                        	
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
		                            fieldLabel: 'Name'
		                        	
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
			me.tab3= Ext.create('Ext.form.Panel', {
					id : 'wizardTab3',
					title : 'Tab 3',
					closable:true,
					html:'This is Tab 3'
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
					title : 'Tab 4',
					closable:true,
					html:'This is Tab 4'
			}); 
			var tab0 = Ext.getCmp('wizardTabPanel');
			var tab4 = Ext.getCmp('wizardTab4');		
			tab0.add(tab4);
		}
		tab4.show();
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
		
	}


});


