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

Ext.Loader.setPath('Ext.ux', 'client/ux/CheckColumn');

Ext.define('MyDesktop.Modules.Admin.Client.Admin', {			// 1.- Steep One define the name of the module
    requires: [
    'Ext.tab.Panel',
    'Ext.ux.CheckColumn'
    ],
	
    extend: 'Ext.ux.desktop.Module',
    id:'admin-win',												// 2.- Define the id of window of the module/
    lang:Array,
    
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
        
        //this.lang["wallpaper"]= userStore.strings().findRecord("alias","wallpaper").data.string;
        this.lang["menu"] 			= userStore.strings().findRecord("alias","admin_menu").data.string;
        this.lang["userCaption"] 	= userStore.strings().findRecord("alias","admin_userCaption").data.string;
        this.lang["userLegend"] 	= userStore.strings().findRecord("alias","admin_userLegend").data.string;
        this.lang["modulesCaption"] = userStore.strings().findRecord("alias","admin_modulesCaption").data.string;
        this.lang["modulesLegend"]	= userStore.strings().findRecord("alias","admin_modulesLegend").data.string;
        this.lang["groupsCaption"]  = userStore.strings().findRecord("alias","admin_groupsCaption").data.string;
        this.lang["groupsLegend"]   = userStore.strings().findRecord("alias","admin_groupsLegend").data.string;

        //this.lang[""]=userStore.strings().findRecord("alias","").data.string;
        this.lang["add"]			= userStore.strings().findRecord("alias","common_add").data.string;
        this.lang["delete"]			= userStore.strings().findRecord("alias","common_delete").data.string;
        this.lang["save"]			= userStore.strings().findRecord("alias","common_save").data.string;
        this.lang["refresh"]		= userStore.strings().findRecord("alias","common_refresh").data.string;
		
        this.lang["id"]				= userStore.strings().findRecord("alias","admin_id").data.string;
        this.lang["user"]			= userStore.strings().findRecord("alias","admin_user").data.string;
        this.lang["password"]		= userStore.strings().findRecord("alias","admin_password").data.string;
        this.lang["email"]			= userStore.strings().findRecord("alias","admin_email").data.string;
        this.lang["extrainfo1"]		= userStore.strings().findRecord("alias","admin_extrainfo1").data.string;
        this.lang["extrainfo2"]		= userStore.strings().findRecord("alias","admin_extrainfo2").data.string;
        this.lang["extrainfo3"]		= userStore.strings().findRecord("alias","admin_extrainfo3").data.string;
        this.lang["active"]			= userStore.strings().findRecord("alias","admin_active").data.string;
		
        this.lang["groupsingle"]	= userStore.strings().findRecord("alias","admin_groupsingle").data.string;
        this.lang["actions"]		= userStore.strings().findRecord("alias","admin_actions").data.string;
        this.lang["modulesingle"]	= userStore.strings().findRecord("alias","admin_modulesingle").data.string;
        this.lang["option"] 		= userStore.strings().findRecord("alias","admin_option").data.string;
        this.lang["action"]			= userStore.strings().findRecord("alias","admin_action").data.string;
        this.lang["description"]	= userStore.strings().findRecord("alias","admin_description").data.string;
        this.lang["selected_mod"]	= userStore.strings().findRecord("alias","admin_selected_mods").data.string;
        this.lang["selected_actions"]= userStore.strings().findRecord("alias","admin_selected_actions").data.string;
        this.lang["parent"]= userStore.strings().findRecord("alias","admin_parent").data.string;
		
        this.lang["saving_data"] =	userStore.strings().findRecord("alias","common_saving_data").data.string;
        this.lang["saving"] =		userStore.strings().findRecord("alias","common_saving_single").data.string;		
        this.lang["server_error"] =	userStore.strings().findRecord("alias","common_server_error").data.string;
        this.lang["deleting"] =		userStore.strings().findRecord("alias","common_deleting").data.string;
        this.lang["delete_confirm_action"] = userStore.strings().findRecord("alias","admin_delete_confirm_action").data.string;
        this.lang["delete_confirm_group"]  = userStore.strings().findRecord("alias","admin_delete_confirm_group").data.string;		
        this.lang["delete_confirm_user"]   = userStore.strings().findRecord("alias","admin_delete_confirm_user").data.string;		
        this.lang["delete_confirm_module"] = userStore.strings().findRecord("alias","admin_delete_confirm_module").data.string;		
        this.lang["no_changes"]=		userStore.strings().findRecord("alias","common_no_changes").data.string;
		
        this.lang["delete_please_select"] =		userStore.strings().findRecord("alias","admin_delete_please_select").data.string;
		
		
        this.launcher = {
            text: 'Admin',											// 3.- The name of the shortcut aka launcher/
            iconCls:'icon-admin',									// 4.- Changes the icon of the module
            handler : this.createWindow,
            scope: this
        };
        this.loadCss("client/ux/CheckColumn/css/CheckHeader");
        
        /*** MODELS ***/        
        // model ImageAdmin
        if (! Ext.ClassManager.isCreated('ImageAdmin')) {
            Ext.define('ImageAdmin', {
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
				
        // model AdminUsers
        if (! Ext.ClassManager.isCreated('AdminUsers_model')) {
            Ext.define('AdminUsers_model', {
                extend: 'Ext.data.Model',
                fields: [
                {
                    name : 'id', 	
                    type: 'int'
                },

                {
                    name : 'username', 
                    type: 'string'
                },

                {
                    name : 'password', 
                    type: 'string'
                },

                {
                    name : 'email', 	
                    type: 'string'
                },

                {
                    name : 'extrainfo1', 
                    type: 'string'
                },

                {
                    name : 'extrainfo2', 
                    type: 'string'
                },

                {
                    name : 'extrainfo3', 
                    type: 'string'
                },

                {
                    name : 'active', 
                    type: 'boolean'
                }
                ]
            });
        }
		
        // model Modules 
        if (! Ext.ClassManager.isCreated('AdminModules')) {
            Ext.define('AdminModules', {
                extend: 'Ext.data.Model',
                fields: [
                {
                    name : 'id', 	
                    type: 'int'
                },

                {
                    name : 'js', 
                    type: 'string'
                },

                {
                    name : 'name', 
                    type: 'string'
                },

                {
                    name : 'iconCls', 	
                    type: 'string'
                },

                {
                    name : 'module', 
                    type: 'string'
                },

                {
                    name : 'iconLaunch', 
                    type: 'string'
                },
                ]
            });
        }

        // model Actions
        if (! Ext.ClassManager.isCreated('AdminActions')) {
            Ext.define('AdminActions', {
                extend: 'Ext.data.Model',
                fields: [
                {
                    name : 'id', 	
                    type: 'int'
                },

                {
                    name : 'module', 
                    type: 'string'
                },

                {
                    name : 'option', 
                    type: 'string'
                },

                {
                    name : 'action', 	
                    type: 'string'
                },
                ]
            });
        }		

        // model Groups
        if (! Ext.ClassManager.isCreated('AdminGroups')) {
            Ext.define('AdminGroups', {
                extend: 'Ext.data.Model',
                fields: [
                {
                    name : 'id', 	
                    type: 'int'
                },

                {
                    name : 'group', 
                    type: 'string'
                },

                {
                    name : 'description', 
                    type: 'string'
                },

                {
                    name : 'active', 
                    type: 'boolean'
                }
                ]
            });
        }		
		
        // model Modules in Group
        if (! Ext.ClassManager.isCreated('AdminModulesInGroup')) {
            Ext.define('AdminModulesInGroup', {
                extend: 'Ext.data.Model',
                fields: [
                {
                    name : 'parent', 
                    type: 'int'
                },

                {
                    name : 'id', 	
                    type: 'int'
                },

                {
                    name : 'js', 
                    type: 'string'
                },

                {
                    name : 'selected', 
                    type: 'boolean'
                }
                ]
            });
        }		
		
        // model Actions in Group
        if (! Ext.ClassManager.isCreated('AdminActionsInGroup')) {
            Ext.define('AdminActionsInGroup', {
                extend: 'Ext.data.Model',
                fields: [
                {
                    name : 'parent', 
                    type: 'int'
                },

                {
                    name : 'id', 	
                    type: 'int'
                },

                {
                    name : 'opt', 
                    type: 'string'
                },

                {
                    name : 'action', 
                    type: 'string'
                },

                {
                    name : 'selected', 
                    type: 'boolean'
                }
                ]
            });
        }				
		
        // model Groups in User
        if (! Ext.ClassManager.isCreated('AdminGroupsInUser')) {
            Ext.define('AdminGroupsInUser', {
                extend: 'Ext.data.Model',
                fields: [
                {
                    name : 'id', 	
                    type: 'int'
                },

                {
                    name : 'user', 	
                    type: 'int'
                },

                {
                    name : 'group', 
                    type: 'string'
                },

                {
                    name : 'selected', 
                    type: 'boolean'
                }
                ]
            });
        }		
		
        /*** Stores ***/
        // store Images
        me.store = Ext.create('Ext.data.Store', {
            id:'imagesStore',
            model: 'ImageAdmin',
            data: [
            {
                id : 'option1ex', 
                src:'modules/Admin/Client/Resources/images/system-users_48x48.png', 	
                title : this.lang["userCaption"] ,	
                caption : this.lang["userLegend"]
            },
{
                id : 'option1ex', 
                src:'modules/Admin/Client/Resources/images/modules_48x48.png', 	
                title : this.lang["modulesCaption"],	
                caption : this.lang["modulesLegend"]
                },

                {
                id : 'option1ex', 
                src:'modules/Admin/Client/Resources/images/groups_48x48.png', 	
                title : this.lang["groupsCaption"],	
                caption : this.lang["groupsLegend"]
                }
            ]
        });

        // Store Users
        me.storeUsers = Ext.create('Ext.data.Store',{
            id : 'AdminUsers',
            model : 'AdminUsers_model',
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
                        title: this.lang["menu"],
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
                                        case 0 :
                                            me.openUsersTab(index);
                                            break;
                                        case 1 :
                                            me.openModulesTab(index);
                                            break;											
                                        case 2 :
                                            me.openGroupsTab(index);												
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
    	    	    	
        Ext.MessageBox.show({
            msg: this.lang["saving_data"],
            progressText: this.lang["saving"],	
            width:300,
            wait:true,
            waitConfig: {
                interval:50
            },
            modal:true
        });    			
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
                            Ext.Msg.alert(module, this.lang["server_error"]+'<b>'+resp.msg+'</b>')
                        }			       		
                    }else{
                        Ext.MessageBox.hide();
                        Ext.Msg.alert(module, this.lang["server_error"])
                    }		        
			        			        
                }
            },this);
			
        }else{
            Ext.MessageBox.hide();
            Ext.Msg.alert(module, this.lang["no_changes"]);			
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
        editor.startEditByPosition({
            row: count, 
            column: 1
        });
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
            Ext.MessageBox.show({
                msg: this.lang["saving_data"],
                progressText: this.lang["saving"],	
                width:300,
                wait:true,
                waitConfig: {
                    interval:50
                }
            });
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
                    Ext.Msg.alert(module, this.lang["server_error"]+'<b>'+resp.msg+'</b>')
                }
			        		        
            }
        });
    }else{
        Ext.MessageBox.hide();
        Ext.Msg.alert(module, this.lang["delete_please_select"])        	
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
            title : this.lang["userCaption"],
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
                    text : this.lang["id"],
                    width : 40,
                    hidden:true
                },
                {
                    xtype : 'gridcolumn',
                    dataIndex : 'username',
                    text : this.lang["user"],
                    width : 75,
                    field: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'password',
                    text: this.lang["password"],
                    width : 75,
                    field: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'email',
                    text: this.lang["email"],
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
                    text: this.lang['extrainfo1'],
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
                    text: this.lang['extrainfo2'],
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
                    text: this.lang['extrainfo3'],
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
                    text: this.lang['active'],
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
                        text : this.lang["add"],
                        iconCls:'icon-admin-add',
                        handler: me.addUser,
                        scope:this                                            
                    },
                    {
                        xtype : 'button',
                        text : this.lang["delete"],
                        iconCls:'icon-admin-delete',
                        handler: me.deleteUser,
                        scope : this
                    },
                    {
                        xtype : 'button',
                        text : this.lang["save"],
                        iconCls:'icon-admin-save',
                        handler : me.saveUsers,
                        scope : this
                    },
                    {
                        xtype: 'button',
                        text: this.lang["refresh"],
                        iconCls:'icon-admin-refresh',
                        handler : me.updateUsers,
                        scope : this
                    }
                    ]
                }
                ]
            },
            {
                xtype: 'panel',
                id: 'idPanelGropusinUser',
                collapsed: true,
                collapsible: true,
                title: this.lang["groupsCaption"],
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
                        text : this.lang['id'],
                        width : 40,
                        hidden:true
                    },
                    {
                        xtype : 'numbercolumn',
                        dataIndex : 'user',
                        text : this.lang['user'],
                        width : 40,
                        hidden:true
                    },
                    {
                        xtype : 'gridcolumn',
                        dataIndex : 'group',
                        text : this.lang['groupsingle'],
                        width : 130
                    },
                    {
                        id :'adminCheckModulesinGroups',
                        xtype: 'checkcolumn',
                        dataIndex : 'selected',
                        text : this.lang['active'],
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
    	
    var record = Ext.create('AdminUsers_model',{
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
        title : this.lang["deleting"],
        msg : this.lang["delete_confirm_user"],
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
        me.StoreGroupsInUser.load({
            params:{
                "id":id
            }
        });
}
    	
},
    
saveGroupsinUser : function(opt){
    var me=this;
    var id=Ext.getCmp("idAdminUsersGrid").getSelectionModel().selected.items[0].data.id;
    me.saveGrid('idAdminGroupsInUserGrid','ExtDesk.php','Admin','GroupsinUser','Save',
    {
        params:{
            "id":id
        }
    });
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
            title : this.lang["modulesCaption"],
            iconCls : 'icon-admin-modules',
            closable : true,
            layout : 'border',
            items: [
            {
                xtype: 'panel',
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
                        hidden:true
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
                            text : this.lang["add"],//'Add',
                            iconCls:'icon-admin-add',
                            handler: me.addModules,
                            scope:this                                            
                        },
                        {
                            xtype : 'button',
                            text : this.lang["delete"],//'Delete',
                            iconCls:'icon-admin-delete',
                            handler: me.deleteModule,
                            scope : this
                        },
                        {
                            xtype : 'button',
                            text : this.lang["save"],//'Save',
                            iconCls:'icon-admin-save',
                            handler : me.saveModules,
                            scope : this
                        },
                        {
                            xtype: 'button',
                            text: this.lang["refresh"],//'Update',
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
                title: this.lang["actions"],//'Acciones',
                iconCls : 'icon-admin-actions',
                layout:'fit',
                width:'250',
                region: 'east',
                items:[
                {
                    id : 'idAdminActionsGrid',
                    layout:'fit',
                    width:300,
                    xtype: 'gridpanel',
                    store: me.storeActions,
                    plugins:[me.editorActions],
                    columns: [
                    {
                        xtype : 'numbercolumn',
                        dataIndex : 'id',
                        text : this.lang["id"],
                        width : 40
                    },
                    {
                        xtype : 'gridcolumn',
                        dataIndex : 'module',
                        text : this.lang["modulesingle"],
                        width : 85		                                    
                    },
                    {
                        xtype : 'gridcolumn',
                        dataIndex : 'option',
                        text : this.lang["option"],
                        width : 85,
                        field: {
                            xtype: 'textfield',
                            allowBlank: false
                        }
                    },                         
                    {
                        xtype : 'gridcolumn',
                        dataIndex : 'action',
                        text : this.lang["action"],
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
                        text : this.lang['add'],
                        iconCls:'icon-admin-add',
                        handler: me.addActions,
                        scope:this                                            
                    },
                    {
                        xtype : 'button',
                        text : this.lang['delete'],
                        iconCls:'icon-admin-delete',
                        handler: me.deleteActions,
                        scope : this
                    },
                    {
                        xtype : 'button',
                        text : this.lang['save'],
                        iconCls:'icon-admin-save',
                        handler : me.saveActions,
                        scope : this
                    },
                    {
                        xtype: 'button',
                        text: this.lang['refresh'],
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
	   //FIX: select data.js (by pixelead0)        	
            //var module=Ext.getCmp("idAdminModulesGrid").getSelectionModel().selected.items[0].data.name;
            var module=Ext.getCmp("idAdminModulesGrid").getSelectionModel().selected.items[0].data.js;
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
        iconLaunch :''
    });
    editor=me.editorModules;
		
    me.addGrid('idAdminModulesGrid',record,editor);
    
},
    
deleteModule:function(){
    var me=this;
    Ext.Msg.show({
        title : this.lang["deleting"],
        msg : this.lang["delete_confirm_module"],
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
    //FIX: select data.js (by pixelead0)        	    
    //var module=Ext.getCmp("idAdminModulesGrid").getSelectionModel().selected.items[0].data.name;
    var module=Ext.getCmp("idAdminModulesGrid").getSelectionModel().selected.items[0].data.js;
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
    	//FIX: select data.js (by pixelead0)        	    
        //var module=Ext.getCmp("idAdminModulesGrid").getSelectionModel().selected.items[0].data.name;
        var module=Ext.getCmp("idAdminModulesGrid").getSelectionModel().selected.items[0].data.js;
        me.storeActions.load({
            params:{
                "module":module
            }
        });
}
},
    
deleteActions:function(){
    var me=this;
    Ext.Msg.show({
        title :this.lang["deleting"],
        msg : this.lang["delete_confirm_action"],
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
            title : this.lang['groupsCaption'],
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
                        text : this.lang['id'],
                        width : 40
                    },
                    {
                        xtype : 'gridcolumn',
                        dataIndex : 'group',
                        text : this.lang['groupsingle'],
                        width : 130,
                        field: {
                            xtype: 'textfield',
                            allowBlank: false
                        }
                    },
                    {
                        xtype : 'gridcolumn',
                        dataIndex : 'description',
                        text : this.lang['description'],
                        width : 300,
                        field: {
                            xtype: 'textfield',
                            allowBlank: false
                        }
                    },                          
                    {
                        xtype: 'checkcolumn',
                        dataIndex : 'active',
                        text : this.lang['active'],
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
                            text: this.lang['add'],
                            iconCls:'icon-admin-add',
                            handler: me.addGroups,
                            scope:this                                            
                        },
                        {
                            xtype: 'button',
                            text: this.lang['delete'],
                            iconCls:'icon-admin-delete',
                            handler: me.deleteGroups,
                            scope:this                     
                                
                        },
                        {
                            xtype: 'button',
                            text: this.lang['save'],
                            iconCls:'icon-admin-save',
                            handler: me.saveGroups,
                            scope:this                                            
                        },
                        {
                            xtype: 'button',
                            text: this.lang['refresh'],
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
                    title:this.lang['selected_mod'],
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
                            text : this.lang['parent'],
                            width : 40,
                            hidden:true
                        },			                            
                        {
                            xtype : 'numbercolumn',
                            dataIndex : 'id',
                            text : this.lang['id'],
                            width : 40,
                            hidden:true
                        },
                        {
                            xtype : 'gridcolumn',
                            dataIndex : 'js',
                            text : this.lang['modulesingle'],
                            width : 130
                        },
                        {
                            id :'adminCheckModulesinGroups',
                            xtype: 'checkcolumn',
                            dataIndex : 'selected',
                            text : this.lang['active'],
                            width : 40,
                            editor: {
                                xtype: 'checkbox',
                                cls: 'x-grid-checkheader-editor'
                            }
                        }
                        ]
                    }
                    ]
                },
                {	
                    xtype:'panel',
                    region:'center',
                    title:this.lang['selected_actions'],
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
                            text : this.lang['parent'],
                            width : 40,
                            hidden:true
                        },			                            
                        {
                            xtype : 'numbercolumn',
                            dataIndex : 'id',
                            text : this.lang['id'],
                            width : 40,
                            hidden:true
                        },
                        {
                            xtype : 'gridcolumn',
                            dataIndex : 'opt',
                            text : this.lang['option'],
                            width : 130
                        },
                        {
                            xtype : 'gridcolumn',
                            dataIndex : 'action',
                            text : this.lang['action'],
                            width : 130
                        },
                        {
                            id:'adminCheckActionsinGroups',
                            xtype: 'checkcolumn',
                            dataIndex : 'selected',
                            text : this.lang['active'],
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
        tab0.add(tab3);	
    }
    
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
        title :this.lang["deleting"],
        msg : this.lang["delete_confirm_group"],
        buttons : Ext.Msg.YESNO,
        icon : Ext.Msg.QUESTION,
        fn : function(btn, text){
            if (btn == 'yes'){
                me.deleteGrid('idAdminGroupsGrid','ExtDesk.php','Admin','Groups','Delete')   
            }
        }
    });    	
    	
    	
},
    
/*** Modules in Groups ***/
    
updateModulesinGroup : function(opt){
    	
    var me=this;
    	
    var p=Ext.getCmp("idPanelModulesinGroup");
    if (!p.collapsed){
        var id=Ext.getCmp("idAdminGroupsGrid").getSelectionModel().selected.items[0].data.id;
        me.storeModulesinGroup.load({
            params:{
                "id":id
            }
        });
    me.storeActionsinGroup.load({
        params:{
            "id":id
        }
    });
    		
}
    
},
    
saveModulesinGroup : function(opt){
    var me=this;
    var me=this;
    var id=Ext.getCmp("idAdminGroupsGrid").getSelectionModel().selected.items[0].data.id;
    me.saveGrid('idAdminModulesinGroupGrid','ExtDesk.php','Admin','ModulesinGroups','Save',
    {
        params:{
            "id":id
        }
    });
}, 

updateActionsinGroup : function(opt){
    var me=this;
		
    var p=Ext.getCmp("idPanelModulesinGroup");
    if (!p.collapsed){
        var js=Ext.getCmp("idAdminModulesinGroupGrid").getSelectionModel().selected.items[0].data.js;
        var id=Ext.getCmp("idAdminGroupsGrid").getSelectionModel().selected.items[0].data.id;
        me.storeActionsinGroup.load({
            params:{
                "module":js,
                "id":id
            }
        });
}
	
},
	
saveActionsinGroup : function(opt){
    var me=this;
    var js=Ext.getCmp("idAdminModulesinGroupGrid").getSelectionModel().selected.items[0].data.js;
    var id=Ext.getCmp("idAdminGroupsGrid").getSelectionModel().selected.items[0].data.id;
    me.saveGrid('idAdminActionsinGroupGrid','ExtDesk.php','Admin','ActionsinGroups','Save',
    {
        params:{
            "id":id,
            "module":js
        }
    });
}
	
});
