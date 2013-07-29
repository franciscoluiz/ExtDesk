Ext.define('Ext.ux.grid.DynamicGridPanel', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.dynamicgrid',
    
    
    /**
    * initialising the components
    */
    initComponent: function(){
        /**
        * set the config we want
        */
        var me=this;
        
		if (me.crudAdd || me.crudDelete || me.crudSave || me.crudRefresh){
			var tb = Ext.create('Ext.toolbar.Toolbar', {
			    items   : []
			});
			var tbb=true;
		}

		if (me.crudAdd){
	        var addBtn = Ext.create('Ext.Button', {
	   	 		text: 'Add',
	   	 		iconCls: 'icon-admin-add',
	    		handler: this.onAddClick,
	    		scope:this
			});
			tb.add(addBtn);
		}

		if (me.crudDelete){
	        var delBtn = Ext.create('Ext.Button', {
	   	 		text: 'Delete',
	   	 		iconCls: 'icon-admin-delete',
	    		handler: this.onDeleteClick,
	    		scope:this
			});
			tb.add(delBtn);
		}

		if (me.crudSave){
	        var saveBtn = Ext.create('Ext.Button', {
	   	 		text: 'Save',
	   	 		iconCls: 'icon-admin-save',
	    		handler: this.onSaveClick,
	    		scope:this
			});
			tb.add(saveBtn);
		}

		if (me.crudRefresh){
	        var refreshBtn = Ext.create('Ext.Button', {
	   	 		text: 'Refresh',
	   	 		iconCls: 'icon-admin-refresh',
	    		handler: this.onRefreshClick,
	    		scope:this
			});
			tb.add(refreshBtn);
		}

		if (me.crudCancel){
	        var cancelBtn = Ext.create('Ext.Button', {
	   	 		text: 'Cancel',
	   	 		iconCls: 'icon-admin-refresh',
	    		handler: this.onCancelClick,
	    		scope:this
			});
			tb.add(cancelBtn);
		}


		if (me.crudPagination){
			var pt = Ext.create('Ext.toolbar.Paging',{
		     	store: this.store,
        	 	dock: 'bottom',
         		displayInfo: true
			});
	
		}

        var config = {
            columns:[],
            rowNumberer: false,
 	     }
        
        // appy to this config
        Ext.apply(this, config);
        // apply to the initialConfig
        Ext.apply(this.initialConfig, config);
        // call the arguments
        this.callParent(arguments);
        //        
        if (tbb) 
        	this.addDocked(tb);
        
        if (this.crudPagination)
        	this.addDocked(pt);

        
        
    },
    /**
    * When the store is loading then reconfigure the column model of the grid
    */
    storeLoad: function()
    {
        /**
        * JSON data returned from server has the column definitions
        */
        if(typeof(this.store.proxy.reader.jsonData.columns) === 'object') {
            var columns = [];
            /**
            * adding RowNumberer as we need to add them 
            * before other columns to display first
            */
            if(this.rowNumberer) { columns.push(Ext.create('Ext.grid.RowNumberer')); }
            /**
            * assign new columns from the json data columns
            */
            Ext.each(this.store.proxy.reader.jsonData.columns, function(column){
                columns.push(column);
            });
            
            /**
            *  reconfigure the column model of the grid
            */
            this.reconfigure(this.store, columns);
        }
    },
    /**
    * assign the event to itself when the object is initialising
    */
    onRender: function(ct, position){
            /**
            *  well, old fashion way, but works well.
            */
            Ext.ux.grid.DynamicGridPanel.superclass.onRender.call(this, ct, position);
            /**
            * hook the store load event to our function
            */
            this.store.on('load', this.storeLoad, this);
            
    },

	onAddClick : function(){

	 	var me=this;
	 	
		me.newRecord=Ext.create(me.store.model,{});
	 	
		//obtenemos los valores "DEFAULT", de un COMPONENTE X, si esta definidos...:D
	 	
	 	if (me.crudDefault1!=undefined){
	 		var dafault1=Ext.getCmp(me.crudDefaultGet1).getValue();
	 		eval("me.newRecord.data."+me.crudDefault1+"='"+dafault1+"';");
	 	}
	 	
	 	if (me.crudDefault2!=undefined){
	 		var dafault2=Ext.getCmp(me.crudDefaultGet2).getValue();
	 		eval("me.newRecord.data."+me.crudDefault2+"='"+dafault2+"';");
	 	}

	 	if (me.crudDefault3!=undefined){
	 		var dafault3=Ext.getCmp(me.crudDefaultGet3).getValue();
	 		eval("me.newRecord.data."+me.crudDefault3+"='"+dafault3+"';");
	 	}

	 	//fin of this fck dirty trick...:D
        var count=me.store.getCount();
		
		var pos=0;
		
		if (me.crudInsertBottom) pos = count
		
        me.store.insert(pos,me.newRecord);

		me.editingPlugin.startEditByPosition({
            row: pos, 
            column: 1
        });
	
	
	},
	
	onDeleteClick :function(){
		
		var me = this;
		
		
		
		if (me.idOnDelete==undefined){
			var extraId ="";
		}else{
			var extraId = Ext.getCmp(me.idOnDelete).getValue();

		}
		if (this.selModel.selected.length==0){
			 //Create a cool mask
    	    Ext.Msg.alert('Borrar', 'Por favor seleccione un item a borrar'); // this.lang["delete_please_select"])        	
						
		}else{
			
			var id = me.selModel.selected.items[0].data[this.crudId];

			Ext.Msg.show({
		        title : "Borrando", 					//this.lang["deleting"],
		        msg : "  Esta seguro que desea borrar el registro : "+ id +" ?",								//this.lang["delete_confirm_user"],
		        buttons : Ext.Msg.YESNOCANCEL,
		        icon : Ext.Msg.QUESTION,
		        fn : function(btn, text){
		            if (btn == 'yes'){
          	  
			          Ext.MessageBox.show({
			                msg: "Enviando informacion",
			                progressText: "Borrando Registro",	
			                width:300,
			                wait:true,
			                waitConfig: {
			                    interval:50
			                }
		            });
		           		
				      Ext.Ajax.request({
				            url: me.crudUrl,
				            method:'GET',
				            params: {
				                id : id,
				                Module : me.crudModule,
				                option : me.crudOption,
				                action : 'Delete',			        
				            	extraId: extraId
				            },
				            success: function(response){
				                var text = response.responseText;
				                var resp=Ext.decode(text);
				                Ext.MessageBox.hide();
				                if(resp.success){
				                	me.store.remove(me.selModel.selected.items[0]);
				                	me.store.commitChanges();
				                }else{
				                    Ext.Msg.alert(me.crudModule, 'Error <b>'+resp.msg+'</b>')
				                }
				            }
				        });		           		
						           
		           
		            }
		        }
		    });    				
		}
		
	},

	onSaveClick :function(){
		var me = this;

		Ext.MessageBox.show({
			msg: 'Enviando su informacion  al Servidor',
			progressText: 'Guardando',	
			width:300,
			wait:true,
			waitConfig: {
			    interval:50
			},
			modal:true
		});    		
		
		
        //Obtain modified and updates record..!!;		
        var modified = me.store.getNewRecords();
        var updates = me.store.getUpdatedRecords();		
        //Prepare the param Array
        var params = [];		
        Ext.each(modified,function(mod,i){
            mod.id='nuevo',
            params.push(mod.data);
        });
        Ext.each(updates,function(upd,i){
            params.push(upd.data);	
        });

		//si hay cambios
		if (params.length >0){
	         // transform to Json
            var json=Ext.encode(params);
            // We call Ajax method
            Ext.Ajax.request({
                url: me.crudUrl,
                method:'GET',
                params: {
                    Module : me.crudModule,
                    option : me.crudOption,
                    action : 'Save',
                    jsonp :json
                },
                success: function(response){
                    var text = response.responseText;
                    if (text!=""){
                        Ext.MessageBox.hide();
                        var resp=Ext.decode(text);
                        
                        if(resp.success){				        	

							if (me.loadonsave){
								me.store.load();	
							}else{
								me.store.commitChanges();
				        	}
                        }else{
                            // Ext.MessageBox.hide();
                            me.store.rejectChanges();
                            Ext.Msg.alert( me.crudModule, '<b>'+resp.msg+'</b>')
                        }			       		
                    }else{
                        me.store.rejectChanges();
                        Ext.Msg.alert( me.crudModule, "Error del lado del servidor");
                    }		        
       			        
                }
            },this);

		
		}else{
			Ext.MessageBox.hide();
			Ext.Msg.alert(me.crudModule, "No existen cambios para guardar");
		}
		
		
	},

	onRefreshClick :function(){
		var me=this;
		me.store.load();
	},
	
	onCancelClick : function (){
		var me=this;
		me.store.rejectChanges( )
		
	},
	
	callmyAjax : function($save){
		
		
	}
	
});

