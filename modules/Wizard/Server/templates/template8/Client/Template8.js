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
        this.launcher = {
            text: '--[module]--',								// 3.- The name of the shortcut aka launcher
            iconCls:'icon---[moduleLow]--',									// 4.- Changes the icon of the module
            handler : this.createWindow,
            scope: this
        };
       Ext.Loader.loadScript( './client/ux/DynamicGridPanel/DynamicGridPanel.js' );
    },

    createWindow : function(){
        
        var me=this;
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('--[moduleLow]---win');				// 5.- We obtain the id of win,
        
        /*** we need a model***/
        Ext.define('--[moduleLow]--_dynamicModel', {
			extend: 'Ext.data.Model',
				proxy: {
					type: 'rest',
					url: 'ExtDesk.php',
					extraParams: {
					Module: '--[moduleLow]--',
					option: 'Table',
					action: 'List'
				},

			}
		});
		/*** we need a store **/
		me.myStore = Ext.create('Ext.data.Store', {
		         model:'--[moduleLow]--_dynamicModel',
		         autoLoad:true,
		});

		/*** we need a editor**/
		me.editor = Ext.create('Ext.grid.plugin.CellEditing', {
        	clicksToEdit: 2
    	});

		/*** we need a grid, in a grid example obvious ***/
		me.myGrid = {
			xtype 				: 'dynamicgrid',				//	<-- 	our ux crud component
			id 					: '--[moduleLow]--_grid_id',			
			forceFit 			: true,	
			selType 			: 'cellmodel',
			store 				: me.myStore,					//	<--		store
			plugins 			: [me.editor],					//	<--		with editor
			crudId 				: 'id',							//	<--		id key
			crudPagination 		: false,						//	<--		pagination if we need it...
			crudRefresh 		: true,							//	<--		buton refresh
			crudUrl				: 'ExtDesk.php',				//	<--		url to call default	ExtDesk.php to mantain permisions working
			crudModule 			: '--[moduleLow]--',						//	<--		Name of de module 
			crudOption 			: 'Table',						//	<--		option metodh
			//crudAdd			: true,								//	<-- 	buttons
			//crudDelete 			: true,
			//crudSave 			: true,
			//crudCancel 			: false,
			//crudInsertBottom 		: true,
			//crudDefault1 			: 'data1',
			//crudDefaultGet1 		: 'id_catalogo_field',
			//listeners: {
					//cellclick: function(gridView,htmlElement,columnIndex,dataRecord){
					//me.selectCustomer(dataRecord);
			//	}
			//}
		};
        if(!win){
            win = desktop.createWindow({							
                id: '--[moduleLow]---win',									// 6.- if the win don't exist, we create this
                title:'--[module]--',								// 7.- the title of win
                width:300,											// 8.- the win's width
                height:300,											// 9.- the win's height
                iconCls: 'icon---[moduleLow]--',							//10.- the win's icon
                animCollapse:false,
                constrainHeader:true,
                layout: 'border',
				items: [
	                {
	                    xtype :  'panel',
	                    region : 'center',
	                	layout :'fit',
	                	items : [me.myGrid]
	                }
	           ]
			})
        }
        win.show();
        return win;
    }
});

	
