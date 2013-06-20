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

    createTree : function(){
        var tree = Ext.create('Ext.tree.Panel', {
            id:'--[moduleLow]--im-tree',				//<----------change this----
            title: 'Online Users',
            rootVisible:false,
            lines:false,
            autoScroll:true,
            tools:[{
                type: 'refresh',
                handler: function(c, t) {
                    tree.setLoading(true, tree.body);
                    var root = tree.getRootNode();
                    root.collapseChildren(true, false);
                    Ext.Function.defer(function() { // mimic a server call
                        tree.setLoading(false);
                        root.expand(true, true);
                    }, 1000);
                }
            }],
            store: Ext.create('Ext.data.TreeStore', {
                root: {
                    text:'Online',
                    expanded: true,
                    children:[{
                        text:'Friends',
                        expanded:true,
                        children:[
                            { text:'Brian', iconCls:'user', leaf:true },
                            { text:'Kevin', iconCls:'user', leaf:true },
                            { text:'Mark', iconCls:'user', leaf:true },
                            { text:'Matt', iconCls:'user', leaf:true },
                            { text:'Michael', iconCls:'user', leaf:true },
                            { text:'Mike Jr', iconCls:'user', leaf:true },
                            { text:'Mike Sr', iconCls:'user', leaf:true },
                            { text:'JR', iconCls:'user', leaf:true },
                            { text:'Rich', iconCls:'user', leaf:true },
                            { text:'Nige', iconCls:'user', leaf:true },
                            { text:'Zac', iconCls:'user', leaf:true }
                        ]
                    },{
                        text:'Family',
                        expanded:true,
                        children:[
                            { text:'Kiana', iconCls:'user-girl', leaf:true },
                            { text:'Aubrey', iconCls:'user-girl', leaf:true },
                            { text:'Cale', iconCls:'user-kid', leaf:true }
                        ]
                    }]
                }
            })
        });

        return tree;
    },
    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('--[moduleLow]---win');				// 5.- We obtain the id of win,
        if(!win){
            win = desktop.createWindow({							
                id: '--[moduleLow]---win',									// 6.- if the win don't exist, we create this
                title:'--[module]--',								// 7.- the title of win
                width:250,											// 8.- the win's width
                height:400,											// 9.- the win's height
                iconCls: 'icon---[moduleLow]--',							//10.- the win's icon
                animCollapse:false,
                constrainHeader:true,
                bodyBorder: true,
                tbar: {
                    xtype: 'toolbar',
                    ui: 'plain',
                    items: [{
                        tooltip:{title:'Rich Tooltips', text:'Let your users know what they can do!'},
                        iconCls:'connect'
                    },
                    '-',
                    {
                        tooltip:'Add a new user',
                        iconCls:'user-add'
                    },
                    ' ',
                    {
                        tooltip:'Remove the selected user',
                        iconCls:'user-delete'
                    }]
                },

                layout: 'accordion',
                border: false,

                items: [
                    this.createTree(),
                    {
                        title: 'Settings',
                        html:'<p>Something useful would be in here.</p>',
                        autoScroll:true
                    },
                    {
                        title: 'Even More Stuff',
                        html : '<p>Something useful would be in here.</p>'
                    },
                    {
                        title: 'My Stuff',
                        html : '<p>Something useful would be in here.</p>'
                    }
                ]
            });
        }
        win.show();
        return win;
    }
});

	
