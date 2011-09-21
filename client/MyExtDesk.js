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
				url: 'ExtDesk.php',
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
				url : 'ExtDesk.php',
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
				url : 'ExtDesk.php',
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
					User.load(1, {
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


						
						var form = Ext.create('Ext.form.Panel', {
							layout: 'absolute',
							url: 'ExtDesk.php',
							defaultType: 'textfield',
							border: false,
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
									xtype: 'checkboxfield',		
									name: 'recordarUsuario',
									x: 110,
									y: 55,								
									//fieldLabel: 'RecordarUsuario',
									hideLabel: true,
									style: 'margin-top:15px',
									boxLabel: lan["r_user"]
								},
								{
									xtype: 'checkboxfield',		
									name: 'recordarUsuario',
									x: 110,
									y: 85,								
									//fieldLabel: 'Recordar Contrase�a',
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
								text: lan["enter"],
								handler: function() {
									form.submit({
										success: function(form,action){
											//console.log("test");
											win.close();
											MyExtDesk.load();
										
										},
										failure: function(form, action) {
											MyExtDesk.login();//Ext.Msg.alert('Failed', action.result.msg);
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
					
					win.show();
								
				
				}
			
			
			});
			