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

Ext.define('MyDesktop.ExtDesk', {
    extend: 'Ext.ux.desktop.App',

    lang: [],

    init: function() {
        // custom logic before getXYZ methods get called...

		/*config of desktop*/
		this.userStore = userStore;

		this.userName = this.userStore.get("name");
		this.wallPaper = 'resources/wallpapers/'+this.userStore.get("wallPaper")+'.jpg';
		this.wallpaperStretch=this.userStore.get("wallpaperStretch");

		/*languaje*/

		this.lang["settings"] = this.userStore.strings().findRecord("alias","settings").data.string;
		this.lang["logout"] = this.userStore.strings().findRecord("alias","logout").data.string;
		this.lang["areYouSure"] = this.userStore.strings().findRecord("alias","areYouSure").data.string;
		this.lang["changeSettings"] = this.userStore.strings().findRecord("alias","changeSettings").data.string;


       	/*call constructor*/
		this.callParent();

		/*hide the gear*/
		var el = Ext.get("loading");
		el.hide();

        /*ow ready...*/
    },

	loadCss : function(filename){
		/* http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml  we need put a credit in somewhere*/

		file='modules/'+filename+'/Client/Resources/'+filename+'.css';

		var fileref=document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", file);
		document.getElementsByTagName("head")[0].appendChild(fileref)


	},

    getModules : function(){
        var me = this, ret = me.callParent();
		//*** we create a string with de "new appname" of apps in store***
			var cad="";
			this.userStore.modules().each(function(module) {
				cad = cad+' new MyDesktop.Modules.' + module.get('js') + '.Client.'+module.get('js')+'(),';
				me.loadCss(module.get('js')); //<--this version

			});
			cad = cad.substring(0,cad.length-1); // remove the last comma
			cad = 'var res = ['+ cad +'];';
			eval(cad);
		//*****************************************************************
		return res;

	},

    getDesktopConfig: function () {

		var me = this, ret = me.callParent();

		//*** we create a string with the shorcuts" of apps in store with shorcut=true***
			var cad="";
			this.userStore.modules().each(function(module) {
				if (module.get("shorcut")=="1"){
					cad = cad+" { name : '" + module.get('name') + "',";
					cad = cad+" iconCls : '" + module.get('iconCls')+"',";
					cad = cad+" module : '" + module.get('module')+"'},";
				}
			});
			cad="var shortcutsArr=[" + cad + "]";
			eval(cad);
		//*****************************************************************

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',



            contextMenuItems: [
                { text: this.lang["changeSettings"], handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                id : 'id-shortcutsstore',				//<--another very dirty trick
				model : 'Ext.ux.desktop.ShortcutModel',
                data :shortcutsArr
			}),

			wallpaper: this.wallPaper,
            wallpaperStretch: this.wallpaperStretch
        });
    },

    // config for the start menu
    getStartConfig : function() {

		var me = this, ret = me.callParent();

        return Ext.apply(ret, {
			title:this.userName,
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 104,
                items: [
                    {
						text:this.lang["settings"],
						iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:this.lang["logout"],
						iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {

		var ret = this.callParent();

		//*** we create a string with the shorcuts" of apps in store with shorcut=true***
			var cad="";
			this.userStore.modules().each(function(module) {
				if (module.get("qLaunch")=='1'){
					cad = cad+" { name : '" + module.get('name') + "',";
					cad = cad+" iconCls : '" + module.get('iconLaunch')+"',";
					cad = cad+" module : '" + module.get('module')+"'},";
				}
			});
			cad="var quickStarts=[" + cad + "]";
			eval(cad);
		//*****************************************************************

       return Ext.apply(ret, {
            quickStart:quickStarts,
            trayItems: [
                { xtype: 'trayclock', flex: 1 },
                { xtype: 'container', id:'ajax_connect', width:20, height:16 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm(this.lang["logout"],this.lang["areYouSure"],function(btn, text){
			if (btn == 'yes'){
				// process text value and close...
					Ext.Ajax.request({
						url: 'logout.php?action=exit',
						success: function(response){
							window.location.href=window.location.href
						}
					});

			}


		});
    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
