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

   requires: [
        'Ext.form.field.HtmlEditor'
        //'Ext.form.field.TextArea'
    ],

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
                width:600,											// 8.- the win's width
                height:400,											// 9.- the win's height
                iconCls: 'icon---[moduleLow]--',							//10.- the win's icon
                animCollapse:false,
                border: false,
                //defaultFocus: 'notepad-editor', EXTJSIV-1300

                // IE has a bug where it will keep the iframe's background visible when the window
                // is set to visibility:hidden. Hiding the window via position offsets instead gets
                // around this bug.
                hideMode: 'offsets',

                layout: 'fit',
                items: [
                    {
                        xtype: 'htmleditor',
                        //xtype: 'textarea',
                        id: 'notepad-editor',
                        value: [
                            'Some <b>rich</b> <font color="red">text</font> goes <u>here</u><br>',
                            'Give it a try!'
                        ].join('')
                    }
                ]
            });
        }
        win.show();
        return win;
    }
});

	
