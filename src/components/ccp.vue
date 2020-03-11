<template>
  <div class="ccp-container">
    <div id="containerDiv" style="display:none"/>
    <b-container v-if="loggedin" class="bv-example-row">

      <!-- title bar  -->
      <b-row class="text-center title-bar">

        <b-col cols="3">
            <img class="main-logo" src="../assets/sandeza.png" alt="main-logo">
        </b-col>
        <b-col cols="7">
          <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
            <template v-slot:button-content>
              <span class="title-status"> {{ agentStatus }} </span> <font-awesome-icon class="fontIcon" icon="chevron-down" />
            </template>
            <b-dropdown-item v-for="state in agentStates" 
                              :key="state.type"
                              @click="changeStatus(state)">
                              {{state.name}}
            </b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col style="padding-top: 10px">
          <font-awesome-icon @click="toggleSettings()" class="fontIcon settingsIcon" icon="cog" size="lg"/>
        </b-col>
      </b-row>

      <!-- settings block -->
      <b-container v-show="pageUrl == 'settings'" class="body-container">

        <p> {{ $t("logged_in_as") }} <strong> {{agentUserName}} </strong></p>

        <b-form-select v-model="languageSelected" :options="languageOptions" value-field="value" size="sm" class="mt-3"></b-form-select>
        
        <b-button pill style="margin-top:30px"  @click="toggleSettings()" > {{ $t("back") }} </b-button>
        <!-- <b-form-group label="Phone Type">
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
        </b-input-group> -->

        <!-- country code block -->
        <!-- <b-container v-if="toggle_country_code_settings && selected_phone_type == 2" class="body-container-content">
          <model-list-select :list="dialableCountries"
                     v-model="selectedCountrySettings"
                     option-value="code"
                     option-text="name">
          </model-list-select>
        </b-container> -->
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
          <model-list-select :list="dialableCountries"
                     v-model="selectedCountry"
                     option-value="flag"
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

        <div v-show="homePageUrl == 'calllog'" class="body-container-content">
          <b-tabs 
          content-class="mt-3" 
          fill
          active-nav-item-class="my-nav-active"
          >
            <b-tab @click="contactTabSelected = false">
              <template v-slot:title>
                <font-awesome-icon class="contact-side-icon" icon="phone" size="sm"/> {{ $t("call_logs") }}
              </template>
              <div class="call-logs-list">
                <b-row :key= "index" v-for="(call,index) in call_history.filter(call_history => !dialedNumber || call_history.contactNumber.toLowerCase().includes(dialedNumber.toLowerCase()) || call_history.contactName.toLowerCase().includes(dialedNumber.toLowerCase()))" class="call-history-row">
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
            </b-tab>
            <b-tab @click="contactTabSelected = true">
              <template v-slot:title>
                <font-awesome-icon class="contact-side-icon" icon="address-book" size="sm"/> {{ $t("contacts") }}
              </template>
              <div class="call-logs-list">
                <b-row :key= "index" v-for="(call,index) in contacts.filter(contacts => !dialedNumber || contacts.contactNumber.toLowerCase().includes(dialedNumber.toLowerCase()) || contacts.contactName.toLowerCase().includes(dialedNumber.toLowerCase()))" class="call-history-row">
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
            </b-tab>
          </b-tabs>
        </div>
        <!-- <b-container v-show="homePageUrl == 'calllog'" class="body-container-content">
          <h6 style="text-align:left"> Call Logs </h6>
          
        </b-container> -->

        <!-- Add contact block-->
        <b-container v-show="homePageUrl == 'addcontact'" class="body-container-content">
          <template>
            <div>
              <b-form-group
                id="contactName"
                label="Contact Name"
                label-for="contactName"
                :invalid-feedback="nameInvalidFeedback"
                :state="nameState"
              >
                <b-form-input id="contactName" v-model="contactForm.contactName" size="sm" :state="nameState" trim></b-form-input>
              </b-form-group>

              <b-form-group
                id="contactNumber"
                label="Contact Number"
                label-for="contactNumber"
                :invalid-feedback="contactInvalidFeedback"
                :state="numberState"
              >
                <b-form-input id="contactNumber" v-model="contactForm.contactNumber" size="sm" :disabled="true" :state="numberState" trim></b-form-input>
              </b-form-group>

              <div class="call-handle-buttons-container">
                <b-button size="sm" pill @click="cancelCreateNewContact()" class="call-handle-buttons" variant="danger">
                     Cancel
                </b-button>
                <b-button size="sm" pill @click="createNewContact()" :disabled="addContactButton" class="call-handle-buttons" variant="success">
                     {{ addContactButtonText }}
                </b-button>
            </div>
            </div>
          </template>
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
                  <font-awesome-icon  icon="phone" size="sm"/>   {{ $t('accept') }}
                </b-button>
                <b-button size="sm" pill @click="onDeclineCall()" class="call-handle-buttons" variant="danger">
                  <font-awesome-icon  icon="phone-slash" size="sm"/>   {{ $t('decline') }}
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
                  <font-awesome-icon  icon="phone-slash" size="sm"/>   {{ $t('end_call') }}
                </b-button>
            </div>
            <div style="width: 325px;margin-top: 10px;" v-if="callStatus == 'Incoming' || callStatus == 'Connecting' || callStatus == 'Connected' || callStatus == 'Muted' || callStatus == 'OnHold'">
              <div v-if="!editor">
                <b-row v-if="!outBoundCall" >
                  <b-col cols="6">
                    <h6  class="incoming-ticket-heading">{{ $t('open_tickets') }}</h6>
                  </b-col>
                  <b-col cols="6">
                    <b-button @click="createTicket()" :disabled="noteCreateDisable" pill size="sm" class="call-create-ticket" variant="primary"><font-awesome-icon v-if=" createTicketButton == 'New Ticket'" icon="plus" size="sm"/> {{ createTicketButton }}</b-button>
                  </b-col>
                </b-row>
                <div v-if="!outBoundCall" class="tickets-list">
                  <b-row :key= "index" v-for="(ticket,index)  in  tickets" class="ticket-history-row">
                    <b-col cols="12">
                      <b-row>
                        <b-col cols="6">
                          <p @click="openTicket(ticket.id)" class="call-history-values call-history-values-name" > <strong>#</strong> {{ ticket.id }}</p>
                        </b-col>
                        <b-col cols="6">
                          <b-button @click="createNote(ticket.id)" pill size="sm" class="call-addnote-ticket" variant="outline-secondary"><font-awesome-icon  icon="plus" size="sm"/> Note</b-button>
                        </b-col>
                      </b-row>
                      <p class="call-history-values call-history-values-number">{{ ticket.subject}}</p>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <div v-if="editor">
                <b-row >
                  <b-col cols="5">
                    <h6  class="incoming-ticket-heading">{{ editorHeading }}</h6>
                  </b-col>
                  <b-col cols="7">
                    <b-button @click="createNoteSubmit()" :disabled="noteCreateDisable" pill size="sm" class="call-create-ticket" variant="outline-success"><font-awesome-icon v-if="edittorButtonName == 'Save Note'" icon="plus" size="sm"/> {{ edittorButtonName }}</b-button>
                    <b-button @click="cancelEditor()" pill size="sm" class="call-create-ticket" variant="outline-danger"><font-awesome-icon  icon="chevron-left" size="sm"/> Cancel</b-button>
                  </b-col>
                </b-row>
                <div style="margin-top: 10px" class="editor-textarea">
                  <b-form-textarea
                    id="textarea"
                    v-model="editorText"
                    placeholder="Enter note..."
                    rows="8"
                    max-rows="8"
                  ></b-form-textarea>
                </div>  
              </div> 
            </div> 
          </div>
        </div>
      </b-container>
    </b-container>

    <b-container v-if="!loggedin" class="bv-example-row pre-signin">
        <h4>Signin to AWS Instance</h4>
        <h6 style="color: #00425f !important;"> <strong>{{ instanceName}} </strong></h6>
        <h6>Refresh the tab if you face any issues</h6>
    </b-container>
  </div>
</template>

<script>
import { ModelListSelect } from 'vue-search-select'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'flag-icon-css/css/flag-icon.css'
import 'vue-search-select/dist/VueSearchSelect.css'
import  { dialableCountries } from '../utils/dialableCountries'


export default {
  computed: {
      nameState() {
        return this.contactForm.contactName.length >= 4 ? true : false
      },
      numberState() {
        return this.contactForm.contactNumber.length >= 10 ? true : false
      },
      nameInvalidFeedback() {
        if (this.contactForm.contactName.length > 4) {
          return ''
        } else if (this.contactForm.contactName.length > 0) {
          return 'Enter at least 4 characters'
        }
      },
      contactInvalidFeedback() {
        if (this.contactForm.contactNumber.length > 10) {
          return ''
        } else if (this.contactForm.contactNumber.length > 0) {
          return 'Enter valid phone number'
        }
      },
    },
  data() {
    return {
      languageSelected : 'en' ,
      contactTabSelected: false,
      languageOptions: [
        { value: 'en', text: 'English' },
        { value: 'ja', text: 'Japanese' }
      ],
      dialedNumber: '',
      createTicketButton : "New Ticket",
      editor: false,
      editorHeading: "",
      edittorButtonName: "",
      noteCreateDisable: false,
      editorText: "",
      loggedin: false,
      connect_url: '',
      instanceName : '',
      pageUrl: "home",
      homePageUrl : "calllog",
      dialedNumbersettings: '',
      outBoundCall: false,
      agentStatus: '',
      changeItem : 0,
      toggle_call_history: true,
      toggle_dial_pad: false,
      toggle_country_code : false,
      toggle_country_code_settings: false,
      toggle_call_block: false,
      selected_phone_type: 1,
      agentStates: [],
      phoneTypesOption: [
          { text: 'Softphone', value: '1' },
          { text: 'Desk phone', value: '2' }
      ],
      toogle_settings: false,
      dialableCountries: [
          // { code: '91', name: '+ 91' + ' - ' + 'India', flag: 'flag-icon-in' },
          // { code: '1', name: '+ 1' + ' - ' + 'United States', flag: 'flag-icon-us' },
          // { code: '297', name: '+ 297' + ' - ' + 'Aruba', flag: 'flag-icon-7' },
          // { code: '43', name: '+ 43' + ' - ' + 'Austria', flag: 'flag-icon-at' },
          // { code: '229', name: '+ 229' + ' - ' + 'Benin', flag: 'flag-icon-bj' },
        ],
      call_history: [ 
          // {"contactNumber":"+18336624150","contactId":"2043070846346","calledTime":"1583845185","contactName":"Bobb"}
        // { "contactId" : "1" , "contactName" : "Unknown Caller" , "contactNumber" : "+18333537852"},
        // { "contactId" : "2" , "contactName" : "Boopathi" , "contactNumber" : "+18333537852"},
        // { "contactId" : "2" , "contactName" : "Boopathi" , "contactNumber" : "+18444444852"},
        // { "contactId" : "1" , "contactName" : "Unknown Caller" , "contactNumber" : "+18333537852"},
        // { "contactId" : "2" , "contactName" : "Boopathi" , "contactNumber" : "+18333537852"},
        // { "contactId" : "2" , "contactName" : "Boopathi" , "contactNumber" : "+18444444852"},
        // { "contactId" : "1" , "contactName" : "Unknown Caller" , "contactNumber" : "+18333537852"},
        // { "contactId" : "2" , "contactName" : "Boopathi" , "contactNumber" : "+18333537852"},
        // { "contactId" : "2" , "contactName" : "Boopathi" , "contactNumber" : "+18444444852"},
        // { "contactId" : "1" , "contactName" : "Unknown Caller" , "contactNumber" : "+18333537852"},
        // { "contactId" : "2" , "contactName" : "Boopathi" , "contactNumber" : "+18333537852"},
        // { "contactId" : "2" , "contactName" : "Boopathi" , "contactNumber" : "+18444444852"}
      ],
      contacts: [ 
        // { "contactId" : "1" , "contactName" : "Bob" , "contactNumber" : "+18333537852"},
        // { "contactId" : "2" , "contactName" : "Tom" , "contactNumber" : "+18333537852"},
        // { "contactId" : "2" , "contactName" : "Steve" , "contactNumber" : "+18444444852"}
      ],
      tickets: [ { "id" : "18" , "subject" : "this is subject of the sample aws connect ticket generated by aws connect phone sandeza" },{ "id" : "19" , "subject" : "this is subject of the sample aws connect ticket generated by aws connect phone sandeza" },{ "id" : "20" , "subject" : "this is subject of the sample aws connect ticket generated by aws connect phone sandeza" },{ "id" : "21" , "subject" : "this is subject of the sample aws connect ticket generated by aws connect phone sandeza" },{ "id" : "345678" , "subject" : "this is subject of the sample aws connect ticket generated by aws connect phone sandeza" },{ "id" : "7654765" , "subject" : "this is subject of the sample aws connect ticket generated by aws connect phone sandeza" }],
      selectedCountry: { code: '1', flag: 'flag-icon-us' },
      selectedCountrySettings: { code: '1', flag: 'flag-icon-us' },
      onAccepted: true,
      onHold: false,
      onMute: false,
      callStatus: "Connected",
      callingName : "Unknown Caller",
      callingId: "",
      callingNumber: "+1 234567890",
      contactObject : "",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
      agentObject : "",
      agentUserName: "",
      callStartTime: "",
      callEndTime: "",
      newCreatedTicket: 0,
      newNoteCreated: "",
      addNoteFor: "",
      activeContactId: "",
      contactForm : {
        contactName : '',
        contactNumber: ''
      },
      addContactButton: false,
      addContactButtonText: "Save Contact",
      newContactCreated:'',
      setAvailableTrigger: false
    }
  },
  created(){
    let uri = window.location.search.substring(1); 
    let params = new URLSearchParams(uri);
    this.connect_url = params.get("connect_url");
    console.log("URL params url ==> " +params.get("connect_url"));
  },
  mounted() {
    this.handleLogin();
  },
  watch: {
    // dialedNumber: function() {
    //   if(this.contactTabSelected){
    //     let passData = {};
    //     passData.action = "searchContact";
    //     passData.query = this.dialedNumber;
    //     parent.postMessage(passData,"*");
    //     console.log("search contact " + JSON.stringify(passData));
    //   }
    // },
    languageSelected: function() {
      this.$i18n.locale = this.languageSelected;
      var passData = {};
      passData.action = "languageChange";
      passData.agentId = this.agentUserName;
      passData.language = this.languageSelected;
      console.log("----> passing contact "+ JSON.stringify(passData));
      parent.postMessage(passData,"*");
    },
    newCreatedTicket: function() {
      if(this.newCreatedTicket > 0) {
        this.createTicketButton = "New Ticket";
        this.noteCreateDisable = false;
        this.createNote(this.newCreatedTicket);
        this.newCreatedTicket = 0;
      }
    },
    newNoteCreated: function(){
      if(this.newNoteCreated == "success") {
        this.newNoteCreated = "";
        this.editorText = "";
        this.edittorButtonName = "Save Note";
        this.noteCreateDisable = false;
        this.cancelEditor();
      }
    },
    newContactCreated: function(){
      if(this.newContactCreated == "success") {
        this.contactForm.contactName = "";
        this.edittorButtonName = "Save Contact";
        this.addContactButton = false;
        this.homePageUrl = "calllog"
      }
    },
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
    testMethod(){
      console.log('clicked');
    },
    createNewContact(){
      this.addContactButton = true;
      this.addContactButtonText = "Saving";

      let passData = {};
      passData.action = "addContact";
      passData.agentId = this.agentUserName;
      passData.contactName = this.contactForm.contactName;
      passData.contactNumber = this.contactForm.contactNumber;
      parent.postMessage(passData,"*");
      console.log("create contact " + JSON.stringify(passData));
      
    },
    cancelCreateNewContact(){
      this.homePageUrl = "calllog"
    },
    handleLogin() {

      var thisKey = this;
      var loginUrl = this.connect_url;
      //var loginUrl = "https://sandeza.awsapps.com/connect/ccp#/";

       window.addEventListener('message', function(event) {
        if(event.data.action == "calllogs"){
          console.log("--> recived on connect app <--" + JSON.stringify(event.data));
          if(event.data.callData != null) {
            let eventData = event.data.callData;
            let eventDataRev = eventData.reverse()
            thisKey.call_history = eventData.slice(0,25);
          }
          thisKey.contacts = event.data.contactList;
          thisKey.languageSelected = event.data.language;
        } else if(event.data.action == "createTicketSuccess"){
          console.log("--> recived created ticket id on connect app <--" + JSON.stringify(event.data.ticket_id));
          thisKey.newCreatedTicket = event.data.ticket_id;
        } else if(event.data.action == "createNoteSuccess"){
          console.log("--> recived created note status on connect app <--" + JSON.stringify(event.data.status));
          thisKey.newNoteCreated = event.data.status;
        } else if(event.data.action == "createContactSuccess"){
          console.log("--> recived created contact status on connect app <--" + JSON.stringify(event.data.status));
          thisKey.newContactCreated = event.data.status;
        } else if(event.data.action == "makeOutboundCall"){
          console.log("--> recived make outbound call on connect app <--" + JSON.stringify(event.data));
          this.dialFromHistory(event.data.name,event.data.number)
        } else if(event.data.action == "searchResult"){
          console.log("--> recived search result on connect app <--" + JSON.stringify(event.data));
          thisKey.contacts = event.data.searchResult;
        }
      } , false);

      connect.core.initCCP(containerDiv, {
        ccpUrl: loginUrl,
        loginPopup:    false,
        //region: "us-east-1",          
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
        thisKey.agentStates = agent.getAgentStates();
        //console.log(agent.getDialableCountries());
        thisKey.dialableCountries = dialableCountries(agent.getDialableCountries());
        //console.log( "===> agent status " + JSON.stringify(agent.getAgentStates()));
      })

      

      var eventBus = connect.core.getEventBus();
      eventBus.subscribe(connect.AgentEvents.INIT, function () {
        var agentConfig = thisKey.agentObject.getConfiguration();
        thisKey.agentUserName = agentConfig.username;
        thisKey.loggedin = true;
        let passData = {};
        passData.action = "agentConnected";
        passData.agentId = agentConfig.username;
        parent.postMessage(passData,"*");
        console.log("-------------------------------connected "+ thisKey.agentUserName);
      });
      
      connect.contact(function(contact) {
        var data;
        contact.onConnecting(function() {
          var passData = {};

          if(!thisKey.outBoundCall) {
            passData.action = "incomingCall";
            console.log("onConnecting---------------"+ JSON.stringify(contact.getAttributes()));
            

            var activeConnection = contact.getActiveInitialConnection();
            var contactId = activeConnection['contactId'];
            thisKey.activeContactId = contactId;
            var connectionId = activeConnection['connectionId'];
            var conn = new connect.Connection(contactId, connectionId);

            var phoneNumber = conn.getEndpoint().phoneNumber;
            if(phoneNumber.startsWith("sip")){
              phoneNumber = phoneNumber.replace(/sip:([^@]*)@.*/, "$1")
            }
            thisKey.callingNumber = phoneNumber;
            passData.contactNumber = phoneNumber;
            data = contact.getAttributes();
            
            //if(Object.keys(data).length > 0){
                try {
                  var value = JSON.parse(data.customerInfo.value);
                  console.log(value);
                  thisKey.callingName = value.name;
                  thisKey.callingId = value.id;
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
                } catch(e) {
                  console.log("no customer info --> catch block");
                  thisKey.callingName = "Unknown Caller";
                  thisKey.callingId = "0";
                  passData.contactName = "Unknown Caller";
                  passData.contactId ="0";
                  passData.tickets = [];
                  thisKey.tickets = [];
                }
            // } else {
            //   console.log("no contact attrt --> else block");
            //   thisKey.callingName = "Unknown Caller";
            //   thisKey.callingId = "0";
            //   passData.contactName = "Unknown Caller";
            //   passData.contactId ="0";
            //   passData.tickets = [];
            //   thisKey.tickets = [];
            // }
            

            passData.agentId = thisKey.agentUserName;
            thisKey.call_history.unshift(passData);
            parent.postMessage(passData,"*");
            console.log("-------------------- pass data " + JSON.stringify(passData));
            thisKey.pageUrl= "call";
            //thisKey.outBoundCall = false;
            thisKey.callStatus = "Incoming";
            thisKey.toggle_call_block = true;
          }
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
          if(!thisKey.setAvailableTrigger) {
            console.log("normal callend ----> setavailable triggered ")
            if(thisKey.callStatus == "Calling"){
              console.log("on Ended before calling------------------")
            } else {

              if(!thisKey.outBoundCall) {
                var passData = {};
                passData.action = "endcall";
                passData.contactId = thisKey.activeContactId;
                passData.ticketId = thisKey.addNoteFor;
                passData.agentHandled = thisKey.agentUserName;
                parent.postMessage(passData,"*");
              }
              thisKey.setAvailable();
              console.log("$$$$$$$ "+ JSON.stringify(thisKey.agentObject.getState()));
              thisKey.callStatus = "Ended";
              thisKey.dialedNumber = ''
              thisKey.toggle_call_block = false;
              thisKey.outBoundCall = false;
              console.log("on ended---------------");
            }
          } else {
            console.log("set avilable call end ----> set to false")
            thisKey.setAvailableTrigger = false;
          }
        });
        
      });
    },
    cancelEditor(){
      this.editorText = "";
      this.editor = false;
    },
    createTicket(){
      this.noteCreateDisable = true;
      this.createTicketButton = "Creating Ticket";
      let passData = {};
      passData.action = "createTicket";
      passData.contactId = this.callingId;
      passData.phoneNumber = this.callingNumber;
      parent.postMessage(passData,"*");
      console.log("create ticket " + JSON.stringify(passData));
    },
    createNote(ticketId){
      this.addNoteFor = ticketId;
      this.editorHeading = "For #" + ticketId;
      this.edittorButtonName = "Save Note"
      this.editor = true;
    },
    createNoteSubmit(){
      this.noteCreateDisable = true;
      this.edittorButtonName = "Saving Note";
      let passData = {};
      passData.action = "addNote";
      passData.ticketId = this.addNoteFor;
      passData.note = this.editorText;
      parent.postMessage(passData,"*");
      console.log("create note " + JSON.stringify(passData));
    },
    setAvailable(){
      console.log("set available triggered")
      this.setAvailableTrigger = true;
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
    refreshCCP(){
      window.top.location.reload();
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
          console.log("Successfully sent outbound call dial");
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
      console.log("change Status clicked --> " + JSON.stringify(agentState));
      var thisKey = this;

      this.agentObject.setState(agentState, {
        success: function() { 
          console.log("set status " + agentState.name + " success");
          thisKey.agentStatus = agentState.name;
        },
        failure: function() {
          console.log("set available " + agentState.name + " failed");
        }
      });

      // if(agentState == "ROUTABLE") {
      //   var routableState = this.agentObject.getAgentStates().filter(function(state) {
      //     return state.type === connect.AgentStateType.ROUTABLE;
      //   })[0];
      //   console.log("==> state change " + JSON.stringify(routableState));
      //   this.pageUrl = "home";
      //   this.agentObject.setState(routableState, {
      //     success: function() { 
      //       console.log("set available success");
      //       thisKey.agentStatus = "Available"
      //     },
      //     failure: function() {
      //       console.log("set available failed");
      //     }
      //   });
      // } else if(agentState == "OFFLINE") {
      //   var routableState = this.agentObject.getAgentStates().filter(function(state) {
      //     return state.type === connect.AgentStateType.OFFLINE;
      //   })[0];
      //   this.pageUrl = "home";
      //   this.agentObject.setState(routableState, {
      //     success: function() { 
      //       console.log("set offline success");
      //       thisKey.agentStatus = "Offline"
      //       console.log("After change status --> "+ JSON.stringify(thisKey.agentObject.getState()));
      //     },
      //     failure: function() {
      //       console.log("set offline failed");
      //     }
      //   });
      // }
    },
    dialFromHistory(number,name) {
      this.dialedNumber = number;
      this.callingNumber = number;
      this.callingName = name;
      this.toggle_call_block = true;
      this.callStatus = "Calling";
      this.outBoundCall = true;
      this.pageUrl= "call";

      let thisKey = this;

      var callNumber = connect.Endpoint.byPhoneNumber(number);
      console.log("outbound call " + JSON.stringify(callNumber));
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
    this.contactForm.contactNumber = number;
    this.homePageUrl = "addcontact";
  }
  },
   components: {
      ModelListSelect
  }
}
</script>

<style>
/* #containerDiv {
		width: 324px; 
		height: 465px; 
		overflow: hidden;
	} */

.my-nav-active {
  color: #00425f !important;
  font-weight: bold;
}



.tabs .nav-link {
  color: #6c757d ;
  padding: 0 !important;
}

.nav-tabs {
  border-bottom: none !important;
}

.nav-tabs .nav-link {
    border: none !important;
}

.pre-signin{
  line-height: 1.5;
  height: 200px;
  margin-top:180px;
  display: inline-block;
  vertical-align: middle;
}

.call-create-ticket{
  float: right;
  height: 25px;
  font-size: 11px;
  margin-top: 6px;
  margin-right: 4px;
}

.call-addnote-ticket {
  float: right;
  height: 20px;
  font-size: 8px;
  margin-right: 5px;
}

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
  /* width: 250px; */
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
  font-weight: bold;
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
    margin-top: 15px;
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
    border-top: 1px solid #ccc;
  }
</style>
