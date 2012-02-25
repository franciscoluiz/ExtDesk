Ext.override(Ext.data.proxy.Server, {

        constructor: function(config)
        {
            this.callOverridden([config]);

            this.addListener("exception",  function (proxy, response, operation) {
                if (response.responseText != null)
                {
                   Error=Ext.decode(response.responseText)
                   Ext.Msg.alert('Error', Error.msg );
                }
            });

        }

});


/*
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

Ext.Loader.setPath('Ext.ux', 'client/ux');

Ext.define('MyDesktop.Modules.Admin.Client.Admin', {			// 1.- Steep One define the name of the module
	requires: [
        'Ext.tab.Panel',
		'Ext.ux.CheckColumn'
    ],
	
	extend: 'Ext.ux.desktop.Module',

    id:'admin-win',												// 2.- Define the id of window of the module

    loadCss : function(filename){
		file=filename+'.css';
		var fileref=document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", file);
		document.getElementsByTagName("head")[0].appendChild(fileref)
	},
	
    init : function(){
        var me = this;
        
        this.launcher = {
            text: 'Admin',											// 3.- The name of the shortcut aka launcher/
            iconCls:'icon-admin',									// 4.- Changes the icon of the module
            handler : this.createWindow,
            scope: this
        };
        this.loadCss("client/ux/css/CheckHeader");
        
        /*** MODELS ***/        
    	// model ImageAdmin
        if (! Ext.ClassManager.isCreated('ImageAdmin')) {
			Ext.regModel('ImageAdmin', {
			Fields: [
					{ name : 'id', 	type : 'string'},
					{ name : 'src', 	type : 'string'},
					{ name : 'title', 	type : 'string'},
					{ name : 'caption',	type : 'string'}
				]
			});
		}
				
		// model AdminUsers
		if (! Ext.ClassManager.isCreated('AdminUsers')) {
			Ext.define('AdminUsers', {
				extend: 'Ext.data.Model',
				fields: [
					{name : 'id', 	type: 'int'},
					{name : 'username', type: 'string'},
					{name : 'password', type: 'string'},
					{name : 'email', 	type: 'string'},
					{name : 'extrainfo1', type: 'string'},
					{name : 'extrainfo2', type: 'string'},
					{name : 'extrainfo3', type: 'string'},
					{name : 'active', type: 'boolean'}
				]
			});
		}
		
		// model Modules 
		if (! Ext.ClassManager.isCreated('AdminModules')) {
			Ext.define('AdminModules', {
				extend: 'Ext.data.Model',
				fields: [
					{name : 'id', 	type: 'int'},
					{name : 'js', type: 'string'},
					{name : 'name', type: 'string'},
					{name : 'iconCls', 	type: 'string'},
					{name : 'module', type: 'string'},
					{name : 'iconLaunch', type: 'string'},
				]
			});
		}

		// model Actions
		if (! Ext.ClassManager.isCreated('AdminActions')) {
			Ext.define('AdminActions', {
				extend: 'Ext.data.Model',
				fields: [
					{name : 'id', 	type: 'int'},
					{name : 'module', type: 'string'},
					{name : 'option', type: 'string'},
					{name : 'action', 	type: 'string'},
				]
			});
		}		

		// model Groups
		if (! Ext.ClassManager.isCreated('AdminGroups')) {
			Ext.define('AdminGroups', {
				extend: 'Ext.data.Model',
				fields: [
					{name : 'id', 	type: 'int'},
					{name : 'group', type: 'string'},
					{name : 'description', type: 'string'},
					{name : 'active', type: 'boolean'}
				]
			});
		}		
		
		// model Modules in Group
		if (! Ext.ClassManager.isCreated('AdminModulesInGroup')) {
			Ext.define('AdminModulesInGroup', {
				extend: 'Ext.data.Model',
				fields: [
					{name : 'parent', type: 'int'},
					{name : 'id', 	type: 'int'},
					{name : 'js', type: 'string'},
					{name : 'selected', type: 'boolean'}
				]
			});
		}		
		
		// model Actions in Group
		if (! Ext.ClassManager.isCreated('AdminActionsInGroup')) {
			Ext.define('AdminActionsInGroup', {
				extend: 'Ext.data.Model',
				fields: [
					{name : 'parent', type: 'int'},
					{name : 'id', 	type: 'int'},
					{name : 'opt', type: 'string'},
					{name : 'action', type: 'string'},
					{name : 'selected', type: 'boolean'}
				]
			});
		}				
		
		// model Groups in User
		if (! Ext.ClassManager.isCreated('AdminGroupsInUser')) {
			Ext.define('AdminGroupsInUser', {
				extend: 'Ext.data.Model',
				fields: [
					{name : 'id', 	type: 'int'},
					{name : 'user', 	type: 'int'},
					{name : 'group', type: 'string'},
					{name : 'selected', type: 'boolean'}
				]
			});
		}		
		
		/*** Stores ***/
		// store Images
		me.store = Ext.create('Ext.data.Store', {
			id:'imagesStore',
			model: 'ImageAdmin',
			data: [
				{id : 'option1ex', src:'modules/Admin/Client/Resources/images/system-users_48x48.png', 	title : "Usuarios",	caption : "Administra a los usuarios."},
				{id : 'option1ex', src:'modules/Admin/Client/Resources/images/modules_48x48.png', 	title : "Modules",	caption : "Administra los modulos."},
				//{id : 'option1ex', src:'modules/Admin/Client/Resources/images/actions_48x48.png', 	title : "Acciones",	caption : "Administra las acciones."},
				{id : 'option1ex', src:'modules/Admin/Client/Resources/images/groups_48x48.png', 	title : "Grupos",	caption : "Administra los grupos."}
				]
		});

    	// Store Users
		me.storeUsers = Ext.create('Ext.data.Store',{
			id : 'AdminUsers',
			model : 'AdminUsers',
			autoLoad: false,
			proxy : {
			    	type: 'ajax',
			    	url: 'ExtDesk.php',
    				method:'GET',
  					extraParams: { 
    					Module: 'Admin',
    					option: 'Users',
    					action:'List'
	    			},	
			    	reader: {
			    		type : 'json',
			    		root : 'data',
			    		successProperty : 'success'
			    	}
			    }
		})
		
		me.storeUsers.on("exception")
		
		// Store Modules
		me.storeModules = Ext.create('Ext.data.Store',{
			id : 'AdminModules',
			model : 'AdminModules',
			autoLoad: false,
			proxy : {
			    	type: 'ajax',
			    	url: 'ExtDesk.php',
    				method:'GET',
  					extraParams: { 
    					Module: 'Admin',
    					option: 'Modules',
    					action:'List'
	    			},	
			    	reader: {
			    		type : 'json',
			    		root : 'data',
			    		successProperty : 'success'
			    	}
			    }
		})
		
		// Store Actions
		me.storeActions = Ext.create('Ext.data.Store',{
			id : 'AdminActions',
			model : 'AdminActions',
			autoLoad: false,
			proxy : {
			    	type: 'ajax',
			    	url: 'ExtDesk.php',
    				method:'GET',
  					extraParams: { 
    					Module: 'Admin',
    					option: 'Actions',
    					action:'List'
	    			},	
			    	reader: {
			    		type : 'json',
			    		root : 'data',
			    		successProperty : 'success'
			    	}
			    }
		})
				
		// Store Actions
		me.storeGroups = Ext.create('Ext.data.Store',{
			id : 'AdminGroups',
			model : 'AdminGroups',
			autoLoad: false,
			proxy : {
			    	type: 'ajax',
			    	url: 'ExtDesk.php',
    				method:'GET',
  					extraParams: { 
    					Module: 'Admin',
    					option: 'Groups',
    					action:'List'
	    			},	
			    	reader: {
			    		type : 'json',
			    		root : 'data',
			    		successProperty : 'success'
			    	}
			    }
		})
		
		// Store ModulesinGroups
		me.storeModulesinGroup = Ext.create('Ext.data.Store',{
			id : 'AdminModulesInGroup',
			model : 'AdminModulesInGroup',
			autoLoad: false,
			proxy : {
			    	type: 'ajax',
			    	url: 'ExtDesk.php',
    				method:'GET',
  					extraParams: { 
    					Module: 'Admin',
    					option: 'ModulesinGroups',
    					action:'List'
	    			},	
			    	reader: {
			    		type : 'json',
			    		root : 'data',
			    		successProperty : 'success'
			    	}
			    }
		})		

		// Store ModulesinGroups
		me.storeActionsinGroup = Ext.create('Ext.data.Store',{
			id : 'AdminActionsInGroup',
			model : 'AdminActionsInGroup',
			autoLoad: false,
			proxy : {
			    	type: 'ajax',
			    	url: 'ExtDesk.php',
    				method:'GET',
  					extraParams: { 
    					Module: 'Admin',
    					option: 'ActionsinGroups',
    					action:'List'
	    			},	
			    	reader: {
			    		type : 'json',
			    		root : 'data',
			    		successProperty : 'success'
			    	}
			    }
		})		

		// Store Groupsin Users
		me.StoreGroupsInUser = Ext.create('Ext.data.Store',{
			id : 'AdminGroupsInUser',
			model : 'AdminGroupsInUser',
			autoLoad: false,
			proxy : {
			    	type: 'ajax',
			    	url: 'ExtDesk.php',
    				method:'GET',
  					extraParams: { 
    					Module: 'Admin',
    					option: 'GroupsinUser',
    					action:'List'
	    			},	
			    	reader: {
			    		type : 'json',
			    		root : 'data',
			    		successProperty : 'success'
			    	}
			    }
		})		
				
		// template
		me.imageTpl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div id="{id}" class="thumb-wrap">',
				  '<img src="{src}" />',
				  '<span class="title">{title}</span><br/>',
				  '<span class="caption">{caption}</span>',
				'</div>',
			'</tpl><br/>'
		);
        
        
    },
    
    createWindow : function(){
        var me = this;
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('admin-win');
        if(!win){
            win = desktop.createWindow({
                id: 'admin-win',
                title:'Admin',
                width:640,
                height:380,
                iconCls: 'icon-admin',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items:{	
	                id:'adminTabPanel',
					xtype: 'tabpanel',				
	                activeTab:0,
	                layout:'border',				
					items :[		
						{				
							id : 'adminTab0',
							title: "Menu",
							header:false,
							border:false,
							layout:'anchor',
							bodyStyle: 'padding: 5px;',
							items :
								Ext.create('Ext.view.View', {
									//xtype:'dataview',
									store: me.store,				
									tpl: me.imageTpl,
									itemSelector: 'div.thumb-wrap',
									emptyText: 'No images available',
									overClass: 'x-view-over',
									singleSelect: true,
									listeners: {
										itemclick:function(view,record,item,index,e,options){
											switch(index) {
												case 0 : me.openUsersTab(index);
														break;
												case 1 : me.openModulesTab(index);
														break;											
												case 2 : me.openGroupsTab(index);												
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
    
    /*** Generic Fuctions to work with grids***/
    
    saveGrid : function(gridName,url,module,option,action,extraParam){
    	var me=this;
    	//Obtain the grid
    	var grid = Ext.getCmp(gridName);
		//Obtain the store
		var store = grid.getStore();
		//Create a cool mask    	
    	Ext.MessageBox.show({msg: 'Saving your data, please wait...',progressText: 'Saving...',	width:300,wait:true,waitConfig: {interval:50},modal:true});    			
		//Obtain modified and updates record..!!;		
		var modified = store.getNewRecords();
		var updates = store.getUpdatedRecords();		
		//Prepare the param Array
		var params = [];		
		Ext.each(modified,function(mod,i){
			mod.id='nuevo',
			params.push(mod.data);
		});
		Ext.each(updates,function(upd,i){
			params.push(upd.data);	
		});
		
		// If exist changes...
		if (params.length >0){
			// transform to Json
			var json=Ext.encode(params);
			// We call Ajax method
			Ext.Ajax.request({
			    url: url,
			    method:'GET',
			    params: {
			    	Module : module,
			    	option : option,
			    	action : action,
			    	jsonp :json
			    },
			    success: function(response){
			        var text = response.responseText;
			       	if (text!=""){
			       		Ext.MessageBox.hide();
				        var resp=Ext.decode(text);
				        if(resp.success){				        	
				        	if (extraParam!=""){
				        		grid.getStore().load(extraParam);
				        	}else{
				        		grid.getStore().load();				        		
				        	}
				        	
				        }else{
				        	Ext.Msg.alert(module, 'Exist an error in th server : <b>'+resp.msg+'</b>')
				        }			       		
			       	}else{
					    Ext.MessageBox.hide();
					    Ext.Msg.alert(module, 'Exist an error in th server<br/>')
			       	}		        
			        			        
			    }
			},this);
			
		}else{
			Ext.MessageBox.hide();
			Ext.Msg.alert(module, 'Not Changes to save');			
		}
    	
    },
    
    addGrid : function(gridName,record,editor){
    
    	var me=this;	
    	//Obtain the grid
    	var grid = Ext.getCmp(gridName);
		//Obtain the store
		var store = grid.getStore();
		//registers in the grid
		var count=grid.getStore().getCount();
		store.insert(count,record);
    	editor.startEditByPosition({row: count, column: 1});
    },
    
    deleteGrid : function(gridName,url,module,option,action){
   		var me=this;	
    	//Obtain the grid
    	var grid=Ext.getCmp(gridName);
    	//Obtain the selection
    	var selection = grid.getView().getSelectionModel().getSelection()[0];
    	
		
		//if we have a selectión active
    	if (selection) {
    		//Create a cool mask
    		Ext.MessageBox.show({msg: 'Saving your data, please wait...',progressText: 'Saving...',	width:300,wait:true,waitConfig: {interval:50}});
			//send the id to the server to kill
			Ext.Ajax.request({
			    url: url,
			    method:'GET',
			    params: {
			        id : selection.data.id,
			        Module : module,
			        option : option,
			        action : action			        
			    },
			    success: function(response){
			        var text = response.responseText;
			        var resp=Ext.decode(text);
			        if(resp.success){
			        	Ext.MessageBox.hide();
			        	grid.getStore().remove(selection)	
			        }else{
			        	Ext.MessageBox.hide();
			        	Ext.Msg.alert(module, 'Exist an error in th server :<b>'+resp.msg+'</b>')
			        }
			        		        
			    }
			});
        }else{
        	Ext.MessageBox.hide();
        	Ext.Msg.alert(module, 'You must select a item to delete.')        	
        }
    	
    },
    
    /*** Users functions ***/
    
    openUsersTab : function(opt){
		var me = this;
		me.tab1=Ext.getCmp('adminTab1');
		if (me.tab1==undefined){
			me.editorUsers = Ext.create('Ext.grid.plugin.CellEditing', {
				clicksToEdit: 2
		    });
			me.tab1= Ext.create('Ext.Panel', {
					id : 'adminTab1',
					title : 'Usuarios',
					iconCls:'icon-admin-users',
					closable:true,
					layout: 'border',
					items: [
                        {
                            id : 'idAdminUsersGrid',
                            xtype: 'gridpanel',
                            store: me.storeUsers,
                            plugins:[me.editorUsers],
                            region:'center',
                            layout:'fit',
                            columns: [
                                {
                                    xtype : 'numbercolumn',
                                    dataIndex : 'id',
                                    text : 'Id',
                                    width : 40,
                                    hidden:true
                                },
                                {
                                    xtype : 'gridcolumn',
                                    dataIndex : 'username',
                                    text : 'User',
                                    width : 75,
                                    field: {
										xtype: 'textfield',
										allowBlank: false
									}
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'password',
                                    text: 'Password',
                                    width : 75,
                                    field: {
										xtype: 'textfield',
										allowBlank: false
									}
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'email',
                                    text: 'Email',
									width : 140,
									field: {
										xtype: 'textfield',
										vtype: 'email',
										allowBlank: false
									}

                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'extrainfo1',
                                    text: 'Extra Info1',
                                    width : 80,
									hidden:true,
                                    field: {
										xtype: 'textfield',
										allowBlank: true
									}
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'extrainfo2',
                                    text: 'Extra Info 2',
                                    width : 80,
									hidden:true,                                    
                                    field: {
										xtype: 'textfield',
										allowBlank: true
									}
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'extrainfo3',
                                    text: 'Extra Info3',
									hidden:true,                                    
                                    width : 80,
                                    field: {
										xtype: 'textfield',
										allowBlank: true
									}
                                },
                                {
                                    xtype: 'checkcolumn',
                                    width: 50,
                                    dataIndex: 'active',
                                    text: 'Active',
                                    editor: {
                									xtype: 'checkbox',
                									cls: 'x-grid-checkheader-editor'
            									}
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype : 'button',
                                            text : 'Add',
                                            iconCls:'icon-admin-add',
                                            handler: me.addUser,
                                            scope:this                                            
                                        },
                                        {
                                            xtype : 'button',
                                            text : 'Delete',
                                            iconCls:'icon-admin-delete',
                                            handler: me.deleteUser,
                                            scope : this
                                        },
                                        {
                                            xtype : 'button',
                                            text : 'Save',
                                            iconCls:'icon-admin-save',
                                            handler : me.saveUsers,
                                            scope : this
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Update',
                                            iconCls:'icon-admin-refresh',
                                            handler : me.updateUsers,
                                            scope : this
                                        }
                                    ]
                                }/*,
                                {
                                    xtype: 'toolbar',
                                    dock: 'bottom',
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: 'Add'
                                        }
									]
                                }
                                */
                            ]
                        },
                        {
		                    xtype: 'panel',
		                    id: 'idPanelGropusinUser',
		                    collapsed: true,
		                    collapsible: true,
		                    title: 'Groups',
		                    iconCls : 'icon-admin-groups',
		                    layout:'fit',
		                    width:'250',
		                    region: 'east',
		                    items:[
								{
		                    	        id : 'idAdminGroupsInUserGrid',
			                            xtype: 'gridpanel',
			                            store: me.StoreGroupsInUser,
			                            width:300,
			                            columns: [
											{
		                    					xtype : 'numbercolumn',
		                    					dataIndex : 'id',
		                    					text : 'Id',
		                    					width : 40,
		                    					hidden:true
		                    				},
		                    				{
		                    					xtype : 'numbercolumn',
		                    					dataIndex : 'user',
		                    					text : 'User',
		                    					width : 40,
		                    					hidden:true
		                    				},
		                    				{
			                                    xtype : 'gridcolumn',
			                                    dataIndex : 'group',
			                                    text : 'Group	',
			                                    width : 130
		                                    },
		                                    {
		                        				id :'adminCheckModulesinGroups',
		                        				xtype: 'checkcolumn',
			                                    dataIndex : 'selected',
			                                    text : 'Active',
			                                    width : 40,
			                                    editor: {
		    										xtype: 'checkbox',
		    										cls: 'x-grid-checkheader-editor'
												}
		                                    }
										]
										}

		                    ]
                        
                        }
                        
                    ]
					
			}); 
			me.storeUsers.load();
			
			Ext.getCmp('idAdminUsersGrid').on('select',me.updateGroupsinUser,this);
			
			Ext.getCmp('adminCheckModulesinGroups').on("checkchange",function(){
				me.saveGroupsinUser();
			});
			
			me.tab0 = Ext.getCmp('adminTabPanel');
			me.tab1 = Ext.getCmp('adminTab1');		
			me.tab0.add(me.tab1);
		}		
		me.tab1.show();
    },
    
    saveUsers : function(){
        var me=this;
    	me.saveGrid('idAdminUsersGrid','ExtDesk.php','Admin','Users','Save');
    	
    },
    
    addUser : function(){
    	
    	var me=this;
    	
    	var record = Ext.create('AdminUsers',{
			id : null,			
			username : '',
			password : '',
			email : '',
			extrainfo1 :'',
			extrainfo2 :'',
			extrainfo3 :'',
			active:0
		});
		editor=me.editorUsers;
		
		me.addGrid('idAdminUsersGrid',record,editor);
    
    },
    
    updateUsers : function(){
    	var me=this;
    	me.storeUsers.load();
    	    
    },
    
    deleteUser : function(){
    	var me=this;
    	Ext.Msg.show({
     		title :'Deleting user?',
     		msg : 'Are you sure do you wan delete this user?',
     		buttons : Ext.Msg.YESNOCANCEL,
     		icon : Ext.Msg.QUESTION,
     		fn : function(btn, text){
    			if (btn == 'yes'){
    				me.deleteGrid('idAdminUsersGrid','ExtDesk.php','Admin','Users','Delete');    		
    			}
     		}
		});    	
    
    },
    
    updateGroupsinUser : function(){
    	var me=this;
    	
    	var p=Ext.getCmp("idPanelGropusinUser");
    	if (!p.collapsed){
	   		var id=Ext.getCmp("idAdminUsersGrid").getSelectionModel().selected.items[0].data.id;
    		me.StoreGroupsInUser.load({params:{"id":id}});
    	}
    	
    },
    
    saveGroupsinUser : function(opt){
		var me=this;
		var id=Ext.getCmp("idAdminUsersGrid").getSelectionModel().selected.items[0].data.id;
		me.saveGrid('idAdminGroupsInUserGrid','ExtDesk.php','Admin','GroupsinUser','Save',
		{params:{"id":id}});
	},
    
    /*** Modules functions***/
    
    openModulesTab : function(opt){
		var me = this;
		var tab2=Ext.getCmp('adminTab2');
		if (tab2==undefined){
			me.editorModules = Ext.create('Ext.grid.plugin.CellEditing', {
				clicksToEdit: 2
		    });
			me.editorActions = Ext.create('Ext.grid.plugin.CellEditing', {
				clicksToEdit: 2
		    });
		    
			me.tab2= Ext.create('Ext.Panel', {
					id : 'adminTab2',
					title : 'Modules',
					iconCls : 'icon-admin-modules',
					closable : true,
					layout : 'border',
					items: [
                        {
                    		xtype: 'panel',
                    		title: 'Modulos',
                    		iconCls : 'icon-admin-modules',
                    		region: 'center',
	                        layout:'fit',
	                        items:[
		                        {
		                            id : 'idAdminModulesGrid',
		                            xtype: 'gridpanel',
		                            store: me.storeModules,
		                            plugins:[me.editorModules],
		                            columns: [
		                                {
		                                    xtype : 'numbercolumn',
		                                    dataIndex : 'id',
		                                    text : 'Id',
		                                    width : 40,
		                                    hidden:true,
		                                },
		                                {
		                                    xtype : 'gridcolumn',
		                                    dataIndex : 'js',
		                                    text : 'Javascript',
		                                    width : 85,
		                                    field: {
												xtype: 'textfield',
												allowBlank: false
											}
		                                },
		                                {
		                                    xtype: 'gridcolumn',
		                                    dataIndex: 'name',
		                                    text: 'Name',
		                                    width : 85,
		                                    field: {
												xtype: 'textfield',
												allowBlank: false
											}
		                                },
		                                {
		                                    xtype: 'gridcolumn',
		                                    dataIndex: 'iconCls',
		                                    text: 'Icon Class',
											width : 85,
											field: {
												xtype: 'textfield',
												allowBlank: false
											}
		
		                                },
		                                {
		                                    xtype: 'gridcolumn',
		                                    dataIndex: 'module',
		                                    text: 'Module',
		                                    width : 85,
		                                    field: {
												xtype: 'textfield',
												allowBlank: false
											}
		                                },
		                                {
		                                    xtype: 'gridcolumn',
		                                    dataIndex: 'iconLaunch',
		                                    text: 'Icon Launch',
		                                    width : 85	,
		                                    field: {
												xtype: 'textfield',
												allowBlank: false
											}
		                                }                                
		                            ],
		                            dockedItems: [
		                                {
		                                    xtype: 'toolbar',
		                                    dock: 'top',
		                                    items: [
		                                        {
		                                            xtype : 'button',
		                                            text : 'Add',
		                                            iconCls:'icon-admin-add',
		                                            handler: me.addModules,
		                                            scope:this                                            
		                                        },
		                                        {
		                                            xtype : 'button',
		                                            text : 'Delete',
		                                            iconCls:'icon-admin-delete',
		                                            handler: me.deleteModule,
		                                            scope : this
		                                        },
		                                        {
		                                            xtype : 'button',
		                                            text : 'Save',
		                                            iconCls:'icon-admin-save',
		                                            handler : me.saveModules,
		                                            scope : this
		                                        },
		                                        {
		                                            xtype: 'button',
		                                            text: 'Update',
		                                            iconCls:'icon-admin-refresh',
		                                            handler : me.updateModules,
		                                            scope : this
		                                        }
		                                    ]
		                                }
		                            ]
		                        }
		                    ]
                    		
                		},
                		{
		                    xtype: 'panel',
		                    id: 'idPanelActions',
		                    collapsed: true,
		                    collapsible: true,
		                    title: 'Acciones',
		                    iconCls : 'icon-admin-actions',
		                    layout:'fit',
		                    width:'300',
		                    region: 'east',
		                    items:[
		                        {
		                            id : 'idAdminActionsGrid',
		                            layout:'fit',
		                            xtype: 'gridpanel',
		                            store: me.storeActions,
		                            plugins:[me.editorActions],
   		                            columns: [
		                                {
		                                    xtype : 'numbercolumn',
		                                    dataIndex : 'id',
		                                    text : 'Id',
		                                    width : 40
		                                },
		                                {
		                                    xtype : 'gridcolumn',
		                                    dataIndex : 'module',
		                                    text : 'Module',
		                                    width : 85		                                    
		                                },
		                                {
		                                    xtype : 'gridcolumn',
		                                    dataIndex : 'option',
		                                    text : 'Option',
		                                    width : 85,
		                                    field: {
												xtype: 'textfield',
												allowBlank: false
											}
		                                },                         
   		                                {
		                                    xtype : 'gridcolumn',
		                                    dataIndex : 'action',
		                                    text : 'Action',
		                                    width : 85,
		                                    field: {
												xtype: 'textfield',
												allowBlank: false
											}
		                                }                    
									]
		                        }
		                    ],
		                    dockedItems: [
		                                {
		                                    xtype: 'toolbar',
		                                    dock: 'top',
		                                    items: [
		                                        {
		                                            xtype : 'button',
		                                            text : 'Add',
		                                            iconCls:'icon-admin-add',
		                                            handler: me.addActions,
		                                            scope:this                                            
		                                        },
		                                        {
		                                            xtype : 'button',
		                                            text : 'Delete',
		                                            iconCls:'icon-admin-delete',
		                                            handler: me.deleteActions,
		                                            scope : this
		                                        },
		                                        {
		                                            xtype : 'button',
		                                            text : 'Save',
		                                            iconCls:'icon-admin-save',
		                                            handler : me.saveActions,
		                                            scope : this
		                                        },
		                                        {
		                                            xtype: 'button',
		                                            text: 'Update',
		                                            iconCls:'icon-admin-refresh',
		                                            handler : me.updateActions,
		                                            scope : this
		                                        }
		                                    ]
		                                }
		                            ]
		                    /*** inserta aqui toolbar***/
		                }
                    ]
			}); 
			me.storeModules.load();
			
			//update actions when select a module
			Ext.getCmp('idAdminModulesGrid').on('select',me.updateActions,this);
			//first obtain the module,who calls the update
			me.storeActions.on('beforeload',function(st){
				var module=Ext.getCmp("idAdminModulesGrid").getSelectionModel().selected.items[0].data.name;
				st.proxy.extraParams.module=module;
			},this);
			
			var tab0 = Ext.getCmp('adminTabPanel');
			var tab2 = Ext.getCmp('adminTab2');		
			tab0.add(tab2);
		}		
		tab2.show();
    },

    saveModules : function(){
       var me=this;
       me.saveGrid('idAdminModulesGrid','ExtDesk.php','Admin','Modules','Save');
    },
    
    addModules : function(){
    	
    	var me=this;
    	
    	var record = Ext.create('AdminModules',{
			id : null,			
			js : '',
			name : '',
			iconCls : '',
			module :'',
			iconLaunch :'',
		});
		editor=me.editorModules;
		
		me.addGrid('idAdminModulesGrid',record,editor);
    
    },
    
    deleteModule:function(){
       	var me=this;
    	Ext.Msg.show({
     		title :'Deleting Module?',
     		msg : 'Are you sure do you wan delete this module?',
     		buttons : Ext.Msg.YESNO,
     		icon : Ext.Msg.QUESTION,
     		fn : function(btn, text){
    			if (btn == 'yes'){
					me.deleteGrid('idAdminModulesGrid','ExtDesk.php','Admin','Modules','Delete')   
    			}
     		}
		});    	
    },    
    
    updateModules : function(){
    	var me=this;
    	me.storeModules.load();
       	
    },
    
    /*** Actions methods ***/
        
	saveActions : function(){
	   var me=this;
       var me=this;
       me.saveGrid('idAdminActionsGrid','ExtDesk.php','Admin','Actions','Save');
	},
    
    addActions : function(){
    	var me=this;
    	var module=Ext.getCmp("idAdminModulesGrid").getSelectionModel().selected.items[0].data.name;
    	var record = Ext.create('AdminActions',{
			id : null,			
			module : module,
			option : '',
			action : ''
		});
		editor=me.editorActions;
		
		me.addGrid('idAdminActionsGrid',record,editor);
    },
        
    updateActions : function(){
    	var me=this;
    	
    	var p=Ext.getCmp("idPanelActions");
    	if (!p.collapsed){
	   		var module=Ext.getCmp("idAdminModulesGrid").getSelectionModel().selected.items[0].data.name;
    		me.storeActions.load({params:{"module":module}});
    	}
    },
    
    deleteActions:function(){
      	var me=this;
    	Ext.Msg.show({
     		title :'Deleting this Action?',
     		msg : 'Are you sure do you wan delete this action?',
     		buttons : Ext.Msg.YESNO,
     		icon : Ext.Msg.QUESTION,
     		fn : function(btn, text){
    			if (btn == 'yes'){
					me.deleteGrid('idAdminActionsGrid','ExtDesk.php','Admin','Actions','Delete')   
    			}
     		}
		});    	
    
    },
    
    /*** Groups methods ***/
    
	openGroupsTab: function(opt){
		var me = this;
		var tab3=Ext.getCmp('adminTab3');
		if (tab3==undefined){
			me.editorGroups = Ext.create('Ext.grid.plugin.CellEditing', {
				clicksToEdit: 2
		    });			
			me.tab3= Ext.create('Ext.Panel', {
					id : 'adminTab3',
					title : 'Grupos',
					iconCls:'icon-admin-groups',
					closable:true,
					layout:'border',
					items: [
		                {
		                    xtype: 'panel',
		                    region: 'center',
		                    layout:'fit',
		                    items: [
				                        {
		                        	        id : 'idAdminGroupsGrid',
				                            xtype: 'gridpanel',
				                            store: me.storeGroups,
				                            plugins:[me.editorGroups],
				                            columns: [
				                            	{
                                					xtype : 'numbercolumn',
                                					dataIndex : 'id',
                                					text : 'Id',
                                					width : 40
                                				},
                                				{
				                                    xtype : 'gridcolumn',
				                                    dataIndex : 'group',
				                                    text : 'Group',
				                                    width : 130,
				                                    field: {
														xtype: 'textfield',
														allowBlank: false
													}
			                                    },
			                                    {
			                                    	xtype : 'gridcolumn',
				                                    dataIndex : 'description',
				                                    text : 'Description',
				                                    width : 300,
				                                    field: {
														xtype: 'textfield',
														allowBlank: false
													}
			                                    },                          
			                                    {
                                    				xtype: 'checkcolumn',
				                                    dataIndex : 'active',
				                                    text : 'Active',
				                                    width : 40,
				                                    editor: {
                										xtype: 'checkbox',
                										cls: 'x-grid-checkheader-editor'
            										}
			                                    }		                                    
			                                    
				                            ],
		                            dockedItems: [
		                                {
		                                    xtype: 'toolbar',
		                                    dock: 'top',
		                                    items: [
		                                        {
		                                            xtype: 'button',
		                                            text: 'Add',
		                                            iconCls:'icon-admin-add',
		                                            handler: me.addGroups,
		                                            scope:this                                            
		                                          },
		                                        {
		                                            xtype: 'button',
		                                            text: 'Delete',
		                                            iconCls:'icon-admin-delete',
		                                            handler: me.deleteGroups,
		                                            scope:this                     
                                
												},
		                                        {
		                                            xtype: 'button',
		                                            text: 'Save',
		                                            iconCls:'icon-admin-save',
		                                            handler: me.saveGroups,
		                                            scope:this                                            
		                                        },
		                                        {
		                                            xtype: 'button',
		                                            text: 'Update',
		                                            iconCls:'icon-admin-refresh',
		                                            handler: me.updateGroups,
		                                            scope:this                                            
		                                            
		                                        }
		                                    ]
		                                }
		                            ]
		                        }
		                    ]
		                },
		                {
		                    xtype: 'panel',
		                    id : 'idPanelModulesinGroup',
		                    height: 200,
		                    layout: {
		                        type: 'border'
		                    },
		                    collapsed: true,
		                    collapsible: true,
		                    region: 'south',
		                    items:[
								{	
									xtype:'panel',
									region:'west',
									title:'Modulos Seleccionadoss',
									width:300,
									autoScroll:true,
									items:[
										{
		                    	        id : 'idAdminModulesinGroupGrid',
			                            xtype: 'gridpanel',
			                            store: me.storeModulesinGroup,
			                            width:300,
			                            columns: [
			                            	{
		                    					xtype : 'numbercolumn',
		                    					dataIndex : 'parent',
		                    					text : 'Parent',
		                    					width : 40,
		                    					hidden:true
		                    				},			                            
			                            	{
		                    					xtype : 'numbercolumn',
		                    					dataIndex : 'id',
		                    					text : 'Id',
		                    					width : 40,
		                    					hidden:true
		                    				},
		                    				{
			                                    xtype : 'gridcolumn',
			                                    dataIndex : 'js',
			                                    text : 'Module',
			                                    width : 130
		                                    },
		                                    {
		                        				id :'adminCheckModulesinGroups',
		                        				xtype: 'checkcolumn',
			                                    dataIndex : 'selected',
			                                    text : 'Active',
			                                    width : 40,
			                                    editor: {
		    										xtype: 'checkbox',
		    										cls: 'x-grid-checkheader-editor'
												}
		                                    }
										]
										}
									]
									/* Now we have autosave, cool..!;
									 * dockedItems: [
		                                {
		                                    xtype: 'toolbar',
		                                    dock: 'top',
		                                    items: [
		                                        {
		                                            xtype: 'button',
		                                            text: 'Save',
		                                            iconCls:'icon-admin-save',
		                                            handler: me.saveModulesinGroup,
		                                            scope:this                                            
		                                          }
                                          	]
		                                }
	                                ]*/

								},
								{	
									xtype:'panel',
									region:'center',
									title:'Actions',
									layout:'fit',
									height:400,
									items :[
										{
											id : 'idAdminActionsinGroupGrid',
			                            	xtype: 'gridpanel',
			                            	store: me.storeActionsinGroup,
			                            	layout: 'fit',
											columns : [
												{
			                    					xtype : 'numbercolumn',
			                    					dataIndex : 'parent',
			                    					text : 'Parent',
			                    					width : 40,
			                    					hidden:true
			                    				},			                            
				                            	{
			                    					xtype : 'numbercolumn',
			                    					dataIndex : 'id',
			                    					text : 'Id',
			                    					width : 40,
			                    					hidden:true
			                    				},
			                    				{
				                                    xtype : 'gridcolumn',
				                                    dataIndex : 'opt',
				                                    text : 'Option',
				                                    width : 130
			                                    },
			                    				{
				                                    xtype : 'gridcolumn',
				                                    dataIndex : 'action',
				                                    text : 'Action',
				                                    width : 130
			                                    },
			                                    {
			                        				id:'adminCheckActionsinGroups',
			                        				xtype: 'checkcolumn',
				                                    dataIndex : 'selected',
				                                    text : 'Active',
				                                    width : 40,
				                                    editor: {
			    										xtype: 'checkbox',
			    										cls: 'x-grid-checkheader-editor'
													}
			                                    }
												
											]
										}
									]/*,
									Now we have autosave
									dockedItems: [
		                                {
		                                    xtype: 'toolbar',
		                                    dock: 'top',
		                                    items: [
		                                        {
		                                            xtype: 'button',
		                                            text: 'Save',
		                                            iconCls:'icon-admin-save',
		                                            handler: me.saveActionsinGroup,
		                                            scope:this                                            
		                                          }
                                          	]
		                                }
	                                ]*/
								}
                            ]
		                }
		            ]
					//--------------------------->
			}); 
			me.storeGroups.load();
			Ext.getCmp('idAdminGroupsGrid').on('select',me.updateModulesinGroup,this);
			Ext.getCmp('idAdminModulesinGroupGrid').on('select',me.updateActionsinGroup,this);
			
			Ext.getCmp('adminCheckModulesinGroups').on("checkchange",function(){
				me.saveModulesinGroup();
			});
			Ext.getCmp('adminCheckActionsinGroups').on("checkchange",function(){
				me.saveActionsinGroup();
			});
						
			var tab0 = Ext.getCmp('adminTabPanel');
			var tab3 = Ext.getCmp('adminTab3');		
		}
		tab0.add(tab3);
		tab3.show();
    },

    saveGroups : function(opt){
  	   var me=this;
       var me=this;
       me.saveGrid('idAdminGroupsGrid','ExtDesk.php','Admin','Groups','Save');
    },
    
    addGroups : function(opt){
        var me=this;
    	var record = Ext.create('AdminGroups',{
			id : null,			
			group : '',
			description : '',
			active : false
		});
		editor=me.editorGroups;
		
		me.addGrid('idAdminGroupsGrid',record,editor);
    },    
    
    updateGroups : function(opt){
       	var me=this;
    	me.storeGroups.load();

    },
    
    deleteGroups : function(opt){
    	var me=this;
    	Ext.Msg.show({
     		title :'Deleting this Action?',
     		msg : 'Are you sure do you wan delete this group?',
     		buttons : Ext.Msg.YESNO,
     		icon : Ext.Msg.QUESTION,
     		fn : function(btn, text){
    			if (btn == 'yes'){
					me.deleteGrid('idAdminGroupsGrid','ExtDesk.php','Admin','Groups','Delete')   
    			}
     		}
		});    	
    	
    	
    },
    
    //*** Modules in Groups ***/
    
    updateModulesinGroup : function(opt){
    	
	   	var me=this;
    	
    	var p=Ext.getCmp("idPanelModulesinGroup");
    	if (!p.collapsed){
	   		var id=Ext.getCmp("idAdminGroupsGrid").getSelectionModel().selected.items[0].data.id;
    		me.storeModulesinGroup.load({params:{"id":id}});
    		me.storeActionsinGroup.load({params:{"id":id}});
    		
    	}
    
    },
    
    saveModulesinGroup : function(opt){
		var me=this;
		var me=this;
		var id=Ext.getCmp("idAdminGroupsGrid").getSelectionModel().selected.items[0].data.id;
		me.saveGrid('idAdminModulesinGroupGrid','ExtDesk.php','Admin','ModulesinGroups','Save',
		{params:{"id":id}});
    }, 

	updateActionsinGroup : function(opt){
		var me=this;
		
		var p=Ext.getCmp("idPanelModulesinGroup");
    	if (!p.collapsed){
	   		var js=Ext.getCmp("idAdminModulesinGroupGrid").getSelectionModel().selected.items[0].data.js;
	   		var id=Ext.getCmp("idAdminGroupsGrid").getSelectionModel().selected.items[0].data.id;
    		me.storeActionsinGroup.load({params:{"module":js,"id":id}});
    	}
	
	},
	
	saveActionsinGroup : function(opt){
		var me=this;
		var js=Ext.getCmp("idAdminModulesinGroupGrid").getSelectionModel().selected.items[0].data.js;
		var id=Ext.getCmp("idAdminGroupsGrid").getSelectionModel().selected.items[0].data.id;
		me.saveGrid('idAdminActionsinGroupGrid','ExtDesk.php','Admin','ActionsinGroups','Save',
		{params:{"id":id,"module":js}});
	}
	
});