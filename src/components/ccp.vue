<template>
  <div class="ccp-container">
    <div id="containerDiv" style="display:none"/>
    <b-container class="bv-example-row">
      <b-row class="text-center title-bar">

        <b-col>1</b-col>
        <b-col cols="8">
          <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none"  no-caret>
            <template v-slot:button-content>
              <span class="title-status"> Available </span> <font-awesome-icon class="fontIcon" icon="chevron-down" />
            </template>
            <b-dropdown-item href="#">Available</b-dropdown-item>
            <b-dropdown-item href="#">Ofline</b-dropdown-item>
            <b-dropdown-item href="#">Busy</b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col style="padding-top: 10px">
          <font-awesome-icon class="fontIcon" icon="cog" size="lg"/>
        </b-col>
      </b-row>

      <!-- Dial pad and settings block -->
      <b-container v-if="!toggle_call_block" class="body-container">
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
        <b-container v-if="toggle_country_code" class="body-container-content">
          <model-list-select :list="options1"
                     v-model="selectedCountry"
                     option-value="code"
                     option-text="name">
          </model-list-select>
        </b-container>
        
        <!-- dialpad block -->
        <b-container v-if="toggle_dial_pad" class="body-container-content">
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

        

      </b-container> 

      <!-- On call block -->
      <b-container v-if="toggle_call_block" class="body-container call-block">
        <div class="call-handler">
          <div class="call-handler-contents">
            <h6>{{ callStatus }}</h6>
            <h5>Boopathi Kumar</h5>
            <h6>{{callingNumber}}</h6>
            <h6 v-if="callStatus == 'Connected' || callStatus == 'Muted' || callStatus == 'OnHold'">00:00</h6>
            <div v-if="callStatus == 'Incoming' || callStatus == 'Connecting' || callStatus == 'Calling'" class="call-handle-buttons-container">
                <b-button size="sm" pill @click="onAcceptedCall()" class="call-handle-buttons" variant="success">
                  <font-awesome-icon  icon="phone" size="sm"/>   Accept
                </b-button>
                <b-button size="sm" pill @click="onDeclineCall()" class="call-handle-buttons" variant="danger">
                  <font-awesome-icon  icon="phone-slash" size="sm"/>   Decline
                </b-button>
            </div>
            <div v-else-if="callStatus == 'Connected' || callStatus == 'Muted' || callStatus == 'OnHold' || callStatus == 'Calling'" class="call-handle-buttons-container">
                <b-button size="sm" @click="onHoldCall()" class="call-handle-buttons after-call-handle-buttons" variant="secondary">
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
                </b-button>
                <b-button block @click="onEndCall()" class="call-handle-button-end" size="sm" variant="danger">
                  <font-awesome-icon  icon="phone-slash" size="sm"/>   End Call
                </b-button>
            </div>
          </div>
        </div>
      </b-container>
    </b-container>
  </div>
</template>

<script>
import { ModelListSelect } from 'vue-search-select'

export default {
  data() {
    return {
      dialedNumber: '',
      toggle_dial_pad: false,
      toggle_country_code : false,
      toggle_call_block: true,
      call_handler_state: "incoming",
      options1: [
          { code: '91', name: '+ 91' + ' - ' + 'India', flag: 'flag-icon-in' },
          { code: '1', name: '+ 1' + ' - ' + 'United States', flag: 'flag-icon-us' },
          { code: '297', name: '+ 297' + ' - ' + 'Aruba', flag: 'flag-icon-aw' },
          { code: '43', name: '+ 43' + ' - ' + 'Austria', flag: 'flag-icon-at' },
          { code: '229', name: '+ 229' + ' - ' + 'Benin', flag: 'flag-icon-bj' },
        ],
      selectedCountry: { code: '1', flag: 'flag-icon-us' },
      onAccepted: true,
      onHold: false,
      onMute: false,
      callStatus: "Incoming",
      callingNumber: "+911234567890"
    }
  },
  mounted() {
    this.handleLogin();
  },
  watch: {
    selectedCountry: function () {
    this.toggle_country_code = !this.toggle_country_code;
    }
  },
  methods: {
    handleLogin() {
      
      // var loginUrl = 'https://sandeza.awsapps.com/connect/ccp#/'

      // connect.core.initCCP(containerDiv, {
      //     ccpUrl: loginUrl,
      //     loginPopup:    true,          
      //     softphone:     {   
      //       allowFramedSoftphone : true  
      //     }
      // });

      // let eventBus = connect.core.getEventBus();
      // eventBus.subscribe(connect.AgentEvents.INIT, function () {
      //   var agent = new connect.Agent();
      //   var name = agent.getName();
      //   console.log("-------------------------------connected "+ name);
      // });

      // connect.contact(function(contact) {

      //   contact.onConnecting(function() {
      //     var data = JSON.parse(JSON.stringify(contact.getAttributes()));
      //     console.log("onConnecting---------------"+ JSON.stringify(contact.getAttributes()));
      //     console.log("-------------------- pass data " + JSON.stringify(passData));
      //   });
        
      //   contact.onAccepted(function() {
      //     console.log("on accepted---------------");
      //     console.log("INFO Agent "+name+" accepted Call from "+customerNo+ " with case id "+data.key.value);
      //   });
        
      //   contact.onConnected(function() {
      //     console.log("on connected---------------");
      //   });
        
      //   contact.onEnded(function() {
      //       console.log("on ended---------------"+ JSON.stringify(passDataEnd));
      //   });
        
      // });
    },
    keyDial(number) {
		this.dialedNumber = this.dialedNumber + number
    },
    toggleDialPad() {
    this.toggle_country_code = false;
    this.toggle_dial_pad = !this.toggle_dial_pad;
    },
    toggleCountryCode(){
    this.toggle_dial_pad = false;
    this.toggle_country_code = !this.toggle_country_code;
    },
    onAcceptedCall(){
      this.callStatus = "Connected"
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
      this.toggle_call_block = false;
      this.callStatus = "Ended"
    },
    onDeclineCall(){
      this.toggle_call_block = false;
      this.callStatus = "Ended"
    },
    onDialCall(){
      this.toggle_call_block = true;
      this.callingNumber = "+" + this.selectedCountry.code + this.dialedNumber
      this.callStatus = "Calling"
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

.call-handle-button-end{
  width: 82%;
  margin: 0 auto;
}

.call-handle-buttons-container{
  margin-top: 30px;
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
  padding: 20px;
  vertical-align: middle;
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
    width: 350px; 
		height: 465px;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
</style>
