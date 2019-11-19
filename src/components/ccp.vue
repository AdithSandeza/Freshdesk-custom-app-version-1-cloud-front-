<template>
  <div class="navbar">
    <div id="containerDiv" />
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  mounted() {
    this.handleLogin();
  },
  methods: {
    handleLogin() {
      
      var loginUrl = 'https://sandeza.awsapps.com/connect/ccp#/'

      connect.core.initCCP(containerDiv, {
          ccpUrl: loginUrl,
          loginPopup:    true,          
          softphone:     {   
            allowFramedSoftphone : true  
          }
      });

      let eventBus = connect.core.getEventBus();
      eventBus.subscribe(connect.AgentEvents.INIT, function () {
        var agent = new connect.Agent();
        var name = agent.getName();
        console.log("-------------------------------connected "+ name);
      });

      connect.contact(function(contact) {

        contact.onConnecting(function() {
          var data = JSON.parse(JSON.stringify(contact.getAttributes()));
          console.log("onConnecting---------------"+ JSON.stringify(contact.getAttributes()));
          console.log("-------------------- pass data " + JSON.stringify(passData));
        });
        
        contact.onAccepted(function() {
          console.log("on accepted---------------");
          console.log("INFO Agent "+name+" accepted Call from "+customerNo+ " with case id "+data.key.value);
        });
        
        contact.onConnected(function() {
          console.log("on connected---------------");
        });
        
        contact.onEnded(function() {
            console.log("on ended---------------"+ JSON.stringify(passDataEnd));
        });
        
      });
    }
  }
}
</script>

<style scoped>
#containerDiv {
		width: 324px; 
		height: 465px; 
		overflow: hidden;
	}
</style>
