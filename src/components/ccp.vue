<template>
  <div class="ccp-container">
    <div id="containerDiv" style="display:none"/>
    <b-container class="bv-example-row">

      <!-- title bar  -->
      <b-row class="text-center title-bar">

        <b-col cols="3">
            <img class="main-logo" src="../assets/sandeza.png" alt="Kitten">
        </b-col>
        <b-col cols="7">
          <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
            <template v-slot:button-content>
              <span class="title-status"> {{ agentStatus }} </span> <font-awesome-icon class="fontIcon" icon="chevron-down" />
            </template>
            <b-dropdown-item v-for="state in agentStates" 
                              :key="state.stateCode"
                              @click="changeStatus(state.stateCode)">
                              {{state.stateName}}
            </b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col style="padding-top: 10px">
          <font-awesome-icon @click="toggleSettings()" class="fontIcon settingsIcon" icon="cog" size="lg"/>
        </b-col>
      </b-row>

      <!-- settings block -->
      <b-container v-show="pageUrl == 'settings'" class="body-container">
        
        <b-form-group label="Phone Type">
          <b-form-radio-group
            id="select_phone_type"
            v-model="selected_phone_type"
            :options="phoneTypesOption"
            name="radio-options"
          ></b-form-radio-group>
        </b-form-group>
        
        <b-input-group v-if="selected_phone_type == 2">
          <b-input-group-prepend>
            <b-button class="dial-pad-country-code" @click="toggleCountryCodeSettings()" variant="outline-light">
              <span class="flag-icon" v-bind:class="selectedCountrySettings.flag"></span> + {{selectedCountrySettings.code}}
              <font-awesome-icon style="color:#ccc" icon="caret-down" size="sm"/>
            </b-button>
          </b-input-group-prepend>

          <b-form-input class="dial-pad-number" v-model="dialedNumbersettings" type="text"></b-form-input>

          <b-button @click="onSaveDeskPhone()" variant="secondary">
            Save
          </b-button>
        </b-input-group>

        <!-- country code block -->
        <b-container v-if="toggle_country_code_settings && selected_phone_type == 2" class="body-container-content">
          <model-list-select :list="options1"
                     v-model="selectedCountrySettings"
                     option-value="code"
                     option-text="name">
          </model-list-select>
        </b-container>
      </b-container>

      <!-- Dial pad and settings block -->
      <b-container v-show="pageUrl == 'home'" class="body-container">
        <b-input-group>
          <b-input-group-prepend>
            <b-button class="dial-pad-country-code" @click="toggleCountryCode()" variant="outline-light">
              <span class="flag-icon" v-bind:class="selectedCountry.flag"></span> + {{selectedCountry.code}}
              <font-awesome-icon style="color:#ccc" icon="caret-down" size="sm"/>
            </b-button>
          </b-input-group-prepend>

          <b-form-input class="dial-pad-number" v-model="dialedNumber" type="text"></b-form-input>

          <b-button class="dial-pad-button" @click="toggleDialPad()" variant="outline-light">
              <font-awesome-icon icon="th" size="lg"/>
          </b-button>
          <b-button @click="onDialCall()" variant="secondary">
            <font-awesome-icon style="color:#fff" icon="phone" size="lg"/>
          </b-button>
        </b-input-group>
       
        <!-- country code block -->
        <b-container v-if="homePageUrl == 'countrycode'" class="body-container-content">
          <model-list-select :list="options1"
                     v-model="selectedCountry"
                     option-value="code"
                     option-text="name">
          </model-list-select>
        </b-container>
        
        <!-- dialpad block -->
        <b-container v-if="homePageUrl == 'dialpad'" class="body-container-content">
          <div class="button-row">
            <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('1')">
              <div class="dialpad-number">1</div>
              <span class="dialpad-filler">...</span>
            </b-button>
            <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('2')">
              <div class="dialpad-number">2</div>
              <span class="dialpad-letters">ABC</span>
            </b-button>
            <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('3')">
              <div class="dialpad-number">3</div>
              <span class="dialpad-letters">DEF</span>
            </b-button>
          </div>
          <div class="button-row">
            <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('4')">
              <div class="dialpad-number">4</div>
              <span class="dialpad-letters">GHI</span>
            </b-button>
            <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('5')">
              <div class="dialpad-number">5</div>
              <span class="dialpad-letters">JKL</span>
            </b-button>
            <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('6')">
              <div class="dialpad-number">6</div>
              <span class="dialpad-letters">MNO</span>
            </b-button>
          </div>
          <div class="button-row">
            <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('7')">
              <div class="dialpad-number">7</div>
              <span class="dialpad-letters">PQRS</span>
            </b-button>
            <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('8')">
              <div class="dialpad-number">8</div>
              <span class="dialpad-letters">TVU</span>
            </b-button>
            <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('9')">
              <div class="dialpad-number">9</div>
              <span class="dialpad-letters">WXYZ</span>
            </b-button>
          </div>
          <div class="button-row">
            <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('*')">
              <div class="dialpad-number">*</div>
            </b-button>
            <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('0')">
              <div class="dialpad-number">0</div>
              <span class="dialpad-letters">+</span>
            </b-button>
            <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('#')">
              <div class="dialpad-number">#</div>
            </b-button>
          </div>
        </b-container>

          <!-- call history block-->
        <b-container v-show="homePageUrl == 'calllog'" class="body-container-content">
          <h6 style="text-align:left"> Call Logs </h6>
          <div class="call-logs-list">
          <b-row v-for="(call,index) in call_history" class="call-history-row">
            <b-col cols="1"><font-awesome-icon style="color:#ccc" icon="user" size="lg"/></b-col>
            <b-col cols="7">
              <p @click="openContact(call.contactId)" class="call-history-values call-history-values-name" >{{ call.contactName }}</p>
              <p class="call-history-values call-history-values-number">{{ call.contactNumber }}</p>
              </b-col>
            <b-col cols="3" class="text-left">
              <font-awesome-icon class="contact-side-icon" style="color:#ccc;cursor:pointer" @click="dialFromHistory(call.contactNumber,call.contactName)" icon="phone" size="sm"/>
              <font-awesome-icon class="contact-side-icon" v-if="call.contactName == 'Unknown Caller'" style="color:#ccc;cursor:pointer" @click="addContact(call.contactNumber)" icon="user-plus" size="sm"/>
            </b-col>
          </b-row>
          </div>
        </b-container>
      </b-container> 

      <!-- On call block -->
      <b-container v-show="toggle_call_block" class="body-container call-block">
        <div class="call-handler">
          <div class="call-handler-contents">
            <h6>{{ callStatus }}</h6>
            <h5>{{ callingName }}</h5>
            <h6>{{callingNumber}}</h6>
            <!-- <h6 v-if="callStatus == 'Connected' || callStatus == 'Muted' || callStatus == 'OnHold'">00:00</h6> -->
            <div v-if="callStatus == 'Incoming' || callStatus == 'Connecting' || callStatus == 'Calling'" class="call-handle-buttons-container">
                <b-button v-if="!outBoundCall" size="sm" pill @click="onAcceptedCall()" class="call-handle-buttons" variant="success">
                  <font-awesome-icon  icon="phone" size="sm"/>   Accept
                </b-button>
                <b-button size="sm" pill @click="onDeclineCall()" class="call-handle-buttons" variant="danger">
                  <font-awesome-icon  icon="phone-slash" size="sm"/>   Decline
                </b-button>
            </div>
            <div v-else-if="callStatus == 'Connected' || callStatus == 'Muted' || callStatus == 'OnHold' || callStatus == 'Calling'" class="call-handle-buttons-container">
                <!-- <b-button size="sm" @click="onHoldCall()" class="call-handle-buttons after-call-handle-buttons" variant="secondary">
                  <font-awesome-icon  icon="pause" size="sm"/>   {{callStatus == "OnHold" ? "UnHold" : "Hold"}}
                </b-button>
                <b-button size="sm" @click="onMuteCall()" class="call-handle-buttons after-call-handle-buttons" variant="secondary">
                  <font-awesome-icon  icon="microphone-alt-slash" size="sm"/>   {{callStatus == "Muted" ? "Un Mute" : "Mute"}}
                </b-button>
                <b-button size="sm" @click="onDialPadCall()" class="call-handle-buttons after-call-handle-buttons" variant="secondary">
                  <font-awesome-icon  icon="th" size="sm"/>   Dial
                </b-button>
                <b-button size="sm" @click="onTransferCall()" class="call-handle-buttons after-call-handle-buttons" variant="secondary">
                  <font-awesome-icon  icon="random" size="sm"/>   Transfer
                </b-button> -->
                <b-button block @click="onEndCall()" class="call-handle-button-end" size="sm" variant="danger">
                  <font-awesome-icon  icon="phone-slash" size="sm"/>   End Call
                </b-button>
            </div>
            <div v-if="callStatus == 'Incoming' || callStatus == 'Connecting' || callStatus == 'Connected' || callStatus == 'Muted' || callStatus == 'OnHold'">
              <h6 v-if="!outBoundCall" class="incoming-ticket-heading">Open Tickets</h6>
              <div class="tickets-list">
                <b-row v-if="!outBoundCall" v-for="(ticket,index) in  tickets" class="ticket-history-row">
                  <b-col cols="12">
                    <p @click="openTicket(ticket.id)" class="call-history-values call-history-values-name" ><b># {{ ticket.id }}</b></p>
                    <p class="call-history-values call-history-values-number">{{ ticket.subject}}</p>
                  </b-col>
                </b-row>
              </div>
            </div> 
          </div>
        </div>
      </b-container>
    </b-container>
  </div>
</template>

<script>
import { ModelListSelect } from 'vue-search-select'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'flag-icon-css/css/flag-icon.css'
import 'vue-search-select/dist/VueSearchSelect.css'


export default {
  data() {
    return {
      dialedNumber: '',
      pageUrl: "home",
      homePageUrl : "calllog",
      dialedNumbersettings: '',
      outBoundCall: 'true',
      agentStatus: '',
      changeItem : 0,
      toggle_call_history: true,
      toggle_dial_pad: false,
      toggle_country_code : false,
      toggle_country_code_settings: false,
      toggle_call_block: false,
      selected_phone_type: 1,
      agentStates: [
          { stateCode: 'ROUTABLE', stateName: 'Available' },
          { stateCode: 'OFFLINE', stateName: 'Offline' }
      ],
      phoneTypesOption: [
          { text: 'Softphone', value: '1' },
          { text: 'Desk phone', value: '2' }
      ],
      toogle_settings: false,
      options1: [
          { code: '91', name: '+ 91' + ' - ' + 'India', flag: 'flag-icon-in' },
          { code: '1', name: '+ 1' + ' - ' + 'United States', flag: 'flag-icon-us' },
          { code: '297', name: '+ 297' + ' - ' + 'Aruba', flag: 'flag-icon-7' },
          { code: '43', name: '+ 43' + ' - ' + 'Austria', flag: 'flag-icon-at' },
          { code: '229', name: '+ 229' + ' - ' + 'Benin', flag: 'flag-icon-bj' },
        ],
      call_history: [],
      tickets: [],
      selectedCountry: { code: '1', flag: 'flag-icon-us' },
      selectedCountrySettings: { code: '1', flag: 'flag-icon-us' },
      onAccepted: true,
      onHold: false,
      onMute: false,
      callStatus: "Incoming",
      callingName : "Unknown Caller",
      callingNumber: "",
      contactObject : "",
      agentObject : "",
      agentUserName: "",
      callStartTime: "",
      callEndTime: ""
    }
  },
  mounted() {
    this.handleLogin();
  },
  watch: {
    selectedCountry: function () {
      this.homePageUrl = this.homePageUrl == "countrycode" ? "calllog" : "countrycode";
    },
    selectedCountrySettings: function () {
    this.toggle_country_code_settings = !this.toggle_country_code_settings;
    },
    callStatus: function() {
      if(this.callStatus == "Ended"){
        //this.toggle_call_block = false;
      }
    }
  },
  methods: {
    handleLogin() {

      var thisKey = this;
      
      var loginUrl = 'https://oyocontact.awsapps.com/connect/ccp#/'

       window.addEventListener('message', function(event) {
        if(event.data.action == "calllogs"){
          console.log("--> recived on connect app <--" + JSON.stringify(event.data.callData));
          var eventData = event.data.callData;
          console.log("--> recived and reversed on connect app <--" + JSON.stringify(eventData.reverse()));
          thisKey.call_history = eventData.reverse();
        }
      } , false);

      connect.core.initCCP(containerDiv, {
          ccpUrl: loginUrl,
          loginPopup:    false,
          region: "us-east-1",          
          softphone:     {   
            allowFramedSoftphone : true  
          }
      });

      // saving contact object to state
      connect.contact(function(contact){
        thisKey.contactObject = contact;
      })

      // saving agent object to state
      connect.agent(function(agent){
        thisKey.agentObject = agent;
        thisKey.agentStatus = agent.getState().name;
      })
      
      var eventBus = connect.core.getEventBus();
      eventBus.subscribe(connect.AgentEvents.INIT, function () {
        var agentConfig = thisKey.agentObject.getConfiguration();
        thisKey.agentUserName = agentConfig.username;
        console.log("-------------------------------connected "+ thisKey.agentUserName);
      });


      connect.contact(function(contact) {
        var data;
        contact.onConnecting(function() {
          var passData = {};
          passData.action ="incomingCall";

          var activeConnection = contact.getActiveInitialConnection();
          var contactId = activeConnection['contactId'];
          var connectionId = activeConnection['connectionId'];
          var conn = new connect.Connection(contactId, connectionId);

          var phoneNumber = conn.getEndpoint().phoneNumber;
          if(phoneNumber.startsWith("sip")){
            phoneNumber = phoneNumber.replace(/sip:([^@]*)@.*/, "$1")
          }
          thisKey.callingNumber = phoneNumber;
          passData.contactNumber = phoneNumber;
          if(data) {
          var value = JSON.parse(data.customerInfo.value);
          thisKey.callingName = value.name;
          passData.contactName = value.name;
          passData.contactId = value.id;
          if(value.tickets){
            console.log("tickets");
            thisKey.tickets = value.tickets.openTickets;
          } else {
            console.log("no tickets");
            passData.tickets = [];
            thisKey.tickets = [];
          }
          } else {
            thisKey.callingName = "Unknown Caller";
            passData.contactName = "Unknown Caller";
            passData.contactId = "Unknown";
          }
          
          console.log("onConnecting---------------"+ JSON.stringify(contact.getAttributes()));
          console.log("-------------------- pass data " + JSON.stringify(passData));

          passData.agentId = thisKey.agentUserName;
          thisKey.call_history.unshift(passData);
          parent.postMessage(passData,"*");
          thisKey.pageUrl= "call";
          thisKey.outBoundCall = false;
          thisKey.callStatus = "Incoming";
          thisKey.toggle_call_block = true;
        });
        
        contact.onAccepted(function() {
          thisKey.callStatus = "Connecting";
          console.log("on accepted---------------");console.log("INFO Agent "+name+" accepted Call from "+customerNo+ " with case id "+data.key.value);
        });
        
        contact.onConnected(function() {
          thisKey.callStatus = "Connected";
          console.log("on connected---------------");
        });
        
        contact.onEnded(function() {
          if(thisKey.callStatus == "Calling"){
            console.log("on Ended before calling------------------")
          } else {
            var passData = {};
            passData.action = "endcall";
            parent.postMessage(passData,"*");
            thisKey.setAvailable();
            console.log("$$$$$$$ "+ JSON.stringify(thisKey.agentObject.getState()));
            thisKey.callStatus = "Ended";
            thisKey.dialedNumber = ''
            thisKey.toggle_call_block = false;
            console.log("on ended---------------");
          }
        });
        
      });
    },
    setAvailable(){
      console.log("set available triggered")
      var routableState = this.agentObject.getAgentStates().filter(function(state) {
        return state.type === connect.AgentStateType.ROUTABLE;
      })[0];
      this.pageUrl = "home";
      this.agentObject.setState(routableState, {
        success: function() { 
          console.log("set available success");
        },
        failure: function() {
          console.log("set available failed");
        }
      });
    },
    keyDial(number) {
		this.dialedNumber = this.dialedNumber + number
    },
    openContact(contactId){
      var passData = {};
      passData.action = "openContact";
      passData.contactId = contactId;
      console.log("----> passing contact "+ JSON.stringify(passData));
      parent.postMessage(passData,"*");
    },
    openTicket(ticketId){
      var passData = {};
      passData.action = "openTicket";
      passData.ticketId = ticketId;
      console.log("----> passing ticket "+ JSON.stringify(passData));
      parent.postMessage(passData,"*");
    },
    onSaveDeskPhone(){

    },
    toggleCountryCodeSettings(){
    this.toggle_country_code_settings = !this.toggle_country_code_settings;
    },
    toggleDialPad() {
      this.homePageUrl = this.homePageUrl == "dialpad" ? "calllog" : "dialpad";
    },
    toggleCountryCode(){
      this.homePageUrl = this.homePageUrl == "countrycode" ? "calllog" : "countrycode";
    },
    toggleSettings(){
      this.pageUrl = this.pageUrl == "settings" ? "home" : "settings";
    },
    onAcceptedCall(){
      this.callStatus = "Connecting";
      this.callStartTime = new Date();
      
        console.log("-----------------accept Clicked");
        this.contactObject.accept({
          success: function(data) {
            console.log("Successfully answered call.");
            console.log(data);
          },
          failure: function(data) {
            console.log("Failed to answer the call.");
            console.log(data);
          }
        })
    
    },
    onHoldCall(){
      this.onHold = !this.onHold;
      this.callStatus = this.onHold ? "OnHold" : "Connected"
    },
    onMuteCall(){
      this.onMute = !this.onMute;
      this.callStatus = this.onMute ? "Muted" : "Connected"
    },
    onEndCall(){
      console.log("End Button Clicked");
      let thisKey = this;
      this.callStatus = "Ending"
        this.contactObject.getInitialConnection().destroy({
          success: function(data) {
            thisKey.callStatus = "Ended"
            thisKey.callEndTime = new Date();
            this.toggle_call_block = false;
            console.log("Successfully ended call.");
            console.log(data);
          },
          failure: function(data) {
            thisKey.callStatus = "Ended"
            this.toggle_call_block = false;
            console.log("Failed to end the call.");
            console.log(data);
          }
        })
    },
    onDeclineCall(){
      console.log("Decline Button Clicked")
      this.callStatus = "Ended"
      this.contactObject.getInitialConnection().destroy({
          success: function(data) {
            thisKey.callStatus = "Ended";
            thisKey.callEndTime = new Date();
            this.toggle_call_block = false;
            console.log("Successfully answered call.");
            console.log(data);
          },
          failure: function(data) {
            thisKey.callStatus = "Ended";
            thisKey.callEndTime = new Date();
            this.toggle_call_block = false;
            console.log("Failed to answer the call.");
            console.log(data);
          }
        })
    },
    onDialCall(){
      this.toggle_call_block = true;
      this.outBoundCall = true;
      this.callingNumber = "+" + this.selectedCountry.code + this.dialedNumber;
      this.callStatus = "Calling";
      this.pageUrl= "call";
        let thisKey = this;

      var callNumber = connect.Endpoint.byPhoneNumber("+" + this.selectedCountry.code + this.dialedNumber)
      this.agentObject.connect(callNumber, {
        success: function() {
          console.log("Successfully sent outbound call");
        },
        failure: function(err) {
          thisKey.callStatus = "Ended";
          thisKey.toggle_call_block = false;
          thisKey.dialedNumber = "";
          thisKey.outBoundCall = false;
          thisKey.pageUrl= "home";
          console.log("Failed to send outbound call");
          console.log(err);
        }
      });
    },
    changeStatus(agentState){
      console.log("change Status clicked --> " + agentState);
      var thisKey = this;
      if(agentState == "ROUTABLE") {
        var routableState = this.agentObject.getAgentStates().filter(function(state) {
          return state.type === connect.AgentStateType.ROUTABLE;
        })[0];
        this.pageUrl = "home";
        this.agentObject.setState(routableState, {
          success: function() { 
            console.log("set available success");
            thisKey.agentStatus = "Available"
          },
          failure: function() {
            console.log("set available failed");
          }
        });
      } else if(agentState == "OFFLINE") {
        var routableState = this.agentObject.getAgentStates().filter(function(state) {
          return state.type === connect.AgentStateType.OFFLINE;
        })[0];
        this.pageUrl = "home";
        this.agentObject.setState(routableState, {
          success: function() { 
            console.log("set offline success");
            thisKey.agentStatus = "Offline"
            console.log("After change status --> "+ JSON.stringify(thisKey.agentObject.getState()));
          },
          failure: function() {
            console.log("set offline failed");
          }
        });
      }
    },
    dialFromHistory(number,name) {
      this.dialedNumber = number;
      this.callingName = name;
      this.toggle_call_block = true;
      this.callStatus = "Calling";
      this.outBoundCall = true;
      this.pageUrl= "call";

      let thisKey = this;

      var callNumber = connect.Endpoint.byPhoneNumber(number);
      this.agentObject.connect(callNumber, {
        success: function() {
          console.log("Successfully sent outbound call");
        },
        failure: function(err) {
          thisKey.callStatus = "Ended";
          thisKey.toggle_call_block = false;
          thisKey.dialedNumber = "";
          thisKey.outBoundCall = false;
          thisKey.pageUrl= "home";
          console.log("Failed to send outbound call");
          console.log(err);
        }
      });
  },
  addContact(number) {
    console.log("Add contact is not available")
  }
  },
   components: {
      ModelListSelect
  }
}
</script>

<style scoped>
/* #containerDiv {
		width: 324px; 
		height: 465px; 
		overflow: hidden;
	} */

.main-logo {
  width: 80px;
  height: 31px;
  margin-top: 9px;
}  
.text-left {
  text-align: left !important;
}
.contact-side-icon {
  margin-right: 5px;
    margin-left: 5px;
}
.call-logs-list {
  height: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
}  

.call-logs-list::-webkit-scrollbar {
  display: none;
}

.call-logs-list {
  -ms-overflow-style: none;
}

.tickets-list {
  height: 235px;
  width: 250px;
  overflow-x: hidden;
  overflow-y: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.tickets-list::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE and Edge */
.tickets-list {
  -ms-overflow-style: none;
}

.incoming-ticket-heading {
  margin-top: 10px;
  text-align: left;
}

.call-history-values-right-buttons {
  display: inline-flex;
}

.call-history-values-right-buttons-icons {
  margin: 2px;
}

.call-history-row {
  padding: 5px 0 ;
}

.ticket-history-row {
  padding: 5px 0 ;
}

.call-history-values {
  margin-bottom: 0px !important;
  text-align: left !important;
}

.call-history-values-name {
  font-size: 13px !important;
  cursor: pointer;
}

.call-history-values-name:hover {
  color: #2c5cc5;
}

.call-history-values-number {
  font-size: 12px !important;
}

.settingsIcon{
  cursor: pointer;
}

.call-handle-button-end{
  width: 50%;
  margin: 0 auto;
}

.call-handle-buttons-container{
  margin-top: 10px;
}

.after-call-handle-buttons{
  margin-bottom: 10px !important;
}

.call-handle-buttons{
  width: 110px;
  margin: 0 5px;
}

.call-handler {
  display: table;
  height: 390px;
  margin: 0 auto;
}
.call-handler-contents {
  display: table-cell;
  margin: 0;
  /* padding: 20px;
  vertical-align: middle; */
}

  .body-container-content {
    margin-top: 30px;
  }

  .button-row {
    margin-top: 10px;
  }

  .dialpad-button {
    width: 23%;
    height: 65px;
    margin-right: 5px;
    margin-left: 5px;
  }

  .dialpad-number {
    font-size: 19px;
    font-weight: bold;
  }

  .dialpad-letters{
    font-size: 13px;
    color: #ccc;
  }

  .title-bar{
    background-color: #00425f;
  }

  .fontIcon {
    color: #e78200;
  }

  .title-status{
    color: #ffffff;
  }

  .body-container{
    padding: 15px 0;
  }

  .dial-pad-button {
    border: 1px solid #ccc;
    border-left: none;
    margin-left: -5px;
    border-radius: 0px;
    color:#ccc;
  }

  .dial-pad-button:hover {
    background: #ffffff;
    border: 1px solid #ccc;
    border-left: none;
    color:#6c757d !important;
  }

  .dial-pad-button:active {
    background: #ffffff !important;
    border: 1px solid #ccc !important;
    color: #00425f !important;
    border-left: none;
    color: #6c757d !important;
  }

  .dial-pad-country-code {
    border: 1px solid #ccc;
    border-right: none;
    margin-right: -5px !important;
    border-radius: 0px;
    color: #495057;
  }

  .dial-pad-country-code:hover {
    background: #ffffff;
    border: 1px solid #ccc;
    border-right: none;
    color: #495057;
  }

  .dial-pad-country-code:focus {
    background: #ffffff !important;
    border: 1px solid #ccc !important;
    border-right: none !important;
    color: #495057;
  }

  .dial-pad-number {
    border-right: none;
    border-left: none
  }

  .dial-pad-number:focus {
    outline: none !important;
    box-shadow: none !important;
    border: 1px solid #ccc !important;
     border-left: none !important;
     border-right: none !important;
  }

  .dialpad-filler {
    visibility: hidden;
  }

  .ccp-container {
    width: 360px; 
		height: 465px;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
</style>
