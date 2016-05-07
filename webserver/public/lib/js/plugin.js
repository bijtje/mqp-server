var NFP = {
    main : {
  		init : function(){
  			if ( window.isRunning ){
				console.log("[NFP] already running...")
  				return;
  			}

  			window.isRunning = true;

			//Importing StyleSheets
  			$('head').append('<link id="pluginStyle" rel="stylesheet" type="text/css" href="/pads/lib/css/pluginStyle.css">');

  			//Custom BG
  			$('#room-bg').append('<div id="CustomBG"></div>');

  			// [...]
  			var tab = $('.dash .tray').append(NFP.main.models.tab);
  			var back = $('#app-right').append(NFP.main.models.back);

        	//Handling LocalStorage
  			NFP.main.localStorageCreate();
			NFP.main.localStorageLoad();

			//Catch Chat Events
			API.on(API.DATA.EVENTS.CHAT,NFP.main.options.catchChat);
  		},

  		tmp : {
  			defaultBG : "https://i.gyazo.com/c3fb9d49464a322e54ae697e1e2a20f7.jpg"
  		},

  		localStorageCreate : function(){
  			//Eta
			if(localStorage.getItem("NFP_ETA") === null){
				localStorage.setItem("NFP_ETA", "true");
				NFP.main.toggles.toggleFunctionOn(".NFP_ETA");
			}

			//CustomBG
			if(localStorage.getItem("NFP_CustomBG") === null){
				localStorage.setItem("NFP_CustomBG", "false");
				NFP.main.toggles.toggleFunctionOf(".NFP_CustomBG");
			}

			if(localStorage.getItem("NFP_CustomBG_URL") === null){
				localStorage.setItem("NFP_CustomBG_URL", "https://i.gyazo.com/c3fb9d49464a322e54ae697e1e2a20f7.jpg");
			}

			//AFKMessage
			if(localStorage.getItem("NFP_AFKMessage") === null){
				localStorage.setItem("NFP_AFKMessage", "false");
				NFP.main.toggles.toggleFunctionOf(".NFP_AFKMessage");
			}

			if(localStorage.getItem("NFP_AFKMessage_TXT") === null){
				localStorage.setItem("NFP_AFKMessage_TXT", "I'm not here right now!");
			}
			
			if(localStorage.getItem("NFP_AFKMessage_CD") === null){
				localStorage.setItem("NFP_AFKMessage_CD", "false");
			}

			//AutoAFKMessage || AutoDisableAFKMessage
			if(localStorage.getItem("NFP_AutoAFKMessage") === null){
				localStorage.setItem("NFP_AutoAFKMessage", "false");
			}

			//Desktop Notifications || Main
			/*
			if(localStorage.getItem("NFP_DesktopNotifications") === null){
				localStorage.setItem("NFP_DesktopNotifications", "false");
			}
			*/
  		},

  		localStorageLoad : function(){
  			//Eta
			if(localStorage.getItem("NFP_ETA") === "true"){
				NFP.main.toggles.toggleFunctionOn(".NFP_ETA");
				NFP.main.options.ETA();
			}else if(localStorage.getItem("NFP_ETA") === "false"){
				NFP.main.toggles.toggleFunctionOf(".NFP_ETA");
			}

			//CustomBG
			if(localStorage.getItem("NFP_CustomBG") === "true"){
				NFP.main.toggles.toggleFunctionOn(".NFP_CustomBG");
				NFP.main.options.CustomBG();
			}else if(localStorage.getItem("NFP_CustomBG") === "false"){
				NFP.main.toggles.toggleFunctionOf(".NFP_CustomBG");
			}

			//AFKMessage
			if(localStorage.getItem("NFP_AFKMessage") === "true"){
				NFP.main.toggles.toggleFunctionOn(".NFP_AFKMessage");
				API.on(API.DATA.EVENTS.CHAT,NFP.main.options.AFKMessage);
			}else if(localStorage.getItem("NFP_AFKMessage") === "false"){
				NFP.main.toggles.toggleFunctionOf(".NFP_AFKMessage");
				API.off(API.DATA.EVENTS.CHAT,NFP.main.options.AFKMessage);
			}

			//AutoAFKMessage || AutoDisableAFKMessage
			if(localStorage.getItem("NFP_AutoAFKMessage") === "true"){
				NFP.main.toggles.toggleFunctionOn(".NFP_AutoAFKMessage");
			}else if(localStorage.getItem("NFP_AutoAFKMessage") === "false"){
				NFP.main.toggles.toggleFunctionOf(".NFP_AutoAFKMessage");
			}

			//Desktop Notifications | Main
			/*
			if(localStorage.getItem("NFP_DesktopNotifications") === "true"){
				NFP.main.toggles.toggleFunctionOn(".NFP_DesktopNotifications");
			}else if(localStorage.getItem("NFP_DesktopNotifications") === "false"){
				NFP.main.toggles.toggleFunctionOf(".NFP_DesktopNotifications");
			}
			*/
  		},

  		models : {
			'tab' : '<div data-ng-click="prop.c = 99" data-ng-class="{\'active\' : prop.c == 99}" class="tab nfp-tab">' +
                    	'<span class="icon-info">options</span>' +
                	'</div>',
            'back' :'<div data-ng-show="(prop.c == 99)" class="ng-hide" id="nfp-back">' +
                   		'<div class="people-user ng-scope NFP_TabTitleFirst">' +
							'<span class="NFP_TabTitleUname nsg-binding">' + 
								'<i class="mdi mdi-settings"></i>' +
								'<span class="NFP_TabTitleText">OPTIONS</span></span>' +
							'<span class="people-info ng-binding"></span>' +
						'</div>' +
						'<div class="people-user ng-scope" onclick="NFP.main.toggles.ETA()">' +
							'<span class="NFP_TabUname nsg-binding NFP_ETA">' + 
								'<span class="isValid"><i></i></span>' +
								'<span class="NFP_TabTitleText">Show ETA</span></span>' +
							'<span class="people-info ng-binding"></span>' +
						'</div>' +
						'<div class="people-user ng-scope">' +
							'<span class="NFP_TabUname nsg-binding NFP_CustomBG" onclick="NFP.main.toggles.CustomBG()">' + 
								'<span class="isValid"><i></i></span>' +
								'<span class="NFP_TabTitleText">Custom Background</span></span>' +
							'</span>' +
							'<span class="people-info ng-binding" onclick="NFP.main.options.setCustomBG()"><span class="icon-info">set</span></span>' +
						'</div>' +
						'<div class="people-user ng-scope">' +
							'<span class="NFP_TabUname nsg-binding NFP_AFKMessage" onclick="NFP.main.toggles.AFKMessage()">' + 
								'<span class="isValid"><i></i></span>' +
								'<span class="NFP_TabTitleText">AFK Message</span></span>' +
							'</span>' +
							'<span class="people-info ng-binding" onclick="NFP.main.options.setAFKMessage()"><span class="icon-info">set</span></span>' +
						'</div>' +
						'<div class="people-user ng-scope">' +
							'<span class="NFP_TabUname nsg-binding NFP_AutoAFKMessage" onclick="NFP.main.toggles.AutoAFKMessage()">' + 
								'<span class="isValid"><i></i></span>' +
								'<span class="NFP_TabTitleText">Auto disable AFK Message</span></span>' +
							'</span>' +
							'<span class="people-info ng-binding"></span>' +
						'</div>' +

						'<div class="people-user ng-scope NFP_TabTitle">' +
							'<span class="NFP_TabTitleUname nsg-binding">' + 
								'<i class="mdi mdi-arrange-bring-forward"></i>' +
								'<span class="NFP_TabTitleText">DESKTOP NOTIFICATIONS</span></span>' +
							'<span class="people-info ng-binding"></span>' +
						'</div>' + /*
						'<div class="people-user ng-scope">' +
							'<span class="NFP_TabUname nsg-binding NFP_DesktopNotifications" onclick="NFP.main.toggles.DesktopNotifications()">' + 
								'<span class="isValid"><i></i></span>' +
								'<span class="NFP_TabTitleText">Desktop Notifications</span></span>' +
							'</span>' +
							'<span class="people-info ng-binding"></span>' +
						'</div>' +*/

						'<div class="people-user ng-scope" onclick="NFP.main.options.song2mp3()" style="border-top: 2px solid #302E31;">' +
							'<span class="NFP_TabUname nsg-binding">' + 
								'<span class="isValid"><i class="mdi mdi-file-music"></i></span>' +
								'<span class="NFP_TabTitleText">Download current song</span></span>' +
							'</span>' +
							'<span class="people-info ng-binding"></span>' +
						'</div>' +
                	'</div>'
  		},

  		toggles : {
			toggleFunctionOn : function(a){
				$(a + ' i').replaceWith('<i class="mdi mdi-checkbox-marked"></i>');
				$(a + ' .isValid').last().css({
					'color' : '#A7CA00'
				});
			},
			
			toggleFunctionOf : function(a){
				$(a + ' i').replaceWith('<i class="mdi mdi-checkbox-blank-outline"></i>');
				$(a + ' .isValid').last().css({
					'color' : '#C8303E'
				});
			},

			ETA : function(){
				if(localStorage.getItem("NFP_ETA") === "true"){
					localStorage.setItem("NFP_ETA", "false");
					NFP.main.toggles.toggleFunctionOf(".NFP_ETA");
					$('.btn-join').removeAttr('data-eta');
				}else if(localStorage.getItem("NFP_ETA") === "false"){
					localStorage.setItem("NFP_ETA", "true");
					NFP.main.toggles.toggleFunctionOn(".NFP_ETA");
					NFP.main.options.ETA();
				}
			},

			CustomBG : function(){
				if(localStorage.getItem("NFP_CustomBG") === "true"){
					localStorage.setItem("NFP_CustomBG", "false");
					NFP.main.toggles.toggleFunctionOf(".NFP_CustomBG");
					$('#CustomBG').css("background-image","");
				}else if(localStorage.getItem("NFP_CustomBG") === "false"){
					localStorage.setItem("NFP_CustomBG", "true");
					NFP.main.toggles.toggleFunctionOn(".NFP_CustomBG");
					NFP.main.options.CustomBG();
				}
			},

			AFKMessage : function(){
				if(localStorage.getItem("NFP_AFKMessage") === "true"){
					localStorage.setItem("NFP_AFKMessage", "false");
					NFP.main.toggles.toggleFunctionOf(".NFP_AFKMessage");
					API.off(API.DATA.EVENTS.CHAT,NFP.main.options.AFKMessage);
				}else if(localStorage.getItem("NFP_AFKMessage") === "false"){
					localStorage.setItem("NFP_AFKMessage", "true");
					NFP.main.toggles.toggleFunctionOn(".NFP_AFKMessage");
					API.on(API.DATA.EVENTS.CHAT,NFP.main.options.AFKMessage);
				}
			},

			AutoAFKMessage : function(){
				if(localStorage.getItem("NFP_AutoAFKMessage") === "true"){
					localStorage.setItem("NFP_AutoAFKMessage", "false");
					NFP.main.toggles.toggleFunctionOf(".NFP_AutoAFKMessage");
				}else if(localStorage.getItem("NFP_AutoAFKMessage") === "false"){
					localStorage.setItem("NFP_AutoAFKMessage", "true");
					NFP.main.toggles.toggleFunctionOn(".NFP_AutoAFKMessage");
				}
			},
	
			/*
			DesktopNotifications : function(){
				if(localStorage.getItem("NFP_DesktopNotifications") === "true"){
					localStorage.setItem("NFP_DesktopNotifications", "false");
					NFP.main.toggles.toggleFunctionOf(".NFP_DesktopNotifications");
				}else if(localStorage.getItem("NFP_DesktopNotifications") === "false"){
					localStorage.setItem("NFP_DesktopNotifications", "true");
					NFP.main.toggles.toggleFunctionOn(".NFP_DesktopNotifications");
				}
			},
			*/
  		},

  		options : {
  			//Popup
  			NFP_Popup : function(question, inputValue, name){
  				var nameFixed = "'" + name + "'";
  				
  				var popupData = '<div class="modal-bg" id="NFP_POPUP">' +
  									'<div class="modal-container">' + 
  										'<div class="modal" style="">' +
  											'<div class="modal-box">' + 
  												'<div class="modal-text"><div>' +
  												'<h3>' + question + '</h3>' +
  												'<input type="text" class="new-playlist" id="NFP_Popup_Value" value="' + inputValue + '">' + 
  											'</div>' + 
  										'</div>' + 
  									'</div>' + 
  									'<div class="modal-controls" id="popupName" value="'+ name + '">' + 
  										'<div class="modal-ctrl modal-no" style="width: 50%; " onclick="NFP.main.options.popupNo()" id="CustomModalButton-0">' +
  											'<div class="mdi mdi-close"></div>' + 
  										'</div>' + 
  										'<div class="modal-ctrl modal-yes" style="width: 50%; " onclick="NFP.main.options.executePopup(' + nameFixed + ')" id="CustomModalButton-1">' +
  											'<div class="mdi mdi-check"></div>' +
  										'</div>' + 
  									'</div>' +
  								'</div>';
  				var openPopup = $('body').append(popupData);
  			},

  			executePopup : function(name){
  				var popupValue = $("#NFP_Popup_Value").val();
                var getName = name;
				localStorage.setItem(getName, popupValue);
				if(localStorage.getItem("NFP_CustomBG") === "true"){
					$('#CustomBG').css("background-image"," url('" + popupValue  + "')");
				}
				$("#NFP_POPUP").remove();
  			},

  			popupNo : function(){
				//NFP_POPUP
				$("#NFP_POPUP").remove();
  			},

  			//AlertMessage
  			AlertMessage : function(message){
  				$("#messages").append('<div class="cm broadcast" style="color: orange; background: rgba(255, 165, 0, .2);"><span class="time"></span><div class="mdi mdi-alert msg"></div><div class="text">' + message + '</div></div>');
  				var AlertMessageObjDiv = document.getElementById("chat");
				AlertMessageObjDiv.scrollTop = AlertMessageObjDiv.scrollHeight;
  			},

  			//Remove Strip Tags HTML - NOTIFYME
        	strip : function(html){
        	   var tmp = document.createElement("DIV");
        	   tmp.innerHTML = html;
        	   return tmp.textContent || tmp.innerText || "";
        	},

  			//DesktopNotificationBLOK
  			DesktopNotify : function(title, content){
        		if(!Notification){
        			alert('Please us a modern version of Chrome, Firefox, Opera or Firefox.');
        			return;
        		}

        		if(Notification.permission !== "granted"){
        			Notification.requestPermission();
        		}

        		var notification = new Notification(title, {
        			icon: '/pads/lib/img/DesktopNotify.png',
        			body: NFP.main.options.strip(content)
        		});

          		notification.onclick = function () {
            		window.focus();
          		}
        	},

  			//ETA
  			ETA_Readable : function(total){
  				var hours = ~~(total / 3600);
       			var minutes = (~~(total / 60)) % 60;
        		var seconds = total % 60;
        		return NFP.main.options.ETA_Normalize(hours) + ':' + NFP.main.options.ETA_Normalize(minutes) + ':' + NFP.main.options.ETA_Normalize(seconds);
  			},

  			ETA_Normalize : function(number){
  				var addition = (number < 10 ? '0' : '');
        		return addition + number;
  			},

  			ETA : function(){
  				//ETA
    			setInterval(function() {
    				if(localStorage.getItem("NFP_ETA") === "true"){
        				var position = API.queue.getPosition();
        				position = (position < 0) ? API.queue.getDJs().length : position;
        				if(position >= 1){
        					var eta = ~~(((position - 1) * (3.5 * 60)) + (API.room.getTimeRemaining()));
        					var eta = NFP.main.options.ETA_Readable(eta);
        				}else if(API.queue.getPosition() == 0){
        					var eta = "Playing";
        				}else if(position == 0){
        					var eta = ~~(((position) * (3.5 * 60)) + (API.room.getTimeRemaining()));
        					var eta = NFP.main.options.ETA_Readable(eta);
        				}

            			$('.btn-join').attr('data-eta', '' + eta);
            		}
    			}, 1000);
  			},

  			CustomBG : function(){
  				$('#CustomBG').css("background-image"," url('" + localStorage.getItem("CustomBG_URL")  + "')");
  			},

  			setCustomBG : function(){
  				NFP.main.options.NFP_Popup("Please enter an image url", localStorage.getItem("CustomBG_URL"), "CustomBG_URL");
				$('#CustomBG').css("background-image"," url('" + localStorage.getItem("CustomBG_URL")  + "')");
  			},

  			AFKMessage : function(data){
  				if(localStorage.getItem("NFP_AFKMessage") === "true" && localStorage.getItem("NFP_AutoAFKMessage") === "true" && data.uid === API.room.getUser().uid && data.message.slice(0,5) !== "[AFK]"){
            		localStorage.setItem("NFP_AFKMessage", "false");
					NFP.main.toggles.toggleFunctionOf(".NFP_AFKMessage");
					NFP.main.options.AlertMessage("AFK message has been disabled!");
            	}else{
        			if(localStorage.getItem("NFP_AFKMessage") === "true" && localStorage.getItem("NFP_AFKMessage_CD") === "false" && $('#cm-'+ data.cid).hasClass('mention') === true){
            			API.chat.send('[AFK] [ @' + $('#cm-' + data.cid + ' .text .uname').text() + " ] " + localStorage.getItem("NFP_AFKMessage_TXT"));
            			NFP.main.options.AFKCooldown();
            		}
        		}
  			},

  			AFKCooldown : function(){
  				localStorage.setItem("NFP_AFKMessage_CD", "true");
        		setTimeout(function(){
        			localStorage.setItem("NFP_AFKMessage_CD", "false");
        		},10000);
  			},

  			setAFKMessage : function(){
  				NFP.main.options.NFP_Popup("Please enter your AFK message", localStorage.getItem("NFP_AFKMessage_TXT"), "NFP_AFKMessage_TXT");
  			},

  			catchChat : function(data){
				/* Chat events */
				/*
  				if($('#cm-'+ data.cid).hasClass('mention') === true){
  					if(localStorage.getItem("NFP_DesktopNotifications") === "true"){
  						NFP.main.options.DesktopNotify("ღ Nightcore Fantasia ✩ | Mention", data.message);
  					}
  				}
				*/
  			},

  			song2mp3 : function() {
        		window.open("https://www.youtubeinmp3.com/download/?video=https://www.youtube.com/watch?v=" + API.room.getMedia().cid);
    		}
  		}

  	}
};

if(!window.isRunning){
	NFP.main.init();
}else{
    setTimeout(NFP.main.init, 1000);
}





