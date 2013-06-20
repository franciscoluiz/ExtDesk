/*
This file is part of Ext JS 4
Copyright (c) 2011 Sencha Inc
Contact:  http://www.sencha.com/contact
GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.
If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.
*/

/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.Settings', {
    extend: 'Ext.window.Window',

    uses: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.form.field.Checkbox',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Border',
        'Ext.ux.desktop.Wallpaper',
        'MyDesktop.WallpaperModel'
    ],
    layout: 'anchor',
    iconCls:'settings',
    title: userStore.strings().findRecord("alias","changeSettings").data.string,
    modal: true,
    width: 540,
    height: 400,
    border: false,
    lang:Array,

    initComponent: function () {
        var me = this;
		
        /**Languaje**/
        this.lang["wallpaper"]			= userStore.strings().findRecord("alias","set_wallpaper").data.string;
        this.lang["wallpaper_label"]	= userStore.strings().findRecord("alias","set_wallpaper_label").data.string;
        this.lang["selectImage"]		= userStore.strings().findRecord("alias","set_selectImage").data.string;
        this.lang["stretch"]			= userStore.strings().findRecord("alias","set_stretch").data.string;        
        this.lang["preview"]			= userStore.strings().findRecord("alias","set_preview").data.string;        
        this.lang["shortcut"]			= userStore.strings().findRecord("alias","set_shortcut").data.string;
        this.lang["shortcut_label"]		= userStore.strings().findRecord("alias","set_shortcut_label").data.string;
        this.lang["quicklaunch"]		= userStore.strings().findRecord("alias","set_quicklaunch").data.string;
        this.lang["quicklaunch_label"]	= userStore.strings().findRecord("alias","set_quicklaunch_label").data.string;
        this.lang["settings"]			= userStore.strings().findRecord("alias","settings").data.string;
		this.lang["themes"]				= userStore.strings().findRecord("alias","set_themes").data.string;
		this.lang["themes_label"]		= userStore.strings().findRecord("alias","set_themes_label").data.string;
		this.lang["selectTheme"]		= userStore.strings().findRecord("alias","set_selectTheme").data.string;
		this.lang["none"]				= userStore.strings().findRecord("alias","set_none").data.string;		
		this.lang["save"]				= userStore.strings().findRecord("alias","common_save").data.string;
        this.lang["cancel"]				= userStore.strings().findRecord("alias","common_cancel").data.string;
		this.lang["saving_data"] 		= userStore.strings().findRecord("alias","common_saving_data").data.string;
		this.lang["saving"] 			= userStore.strings().findRecord("alias","common_saving_single").data.string;		
		this.lang["server_error"] 		= userStore.strings().findRecord("alias","common_server_error").data.string;
		this.lang["no_changes"]			= userStore.strings().findRecord("alias","common_no_changes").data.string;
		this.lang["update_to_see"]		= userStore.strings().findRecord("alias","set_update_to_see").data.string;		

        /**
		* Define de top Menu :)
		**/
		
		if (! Ext.ClassManager.isCreated('set_mod_image')) {
			Ext.define('set_mod_image', {
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
		
		me.store=Ext.create('Ext.data.Store', {
			id:'imagesStore',
			model: 'set_mod_image',
			data: [
				{id : 'wallpaper', 	src:'resources/images/tango/preferences-desktop-wallpaper_48x48.png', 	title :this.lang["wallpaper"],		caption : this.lang["wallpaper_label"]},
				{id : 'shortcut',  	src:'resources/images/tango/preferences-desktop-shorcut_48x48.png',		title :this.lang["shortcut"],		caption : this.lang["shortcut_label"]},
				{id : 'qLaunch', 	src:'resources/images/tango/preferences-desktop-quick-launch_48x48.png',title :this.lang["quicklaunch"],	caption : this.lang["quicklaunch_label"]},
				{id : 'themes', 	src:'resources/images/tango/preferences-desktop-theme_48x48.png', 		title :this.lang["themes"],			caption : this.lang["themes_label"]}
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

 		me.items = [
			{	
               	id:'settingsTabPanel',
				xtype: 'tabpanel',				
                activeTab:0,
                //bodyStyle: 'padding: 5px;',
                layout:'border',				
				items:[
						{	// Settings Tab
							iconCls:'settings',
							id : 'SettingsTab',
							title: this.lang["settings"],
							header:false,
							border:false,
							layout:'anchor',
							//TODO: fix layout
							width:525,
			                height:325,
							items :
								Ext.create('Ext.view.View', {
									//xtype:'dataview',
									store: me.store,//Ext.data.StoreManager.lookup('imagesStore'),
									tpl: me.imageTpl,
									itemSelector: 'div.thumb-wrap',
									emptyText: 'No images available',
									overClass: 'x-view-over',
									singleSelect: true, 
									listeners: {
										itemclick:function(view,record,item,index,e,options){

											switch(index) {
												case 0 : me.openTabWallpaper();
														break;
												case 1 : me.openTabShortcuts();
														break;											
												case 2 : me.openTabQuickLaunch();												
														break;
												case 3 : me.openTabTheme();
														
											}					
										}
									}		
								
							})
						}
					]
			}
	
		]

        me.callParent();
    },
	
	openTabWallpaper : function(){
		var me = this;

		me.selected = me.desktop.getWallpaper();
        me.stretch = me.desktop.wallpaper.stretch;

        me.preview = Ext.create('widget.wallpaper');
        me.preview.setWallpaper(me.selected);
        me.tree = me.createTreeWallpaper();
		
		
		var tw=Ext.getCmp('preferTabWallpaper');
		if (tw==undefined){
			
			//TODO : Panel wallpaper Tab
			me.colorPicker = Ext.create('Ext.menu.ColorPicker', {
		    	value: '000000',
				select:function(a){

					console.log(a);				

				},
				scope:this
			});

			
			me.tabWallpaper = Ext.create('Ext.Panel',{
				iconCls:'preferences-wallpaper',
				id : 'preferTabWallpaper',
				title: this.lang["wallpaper"],
                closable:true,
                layout: 'border',
                width:525,
                height:325,
                //html : 'We first module'							//11.-  the module body
 				items : [
 					me.tree,
					{
					
						xtype: 'panel',
						title: this.lang["preview"],
						region: 'center',
						layout: 'fit',
						items: [ me.preview ]
					}
				],
				dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'bottom',
                        statusAlign: 'right',
                        items: [
                        	{
								xtype: 'checkbox',
								boxLabel: this.lang["stretch"],
								checked: me.stretch,
								listeners: {
									change: function (comp) {
										me.stretch = comp.checked;
									}
								}
                        	},
							{
        						text: 'choose a color',
        						menu: me.colorPicker
    						},                        	
                            '->',
                            {
                                xtype: 'button',                        
                                text: this.lang["save"],
                                handler: me.onOkWallpaper, 
                                scope: me
                            },
                            {
                                xtype: 'button',
                                text: this.lang["cancel"],
                                handler:me.close, 
                                scope: me
                            }
                        ]
                    }
                ]

			});
                
			var sp = Ext.getCmp('settingsTabPanel');
			var tw = Ext.getCmp('preferTabWallpaper');
			sp.add(tw);
		}
		tw.show();
				
	},
    
	openTabShortcuts : function(){
		var me = this;
		var ts=Ext.getCmp('preferTabShortcutsForm');
		me.userStore=userStore;
		
		if (ts==undefined){
			me.tabShortcutForm= Ext.create('Ext.form.Panel', {
				iconCls:'preferences-shorcut',
				id : 'preferTabShortcutsForm',
				title : this.lang["shortcut"],
				bodyStyle: 'padding: 15px;',
				closable:true,
                                width:525,
                                height:325,
				dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'bottom',
                        statusAlign: 'right',
                        items: [
                            '->',
                            {
                                xtype: 'button',
                                text: this.lang['save'],
                                handler: me.onOkShortcuts, 
                                scope: me
                            },
                            {
                                xtype: 'button',
                                text: this.lang['cancel'],
                                handler:me.close, 
                                scope: me
                            }
                        ]
                    }
                ]
										
			});
									
			this.userStore.modules().each(function(module) {
				if (module.get("shorcut")==1){
					var checked=true;
				}else{
					var checked=false;				
				}
				var id="id_check_sc_"+module.get("module");
				me.tabShortcutForm.add({
 						id : id,
 						xtype: 'checkboxfield',
    					fieldLabel: '',
    					boxLabel: module.get("name"),
    					anchor: '100%',
    					checked: checked,
    					handler: me.clickOnShortcut
					}					
				);
				
			});
			
			var sp = Ext.getCmp('settingsTabPanel');
			var ts = Ext.getCmp('preferTabShortcutsForm');
			sp.add(ts);
			
		}
		ts.show();

	},
		
	openTabQuickLaunch : function(){
		var me = this;
		var tq=Ext.getCmp('preferTabQuickLaunchForm');
		
		me.userStore=userStore;
		
		if (tq==undefined){
			me.tabQLaunchForm= Ext.create('Ext.form.Panel', {
				iconCls:'preferences-quick-launch',
				id : 'preferTabQuickLaunchForm',
				title : this.lang["quicklaunch"],
				bodyStyle: 'padding: 15px;',
				closable : true,
				header:false,
				border:false,
                                width:525,
                                height:325,
				dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'bottom',
                        statusAlign: 'right',
                        items: [
                            '->',
                            {
                                xtype: 'button',
                                text: this.lang['save'],
                                handler: me.onOkQLaunch, 
                                scope: me
                            },
                            {
                                xtype: 'button',
                                text: this.lang['cancel'],
                                handler:me.close, 
                                scope: me
                            }
                        ]
                    }
                ]
				
				
										
			});

			this.userStore.modules().each(function(module) {
				if (module.get("qLaunch")==1){
					var checked=true;
				}else{
					var checked=false;				
				}
					var id="id_check_ql_"+module.get("module");
					me.tabQLaunchForm.add({
						id:id,
						xtype: 'checkboxfield',
						fieldLabel: '',
						boxLabel: module.get("name"),
						anchor: '100%',
						checked:checked,
						handler: me.clickOnQLaunch
					}					
			);
				
			});
			
			var sp = Ext.getCmp('settingsTabPanel');
			var tq = Ext.getCmp('preferTabQuickLaunchForm');
			sp.add(tq);
			
		}
		tq.show();
	},
	
	openTabTheme : function(){
		
		var me = this;

		var selectTheme=Tools.readCookie("EDtheme");
		if (selectTheme==null){
			Tools.createCookie("EDtheme","classic",365);
			selectTheme="classic";
		}

		console.log(selectTheme);
		
		//var getPath = location.href.substring(0,location.href.lastIndexOf("/"));		
		
		//var selectTheme=Ext.getDom('idTheme').href.replace(getPath + "/extjs/resources/css/ext-all-", "", "");
		
		//selectTheme='resources/themes/'+selectTheme.replace(".css",".jpg");
		
		me.previewTheme = Ext.create('widget.wallpaper');
        //me.previewTheme.setWallpaper(selectTheme);
        
        me.treeTheme = me.createTreeTheme();
		
		var tt=Ext.getCmp('preferTabTheme');
		if (tt==undefined){
			
			me.tabTheme= Ext.create('Ext.Panel', {
				iconCls:'preferences-theme',
				id : 'preferTabTheme',
				title: this.lang["themes"],
				closable : true,
				header:false,
				border:false,
				layout:'border',		
                                width:525,
                                height:325,
				items:							
					[
						/*{
							anchor: '0 -30',
							border: false,
							layout: 'border',
							items: [*/
								me.treeTheme,
								{
									xtype: 'panel',
									region: 'center',
									layout: 'fit',
									title: this.lang["preview"],
									items: [ me.previewTheme ]
								}
						//	]
						//}
				],
				dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'bottom',
                        statusAlign: 'right',
                        items: [
                            '->',
                            {
                                xtype: 'button',
								text: this.lang['save'],				
                                handler: me.onOkTheme, 
                                scope: me
                            },
                            {
                                xtype: 'button',
								text: this.lang['cancel'],
                                handler:me.close, 
                                scope: me
                            }
                        ]
                    }
                ]
				
			});			
 	
			var sp = Ext.getCmp('settingsTabPanel');
			var tt = Ext.getCmp('preferTabTheme');
			sp.add(tt);
		}
		tt.show();
	},
	
/*
 * Wallpaer methods
 */
	createTreeWallpaper : function() {
        //TODO : Createwallpaper method.
        
        var me = this;

        function child (img) {
            return { img: img, text: me.getTextOfWallpaper(img), iconCls: me.getTextOfIcoWallpaper(img), leaf: true };
        }

        var tree = new Ext.tree.Panel({
            title: this.lang['selectImage'],
            rootVisible: false,
            lines: false,
            autoScroll: true,
            width: 170,
            region: 'west',
            //layout:'fit',
            split: true,
            minWidth: 100,
            listeners: {
                afterrender: { fn: this.setInitialSelection, delay: 100 },
                select: this.onSelectWallpaper,
                scope: this
            },
            store: new Ext.data.TreeStore({
                model: 'MyDesktop.WallpaperModel',
                root: {
                    text:this.lang['wallpaper'],
                    expanded: true,
                    children:[
                        { text: this.lang["none"], iconCls: 'ico-None', leaf: true },
                        child('Blue-Sencha.jpg'),
                        child('Dark-Sencha.jpg'),
                        child('Wood-Sencha.jpg'),
                        child('blue.jpg'),
                        child('desk.jpg'),
                        child('desktop1.jpg'),
                        child('desktop2.jpg'),
                        child('sky.jpg')
                    ]
                }
            })
        });

        return tree;
    },

    getTextOfWallpaper: function (path) {
        var text = path, slash = path.lastIndexOf('/');
        if (slash >= 0) {
            text = text.substring(slash+1);
        }
        var dot = text.lastIndexOf('.');
        text = Ext.String.capitalize(text.substring(0, dot));
        text = text.replace(/[-]/g, ' ');
        
		return text;
    },

	getTextOfIcoWallpaper: function (path) {
        var text = path, slash = path.lastIndexOf('/');
        if (slash >= 0) {
            text = text.substring(slash+1);
        }
        var dot = text.lastIndexOf('.');
        text = Ext.String.capitalize(text.substring(0, dot));
        text = 'ico-'+text.replace(/[-]/g, '-');
        
		return text;
    },
	
    onOkWallpaper: function () {
    
        var me = this;
        
        if (me.selected) {
        	
  			wp=me.getTextOfIcoWallpaper(me.selected);        	
        	//FIXME : LANG
			Ext.MessageBox.show({
				msg: me.lang["saving_data"],
				progressText: me.lang["saving_data"],
				width:300,
				wait:true,
				waitConfig: {interval:100}
			});    	
        	
        	//save in the server
        	Ext.Ajax.request({
				url: 'ExtDesk.php',
    			method:'GET',
    			params: { 
    				Module: 'Settings',
    				option: 'Wallpaper',
    				action:'save',
    				p1:wp,				
    				p2:me.stretch
    			},
    			success: function(r){
        			var resp=Ext.decode(r.responseText,true);	//decode respond 
        			if (resp){
	        			if (resp.success){
							me.desktop.setWallpaper(me.selected, me.stretch);        	
	        				me.destroy();
	        				Ext.MessageBox.hide();     				
	        			}else{
	        				Ext.MessageBox.hide();
	        				Ext.MessageBox.alert(me.lang["settings"]+" > "+me.lang["wallpaper"]+ " Error ",resp.msg);
	        			}
        			}else{
        				Ext.MessageBox.hide();
        				Ext.MessageBox.alert(me.lang["settings"]+" > "+me.lang["wallpaper"]+ " Error", me.lang["server_error"]);
        				
        			}
    			}//sucess
			})//Ajax;	
        }//if
    },

    onSelectWallpaper: function (tree, record) {
        var me = this;

        if (record.data.img) {
            me.selected = 'resources/wallpapers/' + record.data.img;
        } else {
            me.selected = Ext.BLANK_IMAGE_URL;
        }

        me.preview.setWallpaper(me.selected);
    },

    setInitialSelection: function () {
        var s = this.desktop.getWallpaper();
        if (s) {
            var path = '/resources/wallpapers/' + this.getTextOfWallpaper(s);
            this.tree.selectPath(path, 'text');
        }
    },

    setInitialSelectionTheme: function () {
        var s = this.desktop.getWallpaper();
        if (s) {
            var path = '/resources/wallpapers/' + this.getTextOfWallpaper(s);
            this.treeTheme.selectPath(path, 'text');
        }
    },

	//*** Other Methods ***/

    onOkShortcuts : function(){
    	var me = this;    	
    	var params = [];
    	var updates=userStore.modules().getUpdatedRecords();
    	Ext.each(updates,function(upd,i){
			params.push(upd.data);	
		});
		Ext.MessageBox.show({msg: this.lang["saving_data"],progressText: this.lang["saving"],	width:300,wait:true,waitConfig: {interval:50},modal:true});
		// If exist changes...
		if (params.length >0){
			// transform to Json
			var json=Ext.encode(params);
			//call Ajax
			Ext.Ajax.request({
			    url: 'ExtDesk.php',
			    method:'GET',
			    params: {
			    	Module : 'Settings',
			    	option : 'Shortcuts',
			    	action : 'Save',
			    	jsonp  : json
			    },
			    success: function(response){
					var text = response.responseText;
			       	if (text!=""){
			       		Ext.MessageBox.hide();
				        var resp=Ext.decode(text);
				        if(resp.success){				        	
				        	me.destroy();
				        }else{
				        	Ext.Msg.alert(me.lang["settings"]+" > "+me.lang["shortcut"]+ " Error", me.lang["server_error"]+'<b>'+resp.msg+'</b>')
				        }			       		
			       	}else{
					    Ext.MessageBox.hide();
					    Ext.Msg.alert(me.lang["settings"]+" > "+me.lang["shortcut"]+ " Error", me.lang["server_error"])
			       	}
			    }
	       	});
		}else{
			Ext.MessageBox.hide();
			Ext.Msg.alert(module, this.lang["no_changes"]);			
		}    	
    },

	onOkQLaunch : function(){
    	var me = this;    	
    	var params = [];
    	var updates=userStore.modules().getUpdatedRecords();
    	    	
    	Ext.each(updates,function(upd,i){
			params.push(upd.data);	
		});
		Ext.MessageBox.show({msg: this.lang["saving_data"],progressText: this.lang["saving"],	width:300,wait:true,waitConfig: {interval:50},modal:true});
		// If exist changes...
		if (params.length >0){
			// transform to Json
			var json=Ext.encode(params);
			//call Ajax
			Ext.Ajax.request({
			    url: 'ExtDesk.php',
			    method:'GET',
			    params: {
			    	Module : 'Settings',
			    	option : 'QLaunchs',
			    	action : 'Save',
			    	jsonp  : json
			    },
			    success: function(response){
					var text = response.responseText;
			       	if (text!=""){
			       		Ext.MessageBox.hide();
				        var resp=Ext.decode(text);
				        if(resp.success){				        	
				        	Ext.Msg.confirm('QLaunch Guardados',me.lang["update_to_see"],function(res){
				        		if (res=="yes"){
				        			window.location.reload();
				        		}else{
				        			me.destroy();				        			
				        		}				        		
				        	});
				        }else{
				        	Ext.Msg.alert(me.lang["settings"]+" > "+me.lang["quicklaunch"]+ " Error", me.lang["server_error"]+'<b>'+resp.msg+'</b>')
				        }			       		
			       	}else{
					    Ext.MessageBox.hide();
					    Ext.Msg.alert(me.lang["settings"]+" > "+me.lang["quicklaunch"]+ " Error", me.lang["server_error"])
			       	}
			    }
	       	});
		}else{
			Ext.MessageBox.hide();
			Ext.Msg.alert(module, this.lang["no_changes"]);			
		}
		
		
	},

	clickOnShortcut: function(e){
    	// Checkbox is checked..?
    	var checked=Ext.getCmp(e.id).getValue();
    	// Find in the user store, the module was clicked 
    	var module=userStore.modules().findRecord("name",e.boxLabel);
    	if (!checked){	// delete shortcut, the user doesn't want see this shortcut....
    		// save the state of this shorcut...
    		module.set('shorcut',0); 
    		// find and delete the shorcut of the dataview...
    		var record=Ext.data.StoreManager.lookup('id-shortcutsstore').findRecord("name",e.boxLabel);
			Ext.data.StoreManager.lookup('id-shortcutsstore').remove(record);
    		
    	}else{
    		// add shortcut, please sorry i want this shortcut
			// save the state of this shorcut...
			module.set('shorcut',1);
			// add the shortcut to de dateview.... 
    		Ext.data.StoreManager.lookup('id-shortcutsstore').add(
    			{
    				name : module.get('name'),
    				iconCls : module.get('iconCls'),
    				module : module.get('module')
    			}
    		);    		
    	}
    },
   
    clickOnQLaunch: function(e){
     	
    	// Checkbox is checked..?
    	var checked=Ext.getCmp(e.id).getValue();
    	// Find in the user store, the module was clicked 
    	var module=userStore.modules().findRecord("name",e.boxLabel);   	
    	    	
    	// delete qlaunch, the user doesn't want see this shortcut....
    	if (!checked){				
    		// save the state of this shorcut...
    		module.set('qLaunch',0); 
       	// add qlaunch, please sorry i want this shortcut       	
       	}else{				
       		// save the state of this shorcut...
			module.set('qLaunch',1);
		}   	
    },	
	
	//*** Themes Metodos ***/
	createTreeTheme : function() {
        var me = this;

        function child (img) {
            return { img: img, text: me.getTextOfWallpaper(img), iconCls: me.getTextOfIcoTheme(img), leaf: true };
        }

        var tree = new Ext.tree.Panel({
            title: this.lang["selectTheme"],
            rootVisible: false,
            lines: false,
            autoScroll: true, 
            width: 170,
            region: 'west',
            split: true,
            minWidth: 100,
            listeners: {
                afterrender: { fn: this.setInitialSelectionTheme, delay: 100 },
                select: this.onSelectTheme,
                scope: this
            },
            store: new Ext.data.TreeStore({
                model: 'MyDesktop.WallpaperModel',
                root: {
                    text:'Tema',
                    expanded: true,
                    //TODO: add themes here... and desktop.csss
                    children:[
                        child('access.png'),
                        child('classic.png'),
                        child('gray.png'),
                        child('extdesk-bird.png'),		
                        child('extdesk-book.png'),
                        child('extdesk-cyma.png'),
                        child('extdesk-extribute.png'),
                        child('extdesk-plus.png'),
                        child('extdesk-sencha.png'),
                        child('extdesk-pop.png'),
                        child('neptune.png'),
                        /*
                        child('numetal.jpg'),
                        child('pop.jpg'),
                        child('sabina.jpg'),
                        child('shunkti.jpg'),
                        */
                        
                    ]
                }
            })
        });

        return tree;
    },

	onOkTheme : function(){
		var me = this;
		var theme= me.getTextOfWallpaper(me.selectedTheme);
		
		theme = theme.toLowerCase();
		
		theme = theme.replace(' ','-');
		
		console.log(theme);
		
		var getPath = location.href.substring(0,location.href.lastIndexOf("/")+1);
		
		Tools.createCookie("EDtheme",theme,365);
		
		//Ext.getDom('idTheme').href= getPath + "extjs/resources/css/ext-all-"+theme+".css";
		// FIXME: workin here.
		
			Ext.MessageBox.show({
				msg: me.lang["saving_data"],
				progressText: me.lang["saving_data"],
				width:300,
				wait:true,
				waitConfig: {interval:100}
			});    	
        	
        	//save in the server
        	Ext.Ajax.request({
				url: 'ExtDesk.php',
    			method:'GET',
    			params: { 
    				Module : 'Settings',
    				option : 'Theme',
    				action :'save',
    				theme : theme				
    			},
    			success: function(r){
        			var resp=Ext.decode(r.responseText,true);	//decode respond 
        			if (resp){
	        			if (resp.success){
							//me.desktop.setWallpaper(me.selected, me.stretch);        	
	        				me.destroy();
	        				Ext.MessageBox.hide();
	        				window.location.reload();
	        			}else{
	        				Ext.MessageBox.hide();
	        				Ext.MessageBox.alert(me.lang["settings"]+" > "+me.lang["themes"]+ " Error ",resp.msg);
	        			}
        			}else{
        				Ext.MessageBox.hide();
        				Ext.MessageBox.alert(me.lang["settings"]+" > "+me.lang["themes"]+ " Error", me.lang["server_error"]);
        				
        			}
    			}//sucess
			})//Ajax;	

	},

    getTextOfIcoTheme: function (path) {
        var text = path, slash = path.lastIndexOf('/');
        if (slash >= 0) {
            text = text.substring(slash+1);
        }
        var dot = text.lastIndexOf('.');
        text = Ext.String.capitalize(text.substring(0, dot));
        text = 'ico-theme-'+text.replace(/[-]/g, '-');
		return text;
    
    },
   
    onSelectTheme : function (tree, record) {
        var me = this;

        if (record.data.img) {
            me.selectedTheme = 'resources/themes/' + record.data.img;
        } else {
            me.selectedTheme = Ext.BLANK_IMAGE_URL;
        }

        me.previewTheme.setWallpaper(me.selectedTheme);
        
    }


});

