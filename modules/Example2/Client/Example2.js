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

Ext.define('MyDesktop.Modules.Example2.Client.Example2', {			// 1.- Steep One define the name of the module
    extend: 'Ext.ux.desktop.Module',

    id:'example2-win',												// 2.- Define the id of window of the module

    init : function(){
        var me = this;
        
        this.launcher = {
            text: 'Example Module 2',								// 3.- The name of the shortcut aka launcher/
            iconCls:'icon-example',									// 4.- Changes the icon of the module
            handler : this.createWindow,
            scope: this
        };	
        															// 14.-Define de Model to use 
		Ext.regModel('ImageEx', {
		Fields: [
				{ name : 'id', 	type : 'string'},
				{ name : 'src', 	type : 'string'},
				{ name : 'title', 	type : 'string'},
				{ name : 'caption',	type : 'string'}
			]
		});															
    																// 15.-We create a store to load the images

    	me.store=Ext.create('Ext.data.Store', {
			id:'imagesStore',
			model: 'ImageEx',
			data: [
				{id : 'option1ex', src:'modules/Example2/Client/Resources/images/example_48x48.png', 	title : "Option 1",	caption : "this is the option one"},
				{id : 'option1ex', src:'modules/Example2/Client/Resources/images/example_48x48.png', 	title : "Option 2",	caption : "this is another option"},
				{id : 'option1ex', src:'modules/Example2/Client/Resources/images/example_48x48.png', 	title : "Option 3",	caption : "yeah, we have three options"},
				{id : 'option1ex', src:'modules/Example2/Client/Resources/images/example_48x48.png', 	title : "Option 4",	caption : "One more option"}
				]
		});
																	//16.-We create a template to use

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
        var win = desktop.getWindow('example2-win');				// 5.- We obtain the id of win,
        if(!win){
            win = desktop.createWindow({							
                id: 'example2-win',									// 6.- if the win don't exist, we create this
                title:'Example Window 2',							// 7.- the title of win
                width:540,											// 8.- the win's width
                height:380,											// 9.- the win's height
                iconCls: 'icon-example',							//10.- the win's icon
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
               //html : 'We Second Module'							//11.-  the module body
   
                items:{												//17.- create a tab panel
	                id:'example2TabPanel',
					xtype: 'tabpanel',				
	                activeTab:0,
	                bodyStyle: 'padding: 5px;',
	                layout:'border',				
					//html: 'text'
					items :[		
						{				
							id : 'example2Tab0',					//18.- create the menu panel and set the title
							title: "Menu",
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
		var tab1=Ext.getCmp('example2Tab1');
		if (tab1==undefined){
			me.tab1= Ext.create('Ext.form.Panel', {
					id : 'example2Tab1',
					title : 'Tab 1',
					closable:true,
					html:'This is Tab 1'
			}); 
			var tab0 = Ext.getCmp('example2TabPanel');
			var tab1 = Ext.getCmp('example2Tab1');		
		}
		tab0.add(tab1);
		tab1.show();
    },

    openOption2 : function(opt){
		var me = this;
		var tab2=Ext.getCmp('example2Tab2');
		if (tab2==undefined){
			me.tab2= Ext.create('Ext.form.Panel', {
					id : 'example2Tab2',
					title : 'Tab 2',
					closable:true,
					html:'This is Tab 2'
			}); 
			var tab0 = Ext.getCmp('example2TabPanel');
			var tab2 = Ext.getCmp('example2Tab2');		
		}
		tab0.add(tab2);
		tab2.show();
    },
	openOption3 : function(opt){
		var me = this;
		var tab3=Ext.getCmp('example2Tab3');
		if (tab3==undefined){
			me.tab3= Ext.create('Ext.form.Panel', {
					id : 'example2Tab3',
					title : 'Tab 3',
					closable:true,
					html:'This is Tab 3'
			}); 
			var tab0 = Ext.getCmp('example2TabPanel');
			var tab3 = Ext.getCmp('example2Tab3');		
		}
		tab0.add(tab3);
		tab3.show();
    },
	
	openOption4 : function(opt){
		var me = this;
		var tab4=Ext.getCmp('example2Tab4');
		if (tab4==undefined){
			me.tab4= Ext.create('Ext.form.Panel', {
					id : 'example2Tab4',
					title : 'Tab 4',
					closable:true,
					html:'This is Tab 4'
			}); 
			var tab0 = Ext.getCmp('example2TabPanel');
			var tab4 = Ext.getCmp('example2Tab4');		
		}
		tab0.add(tab4);
		tab4.show();
    },
});


