// tools url source : http://theproc.es/2011/1/5/10448/crea-y-modifica-las-cookies-de-tu-navegador-con-javascript
var Tools = {
  
  myurl :  function(){
	    scriptEls = document.getElementsByTagName('script')
	    path = scriptEls[scriptEls.length-1].src;
	    i=4;
	    while (i--) {
	        path = path.substring(0, path.lastIndexOf('/'));
	    }
	    return path
  },
	  
  
  createCookie: function(name, value,days,path) {
    
    path=this.myurl();
    console.log(path);
    
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }else var expires = "";
      document.cookie = name+"="+value+expires+"; path="+path;
  },

  readCookie: function(name) {
	
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
	
  },

  eraseCookie: function(name) {
    Tools.createCookie(name,"",-1);
  },
  
  setTheme : function(theme,debug){
 	//** based in include-ext of sencha framework **/ 	
 
  	var scriptEls = document.getElementsByTagName('script');
  	
  	path = scriptEls[scriptEls.length - 1].src,
  	
  	i = 3;
    
    while (i--) {
        path = path.substring(0, path.lastIndexOf('/'));
    }
	
	strLink='<link rel="stylesheet" type="text/css" href="'
	strScript='<script type="text/javascript" src="';
	
	if (debug){
		strDebug="-all-debug.css"
	}else{
		strDebug="-all.css";
	}
	
	document.write(strLink + path + '/resources/ext-theme-' + theme + '/ext-theme-' + theme + strDebug + '"/>');
 	//includes ext-all
 	document.write('<script type="text/javascript" src="http://127.0.0.1/ExtDesk/Extdesk-Main/extjs/ext-all.js"></script>');

	if (theme=='neptune'){

		repoDevMode = this.readCookie('ExtRepoDevMode'),	
        neptunePath = (repoDevMode ? path + '' : path) +
            '/packages/ext-theme-neptune/build/ext-theme-neptune' +
            (repoDevMode ? '-dev' : '') + '.js';

        if (repoDevMode &&  window.ActiveXObject) {
            Ext = {
                _beforereadyhandler: function() {
                    Ext.Loader.loadScript({ url: neptunePath });
                }
            };
        } else {
            document.write('<script type="text/javascript" src="' + neptunePath + '" defer></script>');
         }
	}
  }
};

function startEDTheme(debug){
	
	var EDtheme=Tools.readCookie("EDtheme");
	if (EDtheme==null){
		Tools.createCookie("EDtheme","classic",365,'../../');
		EDtheme="classic";
	}
	Tools.setTheme(EDtheme,debug);	
}

startEDTheme(false);

