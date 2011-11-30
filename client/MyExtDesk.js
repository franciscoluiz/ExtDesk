		Ext.define('User', {
			extend: 'Ext.data.Model',
			autoLoad: true,
			fields: [
				{name: 'id', type: 'int'},
				{name: 'name', type: 'string'},
				{name: 'wallPaper', type: 'string'},
				{name: 'wallpaperStretch', type: 'boolean'}
				
			],
			proxy: {
				type: 'rest',
				url: 'ExtDesk.php?action=load_user',
				reader: {
					type: 'json',
					root: 'user',
					successProperty: 'success'
				}
			},
			hasMany: ['Strings','Modules']
			
		});

		Ext.define('Strings', {
			extend: 'Ext.data.Model',
			fields: ['id', 'group', 'alias', 'string'],

			proxy: {
				type: 'rest',
				url : 'ExtDesk.php?action=load_user',
				reader: {
					type: 'json',
					root: 'strings'
				}
			},
			belongsTo: 'User'
			
		});

		Ext.define('Modules', {
			extend: 'Ext.data.Model',
			fields: ['js','name','iconCls','module','shorcut','qLaunch','iconLaunch'],

			proxy: {
				type: 'rest',
				url : 'ExtDesk.php?action=load_user',
				reader: {
					type: 'json',
					root: 'modules'
				}
			},
			belongsTo: 'User'
			
		});

		Ext.define('MyDesktop.MyExtDesk', {
				
				user : 'User',
			
				load : function(){
					User.load('', {
						success : function(user,options) {
							userStore = user;
							this.user=user;
							//console.log(options);

							apps.push('Ext.window.MessageBox');
							apps.push('Ext.ux.desktop.ShortcutModel');							
							userStore.modules().each(function(module) {
								
								apps.push('MyDesktop.Modules.' + module.get('js') + '.Client.' + module.get('js'));
								
							});
							
							apps.push('MyDesktop.Settings');		//dirty trick to add settings module...
						
						    var myDesktopApp;
							Ext.require(apps,function(){
								myDesktopApp = new MyDesktop.ExtDesk();
							},this);
				
						},
						failure : this.login
						
					});
				},
			
				login : function(e,c){
				    
				    var win=Ext.getCmp('idWinLogin');
					
					if(win==undefined){
						var jsonData=c.request.scope.reader.jsonData;
						var strings=jsonData.user[0].strings;
										
						var lan=Array;
						lan["login"] 	= strings[0].string;
						lan["user"] 	= strings[1].string;
						lan["pswd"] 	= strings[2].string;
						lan["r_user"]	= strings[3].string;
						lan["r_psd"] 	= strings[4].string;
						lan["enter"] 	= strings[5].string;
						lan["cancel"] 	= strings[6].string;
						lan["error"]	= strings[8].string;
						lan["bad_login"]= strings[9].string;

						
						var form = Ext.create('Ext.form.Panel', {
							layout: 'absolute',
							url: 'ExtDesk.php?action=load_user',
							defaultType: 'textfield',
							border: false,
							defaults:{
							  enableKeyEvents:true,
							  listeners:{
								specialKey: function(field, el)
								{
								  if(el.getKey() == Ext.EventObject.ENTER)
								  {
									Ext.getCmp('btnEnter').handler.call(Ext.getCmp('btnEnter').scope);
								  }
								}
							  }
							},
							//bodyStyle: "background-image:url(blue.jpg) !important",
							items: [
								{
									id:"idLoginUser",
									fieldLabel: lan["user"],
									fieldWidth: 60,
									msgTarget: 'side',
									allowBlank: false,
									x: 5,
									y: 5,
									name: 'user',
									anchor: '-5'
								},
								{
									id:"idLoginPswd",
									inputType: 'password',
									fieldLabel: lan["pswd"],
									fieldWidth: 60,
									x: 5,
									y: 35,
									name: 'password',
									anchor: '-5'
								},
								{
									id: 'idRememberUser',
									xtype: 'checkboxfield',		
									name: 'recordarUsuario',
									x: 110,
									y: 55,								
									hideLabel: true,
									style: 'margin-top:15px',
									boxLabel: lan["r_user"]
								},
								{
									id: 'idRememberPswd',
									xtype: 'checkboxfield',		
									name: 'recordarUsuario',
									x: 110,
									y: 85,								
									hideLabel: true,
									style: 'margin-top:15px',
									boxLabel: lan["r_psd"]
								}
							
							]
						});
						
						var win = Ext.create('Ext.window.Window', {
							id : 'idWinLogin',
							title: lan["login"],
							width: 350,
							height: 200,
							minWidth: 350,
							minHeight:200,
							layout: 'fit',
							plain:true,
							closable:false,
							items: form,
		
							buttons: [{
								id: 'btnEnter',
								text: lan["enter"],
								handler: function() {
									form.submit({
										success: function(form,action){
											//remember user
											if(Ext.getCmp('idRememberUser').getValue()){
												Ext.util.Cookies.set("rem_user",Ext.getCmp('idLoginUser').getValue(""));																								
											}else{
												Ext.util.Cookies.clear("rem_user");												
											}
											//remember pswd
											if(Ext.getCmp('idRememberPswd').getValue()){
												Ext.util.Cookies.set("rem_pswd",Ext.getCmp('idLoginPswd').getValue(""));																								
											}else{
												Ext.util.Cookies.clear("rem_pswd");												
											}
											
											win.close();
											MyExtDesk.load();
										
										},
										failure: function(form, action) {
											
											Ext.Msg.confirm(lan["error"],lan["bad_login"],
												function(btn, text){
												if (btn == 'yes'){
													Ext.getCmp('idLoginUser').setValue("");
													Ext.getCmp('idLoginPswd').setValue("");	
													Ext.getCmp('idLoginUser').focus('', 200);
												} else {
													var url = window.location.href;
													var nohttp = url.split('//')[1];
													var hostPort = nohttp.split('/')[0]
													window.location = 'http://' + hostPort;															
												}
												
											},this);
											//MyExtDesk.login(); //Ext.Msg.alert('Failed', action.result.msg); 
										}

									})

								}

							},{
								text: lan["cancel"]
							}]
						},this);
					}else{
						Ext.getCmp('idLoginUser').setValue("");
						Ext.getCmp('idLoginPswd').setValue("");						
					}
					// fill with the cookies
					if (Ext.util.Cookies.get("rem_user")!=null){
						Ext.getCmp('idLoginUser').setValue(Ext.util.Cookies.get("rem_user"));
						Ext.getCmp('idRememberUser').setValue(true);
					}
					if (Ext.util.Cookies.get("rem_pswd")!=null){
						Ext.getCmp('idLoginPswd').setValue(Ext.util.Cookies.get("rem_pswd"));
						Ext.getCmp('idRememberPswd').setValue(true);
					}
							

					
					win.show();
								
				
				}
			
			
			});
			