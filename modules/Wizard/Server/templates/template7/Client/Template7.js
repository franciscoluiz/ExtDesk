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
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('--[moduleLow]---win');				// 5.- We obtain the id of win,
        if(!win){
            win = desktop.createWindow({							
                id: '--[moduleLow]---win',									// 6.- if the win don't exist, we create this
                title:'--[module]--',								// 7.- the title of win
                width:300,											// 8.- the win's width
                height:300,											// 9.- the win's height
                iconCls: 'icon---[moduleLow]--',							//10.- the win's icon
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
				items: [
                    {
                        xtype: 'tabpanel',
                        activeTab:0,
                        bodyStyle: 'padding: 5px;',

                        items: [{
                            title: 'Tab Text 1',
                            header:false,
                            html : '<p>Something useful would be in here.</p>',
                            border:false
                        },{
                            title: 'Tab Text 2',
                            header:false,
                            html : '<p>Something useful would be in here.</p>',
                            border:false
                        },{
                            title: 'Tab Text 3',
                            header:false,
                            html : '<p>Something useful would be in here.</p>',
                            border:false
                        },{
                            title: 'Tab Text 4',
                            header:false,
                            html : '<p>Something useful would be in here.</p>',
                            border:false
                        }]
                    }
                ]
			})
        }
        win.show();
        return win;
    }
});

	
