/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
// The watch id references the current `watchAcceleration`
    var watchID = null;
	
	//some variables to store the min and max z values
	var minZ = 0;
	var maxZ = 0;
	var lastAccel = 0;
	var hits = 0;
 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
	
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
	
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		navigator.accelerometer.getCurrentAcceleration(app.onSuccess, app.onError);
		app.startWatch();
		
    },
	
	 // Start watching the acceleration
    //
    startWatch: function() {

        // Update acceleration every 3 seconds
        var options = { frequency: 40 };

        watchID = navigator.accelerometer.watchAcceleration(app.onSuccess, app.onError, options);
    },

    // Stop watching the acceleration
    //
    stopWatch: function () {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    },
	
	clearMinMax: function(){
		minZ = 0;
		maxZ = 0;
		lastAccel = 0;
	},
	
	onSuccess: function(acceleration) {
		
			var element = document.getElementById('accelerometer');
			element.innerHTML = 'Acceleration Z: ' + acceleration.z         + '<br />' +
                            'Timestamp: '      + acceleration.timestamp + '<br />';
							
							
			if(minZ == 0){
				minZ = 		acceleration.z ;		
			}
			
			if(maxZ == 0){
				maxZ = acceleration.z ;
			}
			
			
			
			if(lastAccel == 0){
				lastAccel = Math.abs(acceleration.z) ;
			}
			
			//see if we've had a hit
			
			if(  Math.abs(acceleration.z) - lastAccel > 0.5  ){
				//we've had a hit
				
				hits += 1;
				
				element = document.getElementById('score');
				element.innerHTML = hits + 'Hits' ;
				
				app.clearMinMax();
				
			}
			
			
			minZ = Math.min(minZ,acceleration.z);
			maxZ = Math.max(maxZ,acceleration.z);
			
			element = document.getElementById('minz');
			element.innerHTML = 'Minimum Z: ' + minZ ;
			
			element = document.getElementById('maxz');
			element.innerHTML = 'Maximum Z: ' + maxZ ;
	},
	
	onError: function() {
	alert('onError!');
	},
	
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
