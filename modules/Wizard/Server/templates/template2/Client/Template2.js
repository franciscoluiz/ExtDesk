/*
This file is part of ExtDesk, and was generated with Wizard Module

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

*/
/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.Modules.--[module]--.Client.--[module]--', {			// 1.- Steep One define the name of the module
    extend: 'Ext.ux.desktop.Module',

    id:'--[moduleLow]---win',												// 2.- Define the id of window of the module

    init : function(){
        var me = this;
        
        this.launcher = {
            text: '--[module]-- Module ',								// 3.- The name of the shortcut aka launcher/
            iconCls:'icon---[moduleLow]--',									// 4.- Changes the icon of the module
            handler : this.createWindow,
            scope: this
        };	
        															// 14.-Define de Model to use 
		//Ext.regModel('ImageEx', {
		 if (! Ext.ClassManager.isCreated('--[moduleLow]--Model')) {
			Ext.define('--[moduleLow]--Model', {
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
			id:'--[moduleLow]--ImagesStore',
			model: '--[moduleLow]--Model',
			data: [
--[loop1]--
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
        var win = desktop.getWindow('--[moduleLow]---win');				// 5.- We obtain the id of win,
        if(!win){
            win = desktop.createWindow({							
                id: '--[moduleLow]---win',									// 6.- if the win don't exist, we create this
                title:'--[module]--',							// 7.- the title of win
                width:540,											// 8.- the win's width
                height:380,											// 9.- the win's height
                iconCls: 'icon---[moduleLow]--',							//10.- the win's icon
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
               //html : 'We Second Module'							//11.-  the module body
   
                items:{												//17.- create a tab panel
	                id:'--[moduleLow]--TabPanel',
					xtype: 'tabpanel',				
	                activeTab:0,
	                bodyStyle: 'padding: 5px;',
	                layout:'border',				
					//html: 'text'
					items :[		
						{				
							id : '--[moduleLow]--Tab0',					//18.- create the menu panel and set the title
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
											
											switch(index) {
--[loop2]--
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
   
--[loop3]--
   
});
